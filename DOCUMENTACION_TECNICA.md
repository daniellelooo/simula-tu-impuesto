# 📋 Documentación Técnica - Simula tu Impuesto# 📋 Documentación Técnica - Simula tu Impuesto



## 🎯 Resumen Ejecutivo## 🎯 Resumen Ejecutivo



**Simula tu Impuesto** es una aplicación web fullstack que permite calcular el Régimen Simple de Tributación (RST) colombiano. Utiliza una arquitectura separada de frontend y backend, ofreciendo cálculos básicos instantáneos y funcionalidades avanzadas con autenticación y persistencia de datos.**Simula tu Impuesto** es una aplicación web fullstack que permite calcular el Régimen Simple de Tributación (RST) colombiano. Utiliza una arquitectura separada de frontend y backend, ofreciendo cálculos básicos instantáneos y funcionalidades avanzadas con autenticación y persistencia de datos.



------



## 🏗️ Arquitectura General## 🏗️ Arquitectura General



La aplicación está dividida en dos partes independientes que se comunican mediante API REST:La aplicación está dividida en dos partes independientes que se comunican mediante API REST:



``````

┌──────────────────────┐          HTTP/JSON          ┌──────────────────────┐┌──────────────────────┐          HTTP/JSON          ┌──────────────────────┐

│                      │   ──────────────────────►   │                      ││                      │   ──────────────────────►   │                      │

│   FRONTEND           │                             │   BACKEND            ││   FRONTEND           │                             │   BACKEND            │

│   React + Vite       │   ◄──────────────────────   │   Next.js API        ││   React + Vite       │   ◄──────────────────────   │   Next.js API        │

│   Puerto: 5173       │                             │   Puerto: 3000       ││   Puerto: 5173       │                             │   Puerto: 3000       │

│                      │                             │                      ││                      │                             │                      │

└──────────────────────┘                             └──────────────────────┘└──────────────────────┘                             └──────────────────────┘

         │                                                      │         │                                                      │

         │                                                      │         │                                                      │

         ▼                                                      ▼         ▼                                                      ▼

  localStorage (JWT)                                    SQLite Database  localStorage (JWT)                                    SQLite Database

``````



------



## 🎨 FRONTEND## 🎨 FRONTEND



### 📦 Stack Tecnológico### 📦 Stack Tecnológico



| Tecnología       | Propósito                              || Tecnología       | Propósito                             |

| ---------------- | -------------------------------------- || ---------------- | ------------------------------------- |

| **React 19**     | Librería de interfaz de usuario        || **React 19**     | Librería de interfaz de usuario       |

| **Vite**         | Herramienta de desarrollo rápida       || **Vite**         | Herramienta de desarrollo rápida      |

| **Tailwind CSS** | Framework de estilos                   || **Tailwind CSS** | Framework de estilos                  |

| **Lucide React** | Librería de iconos                     || **Lucide React** | Librería de iconos                    |

| **jsPDF**        | Generación de PDFs                     || **jsPDF**        | Generación de PDFs                    |

| **html2canvas**  | Captura de elementos HTML como imagen  || **html2canvas**  | Captura de elementos HTML como imagen |



**Puerto:** `5173`  **Puerto:** `5173`  

**URL de desarrollo:** `http://localhost:5173`**URL de desarrollo:** `http://localhost:5173`



### 🧩 Componentes Principales### 🧩 Componentes Principales



#### **App.jsx**#### **App.jsx**

- Componente raíz de la aplicación

- Gestiona el estado de autenticación (usuario y token JWT)- Componente raíz de la aplicación

- Controla qué calculadora mostrar (básica o avanzada)- Gestiona el estado de autenticación (usuario y token JWT)

- Maneja la persistencia de sesión mediante localStorage- Controla qué calculadora mostrar (básica o avanzada)

- Maneja la persistencia de sesión mediante localStorage

#### **AuthModal.jsx**

- Modal de login y registro#### **AuthModal.jsx**

- Alterna entre modo login y registro

- Envía credenciales al backend- Modal de login y registro

- Almacena el token JWT recibido en localStorage- Alterna entre modo login y registro

- Envía credenciales al backend

#### **SimpleCalculator.jsx**- Almacena el token JWT recibido en localStorage

- Calculadora básica que funciona completamente en el navegador

- No requiere autenticación#### **SimpleCalculator.jsx**

- Realiza cálculos instantáneos usando tarifas RST predefinidas

- Ideal para consultas rápidas sin guardar datos- Calculadora básica que funciona completamente en el navegador

- No requiere autenticación

#### **AdvancedCalculator.jsx**- Realiza cálculos instantáneos usando tarifas RST predefinidas

- Calculadora avanzada con funcionalidades completas- Ideal para consultas rápidas sin guardar datos

- Requiere autenticación

- Permite agregar deducciones y gastos deducibles#### **AdvancedCalculator.jsx**

- Guarda cálculos en la base de datos

