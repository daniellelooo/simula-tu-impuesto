# 📋 Documentación Técnica - Simula tu Impuesto# 📋 Documentación Técnica - Simula tu Impuesto# 📋 Documentación Técnica - Simula tu Impuesto# 📋 Documentación Técnica - Simula tu Impuesto

## 🎯 Descripción General## 🎯 Resumen Ejecutivo## 🎯 Resumen Ejecutivo## 🎯 Resumen Ejecutivo

**Simula tu Impuesto** es una aplicación web fullstack para calcular el Régimen Simple de Tributación (RST) colombiano. Ofrece dos modalidades: calculadora básica (frontend-only) para consultas rápidas y calculadora avanzada con funcionalidades completas que incluyen autenticación, historial y generación de PDFs.**Simula tu Impuesto** es una aplicación web fullstack que permite calcular el Régimen Simple de Tributación (RST) colombiano. Utiliza una arquitectura separada de frontend y backend, ofreciendo cálculos básicos instantáneos y funcionalidades avanzadas con autenticación y persistencia de datos.**Simula tu Impuesto** es una aplicación web fullstack que permite calcular el Régimen Simple de Tributación (RST) colombiano. Utiliza una arquitectura separada de frontend y backend, ofreciendo cálculos básicos instantáneos y funcionalidades avanzadas con autenticación y persistencia de datos.**Simula tu Impuesto** es una aplicación web fullstack que permite calcular el Régimen Simple de Tributación (RST) colombiano. Utiliza una arquitectura separada de frontend y backend, ofreciendo cálculos básicos instantáneos y funcionalidades avanzadas con autenticación y persistencia de datos.

---

## 🏗️ Arquitectura del Sistema## 🏗️ Arquitectura General## 🏗️ Arquitectura General## 🏗️ Arquitectura General

### Stack Tecnológico````La aplicación está dividida en dos partes independientes que se comunican mediante API REST:La aplicación está dividida en dos partes independientes que se comunican mediante API REST:

````┌──────────────────────┐ HTTP/JSON          ┌──────────────────────┐

┌─────────────────┐    HTTP/JSON    ┌─────────────────┐

│    FRONTEND     │ ────────────── │     BACKEND     ││                      │   ──────────────────────►   │                      │```

│  React + Vite   │                │   Next.js API   │

│  Puerto: 5173   │                │   Puerto: 3000  ││   FRONTEND           │                             │   BACKEND            │

└─────────────────┘                └─────────────────┘

         │                                     ││   React + Vite       │   ◄──────────────────────   │   Next.js API        │┌──────────────────────┐          HTTP/JSON          ┌──────────────────────┐┌──────────────────────┐          HTTP/JSON          ┌──────────────────────┐

         │                                     │

    localStorage                        SQLite Database│   Puerto: 5173       │                             │   Puerto: 3000       │

     (JWT Token)                         (Prisma ORM)

```│                      │                             │                      ││                      │   ──────────────────────►   │                      ││                      │   ──────────────────────►   │                      │



### Frontend (React + Vite)└──────────────────────┘                             └──────────────────────┘

- **Framework**: React 19 con Vite como build tool

- **Estilos**: Tailwind CSS con diseño responsivo         │                                                      ││   FRONTEND           │                             │   BACKEND            ││   FRONTEND           │                             │   BACKEND            │

- **Autenticación**: JWT almacenado en localStorage

- **PDFs**: jsPDF + html2canvas para generación local         │                                                      │



### Backend (Next.js)         ▼                                                      ▼│   React + Vite       │   ◄──────────────────────   │   Next.js API        ││   React + Vite       │   ◄──────────────────────   │   Next.js API        │

- **Framework**: Next.js 15 con App Router y TypeScript

- **Base de datos**: SQLite con Prisma ORM  localStorage (JWT)                                    SQLite Database

- **Autenticación**: JWT con bcrypt para contraseñas

- **API**: REST endpoints para cálculos y gestión de datos```│   Puerto: 5173       │                             │   Puerto: 3000       ││   Puerto: 5173       │                             │   Puerto: 3000       │



---



## 📊 Funcionalidades Principales---│                      │                             │                      ││                      │                             │                      │



### 1. Calculadora Básica

- **Ubicación**: Frontend únicamente

- **Características**: ## 🎨 FRONTEND└──────────────────────┘                             └──────────────────────┘└──────────────────────┘                             └──────────────────────┘

  - Cálculos instantáneos sin autenticación

  - Tarifas RST predefinidas (0%, 1%, 2%, 3%)

  - Resultados no persistentes

- **Flujo**: Formulario → Cálculo local → Resultado inmediato### 📦 Stack Tecnológico         │                                                      │         │                                                      │



### 2. Calculadora Avanzada

- **Ubicación**: Frontend + Backend

- **Características**:| Tecnología       | Propósito                              |         │                                                      │         │                                                      │

  - Requiere autenticación

  - Incluye deducciones y gastos deducibles| ---------------- | -------------------------------------- |

  - Historial de cálculos persistente

  - Generación de reportes en PDF| **React 19**     | Librería de interfaz de usuario        |         ▼                                                      ▼         ▼                                                      ▼

- **Flujo**: Autenticación → Formulario → API → Base de datos → Resultado

| **Vite**         | Herramienta de desarrollo rápida       |

### 3. Sistema de Autenticación

- **Registro/Login**: Email + contraseña| **Tailwind CSS** | Framework de estilos                   |  localStorage (JWT)                                    SQLite Database  localStorage (JWT)                                    SQLite Database

- **Seguridad**: Contraseñas hasheadas con bcryptjs

- **Tokens**: JWT con expiración de 7 días| **Lucide React** | Librería de iconos                     |

- **Persistencia**: localStorage en el frontend

| **jsPDF**        | Generación de PDFs                     |```

