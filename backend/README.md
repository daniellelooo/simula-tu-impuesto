# 📋 SimulaTuImpuesto - Documentación Completa

## 🎯 Descripción General del Proyecto

**SimulaTuImpuesto** es una aplicación web que ayuda a emprendedores colombianos a calcular cuánto pagarían en impuestos si formalizan su negocio bajo el Régimen Simple de Tributación (RST). La aplicación combina una calculadora interactiva con contenido educativo para desmitificar la formalización empresarial.

## 🚀 Inicio Rápido

### Instalación y Ejecución

```bash
# Clonar el repositorio
git clone <repository-url>
cd simula-tu-impuesto-backend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# El servidor estará disponible en http://localhost:3000
```

### Scripts Disponibles

```bash
npm run dev    # Servidor de desarrollo
npm run build  # Build de producción
npm run start  # Servidor de producción
npm run lint   # Linting del código
```

---

# 🖥️ Documentación Backend

## 🏗️ Arquitectura Backend

### Stack Tecnológico

- **Next.js 15.4.7** - Framework full-stack de React con API Routes
- **Node.js** - Runtime de JavaScript
- **TypeScript 5** - Tipado estático (configurado)
- **ESLint** - Linting y calidad de código

### Estructura del Proyecto Backend

```
src/
└── app/
    └── api/
        └── calcular/
            └── route.js     # API Route para cálculo de impuestos
next.config.ts              # Configuración de Next.js y CORS
package.json                # Dependencias y scripts
tsconfig.json              # Configuración de TypeScript
eslint.config.mjs          # Configuración de ESLint
```

## 🌐 Configuración CORS

El backend está configurado para permitir requests desde cualquier origen:

```typescript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type" },
        ],
      },
    ];
  },
};
```

## 🧮 API Endpoint: `/api/calcular`

### Métodos Soportados

#### `OPTIONS /api/calcular`

**Descripción:** Maneja las preflight requests de CORS  
**Status:** `200 OK`

#### `POST /api/calcular`

**Descripción:** Calcula el impuesto mensual basado en el RST colombiano

**Request Body:**

```json
{
  "ingresos": 800000,
  "tipoActividad": "venta-productos",
  "tiempoNegocio": "1-3-anos"
}
```

**Response Exitosa (200):**

```json
{
  "ingresosMensuales": 800000,
  "impuestoMensual": 9600,
  "tarifa": 1.5,
  "tipoActividad": "venta-productos",
  "tiempoNegocio": "1-3-anos"
}
```

**Response de Error (400):**

```json
{
  "error": "Faltan datos para calcular"
}
```

## 📊 Lógica de Cálculo de Impuestos

### Tarifas Base por Tipo de Actividad

```javascript
const tarifasPorActividad = {
  "venta-productos": 1.5, // 1.5%
  "servicios-personales": 2.0, // 2.0%
  "venta-ambulante": 1.0, // 1.0%
  otro: 1.2, // 1.2%
};
```

### Factor de Ajuste por Tiempo del Negocio

```javascript
const factoresPorTiempo = {
  "menos-1-ano": 0.5, // 50% de descuento
  "1-3-anos": 0.8, // 20% de descuento
  "3-5-anos": 1.0, // Sin descuento
  "mas-5-anos": 1.2, // 20% de incremento
};
```

### Fórmula de Cálculo

```javascript
const impuestoMensual = (ingresos * tarifa * factorTiempo) / 100;
```

**Ejemplo de Cálculo:**

- Ingresos: $800,000 COP
- Actividad: "venta-productos" → Tarifa: 1.5%
- Tiempo: "1-3-anos" → Factor: 0.8
- Cálculo: (800,000 × 1.5 × 0.8) ÷ 100 = $9,600 COP

## 🛡️ Manejo de Errores

### Validación de Entrada

```javascript
if (!ingresos || !tipoActividad || !tiempoNegocio) {
  return new Response(JSON.stringify({ error: "Faltan datos para calcular" }), {
    status: 400,
    headers: { "Content-Type": "application/json" },
  });
}
```

### Tipos de Error