- Muestra historial de cálculos anteriores- Calculadora avanzada con funcionalidades completas

- Genera reportes en PDF- Requiere autenticación

- Permite agregar deducciones y gastos deducibles

### 🔄 Comunicación con el Backend- Guarda cálculos en la base de datos

- Muestra historial de cálculos anteriores

El frontend se comunica con el backend mediante:- Genera reportes en PDF



- **Protocolo:** HTTP/JSON### � Comunicación con el Backend

- **Método de autenticación:** JWT Bearer Token en header Authorization

- **Variable de entorno:** `VITE_API_BASE_URL=http://localhost:3000`El frontend se comunica con el backend mediante:



**Flujo de autenticación:**- **Protocolo:** HTTP/JSON

1. Usuario ingresa credenciales en AuthModal- **Método de autenticación:** JWT Bearer Token en header Authorization

2. Se envía petición POST a `/api/auth`- **Variable de entorno:** `VITE_API_BASE_URL=http://localhost:3000`

3. Backend valida y retorna token JWT

4. Token se almacena en localStorage**Flujo de autenticación:**

5. Token se incluye en todas las peticiones autenticadas

1. Usuario ingresa credenciales en AuthModal

### 🎨 Estilos2. Se envía petición POST a `/api/auth`

3. Backend valida y retorna token JWT

**Tailwind CSS** se utiliza para todos los estilos con:4. Token se almacena en localStorage

- Diseño responsivo (mobile-first)5. Token se incluye en todas las peticiones autenticadas

- Paleta de colores verde (tema fiscal)

- Cards y sombras para jerarquía visual### 🎨 Estilos

- Transiciones suaves para mejor UX

**Tailwind CSS** se utiliza para todos los estilos con:

---

- Diseño responsivo (mobile-first)

## ⚙️ BACKEND- Paleta de colores verde (tema fiscal)

- Cards y sombras para jerarquía visual

### 📦 Stack Tecnológico- Transiciones suaves para mejor UX



| Tecnología       | Propósito                           |---

| ---------------- | ----------------------------------- |

| **Next.js 15**   | Framework para API REST             |## ⚙️ BACKEND

| **TypeScript**   | Tipado estático                     |

| **Prisma ORM**   | Manejo de base de datos type-safe   |### 📦 Stack Tecnológico

| **SQLite**       | Base de datos (desarrollo)          |

| **bcryptjs**     | Encriptación de contraseñas         || Tecnología       | Propósito                         |

| **jsonwebtoken** | Autenticación JWT                   || ---------------- | --------------------------------- |

| **Next.js 15**   | Framework para API REST           |

**Puerto:** `3000`  | **TypeScript**   | Tipado estático                   |

**URL de desarrollo:** `http://localhost:3000`| **Prisma ORM**   | Manejo de base de datos type-safe |

| **SQLite**       | Base de datos (desarrollo)        |

### 🗄️ Base de Datos| **bcryptjs**     | Encriptación de contraseñas       |

| **jsonwebtoken** | Autenticación JWT                 |

**Modelos principales:**

**Puerto:** `3000`  

#### **User (Usuarios)****URL de desarrollo:** `http://localhost:3000`

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

**Autenticación y registro de usuarios****Sistema de autenticación:**

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

#### **GET /api/historial**  - Login: Valida credenciales, genera token JWT

**Obtener historial de cálculos**

- **Headers:** `Authorization: Bearer [token]` (requerido)#### **POST /api/calcular**

- **Respuesta:** `{ success: true, data: [calculations...] }`

- **Funcionalidad:****Cálculo de impuestos RST**

  - Retorna últimos 50 cálculos del usuario ordenados por fecha

- **Body:** `{ ventasMensuales, tipoActividad, tiempoActividad, deducciones?, ingresosBrutos?, gastosDeducibles? }`

#### **POST /api/pdf**- **Headers:** `Authorization: Bearer [token]` (opcional)

**Generar reporte en PDF**- **Respuesta:** `{ success: true, data: { impuestoMensual, impuestoAnual, porcentajeImpuesto, ... } }`

- **Headers:** `Authorization: Bearer [token]` (requerido)- **Funcionalidad:**

- **Body:** `{ calculationData: {...} }`  - Aplica tarifas RST según tipo y tiempo de actividad

- **Respuesta:** `{ success: true, data: { htmlContent, filename } }`  - Calcula base gravable restando deducciones y gastos

- **Funcionalidad:**  - Guarda en BD si el usuario está autenticado

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

### 📡 Flujo de Datos  - Genera HTML estructurado con los datos del cálculo

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

**Frontend (.env):**    participant F as Frontend

```    participant B as Backend

VITE_API_BASE_URL=http://localhost:3000    participant DB as Database

```

    F->>B: POST /api/auth {email, password, action}

**Backend (.env):**    B->>DB: SELECT user WHERE email

```    DB-->>B: User data or null

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

```

### Producción

#### **Configuración de CORS:**

```bash

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
```

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