---

| **html2canvas**  | Captura de elementos HTML como imagen  |

## 🗄️ Modelo de Datos

---

### User (Usuarios)

```typescript**Puerto:** `5173` | **URL:** `http://localhost:5173`

id: string          // ID único

email: string       // Email único## 🎨 FRONTEND## 🎨 FRONTEND

password: string    // Contraseña hasheada

name: string?       // Nombre opcional### 🧩 Componentes Principales

````

### 📦 Stack Tecnológico### 📦 Stack Tecnológico

### Calculation (Cálculos)

```typescript- **App.jsx** - Componente raíz, gestiona autenticación y navegación

id: string              // ID único

userId: string          // Referencia al usuario- **AuthModal.jsx** - Modal de login/registro, maneja tokens JWT| Tecnología | Propósito || Tecnología | Propósito |

ventasMensuales: number // Ventas del mes

tipoActividad: string   // Comercial/Servicios/Manufacturera- **SimpleCalculator.jsx** - Cálculos locales sin autenticación

tiempoActividad: string // <1 año / 1-2 años / >2 años

impuestoMensual: number // Impuesto calculado mensual- **AdvancedCalculator.jsx** - Funcionalidades completas con backend| ---------------- | -------------------------------------- || ---------------- | ------------------------------------- |

impuestoAnual: number   // Impuesto proyectado anual

deducciones?: number    // Deducciones aplicadas

```

### 🎨 Estilos y Comunicación| **React 19** | Librería de interfaz de usuario || **React 19** | Librería de interfaz de usuario |

### ImportedSale (RPA)

````typescript

id: string              // ID único

userId: string          // Usuario propietario- **Tailwind CSS** con diseño responsivo y tema verde| **Vite** | Herramienta de desarrollo rápida || **Vite** | Herramienta de desarrollo rápida |

ventasMensuales: number // Datos importados

fileName: string        // Archivo origen- **HTTP/JSON** para comunicación con backend

processed: boolean      // Estado de procesamiento

```- **JWT Bearer Token** para autenticación| **Tailwind CSS** | Framework de estilos || **Tailwind CSS** | Framework de estilos |



---- **localStorage** para persistencia de sesión



## 🌐 API Endpoints| **Lucide React** | Librería de iconos || **Lucide React** | Librería de iconos |



### POST `/api/auth`---

**Autenticación de usuarios**

- Body: `{ action: "login"|"register", email, password, name? }`| **jsPDF** | Generación de PDFs || **jsPDF** | Generación de PDFs |

- Response: `{ success: boolean, data: { user, token } }`

## ⚙️ BACKEND

### POST `/api/calcular`

**Cálculo de impuestos RST**| **html2canvas** | Captura de elementos HTML como imagen || **html2canvas** | Captura de elementos HTML como imagen |

- Headers: `Authorization: Bearer [token]` (opcional)

- Body: `{ ventasMensuales, tipoActividad, tiempoActividad, deducciones?, ... }`### 📦 Stack Tecnológico

- Response: `{ success: boolean, data: { impuestoMensual, impuestoAnual, ... } }`

**Puerto:** `5173` **Puerto:** `5173`

### GET `/api/historial`

**Obtener historial de cálculos**| Tecnología       | Propósito                           |

- Headers: `Authorization: Bearer [token]` (requerido)

- Response: `{ success: boolean, data: Calculation[] }`| ---------------- | ----------------------------------- |**URL de desarrollo:** `http://localhost:5173`**URL de desarrollo:** `http://localhost:5173`



### POST `/api/pdf`| **Next.js 15**   | Framework para API REST             |

**Generar reporte en PDF**

- Headers: `Authorization: Bearer [token]` (requerido)| **TypeScript**   | Tipado estático                     |### 🧩 Componentes Principales### 🧩 Componentes Principales

- Body: `{ calculationData }`

- Response: `{ success: boolean, data: { htmlContent, filename } }`| **Prisma ORM**   | Manejo de base de datos type-safe   |



---| **SQLite**       | Base de datos (desarrollo)          |#### **App.jsx**#### **App.jsx**



## 🔐 Seguridad| **bcryptjs**     | Encriptación de contraseñas         |



### Autenticación| **jsonwebtoken** | Autenticación JWT                   |- Componente raíz de la aplicación

- **JWT**: Tokens firmados con secret del servidor

- **bcrypt**: Hash de contraseñas con salt rounds = 12

- **Middleware**: Verificación automática de tokens en rutas protegidas

**Puerto:** `3000` | **URL:** `http://localhost:3000`- Gestiona el estado de autenticación (usuario y token JWT)- Componente raíz de la aplicación

### CORS y Headers

- **Origin**: Configurado para frontend en puerto 5173

- **Headers**: Authorization bearer token para APIs autenticadas

- **Credentials**: Habilitado para cookies y headers### 🗄️ Modelos de Base de Datos- Controla qué calculadora mostrar (básica o avanzada)- Gestiona el estado de autenticación (usuario y token JWT)



---



## 🚀 Configuración y Despliegue- **User** - ID, email único, password hasheada, nombre- Maneja la persistencia de sesión mediante localStorage- Controla qué calculadora mostrar (básica o avanzada)



### Variables de Entorno- **Calculation** - Cálculos con ventas, tipo/tiempo actividad, impuestos, deducciones



**Frontend (.env)**- **ImportedSale** - Ventas importadas para RPA con archivo y estado- Maneja la persistencia de sesión mediante localStorage

