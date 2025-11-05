import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { getAuthUser } from '../../../lib/middleware'

// Headers para permitir CORS en la API
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

// Handler para preflight de CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  })
}

// Endpoint principal para obtener el historial de cálculos
export async function GET(request: NextRequest) {
  // Verifica que el usuario esté autenticado
  const authUser = getAuthUser(request);
  
  if (!authUser) {
    // Si no está autenticado, retorna error
    return NextResponse.json(
      { success: false, error: 'No autorizado' },
      { status: 401, headers: corsHeaders }
    );
  }

  try {
    // Consulta los últimos 50 cálculos del usuario en la base de datos
    const calculations = await prisma.calculation.findMany({
      where: { userId: authUser.userId },
      orderBy: { createdAt: 'desc' },
      take: 50 // Últimos 50 cálculos
    });

    // Retorna el historial al frontend
    return NextResponse.json({
      success: true,
      data: calculations
    }, { headers: corsHeaders });

  } catch (error) {
    // Error general del servidor
    console.error('Error obteniendo historial:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500, headers: corsHeaders }
    );
  }
}
