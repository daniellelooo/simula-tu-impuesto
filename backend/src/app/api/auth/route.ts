import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { hashPassword, comparePassword, generateToken } from '../../../lib/auth'

// Helper para agregar headers de CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

// Manejar preflight requests de CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  })
}

export async function POST(request: NextRequest) {
  try {
    const { action, email, password, name } = await request.json()

    if (action === 'register') {
      // Verificar si el usuario ya existe
      const existingUser = await prisma.user.findUnique({
        where: { email }
      })

      if (existingUser) {
        return NextResponse.json(
          { success: false, error: 'El usuario ya existe' },
          { status: 400, headers: corsHeaders }
        )
      }

      // Crear nuevo usuario
      const hashedPassword = await hashPassword(password)
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: name || null
        }
      })

      const token = generateToken(user.id)

      return NextResponse.json({
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name
          },
          token
        }
      }, { headers: corsHeaders })

    } else if (action === 'login') {
      // Buscar usuario
      const user = await prisma.user.findUnique({
        where: { email }
      })

      if (!user) {
        return NextResponse.json(
          { success: false, error: 'Usuario no encontrado' },
          { status: 401, headers: corsHeaders }
        )
      }

      // Verificar contraseña
      const isValidPassword = await comparePassword(password, user.password)
      
      if (!isValidPassword) {
        return NextResponse.json(
          { success: false, error: 'Contraseña incorrecta' },
          { status: 401, headers: corsHeaders }
        )
      }

      const token = generateToken(user.id)

      return NextResponse.json({
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name
          },
          token
        }
      }, { headers: corsHeaders })

    } else {
      return NextResponse.json(
        { success: false, error: 'Acción no válida' },
        { status: 400, headers: corsHeaders }
      )
    }

  } catch (error) {
    console.error('Error en autenticación:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500, headers: corsHeaders }
    )
  }
}
