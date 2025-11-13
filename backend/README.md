# 🔧 Backend API - Simula tu Impuesto# 🔧 Backend - Simula tu Impuesto

## 📋 DescripciónAPI Next.js que proporciona los cálculos del Régimen Simple de Tributación (RST) para la aplicación frontend.

Backend API REST construido con **Next.js 15** (solo API Routes, sin UI).

## 🚀 Inicio Rápido

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 15 (TypeScript)### Prerrequisitos

- **Base de Datos**: SQLite + Prisma ORM

- **Autenticación**: JWT + bcryptjs- Node.js 18+

- **Puerto**: 3000- npm

## 📁 Estructura### Instalación

````

backend/```bash

├── prisma/npm install

│   ├── schema.prisma    # Modelos de base de datos```

│   └── dev.db          # Base de datos SQLite

├── src/### Desarrollo

│   ├── app/

│   │   └── api/        # Endpoints de la API```bash

│   │       ├── auth/npm run dev

│   │       ├── calcular/```

│   │       ├── historial/

│   │       ├── pdf/La API estará disponible en [http://localhost:3000](http://localhost:3000)

│   │       ├── upload-excel/

│   │       └── process-batch/### Build de Producción

│   └── lib/

│       └── prisma.ts   # Cliente de Prisma```bash

└── .env                # Variables de entornonpm run build

npm run start

````

## 🚀 Comandos## 🛠️ Tecnologías

### Desarrollo- **Next.js 15** - Framework full-stack

```bash- **TypeScript** - Tipado estático

npm run dev- **API Routes** - Endpoints RESTful

# Servidor en http://localhost:3000- **ESLint** - Linting y calidad de código

```

## 📁 Estructura

### Prisma (Base de datos)

`bash`

# Generar cliente de Prismabackend/

npx prisma generate├── pages/

│ └── api/

# Sincronizar schema con la BD│ └── calcular.ts # Endpoint de cálculo RST

npx prisma db push├── package.json # Dependencias y scripts

├── tsconfig.json # Configuración TypeScript

# Abrir Prisma Studio (GUI)├── next.config.js # Configuración Next.js

npx prisma studio└── README.md # Este archivo

````



## 🌐 Endpoints Disponibles## 🔗 API Endpoints



### Autenticación### POST `/api/calcular`

- `POST /api/auth` - Login/Registro

Calcula el impuesto RST basado en los parámetros proporcionados.

### Cálculos

- `POST /api/calcular` - Calcular impuestos RST#### Request Body

- `GET /api/historial` - Obtener historial (requiere auth)

```json

### Reportes{

- `POST /api/pdf` - Generar PDF (requiere auth)  "ventasMensuales": 5000000,

  "tipoActividad": "venta_productos",

### Importación de datos (RPA)  "tiempoActividad": "1-3_años"

- `POST /api/upload-excel` - Importar ventas desde Excel/CSV}

- `GET /api/upload-excel` - Listar ventas importadas (requiere auth)```

- `POST /api/process-batch` - Procesar ventas en lote (requiere auth)

#### Response

## 🔑 Variables de Entorno (.env)

```env```json

DATABASE_URL="file:./dev.db"{

JWT_SECRET="tu_secreto_super_seguro"  "success": true,

```  "data": {

    "ventasMensuales": 5000000,

## 📊 Modelos de Base de Datos    "ventasAnuales": 60000000,

    "porcentajeImpuesto": 1.4,

### User    "impuestoMensual": 70000,

- id, email, password (hasheado), name, createdAt    "impuestoAnual": 840000

  }

### Calculation}

- id, userId, ventasMensuales, tipoActividad, tiempoActividad, deducciones, ingresosBrutos, gastosDeducibles, impuestoMensual, impuestoAnual, createdAt```



### ImportedSale#### Errores

- id, userId, ventasMensuales, tipoActividad, tiempoActividad, deducciones, ingresosBrutos, gastosDeducibles, fileName, rowNumber, processed, createdAt

```json

## 🔒 Seguridad{

- Contraseñas hasheadas con bcryptjs  "success": false,

- Autenticación JWT (token válido por 7 días)  "error": "Mensaje de error descriptivo"

- CORS configurado para frontend en puerto 5173}

```

## 📝 Notas

- Este backend **NO tiene UI**, solo expone APIs## 💰 Tabla de Tarifas RST

- La interfaz está en `/frontend` (React + Vite)

- El backend se ejecuta independientemente del frontend### Venta de Productos


- **1-3 años**: 1.4%
- **4-6 años**: 2.8%
- **7+ años**: 4.2%

### Servicios Personales

- **1-3 años**: 1.4%
- **4-6 años**: 2.8%
- **7+ años**: 4.2%

### Venta Ambulante

- **1-3 años**: 1.0%
- **4-6 años**: 2.0%
- **7+ años**: 3.0%

### Otros

- **1-3 años**: 1.4%
- **4-6 años**: 2.8%
- **7+ años**: 4.2%

## 🔧 Configuración

### Variables de Entorno

```bash
# No se requieren variables de entorno adicionales
# Next.js maneja automáticamente la configuración
```

### CORS

La API está configurada para aceptar requests desde `http://localhost:5173` (frontend) durante el desarrollo.

## 🧪 Testing

```bash
# Para probar la API directamente
curl -X POST http://localhost:3000/api/calcular \
  -H "Content-Type: application/json" \
  -d '{
    "ventasMensuales": 5000000,
    "tipoActividad": "venta_productos",
    "tiempoActividad": "1-3_años"
  }'
```

## 📋 Scripts

```bash
npm run dev    # Servidor de desarrollo con hot reload
npm run build  # Build optimizado para producción
npm run start  # Servidor de producción
npm run lint   # Verificar calidad del código
```

## 🔄 Integración con Frontend

El backend está diseñado para funcionar en conjunto con el frontend React. Durante el desarrollo:

- **Frontend**: `http://localhost:5173`
- **Backend**: `http://localhost:3000`
- **API Endpoint**: `http://localhost:3000/api/calcular`

## 🚀 Despliegue

Este backend puede desplegarse en:

- **Vercel** (recomendado para Next.js)
- **Netlify**
- **Railway**
- **Heroku**
- Cualquier proveedor que soporte Node.js

### Configuración para Vercel

El proyecto incluye `vercel.json` en la raíz para configuración de despliegue.
````