```bash

VITE_API_BASE_URL=http://localhost:3000

````

### 🔐 Seguridad#### **AuthModal.jsx**

**Backend (.env)**

```bash

DATABASE_URL="file:./dev.db"

JWT_SECRET="secret_super_seguro"- Contraseñas hasheadas con bcryptjs (12 salt rounds)- Modal de login y registro#### **AuthModal.jsx**

```

- Tokens JWT con expiración de 7 días

### Comandos de Desarrollo

````bash- Middleware de autorización para rutas protegidas- Alterna entre modo login y registro

# Instalar dependencias

npm run install:all- CORS configurado para frontend



# Configurar base de datos- Envía credenciales al backend- Modal de login y registro

cd backend && npx prisma generate && npx prisma db push

---

# Desarrollo (ambos servidores)

npm run dev- Almacena el token JWT recibido en localStorage- Alterna entre modo login y registro



# Frontend: http://localhost:5173## 🌐 API ENDPOINTS

# Backend: http://localhost:3000

```- Envía credenciales al backend



### Estructura del Proyecto| Método | Endpoint              | Auth     | Funcionalidad                      |

````

simula-tu-impuesto/| ------ | --------------------- | -------- | ---------------------------------- |#### **SimpleCalculator.jsx**- Almacena el token JWT recibido en localStorage

├── frontend/ # React + Vite

│ ├── src/| POST | `/api/auth` | No | Login/registro de usuarios |

│ │ ├── components/ # SimpleCalculator, AdvancedCalculator, AuthModal

│ │ └── App.jsx # Componente principal| POST | `/api/calcular` | Opcional | Cálculo de impuestos RST |- Calculadora básica que funciona completamente en el navegador

│ └── package.json

├── backend/ # Next.js API| GET | `/api/historial` | Sí | Obtener historial de cálculos |

│ ├── src/app/api/ # Endpoints REST

│ ├── prisma/ # Schema y migraciones| POST | `/api/pdf` | Sí | Generar reporte en PDF |- No requiere autenticación#### **SimpleCalculator.jsx**

│ └── package.json

└── package.json # Scripts del monorepo| POST | `/api/upload-excel` | Sí | Importar ventas (RPA) |

```````

| POST   | `/api/process-batch`  | Sí       | Procesar ventas en lote (RPA)      |- Realiza cálculos instantáneos usando tarifas RST predefinidas

---



## 🎯 Flujos de Usuario

---- Ideal para consultas rápidas sin guardar datos- Calculadora básica que funciona completamente en el navegador

### Usuario Casual

1. Accede a la aplicación

2. Usa calculadora básica

3. Obtiene estimación instantánea## 🔗 COMUNICACIÓN FRONTEND-BACKEND- No requiere autenticación

4. No requiere registro



### Usuario Profesional

1. Se registra/autentica### 📡 Flujo Principal#### **AdvancedCalculator.jsx**- Realiza cálculos instantáneos usando tarifas RST predefinidas

2. Usa calculadora avanzada

3. Incluye deducciones

4. Guarda cálculos en historial

5. Genera reportes en PDF1. **Autenticación:** Usuario → AuthModal → POST /api/auth → Token JWT → localStorage- Calculadora avanzada con funcionalidades completas- Ideal para consultas rápidas sin guardar datos



### Procesamiento Masivo (RPA)2. **Cálculo:** Formulario → POST /api/calcular → Resultado + Guardado en BD

1. Importa archivo Excel/CSV

2. Sistema procesa ventas en lote3. **PDF:** Solicitud → POST /api/pdf → HTML → html2canvas → jsPDF → Descarga- Requiere autenticación

3. Almacena resultados en base de datos



---

### 🔧 Configuración- Permite agregar deducciones y gastos deducibles#### **AdvancedCalculator.jsx**

## 📄 Sistema de PDFs



### Proceso Híbrido

1. **Backend**: Genera HTML estructurado con datos del cálculo**Variables de entorno:**- Guarda cálculos en la base de datos

2. **Frontend**: Renderiza HTML en elemento temporal

3. **html2canvas**: Captura elemento como imagen```bash

4. **jsPDF**: Convierte imagen a documento PDF

5. **Download**: Descarga automática del archivo# Frontend- Muestra historial de cálculos anteriores- Calculadora avanzada con funcionalidades completas



### VentajasVITE_API_BASE_URL=http://localhost:3000

- **Flexibilidad**: Control total del diseño con HTML/CSS

- **Performance**: Sin necesidad de headless browser en servidor- Genera reportes en PDF- Requiere autenticación

- **Compatibilidad**: Funciona en todos los navegadores modernos

# Backend

---

DATABASE_URL="file:./dev.db"- Permite agregar deducciones y gastos deducibles

## 🔄 Comunicación Frontend-Backend

JWT_SECRET="tu_secreto_super_seguro"

### Flujo de Autenticación

``````### 🔄 Comunicación con el Backend- Guarda cálculos en la base de datos

Usuario → AuthModal → POST /api/auth → JWT Token → localStorage

```````

### Flujo de Cálculo---- Muestra historial de cálculos anteriores

```

Formulario → POST /api/calcular + Bearer Token → Resultado + BD

