# 🧮 Simula tu Impuesto

Una aplicación web completa que permite calcular el **Régimen Simple de Tributación (RST)** colombiano, con funcionalidades básicas y avanzadas para emprendedores, contadores y pequeños empresarios.

## 🎯 ¿Qué es el RST?

El **Régimen Simple de Tributación** es un sistema especial diseñado por la DIAN para facilitar el cumplimiento tributario de pequeñas empresas en Colombia, permitiendo pagar un porcentaje fijo sobre los ingresos brutos.

## ✨ Características Principales

### 🔸 **Calculadora Básica** (Sin registro)

- Cálculo inmediato de impuestos RST
- Interface intuitiva y educativa
- Cálculos locales (sin base de datos)
- Ideal para consultas rápidas

### 🔸 **Calculadora Avanzada** (Con registro)

- **Sistema de autenticación** completo
- **Cálculos sofisticados** con deducciones y gastos
- **Historial de cálculos** personalizado
- **Generación de PDFs** profesionales
- **Base de datos** para persistencia

## 🏗️ Arquitectura del Proyecto

```
simula-tu-impuesto/ (Monorepo Fullstack)
├── 📱 frontend/              # React 19 + Vite + Tailwind
│   ├── src/
│   │   ├── components/
│   │   │   ├── AuthModal.jsx        # Autenticación
│   │   │   ├── SimpleCalculator.jsx # Calculadora básica
│   │   │   └── AdvancedCalculator.jsx # Calculadora avanzada
│   │   ├── App.jsx           # Componente principal
│   │   └── main.jsx          # Punto de entrada
│   └── package.json
│
├── 🔧 backend/               # Next.js 15 + TypeScript + Prisma
│   ├── src/
│   │   ├── app/api/         # API Routes
│   │   │   ├── auth/        # Autenticación (JWT)
│   │   │   ├── calcular/    # Cálculos avanzados
│   │   │   ├── historial/   # Historial de cálculos
│   │   │   └── pdf/         # Generación de reportes
│   │   └── lib/
│   │       ├── prisma.ts    # Cliente de base de datos
│   │       ├── auth.ts      # Utilidades de autenticación
│   │       └── middleware.ts # Middleware de autorización
│   ├── prisma/
│   │   └── schema.prisma    # Esquema de base de datos
│   └── package.json
│
├── 📦 package.json           # Scripts del monorepo
├── ⚙️ vercel.json           # Configuración de despliegue
└── 📄 README.md             # Documentación
```

## 🚀 Inicio Rápido

### Prerrequisitos

- **Node.js** 18+
- **npm** 8+
- **Git**

### Instalación Completa

```bash
# 1. Clonar el repositorio
git clone https://github.com/daniellelooo/simula-tu-impuesto.git
cd simula-tu-impuesto

# 2. Instalar dependencias del monorepo
npm install

# 3. Configurar base de datos (desarrollo)
cd backend
npx prisma generate
npx prisma db push
cd ..

# 4. Iniciar desarrollo
npm run dev
```

### URLs de Desarrollo

- **Frontend**: http://localhost:5174
- **Backend API**: http://localhost:3001

### Scripts Disponibles

```bash
npm run dev              # 🚀 Desarrollo: Frontend + Backend
npm run dev:frontend     # 📱 Solo frontend (Vite)
npm run dev:backend      # 🔧 Solo backend (Next.js)
npm run build           # 📦 Build completo
npm run build:frontend  # 📦 Build solo frontend
npm run build:backend   # 📦 Build solo backend
```

## 🎯 Comparación de Funcionalidades

| Característica        | 📊 Calculadora Básica | 🚀 Calculadora Avanzada |
| --------------------- | --------------------- | ----------------------- |
| **Acceso**            | Sin registro          | Con registro/login      |
| **Cálculo**           | Local (frontend)      | Servidor + BD           |
| **Campos**            | 3 básicos             | 6 completos             |
| **Deducciones**       | ❌ No                 | ✅ Sí                   |
| **Gastos deducibles** | ❌ No                 | ✅ Sí                   |
| **Historial**         | ❌ No                 | ✅ Sí (últimos 50)      |
| **PDF**               | ❌ No                 | ✅ Sí                   |
| **Persistencia**      | ❌ No                 | ✅ Base de datos        |
| **Uso ideal**         | Consultas rápidas     | Contadores/Empresarios  |

