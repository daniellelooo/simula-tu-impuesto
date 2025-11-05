import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { getAuthUser } from '../../../lib/middleware'

// Headers para permitir CORS en la API
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

// Handler para preflight de CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  })
}

// Endpoint para procesar ventas importadas (calcular impuestos en lote)
export async function POST(request: NextRequest) {
  try {
    const authUser = getAuthUser(request);
    
    if (!authUser) {
      return NextResponse.json(
        { success: false, error: 'No autorizado' },
        { status: 401, headers: corsHeaders }
      );
    }

    // Obtiene todas las ventas importadas que no han sido procesadas
    const unprocessedSales = await prisma.importedSale.findMany({
      where: { 
        userId: authUser.userId,
        processed: false
      }
    });

    if (unprocessedSales.length === 0) {
      return NextResponse.json({
        success: true,
        data: {
          message: 'No hay ventas pendientes por procesar',
          totalProcessed: 0
        }
      }, { headers: corsHeaders });
    }

    // Tabla de tarifas RST
    const tarifasRST: Record<string, Record<string, number>> = {
      "venta_productos": {
        "1-3_años": 1.4,
        "4-6_años": 2.8,
        "7+_años": 4.2,
      },
      "servicios_personales": {
        "1-3_años": 1.4,
        "4-6_años": 2.8,
        "7+_años": 4.2,
      },
      "venta_ambulante": {
        "1-3_años": 1.0,
        "4-6_años": 2.0,
        "7+_años": 3.0,
      },
      "otros": {
        "1-3_años": 1.4,
        "4-6_años": 2.8,
        "7+_años": 4.2,
      },
    };

    const processedResults = [];

    // Procesa cada venta
    for (const sale of unprocessedSales) {
      try {
        // Calcula el impuesto
        const porcentajeImpuesto = tarifasRST[sale.tipoActividad]?.[sale.tiempoActividad] || 1.4;
        const ventasAnuales = sale.ventasMensuales * 12;
        const ingresosTotales = sale.ingresosBrutos || sale.ventasMensuales;
        const baseGravable = Math.max(0, ingresosTotales - (sale.gastosDeducibles || 0) - (sale.deducciones || 0));
        const impuestoMensual = (baseGravable * porcentajeImpuesto) / 100;
        const impuestoAnual = impuestoMensual * 12;

        // Guarda el cálculo en la tabla Calculation
        await prisma.calculation.create({
          data: {
            userId: authUser.userId,
            ventasMensuales: sale.ventasMensuales,
            tipoActividad: sale.tipoActividad,
            tiempoActividad: sale.tiempoActividad,
            porcentajeImpuesto,
            impuestoMensual,
            impuestoAnual,
            deducciones: sale.deducciones,
            ingresosBrutos: sale.ingresosBrutos,
            gastosDeducibles: sale.gastosDeducibles
          }
        });

        // Marca la venta como procesada
        await prisma.importedSale.update({
          where: { id: sale.id },
          data: { processed: true }
        });

        processedResults.push({
          rowNumber: sale.rowNumber,
          impuestoMensual,
          impuestoAnual
        });

      } catch (error) {
        console.error(`Error procesando venta ${sale.id}:`, error);
        // Continúa con las demás ventas
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        totalProcessed: processedResults.length,
        results: processedResults,
        message: `Se procesaron ${processedResults.length} ventas correctamente`
      }
    }, { headers: corsHeaders });

  } catch (error) {
    console.error('Error procesando ventas:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500, headers: corsHeaders }
    );
  }
}