```

## ✨ CARACTERÍSTICAS PRINCIPALESEl frontend se comunica con el backend mediante:- Genera reportes en PDF

### Gestión de Estado

- **React useState**: Estados locales de componentes

- **localStorage**: Persistencia de sesión (user + token)

- **useEffect**: Sincronización automática con backend### 📊 Dos Modos de Cálculo- **Protocolo:** HTTP/JSON### � Comunicación con el Backend

---

## ⚡ Optimizaciones**Básica:** Navegador local, instantánea, sin auth, ideal para consultas rápidas- **Método de autenticación:** JWT Bearer Token en header Authorization

### Frontend

- **Code Splitting**: Separación de bundles para vendor, UI y PDF

- **Lazy Loading**: Componentes cargados bajo demanda**Avanzada:** Backend, con deducciones/gastos, historial, PDFs, uso profesional- **Variable de entorno:** `VITE_API_BASE_URL=http://localhost:3000`El frontend se comunica con el backend mediante:

- **Asset Optimization**: Vite optimiza automáticamente recursos

### Backend

- **Prisma ORM**: Queries type-safe y optimizadas### 📄 Generación de PDFs**Flujo de autenticación:**- **Protocolo:** HTTP/JSON

- **Índices de DB**: Optimización para consultas frecuentes

- **Límites de consulta**: Paginación automática (últimos 50 cálculos)

---Sistema híbrido: Backend genera HTML → Frontend renderiza → html2canvas captura → jsPDF convierte1. Usuario ingresa credenciales en AuthModal- **Método de autenticación:** JWT Bearer Token en header Authorization

## 🎯 Características Destacadas

### Arquitectura Dual### 🤖 Automatización RPA2. Se envía petición POST a `/api/auth`- **Variable de entorno:** `VITE_API_BASE_URL=http://localhost:3000`

- **Básica**: 100% frontend para velocidad máxima

- **Avanzada**: Fullstack para funcionalidades completas

### EscalabilidadIntegración opcional con n8n: importa Excel/CSV → procesa en lote → guarda resultados3. Backend valida y retorna token JWT

- **Monorepo**: Desarrollo unificado con scripts coordinados

- **TypeScript**: Tipado estático para reducir errores

- **Prisma**: ORM type-safe para evolución segura de esquemas

---4. Token se almacena en localStorage**Flujo de autenticación:**

### UX/UI

- **Responsive**: Diseño mobile-first con Tailwind

- **Tema coherente**: Paleta verde (tema fiscal/financiero)

- **Loading states**: Feedback visual en todas las operaciones## 🚀 EJECUCIÓN DEL PROYECTO5. Token se incluye en todas las peticiones autenticadas

---

## 🔮 Consideraciones de Producción### Instalación6. Usuario ingresa credenciales en AuthModal

### Base de Datos```bash

- **Desarrollo**: SQLite local

- **Producción**: PostgreSQL (Vercel Postgres recomendado)# Frontend### 🎨 Estilos2. Se envía petición POST a `/api/auth`

### Deploymentcd frontend && npm install

- **Frontend**: Vercel/Netlify con build automático

- **Backend**: Vercel Serverless Functions3. Backend valida y retorna token JWT

- **Dominio**: Configuración de DNS y SSL automático

# Backend

### Monitoreo

- **Logs**: Next.js built-in loggingcd backend && npm install && npx prisma generate && npx prisma db push**Tailwind CSS** se utiliza para todos los estilos con:4. Token se almacena en localStorage

- **Analytics**: Vercel Analytics para métricas

- **Error Tracking**: Sentry (recomendado para producción)````

---- Diseño responsivo (mobile-first)5. Token se incluye en todas las peticiones autenticadas

## 📚 Tecnologías Clave### Desarrollo

| Tecnología | Versión | Propósito |````bash- Paleta de colores verde (tema fiscal)

|------------|---------|-----------|

| React | 19.x | UI Library |# Terminal 1: Frontend

| Next.js | 15.x | API Framework |

| TypeScript | 5.x | Type Safety |cd frontend && npm run dev # http://localhost:5173- Cards y sombras para jerarquía visual### 🎨 Estilos

| Prisma | 6.x | Database ORM |

| Tailwind | 3.x | CSS Framework |

| Vite | 7.x | Build Tool |

# Terminal 2: Backend- Transiciones suaves para mejor UX

---

cd backend && npm run dev # http://localhost:3000

## ✅ Conclusión

````**Tailwind CSS** se utiliza para todos los estilos con:

**Simula tu Impuesto** combina una arquitectura moderna y escalable con una experiencia de usuario intuitiva. La separación de responsabilidades entre frontend y backend permite flexibilidad en el desarrollo y despliegue, mientras que el sistema dual de cálculos atiende tanto usuarios casuales como profesionales.



La implementación utiliza las mejores prácticas de desarrollo web moderno, incluyendo TypeScript para type safety, Prisma para gestión type-safe de datos, y un sistema de autenticación robusto con JWT.

------

---



*Documentación técnica - Proyecto Simula tu Impuesto*

*Autor: Daniel Leal | Noviembre 2025*## 🎯 CASOS DE USO- Diseño responsivo (mobile-first)



### Usuario Casual## ⚙️ BACKEND- Paleta de colores verde (tema fiscal)

Accede → Calculadora básica → Estimación rápida sin registro

- Cards y sombras para jerarquía visual

### Emprendedor/Contador

Registro → Calculadora avanzada → Historial → Reportes PDF### 📦 Stack Tecnológico- Transiciones suaves para mejor UX



### Procesamiento Masivo| Tecnología | Propósito |---

Archivo Excel/CSV → n8n automatiza → Cálculos en lote → Resultados en BD

| ---------------- | ----------------------------------- |

---

| **Next.js 15** | Framework para API REST |## ⚙️ BACKEND

## 📚 CONCLUSIÓN

| **TypeScript** | Tipado estático |