## 📋 Campos de la Calculadora Avanzada

### 🔸 **Campos Básicos**

1. **💰 Ventas Mensuales** - Ingresos brutos del negocio
2. **🏪 Tipo de Actividad** - Venta productos, servicios, ambulante, otros
3. **📅 Tiempo en el Negocio** - 1-3 años, 4-6 años, 7+ años

### 🔸 **Campos Avanzados**

4. **💼 Ingresos Brutos** - Total de ingresos si diferentes a ventas
5. **📋 Deducciones** - Donaciones, medicina prepagada, aportes pensión
6. **💸 Gastos Deducibles** - Arriendos, servicios, mercancía, empleados

### 💡 **Ejemplo de Cálculo Avanzado**

**Caso: Peluquería "Bella & Estilo"**

```javascript
// Datos de entrada
Ventas mensuales: $1,800,000
Tipo actividad: Servicios personales (4-6 años) → 2.8%
Deducciones: $100,000 (medicina prepagada)
Gastos deducibles: $650,000 (productos, arriendo, servicios)

// Cálculo
Base gravable = $1,800,000 - $650,000 - $100,000 = $1,050,000
Impuesto mensual = $1,050,000 × 2.8% = $29,400
Impuesto anual = $29,400 × 12 = $352,800

// Ahorro vs cálculo simple
Sin deducciones: $50,400/mes
Con deducciones: $29,400/mes
Ahorro: $21,000/mes 💰
```

## 🛠️ Stack Tecnológico

### 📱 **Frontend**

- **React 19** - Librería de interfaz de usuario
- **Vite** - Herramienta de desarrollo ultra-rápida
- **Tailwind CSS** - Framework de estilos utilitarios
- **Lucide React** - Iconos SVG optimizados
- **jsPDF + html2canvas** - Generación de PDFs

### 🔧 **Backend**

- **Next.js 15** - Framework full-stack de React
- **TypeScript** - JavaScript con tipado estático
- **Prisma ORM** - Cliente de base de datos type-safe
- **SQLite** (dev) / **PostgreSQL** (prod) - Bases de datos
- **bcryptjs** - Hashing de contraseñas
- **jsonwebtoken** - Autenticación JWT

### 🗄️ **Base de Datos**

```sql
-- Modelo User
User {
  id       String   @id @default(cuid())
  email    String   @unique
  password String
  name     String?
  createdAt DateTime @default(now())
  calculations Calculation[]
}

-- Modelo Calculation
Calculation {
  id                String   @id @default(cuid())
  userId            String
  ventasMensuales   Float
  tipoActividad     String
  tiempoActividad   String
  porcentajeImpuesto Float
  impuestoMensual   Float
  impuestoAnual     Float
  deducciones       Float?
  ingresosBrutos    Float?
  gastosDeducibles  Float?
  createdAt         DateTime @default(now())
  user              User     @relation(fields: [userId], references: [id])
}
```

## ⚡ Funcionalidades Detalladas

### 🔐 **Sistema de Autenticación**

- **Registro** con email, contraseña y nombre opcional
- **Login** con validación de credenciales
- **JWT tokens** para sesiones seguras
- **Persistencia** en localStorage del navegador
- **Middleware** de autorización en rutas protegidas

### 🧮 **Motor de Cálculo**

- **Tarifas RST actualizadas** según DIAN 2024
- **Cálculo de base gravable** considerando deducciones
- **Validación** de datos de entrada
- **Formateo automático** de números con separadores de miles

### 📊 **Gestión de Historial**

- **Almacenamiento automático** de todos los cálculos
- **Visualización cronológica** (más recientes primero)
- **Filtrado** por usuario autenticado
- **Límite** de 50 cálculos más recientes