- **400 Bad Request:** Parámetros requeridos faltantes o nulos
- **Mensaje:** "Faltan datos para calcular"

## 📋 Tipos de Datos Válidos

### Tipos de Actividad

- `"venta-productos"` - Venta de productos físicos
- `"servicios-personales"` - Servicios profesionales/personales
- `"venta-ambulante"` - Comercio ambulante
- `"otro"` - Otras actividades

### Rangos de Tiempo

- `"menos-1-ano"` - Menos de 1 año
- `"1-3-anos"` - Entre 1 y 3 años
- `"3-5-anos"` - Entre 3 y 5 años
- `"mas-5-anos"` - Más de 5 años

---

# 🎨 Documentación Frontend

## 🏗️ Arquitectura Frontend

### Stack Tecnológico

- **React 19.1.1** - Biblioteca principal de UI
- **Vite 7.1.2** - Build tool y servidor de desarrollo
- **Tailwind CSS 3.4.17** - Framework de estilos utilitarios
- **Lucide React 0.540.0** - Biblioteca de iconos
- **ESLint** - Linting y calidad de código

### Estructura del Proyecto Frontend

```
src/
├── App.jsx           # Componente principal con toda la lógica
├── main.jsx          # Punto de entrada de React
├── index.css         # Estilos globales y componentes de Tailwind
└── assets/           # Recursos estáticos
```

## 🧮 Funcionalidad Principal: Calculadora RST

### Estado de la Aplicación

```javascript
const [ingresos, setIngresos] = useState("");
const [tipoActividad, setTipoActividad] = useState("venta-productos");
const [tiempoNegocio, setTiempoNegocio] = useState("1-3-anos");
const [resultado, setResultado] = useState(null);
const [mostrarEducativo, setMostrarEducativo] = useState(false);
```

### Tipos de Actividad Soportados (Frontend)

1. **"venta-productos"** - Venta de productos
2. **"servicios-personales"** - Servicios personales
3. **"venta-ambulante"** - Venta ambulante
4. **"otro"** - Otros tipos de actividad

### Rangos de Tiempo del Negocio (Frontend)

1. **"1-3-anos"** - Entre 1 y 3 años
2. **"4-6-anos"** - Entre 4 y 6 años
3. **"7-mas-anos"** - 7 años o más

## 🔗 Integración Frontend-Backend

### Configuración de API

```javascript
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
```

### Función de Cálculo Frontend

```javascript
const calcularImpuestos = async () => {
  const ingresosMensuales = parseFloat(ingresos.replace(/[^\d]/g, ""));

  if (!ingresosMensuales || ingresosMensuales <= 0) return;

  try {
    const res = await fetch(`http://localhost:3000/api/calcular`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ingresos: ingresosMensuales,
        tipoActividad,
        tiempoNegocio,
      }),
    });

    if (!res.ok) {
      throw new Error("Error en el servidor");
    }

    const data = await res.json();
    setResultado(data);
  } catch (err) {
    console.error(err);
    alert(
      "No se pudo calcular el impuesto. Verifica que el backend esté corriendo."
    );
  }
};
```

## 💰 Funciones de Utilidad

### Formateo de Moneda

```javascript
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(amount);
};
```

### Formateo de Input de Ingresos

```javascript
const handleIngresosChange = (e) => {
  const value = e.target.value.replace(/[^\d]/g, "");
  const formatted = new Intl.NumberFormat("es-CO").format(value);
  setIngresos(formatted);
};
```

## 🎨 Componentes de UI

### Formulario Principal

1. **Campo de Ingresos**

   - Input con formato de moneda en tiempo real
   - Placeholder: "800.000"
   - Validación: Solo números positivos

2. **Selector de Actividad**

   - Radio buttons con 4 opciones
   - Diseño tipo tarjeta con hover effects

3. **Selector de Tiempo**

   - Dropdown con 3 opciones de tiempo

4. **Botón de Cálculo**
   - Deshabilitado si no hay ingresos
   - Texto: "🧮 Simular Impuestos"

### Sección de Resultados

```javascript
<div className="text-center bg-gradient-to-br from-green-50 to-green-100">
  <div className="text-5xl font-bold text-green-600">
    {formatCurrency(resultado.impuestoMensual)}
  </div>
  <div className="text-lg text-gray-700">al mes</div>
  <div className="text-sm text-gray-500">
    Régimen sugerido: RST ({resultado.tarifa}%)
  </div>