**Simula tu Impuesto** combina simplicidad (interfaz intuitiva), seguridad (JWT + bcrypt), funcionalidad dual (básica/avanzada), arquitectura escalable (frontend/backend separados) y automatización opcional (RPA con n8n).

| **Prisma ORM** | Manejo de base de datos type-safe |### 📦 Stack Tecnológico

La separación de responsabilidades permite mantenimiento fácil, extensiones futuras y despliegue en plataformas cloud como Vercel.

| **SQLite** | Base de datos (desarrollo) |

---

| **bcryptjs** | Encriptación de contraseñas || Tecnología | Propósito |

*Documentación técnica para exposición del proyecto*

*Autor: Daniel Leal | Noviembre 2025*| **jsonwebtoken** | Autenticación JWT || ---------------- | --------------------------------- |

| **Next.js 15** | Framework para API REST |

**Puerto:** `3000` | **TypeScript** | Tipado estático |

**URL de desarrollo:** `http://localhost:3000`| **Prisma ORM** | Manejo de base de datos type-safe |

| **SQLite** | Base de datos (desarrollo) |

### 🗄️ Base de Datos| **bcryptjs** | Encriptación de contraseñas |

| **jsonwebtoken** | Autenticación JWT |

**Modelos principales:**

**Puerto:** `3000`

#### **User (Usuarios)\*\***URL de desarrollo:\*\* `http://localhost:3000`

- ID único

- Email (único)### 🗄️ Base de Datos

- Password (hasheada con bcrypt)

- Nombre (opcional)**Modelos principales:**

- Fecha de creación

#### **User (Usuarios)**

#### **Calculation (Cálculos)**

- ID único- ID único

- ID del usuario (relación con User)- Email (único)

- Ventas mensuales- Password (hasheada con bcrypt)

- Tipo de actividad- Nombre (opcional)

- Tiempo de actividad- Fecha de creación

- Porcentaje de impuesto aplicado

- Impuesto mensual calculado#### **Calculation (Cálculos)**

- Impuesto anual calculado

- Deducciones (opcional)- ID único

- Ingresos brutos (opcional)- ID del usuario (relación con User)

- Gastos deducibles (opcional)- Ventas mensuales

- Base gravable (opcional)- Tipo de actividad

- Fecha de creación- Tiempo de actividad

- Porcentaje de impuesto aplicado

#### **ImportedSale (Ventas Importadas - RPA)**- Impuesto mensual calculado

- ID único- Impuesto anual calculado

- ID del usuario- Deducciones (opcional)

- Datos de venta (ventas, tipo, tiempo, etc.)- Ingresos brutos (opcional)

- Nombre del archivo- Gastos deducibles (opcional)

- Número de fila- Base gravable (opcional)

- Estado de procesamiento- Fecha de creación

- Fecha de creación

#### **ImportedSale (Ventas Importadas - RPA)**

### 🔐 Seguridad

- ID único

**Sistema de autenticación:**- ID del usuario

- Contraseñas hasheadas con **bcryptjs** (12 salt rounds)- Datos de venta (ventas, tipo, tiempo, etc.)

- Tokens **JWT** con expiración de 7 días- Nombre del archivo

- Middleware de autorización para rutas protegidas- Número de fila

- CORS configurado para el frontend- Estado de procesamiento

- Fecha de creación

### 🌐 Endpoints (API REST)

### 🔐 Seguridad

#### **POST /api/auth**

**Autenticación y registro de usuarios\*\***Sistema de autenticación:\*\*

- **Body:** `{ action: "login" | "register", email, password, name? }`

- **Respuesta:** `{ success: true, data: { user, token } }`- Contraseñas hasheadas con **bcryptjs** (12 salt rounds)

- **Funcionalidad:**- Tokens **JWT** con expiración de 7 días

  - Registro: Valida email único, hashea contraseña, crea usuario, genera token- Middleware de autorización para rutas protegidas

  - Login: Valida credenciales, genera token JWT- CORS configurado para el frontend

#### **POST /api/calcular**### 🌐 Endpoints (API REST)

**Cálculo de impuestos RST**

- **Body:** `{ ventasMensuales, tipoActividad, tiempoActividad, deducciones?, ingresosBrutos?, gastosDeducibles? }`#### **POST /api/auth**

- **Headers:** `Authorization: Bearer [token]` (opcional)

- **Respuesta:** `{ success: true, data: { impuestoMensual, impuestoAnual, porcentajeImpuesto, ... } }`**Autenticación y registro de usuarios**

- **Funcionalidad:**

  - Aplica tarifas RST según tipo y tiempo de actividad- **Body:** `{ action: "login" | "register", email, password, name? }`

  - Calcula base gravable restando deducciones y gastos- **Respuesta:** `{ success: true, data: { user, token } }`

  - Guarda en BD si el usuario está autenticado- **Funcionalidad:**

  - Registro: Valida email único, hashea contraseña, crea usuario, genera token

#### **GET /api/historial** - Login: Valida credenciales, genera token JWT

**Obtener historial de cálculos**

- **Headers:** `Authorization: Bearer [token]` (requerido)#### **POST /api/calcular**

- **Respuesta:** `{ success: true, data: [calculations...] }`

- **Funcionalidad:\*\***Cálculo de impuestos RST\*\*

  - Retorna últimos 50 cálculos del usuario ordenados por fecha

- **Body:** `{ ventasMensuales, tipoActividad, tiempoActividad, deducciones?, ingresosBrutos?, gastosDeducibles? }`

#### **POST /api/pdf**- **Headers:** `Authorization: Bearer [token]` (opcional)