### 📄 **Generación de PDFs**

- **Diseño profesional** con branding de la aplicación
- **Información completa** del cálculo realizado
- **Generación client-side** usando jsPDF
- **Descarga automática** con nombre personalizado

## 🔄 Flujo de Aplicación

### 📊 **Calculadora Básica**

```
1. Usuario ingresa → Ventas, actividad, tiempo
2. Validación → Campos requeridos
3. Cálculo local → JavaScript en el navegador
4. Resultado → Visualización inmediata
```

### � **Calculadora Avanzada**

```
1. Autenticación → Login/registro requerido
2. Formulario completo → 6 campos + opciones avanzadas
3. Envío al backend → API con autenticación JWT
4. Cálculo y guardado → Base de datos + respuesta
5. Resultado + opciones → PDF + historial disponibles
```

## 🚀 APIs Disponibles

### 🔐 **Authentication** - `/api/auth`

```javascript
POST /api/auth
{
  "action": "register",
  "email": "usuario@ejemplo.com",
  "password": "123456",
  "name": "Juan Pérez"
}
```

### 🧮 **Calculations** - `/api/calcular`

```javascript
POST /api/calcular
Headers: { Authorization: "Bearer JWT_TOKEN" }
{
  "ventasMensuales": 1800000,
  "tipoActividad": "servicios_personales",
  "tiempoActividad": "4-6_años",
  "deducciones": 100000,
  "gastosDeducibles": 650000
}
```

### 📜 **History** - `/api/historial`

```javascript
GET / api / historial;
Headers: {
  Authorization: "Bearer JWT_TOKEN";
}
```

### 📄 **PDF Generation** - `/api/pdf`

```javascript
POST /api/pdf
Headers: { Authorization: "Bearer JWT_TOKEN" }
{
  "calculationData": { /* datos del cálculo */ }
}
```

3. **API procesa** → Cálculo de impuestos usando tarifas oficiales
4. **Resultado mostrado** → Impuesto a pagar + detalles educativos

## 🇨🇴 Contexto del RST

### ¿Qué es el RST?

El Régimen Simple de Tributación es un sistema simplificado para pequeñas empresas en Colombia que permite:

- Una sola declaración que incluye múltiples impuestos
- Tarifas progresivas según actividad y tiempo de operación
- Simplificación de obligaciones tributarias

### Tipos de Actividad Soportados

- 🛍️ **Venta de productos**
- 👥 **Servicios personales**
- 🚶 **Venta ambulante**
- 🔧 **Otros tipos de actividad**

## 🌐 Despliegue

### Producción

- **Frontend**: Desplegado en Vercel
- **Backend**: Configurable para despliegue en Vercel o similar

## 🚦 Estados de la Aplicación

### ✅ **Completado**

- [x] Sistema de autenticación completo
- [x] Calculadora básica y avanzada
- [x] Base de datos con Prisma
- [x] Generación de PDFs
- [x] Historial de cálculos
- [x] API REST completa
- [x] Interfaz responsive
- [x] Validación de formularios

### 🔄 **En Desarrollo**

- [ ] Dashboard de administración
- [ ] Exportar historial a Excel
- [ ] Notificaciones por email
- [ ] Múltiples idiomas
- [ ] Tema oscuro

### 🎯 **Próximas Funcionalidades**

- [ ] Calculadora para otros regímenes tributarios
- [ ] Comparación entre regímenes
- [ ] Integración con APIs de la DIAN
- [ ] Sistema de alertas fiscales

## 🔧 Configuración de Entorno

### Variables de Entorno (.env)

```bash
# Backend
DATABASE_URL="file:./dev.db"
JWT_SECRET="tu_secreto_jwt_muy_seguro"
NEXTAUTH_SECRET="otro_secreto_para_nextauth"
```

### Desarrollo Local

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar base de datos
cd backend
npx prisma generate
npx prisma db push

