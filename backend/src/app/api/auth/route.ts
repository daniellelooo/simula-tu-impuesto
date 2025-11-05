import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { hashPassword, comparePassword, generateToken } from '../../../lib/auth'

// Headers para permitir CORS en la API
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

// Handler para preflight de CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  })
}

// Endpoint principal para login y registro
export async function POST(request: NextRequest) {
  try {
    // Extrae los datos enviados por el frontend
    const { action, email, password, name } = await request.json()

    if (action === 'register') {
      // Verifica si el usuario ya existe en la base de datos
      const existingUser = await prisma.user.findUnique({
        where: { email }
      })

      if (existingUser) {
        // Si existe, retorna error
        return NextResponse.json(
          { success: false, error: 'El usuario ya existe' },
          { status: 400, headers: corsHeaders }
        )
      }

      // Si no existe, crea el usuario con la contraseña hasheada
      const hashedPassword = await hashPassword(password)
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: name || null
        }
      })

      // Genera el token JWT para el usuario
      const token = generateToken(user.id)

      // Retorna el usuario y el token
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
      // Busca el usuario por email
      const user = await prisma.user.findUnique({
        where: { email }
      })

      if (!user) {
        // Si no existe, retorna error
        return NextResponse.json(
          { success: false, error: 'Usuario no encontrado' },
          { status: 401, headers: corsHeaders }
        )
      }

      // Verifica la contraseña
      const isValidPassword = await comparePassword(password, user.password)
      
      if (!isValidPassword) {
        // Si la contraseña no coincide, retorna error
        return NextResponse.json(
          { success: false, error: 'Contraseña incorrecta' },
          { status: 401, headers: corsHeaders }
        )
      }

      // Genera el token JWT para el usuario
      const token = generateToken(user.id)

      // Retorna el usuario y el token
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
      // Si la acción no es válida, retorna error
      return NextResponse.json(
        { success: false, error: 'Acción no válida' },
        { status: 400, headers: corsHeaders }
      )
    }

  } catch (error) {
    // Error general del servidor
    console.error('Error en autenticación:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500, headers: corsHeaders }
    )
  }
}