**Generar reporte en PDF**- **Respuesta:** `{ success: true, data: { impuestoMensual, impuestoAnual, porcentajeImpuesto, ... } }`

- **Headers:** `Authorization: Bearer [token]` (requerido)- **Funcionalidad:**

- **Body:** `{ calculationData: {...} }` - Aplica tarifas RST según tipo y tiempo de actividad

- **Respuesta:** `{ success: true, data: { htmlContent, filename } }` - Calcula base gravable restando deducciones y gastos

- **Funcionalidad:** - Guarda en BD si el usuario está autenticado

  - Genera HTML estructurado con los datos del cálculo

  - Frontend renderiza HTML y lo convierte a PDF#### **GET /api/historial**

#### **POST /api/upload-excel** (RPA)**Obtener historial de cálculos**

**Importar ventas desde Excel/CSV**

- **Headers:** `Authorization: Bearer [token]` (requerido)- **Headers:** `Authorization: Bearer [token]` (requerido)

- **Body:** `{ rows: [{ventasMensuales, tipoActividad, ...}] }`- **Respuesta:** `{ success: true, data: [calculations...] }`

- **Respuesta:** `{ success: true, data: { totalRows, savedRows } }`- **Funcionalidad:**

  - Retorna últimos 50 cálculos del usuario ordenados por fecha

#### **POST /api/process-batch** (RPA)

**Procesar ventas importadas en lote**#### **POST /api/pdf**

- **Headers:** `Authorization: Bearer [token]` (requerido)

- **Respuesta:** `{ success: true, data: { totalProcessed, results: [...] } }`**Generar reporte en PDF**

---- **Headers:** `Authorization: Bearer [token]` (requerido)

- **Body:** `{ calculationData: {...} }`

## 🔗 COMUNICACIÓN FRONTEND-BACKEND- **Respuesta:** `{ success: true, data: { htmlContent, filename } }`

- **Funcionalidad:**

### 📡 Flujo de Datos - Genera HTML estructurado con los datos del cálculo

- Frontend renderiza HTML y lo convierte a PDF

**Autenticación:**

1. Usuario ingresa credenciales → Frontend#### **POST /api/upload-excel** (RPA)

2. Frontend envía `POST /api/auth` → Backend

3. Backend valida y genera token JWT → Frontend**Importar ventas desde Excel/CSV**

4. Frontend guarda token en localStorage

5. Token se incluye en todas las peticiones autenticadas- **Headers:** `Authorization: Bearer [token]` (requerido)

- **Body:** `{ rows: [{ventasMensuales, tipoActividad, ...}] }`

**Cálculo de Impuestos:**- **Respuesta:** `{ success: true, data: { totalRows, savedRows } }`

1. Usuario completa formulario → Frontend

2. Frontend envía `POST /api/calcular` con token → Backend#### **POST /api/process-batch** (RPA)

3. Backend calcula impuestos y guarda en BD

4. Backend retorna resultado → Frontend**Procesar ventas importadas en lote**

5. Frontend muestra resultado y actualiza historial

- **Headers:** `Authorization: Bearer [token]` (requerido)

**Generación de PDF:**- **Respuesta:** `{ success: true, data: { totalProcessed, results: [...] } }`

1. Usuario solicita PDF → Frontend

2. Frontend envía `POST /api/pdf` con datos → Backend---

3. Backend genera HTML estructurado → Frontend

4. Frontend renderiza HTML, lo captura con html2canvas## 🔗 CONEXIÓN FRONTEND-BACKEND

5. Frontend convierte imagen a PDF con jsPDF

6. Descarga automática del archivo### 📡 Protocolos de Comunicación

### 🔧 Configuración#### **1. Autenticación Flow**

**Variables de entorno necesarias:**```mermaid

sequenceDiagram

**Frontend (.env):** participant F as Frontend

```participant B as Backend

VITE_API_BASE_URL=http://localhost:3000    participant DB as Database

````

    F->>B: POST /api/auth {email, password, action}

**Backend (.env):** B->>DB: SELECT user WHERE email

````DB-->>B: User data or null

DATABASE_URL="file:./dev.db"    B->>B: bcrypt.compare(password, hash)

JWT_SECRET="tu_secreto_super_seguro"    B->>B: jwt.sign({userId}, secret)

```    B-->>F: {success: true, user, token}

    F->>F: localStorage.setItem('token', token)

**CORS:** El backend está configurado para aceptar peticiones del frontend en puerto 5173 con headers de autenticación.```



---#### **2. Cálculo Avanzado Flow**



## ✨ CARACTERÍSTICAS PRINCIPALES```mermaid

sequenceDiagram

### 📊 Dos Modos de Cálculo    participant F as Frontend

    participant B as Backend

**Calculadora Básica:**    participant DB as Database

- Funciona completamente en el navegador

- Resultados instantáneos    F->>B: POST /api/calcular + Bearer Token

- No requiere autenticación    B->>B: verifyToken(authorization)

- Los datos no salen del navegador    B->>B: calculateRST(formData)

- Ideal para consultas rápidas    B->>DB: INSERT calculation

    DB-->>B: Calculation saved

**Calculadora Avanzada:**    B-->>F: {success: true, data: result}

- Requiere registro y autenticación    F->>F: setResultado(data)

- Incluye deducciones y gastos deducibles```

- Guarda cálculos en base de datos

- Muestra historial de cálculos anteriores### 🔄 Estado y Sincronización

- Genera reportes en PDF

- Ideal para uso profesional#### **Estado del Frontend:**



### 📄 Sistema de PDFs```javascript

// Flujo de estados en App.jsx

El sistema combina backend y frontend:const [user, setUser] = useState(null); // Usuario autenticado