# 3. Iniciar en modo desarrollo
cd ..
npm run dev
```

### Producción

```bash
# Build optimizado
npm run build

# Configurar variables de entorno de producción
DATABASE_URL="postgresql://..."
JWT_SECRET="secreto_produccion"
```

## 📊 Estructura de Datos

### Tarifas RST (2024)

```javascript
const tarifasRST = {
  venta_productos: {
    "1-3_años": 1.4,
    "4-6_años": 2.8,
    "7+_años": 4.2,
  },
  servicios_personales: {
    "1-3_años": 1.4,
    "4-6_años": 2.8,
    "7+_años": 4.2,
  },
  venta_ambulante: {
    "1-3_años": 1.0,
    "4-6_años": 2.0,
    "7+_años": 3.0,
  },
  otros: {
    "1-3_años": 1.4,
    "4-6_años": 2.8,
    "7+_años": 4.2,
  },
};
```

## 🌐 Despliegue

### Vercel (Recomendado)

```bash
# Conectar con GitHub y desplegar automáticamente
vercel --prod
```

### Variables de Entorno en Vercel

- `DATABASE_URL` - URL de PostgreSQL
- `JWT_SECRET` - Secreto para JWT
- `NEXTAUTH_SECRET` - Secreto para NextAuth

### URLs de Producción

- **Demo**: [simula-tu-impuesto.vercel.app](https://simula-tu-impuesto.vercel.app)

## 🛠️ Troubleshooting

### Problemas Comunes

#### **Error de CORS**

```bash
# Verificar que el backend esté ejecutándose
npm run dev:backend

# Revisar configuración en next.config.js
```

#### **Error de Base de Datos**

```bash
# Regenerar el cliente Prisma
cd backend
npx prisma generate
npx prisma db push
```

#### **Error de Autenticación**

```bash
# Verificar JWT_SECRET en .env
# Limpiar localStorage del navegador
localStorage.clear()
```

### Logs de Desarrollo

```bash
# Ver logs del backend
cd backend && npm run dev

# Ver logs del frontend
cd frontend && npm run dev
```

## 📚 Recursos Adicionales

### 📖 **Documentación Oficial**

- [DIAN - Régimen Simple](https://www.dian.gov.co/normatividad/Normatividad/Decreto%202550%20de%202022.pdf)
- [React 19 Docs](https://react.dev/)
- [Next.js 15 Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)

### 🎓 **Para Aprender Más**

- **RST en Colombia**: Conoce los requisitos y beneficios
- **React Development**: Mejores prácticas y patrones
- **Next.js Full-Stack**: APIs y deployment
- **Base de Datos**: Modelado con Prisma

## 🤝 Contribución

### Cómo Contribuir

1. **Fork** el repositorio
2. **Crea** una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit** tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/nueva-funcionalidad`)
5. **Abre** un Pull Request

### Guidelines

- Código limpio y comentado
- Tests para nuevas funcionalidades
- Documentación actualizada
- Respeto por la arquitectura existente

### Issues y Bugs

- Reporta bugs usando GitHub Issues
- Incluye pasos para reproducir
- Especifica navegador y versión
- Adjunta screenshots si es necesario

## 📄 Licencia

Este proyecto está bajo la **Licencia MIT** - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Daniel Leal** - [@daniellelooo](https://github.com/daniellelooo)

### 🌟 Agradecimientos

- **DIAN** por la documentación oficial del RST
- **Comunidad React** por las herramientas increíbles
- **Vercel** por el hosting gratuito

---

<div align="center">

### ⭐ **¡Dale una estrella si este proyecto te ayuda!** ⭐

**[🚀 Ver Demo en Vivo](https://simula-tu-impuesto.vercel.app)** | **[📚 Documentación](https://github.com/daniellelooo/simula-tu-impuesto/wiki)** | **[🐛 Reportar Bug](https://github.com/daniellelooo/simula-tu-impuesto/issues)**

---

**Hecho con ❤️ en Colombia 🇨🇴 para emprendedores colombianos**

</div>
