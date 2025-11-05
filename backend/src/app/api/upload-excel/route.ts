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

// Endpoint para recibir datos procesados del Excel (desde n8n)
// n8n ya habrá leído el Excel y nos enviará cada fila como JSON
export async function POST(request: NextRequest) {
  try {
    // Obtiene el usuario autenticado (opcional)
    const authUser = getAuthUser(request);
    
    // Recibe los datos del Excel procesados por n8n
    const body = await request.json();
    const { 
      rows,           // Array de filas del Excel
      fileName        // Nombre del archivo
    } = body;

    if (!rows || !Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No se recibieron datos para importar' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Guarda cada fila en la base de datos
    const savedRows = [];
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      
      // Valida que la fila tenga los datos mínimos necesarios
      if (!row.ventasMensuales || !row.tipoActividad || !row.tiempoActividad) {
        continue; // Salta filas incompletas
      }

      const importedSale = await prisma.importedSale.create({
        data: {
          userId: authUser?.userId || null,
          ventasMensuales: parseFloat(row.ventasMensuales),
          tipoActividad: row.tipoActividad,
          tiempoActividad: row.tiempoActividad,
          deducciones: row.deducciones ? parseFloat(row.deducciones) : null,
          ingresosBrutos: row.ingresosBrutos ? parseFloat(row.ingresosBrutos) : null,
          gastosDeducibles: row.gastosDeducibles ? parseFloat(row.gastosDeducibles) : null,
          fileName: fileName || 'archivo.xlsx',
          rowNumber: i + 1,
          processed: false
        }
      });

      savedRows.push(importedSale);
    }

    return NextResponse.json({
      success: true,
      data: {
        totalRows: rows.length,
        savedRows: savedRows.length,
        message: `Se importaron ${savedRows.length} registros correctamente`
      }
    }, { headers: corsHeaders });

  } catch (error) {
    console.error('Error importando datos:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500, headers: corsHeaders }
    );
  }
}

// Endpoint GET para obtener las ventas importadas
export async function GET(request: NextRequest) {
  try {
    const authUser = getAuthUser(request);
    
    if (!authUser) {
      return NextResponse.json(
        { success: false, error: 'No autorizado' },
        { status: 401, headers: corsHeaders }
      );
    }

    // Obtiene las ventas importadas del usuario
    const importedSales = await prisma.importedSale.findMany({
      where: { userId: authUser.userId },
      orderBy: { createdAt: 'desc' },
      take: 100 // Últimas 100 importaciones
    });

    return NextResponse.json({
      success: true,
      data: importedSales
    }, { headers: corsHeaders });

  } catch (error) {
    console.error('Error obteniendo ventas importadas:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500, headers: corsHeaders }
    );
  }
}