- Backend genera HTML con los datos del cálculoconst [token, setToken] = useState(null); // JWT token

- Frontend renderiza ese HTML temporalmenteconst [useAdvanced, setUseAdvanced] = useState(false); // Modo de calculadora

- html2canvas captura el HTML como imagen

- jsPDF convierte la imagen a PDF// Persistencia automática

- El usuario descarga el archivo automáticamenteuseEffect(() => {

  const savedToken = localStorage.getItem("token");

### 🤖 Automatización RPA (Opcional)  const savedUser = localStorage.getItem("user");



Integración con n8n para procesar archivos Excel/CSV:  if (savedToken && savedUser) {

- Importar múltiples ventas desde archivos    setToken(savedToken);

- Procesar cálculos en lote    setUser(JSON.parse(savedUser));

- Almacenar resultados en base de datos  }

}, []);

---```



## 🚀 EJECUCIÓN DEL PROYECTO#### **Sincronización de Datos:**



### Instalación```javascript

// Patrón de sincronización usado en AdvancedCalculator

```bashuseEffect(() => {

# Instalar dependencias del frontend  if (token) {

cd frontend    obtenerHistorial(); // Cargar historial automáticamente

npm install  }

}, [token, obtenerHistorial]);

# Instalar dependencias del backend

cd ../backend// Invalidación automática tras nuevos cálculos

npm installconst calcularImpuestos = async () => {

  // ... cálculo

# Configurar base de datos  if (data.success) {

npx prisma generate    setResultado(data.data);

npx prisma db push    obtenerHistorial(); // Refrescar historial

```  }

};

### Desarrollo```



```bash### 🌐 Configuración de Environment

# Terminal 1: Frontend

cd frontend#### **Variables de Entorno:**

npm run dev

# Abre http://localhost:5173```bash

# Frontend (.env)

# Terminal 2: BackendVITE_API_BASE_URL=http://localhost:3000

cd backend

npm run dev# Backend (.env)

# API en http://localhost:3000DATABASE_URL="file:./dev.db"

```JWT_SECRET="secret_super_seguro_para_desarrollo"

````

### Producción

#### **Configuración de CORS:**

````bash

# Build frontend```javascript

cd frontend// backend/next.config.js