</div>
```

## 📚 Sección Educativa

### Modales Informativos

1. **"rst"** - ¿Qué es RST?
2. **"beneficios"** - Beneficios de formalizarse
3. **"mitos"** - Mitos sobre impuestos

## 🎨 Sistema de Diseño

### Colores Principales

- **Verde:** `green-600`, `green-700` (botones principales)
- **Azul:** `blue-50`, `blue-600` (información)
- **Gris:** `gray-50` a `gray-800` (texto y fondos)
- **Rojo:** `red-50`, `red-700` (alertas/mitos)

### Componentes CSS Personalizados

```css
.btn-primary {
  @apply bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200;
}

.input-field {
  @apply w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500;
}

.card {
  @apply bg-white rounded-xl shadow-lg p-6;
}
```

## 🔄 Flujo de Usuario

1. **Usuario ingresa ingresos mensuales** → Formateo automático
2. **Selecciona tipo de actividad** → Actualización de estado
3. **Selecciona tiempo del negocio** → Preparación para cálculo
4. **Hace clic en "Simular Impuestos"** → Llamada al backend
5. **Recibe resultado** → Muestra información detallada
6. **Puede explorar contenido educativo** → Modales informativos

---

# 🏦 Base Legal - RST Colombia

## Fundamento Legal

El cálculo se basa en el **Régimen Simple de Tributación (RST)** establecido por la DIAN de Colombia.

## Características del RST

- **Tarifa única:** Basada en ingresos y tipo de actividad
- **Simplificación tributaria:** Un solo impuesto integrado
- **Beneficios para PYMES:** Tarifas reducidas para nuevos negocios

## Tabla de Tarifas Implementada

| Actividad            | Tarifa Base | Rango Tiempo | Factor | Tarifa Final |
| -------------------- | ----------- | ------------ | ------ | ------------ |
| Venta Productos      | 1.5%        | 1-3 años     | 0.8    | 1.2%         |
| Servicios Personales | 2.0%        | 1-3 años     | 0.8    | 1.6%         |
| Venta Ambulante      | 1.0%        | 1-3 años     | 0.8    | 0.8%         |
| Otros                | 1.2%        | 1-3 años     | 0.8    | 0.96%        |

---

# 🚨 Consideraciones Importantes

## Compatibilidad Frontend-Backend

**⚠️ Discrepancia detectada:** Existe una diferencia entre los valores esperados por el frontend y backend para `tiempoNegocio`:

**Frontend envía:**

- `"1-3-anos"`
- `"4-6-anos"`
- `"7-mas-anos"`

**Backend espera:**

- `"menos-1-ano"`
- `"1-3-anos"`
- `"3-5-anos"`
- `"mas-5-anos"`

### Recomendación

Se recomienda sincronizar los valores entre frontend y backend para evitar errores de cálculo.

---

# 🛠️ Configuración de Desarrollo

## Variables de Entorno

### Backend

No requiere variables de entorno específicas para desarrollo local.

### Frontend

```bash
VITE_API_BASE_URL=http://localhost:3000  # URL del backend
```

## Puertos de Desarrollo

- **Backend:** Puerto 3000 (Next.js)
- **Frontend:** Puerto por defecto de Vite (usualmente 5173)

## Arquitectura de Deployment

```
Frontend (Vite/React) ←→ Backend (Next.js API Routes)
     Puerto 5173              Puerto 3000
```

---

# 📱 Características de Accesibilidad

- **Labels semánticos** en todos los formularios
- **Focus states** claramente definidos
- **Contraste de colores** adecuado
- **Estructura HTML semántica**
- **Iconos con significado** (Lucide React)

---

# 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

# 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

---

# 📞 Contacto

**Proyecto:** SimulaTuImpuesto  
**Descripción:** Calculadora de impuestos RST para emprendedores colombianos  
**Stack:** Next.js + React + Tailwind CSS
