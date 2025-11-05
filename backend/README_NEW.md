# 🔧 Backend - Simula tu Impuesto

API Next.js que proporciona los cálculos del Régimen Simple de Tributación (RST) para la aplicación frontend.

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+
- npm

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

La API estará disponible en [http://localhost:3000](http://localhost:3000)

### Build de Producción

```bash
npm run build
npm run start
```

## 🛠️ Tecnologías

- **Next.js 15** - Framework full-stack
- **TypeScript** - Tipado estático
- **API Routes** - Endpoints RESTful
- **ESLint** - Linting y calidad de código

## 📁 Estructura

```
backend/
├── pages/
│   └── api/
│       └── calcular.ts     # Endpoint de cálculo RST
├── package.json            # Dependencias y scripts
├── tsconfig.json          # Configuración TypeScript
├── next.config.js         # Configuración Next.js
└── README.md              # Este archivo
```

## 🔗 API Endpoints

### POST `/api/calcular`

Calcula el impuesto RST basado en los parámetros proporcionados.

#### Request Body

```json
{
  "ventasMensuales": 5000000,
  "tipoActividad": "venta_productos",
  "tiempoActividad": "1-3_años"
}
```

#### Response

```json
{
  "success": true,
  "data": {
    "ventasMensuales": 5000000,
    "ventasAnuales": 60000000,
    "porcentajeImpuesto": 1.4,
    "impuestoMensual": 70000,
    "impuestoAnual": 840000
  }
}
```

#### Errores

```json
{
  "success": false,
  "error": "Mensaje de error descriptivo"
}
```

## 💰 Tabla de Tarifas RST

### Venta de Productos

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
