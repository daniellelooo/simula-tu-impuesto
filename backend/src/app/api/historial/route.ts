import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { getAuthUser } from '../../../lib/middleware'

// Helper para headers de CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  })
}

export async function GET(request: NextRequest) {
  const authUser = getAuthUser(request);
  
  if (!authUser) {
    return NextResponse.json(
      { success: false, error: 'No autorizado' },
      { status: 401, headers: corsHeaders }
    );
  }

  try {
    const calculations = await prisma.calculation.findMany({
      where: { userId: authUser.userId },
      orderBy: { createdAt: 'desc' },
      take: 50 // Últimos 50 cálculos
    });

    return NextResponse.json({
      success: true,
      data: calculations
    }, { headers: corsHeaders });

  } catch (error) {
    console.error('Error obteniendo historial:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500, headers: corsHeaders }
    );
  }
}