npm run buildconst nextConfig = {

  async headers() {

# Build backend    return [

cd backend      {

npm run build        source: "/api/:path*",

npm start        headers: [

```          { key: "Access-Control-Allow-Credentials", value: "true" },

          { key: "Access-Control-Allow-Origin", value: "*" },

---          {

            key: "Access-Control-Allow-Methods",

## 🎯 CASOS DE USO            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",

          },

### Usuario Casual          {

1. Accede a la aplicación            key: "Access-Control-Allow-Headers",

2. Usa calculadora básica            value:

3. Obtiene estimación rápida sin registro              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",

          },

### Emprendedor/Contador        ],

1. Se registra en la plataforma      },

2. Usa calculadora avanzada con deducciones    ];

3. Guarda múltiples cálculos  },

4. Descarga reportes en PDF};

5. Consulta historial cuando necesite```



### Procesamiento Masivo (RPA)---

1. Prepara archivo Excel/CSV con ventas

2. n8n lee el archivo automáticamente## 🚀 CARACTERÍSTICAS AVANZADAS

3. Datos se importan al backend

4. Sistema procesa todos los cálculos en lote### 📊 Sistema de Cálculo Dual

5. Resultados disponibles en historial

#### **Cálculo Básico (Frontend)**

---

- **Velocidad**: Resultados instantáneos

## 📚 CONCLUSIÓN- **Privacidad**: Sin envío de datos

- **Offline**: Funciona sin conexión

**Simula tu Impuesto** es una aplicación moderna que combina:- **Limitaciones**: Solo cálculos simples

- **Simplicidad:** Interfaz intuitiva con Tailwind CSS

- **Seguridad:** Autenticación JWT y contraseñas encriptadas#### **Cálculo Avanzado (Backend)**

- **Funcionalidad:** Dos modos de cálculo para diferentes necesidades

- **Escalabilidad:** Arquitectura separada frontend/backend- **Precisión**: Considera deducciones y gastos

- **Automatización:** Integración RPA opcional con n8n- **Persistencia**: Guarda en base de datos

- **Historial**: Tracking completo

La arquitectura permite que la aplicación sea fácil de mantener, extender y desplegar en plataformas cloud como Vercel.- **PDFs**: Generación de reportes



---### 📄 Generación de PDFs



*Documentación técnica generada para la exposición del proyecto **Simula tu Impuesto***  #### **Proceso Híbrido:**

*Autor: Daniel Leal | Fecha: Noviembre 2025*

1. **Backend**: Genera HTML estructurado
2. **Frontend**: Renderiza HTML en DOM temporal
3. **html2canvas**: Captura como imagen
4. **jsPDF**: Convierte a documento PDF
5. **Download**: Descarga automática

#### **Ventajas de este enfoque:**

- **Flexibilidad**: HTML/CSS para diseño
- **Performance**: No requiere headless browser en servidor
- **Customización**: Control total del layout
- **Compatibilidad**: Funciona en todos los navegadores

### 🔐 Seguridad Multi-Capa

#### **Frontend:**

- Validación de formularios
- Sanitización de inputs
- Manejo seguro de tokens
- HTTPS only en producción

#### **Backend:**

- Hash de contraseñas con bcrypt
- JWT con expiración
- Validación de tipos TypeScript
- Rate limiting (futuro)

#### **Base de Datos:**

- Constraints y validaciones
- Índices únicos
- Relaciones con CASCADE
- Backup automático (producción)

---

## 📈 MÉTRICAS Y RENDIMIENTO

### ⚡ Performance Frontend

#### **Bundle Size Optimization:**

```javascript
// vite.config.js - Code splitting
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          ui: ["lucide-react"],
          pdf: ["jspdf", "html2canvas"],
        },
      },
    },
  },
});
````

#### **Lazy Loading:**

```javascript
// Componentes cargados dinámicamente
const AdvancedCalculator = lazy(() =>
  import("./components/AdvancedCalculator")
);

// Suspense boundary
<Suspense fallback={<div>Cargando...</div>}>
  <AdvancedCalculator />
</Suspense>;
```

### 🗄️ Performance Backend

#### **Database Optimization:**

```prisma
// Índices para consultas frecuentes
model User {
  email String @unique // Índice automático
  @@index([createdAt]) // Índice manual
}

model Calculation {
  userId String
  createdAt DateTime @default(now())
  @@index([userId, createdAt]) // Índice compuesto
}
```

#### **Query Optimization:**

```typescript
// Consultas eficientes con Prisma
const calculations = await prisma.calculation.findMany({
  where: { userId: authUser.userId },
  select: {
    id: true,
    impuestoMensual: true,
    tipoActividad: true,
    createdAt: true,
    // Solo campos necesarios
  },
  orderBy: { createdAt: "desc" },
  take: 50, // Límite de resultados
});
```

---

## 🔄 FLUJOS DE DESARROLLO

### 🛠️ Scripts de Desarrollo

```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev:frontend\" \"npm run dev:backend\"",
    "dev:frontend": "cd frontend && npm run dev",
    "dev:backend": "cd backend && npm run dev",
    "build": "npm run build:frontend && npm run build:backend",
    "build:frontend": "cd frontend && npm run build",
    "build:backend": "cd backend && npm run build"
  }
}
```

### 🚀 Proceso de Despliegue

#### **Development:**

1. `npm install` - Instalar dependencias
2. `npx prisma generate` - Generar cliente Prisma
3. `npx prisma db push` - Sincronizar esquema
4. `npm run dev` - Iniciar servidores

#### **Production (Vercel):**

1. **Frontend**: Build automático con Vite
2. **Backend**: Deployment como Serverless Functions
3. **Database**: PostgreSQL en Vercel Postgres
4. **Environment**: Variables seguras en dashboard

---

## 🎯 CASOS DE USO PRINCIPALES

### 👨‍💼 Emprendedor Casual

1. Accede sin registro
2. Usa calculadora básica
3. Obtiene estimación rápida
4. Entiende beneficios del RST

### 👩‍💼 Empresario Formal

1. Se registra en la plataforma
2. Usa calculadora avanzada
3. Incluye deducciones y gastos
4. Descarga reportes en PDF
5. Consulta historial de cálculos

### 🧮 Contador Profesional

1. Gestiona múltiples clientes
2. Genera reportes profesionales
3. Mantiene historial detallado
4. Usa datos para asesorías

---

## 🔮 ROADMAP FUTURO

### 🎯 Corto Plazo (1-2 meses)

- [ ] Dashboard de administración
- [ ] Exportar historial a Excel
- [ ] Notificaciones por email
- [ ] API rate limiting

### 🚀 Mediano Plazo (3-6 meses)

- [ ] Múltiples idiomas (i18n)
- [ ] Tema oscuro
- [ ] PWA (Progressive Web App)
- [ ] Integración con APIs de DIAN

### 🌟 Largo Plazo (6+ meses)

- [ ] Calculadora para otros regímenes
- [ ] Comparación entre regímenes
- [ ] Sistema de alertas fiscales
- [ ] Mobile app nativa

---

## 📚 RECURSOS TÉCNICOS

### 📖 Documentación

- [React 19 Docs](https://react.dev/)
- [Next.js 15 App Router](https://nextjs.org/docs)
- [Prisma ORM Guide](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

### 🛠️ Herramientas de Desarrollo

- **IDE**: VS Code con extensiones React/TypeScript
- **Database**: Prisma Studio para visualización
- **API Testing**: Thunder Client o Postman
- **Version Control**: Git con GitHub

### 🔍 Debugging y Monitoreo

- **Frontend**: React DevTools, Vite HMR
- **Backend**: Next.js built-in debugging
- **Database**: Prisma query logging
- **Production**: Vercel Analytics

---

## ✅ CONCLUSIONES TÉCNICAS

### 🎯 Fortalezas de la Arquitectura

1. **Monorepo**: Simplifica desarrollo y deployment
2. **TypeScript**: Reduce bugs y mejora DX
3. **Prisma**: Type-safe database access
4. **Modern Stack**: React 19 + Next.js 15
5. **Responsive**: Funciona en todos los dispositivos

### 🚀 Innovaciones Implementadas

1. **Dual Calculator**: Básica (local) + Avanzada (servidor)
2. **Hybrid PDF**: Backend HTML + Frontend rendering
3. **Smart Auth**: JWT con localStorage persistence
4. **Environment Variables**: Configuración flexible
5. **CORS Handling**: Cross-origin requests seguros

### 📊 Impacto del Proyecto

- **Educativo**: Democratiza conocimiento fiscal
- **Práctico**: Herramienta real para emprendedores
- **Técnico**: Demostración de arquitectura moderna
- **Escalable**: Base para funcionalidades futuras

---

\*Documentación técnica generada para la exposición del proyecto **Simula tu Impuesto\***  
_Autor: Daniel Leal | Fecha: Septiembre 2025_
