import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { getAuthUser } from '../../../lib/middleware'

// Helper para headers de CORS
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders
  });
}

export async function POST(request) {
  try {
    const { 
      ventasMensuales, 
      tipoActividad, 
      tiempoActividad,
      deducciones = 0,
      ingresosBrutos = 0,
      gastosDeducibles = 0
    } = await request.json();

    if (!ventasMensuales || !tipoActividad || !tiempoActividad) {
      return NextResponse.json(
        { success: false, error: "Faltan datos para calcular" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Tabla de tarifas RST más completa
    const tarifasRST = {
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

    // Obtener tarifa según actividad y tiempo
    const porcentajeImpuesto = tarifasRST[tipoActividad]?.[tiempoActividad] || 1.4;
    
    // Cálculos más avanzados
    const ventasAnuales = ventasMensuales * 12;
    const ingresosTotales = ingresosBrutos > 0 ? ingresosBrutos : ventasMensuales;
    const baseGravable = Math.max(0, ingresosTotales - gastosDeducibles - deducciones);
    const impuestoMensual = (baseGravable * porcentajeImpuesto) / 100;
    const impuestoAnual = impuestoMensual * 12;

    // Preparar resultado
    const resultado = {
      ventasMensuales,
      ventasAnuales,
      porcentajeImpuesto,
      impuestoMensual,
      impuestoAnual,
      deducciones,
      ingresosBrutos,
      gastosDeducibles,
      baseGravable,
      tipoActividad,
      tiempoActividad
    };

    // Si el usuario está autenticado, guardar el cálculo
    const authUser = getAuthUser(request);
    if (authUser) {
      try {
        await prisma.calculation.create({
          data: {
            userId: authUser.userId,
            ventasMensuales,
            tipoActividad,
            tiempoActividad,
            porcentajeImpuesto,
            impuestoMensual,
            impuestoAnual,
            deducciones,
            ingresosBrutos,
            gastosDeducibles
          }
        });
      } catch (dbError) {
        console.error('Error guardando cálculo:', dbError);
        // Continuar sin guardar si hay error
      }
    }

    return NextResponse.json({
      success: true,
      data: resultado
    }, { headers: corsHeaders });

  } catch (error) {
    console.error('Error en cálculo:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500, headers: corsHeaders }
    );
  }
}
