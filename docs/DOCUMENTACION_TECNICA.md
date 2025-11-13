# Documentación Técnica – Simula tu Impuesto

Este documento describe la arquitectura del proyecto, los endpoints disponibles y los componentes principales del frontend y backend. Está orientado a desarrolladores que necesiten mantener, extender o integrar el sistema.

## Arquitectura general

Monorepo full‑stack con dos aplicaciones:

- Frontend: React 19 + Vite + Tailwind CSS
- Backend: Next.js 15 (App Router) exponiendo API Routes + TypeScript + Prisma ORM
- Base de datos: SQLite en desarrollo (PostgreSQL recomendado en producción)
- Autenticación: JWT (Bearer) con bcryptjs para hashing de contraseñas

Flujo alto nivel:

1. Usuario interactúa con el frontend (Vite).
2. El frontend consume la API del backend configurando VITE_API_BASE_URL.
3. Autenticación vía /api/auth → el backend emite un JWT (expira en 7 días).
4. Endpoints protegidos verifican Authorization: Bearer <token>.
5. Prisma persiste usuarios, cálculos y ventas importadas.

Estructura relevante:

```
simula-tu-impuesto/
├─ frontend/                     # UI (React + Vite)
│  └─ src/
│     ├─ App.jsx                 # Orquestación de estado/app
│     └─ components/
│        ├─ SimpleCalculator.jsx # Cálculo local (sin sesión)
│        ├─ AdvancedCalculator.jsx# Cálculo servidor + historial + PDF
│        └─ AuthModal.jsx        # Login/registro
│
└─ backend/                      # API (Next.js + Prisma)
   ├─ prisma/schema.prisma       # Modelos User/Calculation/ImportedSale
   └─ src/
      ├─ app/api/
      │  ├─ auth/route.ts        # Registro/Login → JWT
      │  ├─ calcular/route.js    # Cálculo RST y guardado si autenticado
      │  ├─ historial/route.ts   # Últimos cálculos del usuario (protegido)
      │  ├─ pdf/route.ts         # HTML para PDF del cálculo (protegido)
      │  ├─ upload-excel/route.ts# Importación de filas desde Excel (n8n)
      │  └─ process-batch/route.ts# Procesa importaciones en lote (protegido)
      └─ lib/
         ├─ prisma.ts            # Singleton PrismaClient
         ├─ auth.ts              # hash/compare, sign/verify JWT
         └─ middleware.ts        # getAuthUser() desde Authorization
```

Consideraciones de despliegue:

- Variables de entorno clave:
  - DATABASE_URL (SQLite dev o PostgreSQL prod)
  - JWT_SECRET (obligatoria en prod)
  - En frontend: VITE_API_BASE_URL (URL base del backend)
- CORS: todos los endpoints exponen headers CORS con Allow-Origin: \* (ajustar en prod)

## Modelo de datos (Prisma)

Archivo: `backend/prisma/schema.prisma`

- User
  - id (cuid), email (único), password (hash), name?, createdAt/updatedAt
  - Relaciones: calculations [Calculation], importedSales [ImportedSale]
- Calculation
  - userId (FK → User), ventasMensuales, tipoActividad, tiempoActividad,
    porcentajeImpuesto, impuestoMensual, impuestoAnual,
    deducciones?, ingresosBrutos?, gastosDeducibles?, createdAt
- ImportedSale
  - userId? (FK → User), ventasMensuales, tipoActividad, tiempoActividad,
    deducciones?, ingresosBrutos?, gastosDeducibles?,
    fileName?, rowNumber?, processed (bool), createdAt

Relaciones usan onDelete: Cascade.

## Contrato de la API (Endpoints)

Notas comunes:

- Todas las rutas implementan OPTIONS para preflight CORS.
- Formato de respuesta consistente:
  - Éxito: `{ success: true, data: ... }`
  - Error: `{ success: false, error: string }`
- Autenticación: Authorization: `Bearer <JWT>` cuando es requerida.

### POST /api/auth

Acciones: `register` y `login` en el mismo endpoint.

Body JSON:

```
{
  "action": "register" | "login",
  "email": "user@example.com",
  "password": "******",
  "name": "Nombre opcional" // solo para register
}
```

Respuestas:

- 200 OK (register/login):

```
{
  "success": true,
  "data": {
    "user": { "id": "...", "email": "...", "name": "..." },
    "token": "<JWT>"
  }
}
```

- 400 El usuario ya existe (register)
- 401 Usuario no encontrado / contraseña incorrecta (login)
- 500 Error interno

### POST /api/calcular

Calcula impuesto RST y, si hay usuario autenticado, guarda un registro en `Calculation`.

Auth: opcional (guarda cálculo solo si hay JWT válido).

Body JSON:

```
{
  "ventasMensuales": number,
  "tipoActividad": "venta_productos" | "servicios_personales" | "venta_ambulante" | "otros",
  "tiempoActividad": "1-3_años" | "4-6_años" | "7+_años",
  "deducciones": number,          // opcional (default 0)
  "ingresosBrutos": number,       // opcional (default 0)
  "gastosDeducibles": number      // opcional (default 0)
}
```

Respuesta 200 OK:

```
{
  "success": true,
  "data": {
    "ventasMensuales": number,
    "ventasAnuales": number,
    "porcentajeImpuesto": number, // %
    "impuestoMensual": number,
    "impuestoAnual": number,
    "deducciones": number,
    "ingresosBrutos": number,
    "gastosDeducibles": number,
    "baseGravable": number,
    "tipoActividad": string,
    "tiempoActividad": string
  }
}
```

Errores:

- 400 Faltan datos para calcular
- 500 Error interno

### GET /api/historial

Devuelve los últimos 50 cálculos del usuario autenticado.

Auth: requerido (Bearer JWT).

Respuesta 200 OK:

```
{
  "success": true,
  "data": [Calculation, ...] // ordenados desc por createdAt
}
```

Errores:

- 401 No autorizado
- 500 Error interno

### POST /api/pdf

Retorna HTML listo para render a PDF (el frontend convierte a PDF con `html2canvas` + `jsPDF`).

Auth: requerido.

Body JSON:

```
{
  "calculationData": { ...resultado de /api/calcular }
}
```

Respuesta 200 OK:

```
{
  "success": true,
  "data": {
    "htmlContent": "<!DOCTYPE html>...",
    "filename": "calculo-rst-YYYY-MM-DD.pdf"
  }
}
```

Errores: 401 No autorizado, 500 Error generando reporte

### POST /api/upload-excel

Recibe filas procesadas (por ejemplo, desde n8n) e inserta en `ImportedSale`.

Auth: opcional (si hay JWT, asocia las filas al usuario).

Body JSON:

```
{
  "rows": [
    {
      "ventasMensuales": number,
      "tipoActividad": string,
      "tiempoActividad": string,
      "deducciones"?: number,
      "ingresosBrutos"?: number,
      "gastosDeducibles"?: number
    },
    ...
  ],
  "fileName": "archivo.xlsx"
}
```

Respuesta 200 OK:

```
{
  "success": true,
  "data": { "totalRows": n, "savedRows": m, "message": "..." }
}
```

Errores: 400 sin filas, 500 interno

### GET /api/upload-excel

Lista las últimas 100 importaciones del usuario autenticado.

Auth: requerido.

Respuesta 200 OK:

```
{
  "success": true,
  "data": [ImportedSale, ...]
}
```

Errores: 401, 500

### POST /api/process-batch

Procesa las filas de `ImportedSale` del usuario autenticado con `processed=false`: calcula impuestos, crea registros en `Calculation` y marca `processed=true`.

Auth: requerido.

Respuesta 200 OK:

```
{
  "success": true,
  "data": {
    "totalProcessed": number,
    "results": [ { "rowNumber": number, "impuestoMensual": number, "impuestoAnual": number } ],
    "message": string
  }
}
```

Errores: 401, 500

## Autenticación y seguridad

- Hash de contraseñas: `bcrypt.hash(..., 12)`.
- Tokens JWT: `jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' })`.
- Verificación de token: `verifyToken()` en `auth.ts` y helper `getAuthUser()` (lee Authorization: Bearer ...).
- Rutas protegidas: `historial`, `pdf`, `upload-excel` (GET) y `process-batch`.
- CORS abierto por defecto para facilitar pruebas locales; en producción se recomienda restringir `Access-Control-Allow-Origin` al dominio del frontend.

## Componentes principales del frontend

- App.jsx
  - Gestiona sesión (user/token en localStorage)
  - Permite alternar entre calculadora básica y avanzada
  - Invoca `AuthModal` para login/registro
- SimpleCalculator.jsx
  - Cálculo en cliente (sin persistencia)
  - Tarifas locales simplificadas
  - Formateo de moneda, validaciones mínimas
- AdvancedCalculator.jsx
  - Llama a `/api/calcular` con datos avanzados (deducciones, gastos)
  - Muestra resultado, obtiene historial (`/api/historial`)
  - Genera PDF invocando `/api/pdf` y renderizando HTML con `html2canvas` + `jsPDF`
  - Requiere `token` para funcionalidades avanzadas
- AuthModal.jsx
  - Registro/Login contra `/api/auth`
  - Entrega `user` y `token` a `App` (persistidos en localStorage)

Configuración del frontend:

- `VITE_API_BASE_URL` define la URL base del backend (ej: http://localhost:3001)

## Estándares y decisiones técnicas

- Respuestas homogéneas `{ success, data|error }` para manejo uniforme en frontend.
- Persistencia automática del cálculo solo si hay usuario autenticado.
- PrismaClient como singleton para evitar conexiones múltiples en dev.
- Separación clara de responsabilidades (auth/utilidades vs rutas API).

## Pruebas y validaciones sugeridas

- Unit tests para utilidades de auth (hash/compare, sign/verify).
- Tests de contrato API (ejemplos con `supertest`) verificando códigos y shape de `data`.
- Validación de payloads (p.ej., con Zod) antes de calcular/guardar.

## Limitaciones y próximos pasos

- CORS abierto a `*` (restringir en prod).
- Validaciones de entrada básicas; agregar esquema estricto y mensajes detallados.
- SQLite solo para desarrollo; migrar a PostgreSQL en producción y configurar `DATABASE_URL`.
- Manejar paginación/filtrado en historial e importaciones si el volumen crece.

---

Última actualización: 2025-11-13
