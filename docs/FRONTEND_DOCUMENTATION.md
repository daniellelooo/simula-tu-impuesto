# 📋 Documentación Frontend - SimulaTuImpuesto

## 🎯 Descripción General del Proyecto

**SimulaTuImpuesto** es una aplicación web que ayuda a emprendedores colombianos a calcular cuánto pagarían en impuestos si formalizan su negocio bajo el Régimen Simple de Tributación (RST). La aplicación combina una calculadora interactiva con contenido educativo para desmitificar la formalización empresarial.

## 🏗️ Arquitectura Frontend

### Stack Tecnológico
- **React 19.1.1** - Biblioteca principal de UI
- **Vite 7.1.2** - Build tool y servidor de desarrollo
- **Tailwind CSS 3.4.17** - Framework de estilos utilitarios
- **Lucide React 0.540.0** - Biblioteca de iconos
- **ESLint** - Linting y calidad de código

### Estructura del Proyecto
```
src/
├── App.jsx           # Componente principal con toda la lógica
├── main.jsx          # Punto de entrada de React
├── index.css         # Estilos globales y componentes de Tailwind
└── assets/           # Recursos estáticos
```

## 🧮 Funcionalidad Principal: Calculadora RST

### Estado de la Aplicación
El componente principal maneja el siguiente estado:

```javascript
const [ingresos, setIngresos] = useState("");                    // Ingresos mensuales formateados
const [tipoActividad, setTipoActividad] = useState("venta-productos"); // Tipo de actividad económica
const [tiempoNegocio, setTiempoNegocio] = useState("1-3-anos");  // Tiempo del negocio
const [resultado, setResultado] = useState(null);               // Resultado del cálculo
const [mostrarEducativo, setMostrarEducativo] = useState(false); // Control de modales educativos
```

### Tipos de Actividad Soportados
1. **"venta-productos"** - Venta de productos
2. **"servicios-personales"** - Servicios personales
3. **"venta-ambulante"** - Venta ambulante
4. **"otro"** - Otros tipos de actividad

### Rangos de Tiempo del Negocio
1. **"1-3-anos"** - Entre 1 y 3 años
2. **"4-6-anos"** - Entre 4 y 6 años
3. **"7-mas-anos"** - 7 años o más

## 🔗 Integración con Backend

### Configuración de API
```javascript
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
```

### Endpoint de Cálculo
**URL:** `POST http://localhost:3000/api/calcular`

**Request Body:**
```json
{
  "ingresos": 800000,
  "tipoActividad": "venta-productos",
  "tiempoNegocio": "1-3-anos"
}
```

**Expected Response:**
```json
{
  "ingresosMensuales": 800000,
  "impuestoMensual": 8000,
  "tarifa": 1.0,
  "tipoActividad": "Venta de productos"
}
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
    alert("No se pudo calcular el impuesto. Verifica que el backend esté corriendo.");
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
  const value = e.target.value.replace(/[^\d]/g, ""); // Solo números
  const formatted = new Intl.NumberFormat("es-CO").format(value); // Formato colombiano
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
Muestra cuando `resultado` tiene datos:

```javascript
// Estructura del resultado mostrado
<div className="text-center bg-gradient-to-br from-green-50 to-green-100">
  <div className="text-5xl font-bold text-green-600">
    {formatCurrency(resultado.impuestoMensual)} // Impuesto mensual
  </div>
  <div className="text-lg text-gray-700">al mes</div>
  <div className="text-sm text-gray-500">
    Régimen sugerido: RST ({resultado.tarifa}%)
  </div>
</div>
```

### Tarjetas Informativas
Tres tarjetas con información del resultado:
1. **Actividad** - Tipo de actividad seleccionada
2. **Ingresos mensuales** - Cantidad formateada
3. **Tarifa aplicada** - Porcentaje del RST

## 📚 Sección Educativa

### Botones de Información
Tres botones que activan modales educativos:
1. **"rst"** - ¿Qué es RST?
2. **"beneficios"** - Beneficios de formalizarse
3. **"mitos"** - Mitos sobre impuestos

### Contenido Educativo
Cada modal contiene información específica:

**RST:**
- Explicación del Régimen Simple de Tributación
- Características principales
- Ventajas del sistema

**Beneficios:**
- Acceso a créditos bancarios
- Seguridad social
- Clientes corporativos
- Protección legal
- Oportunidades de crecimiento

**Mitos:**
- Desmitificación de creencias falsas
- Comparación entre mitos y realidades
- Información sobre tarifas reales

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

### Responsividad
- **Mobile-first approach**
- **Grid adaptativo:** `md:grid-cols-2`, `md:grid-cols-3`
- **Espaciado responsivo:** `px-4`, `py-8`
- **Contenedor centrado:** `max-w-4xl mx-auto`

## 🔄 Flujo de Usuario

1. **Usuario ingresa ingresos mensuales** → Formateo automático
2. **Selecciona tipo de actividad** → Actualización de estado
3. **Selecciona tiempo del negocio** → Preparación para cálculo
4. **Hace clic en "Simular Impuestos"** → Llamada al backend
5. **Recibe resultado** → Muestra información detallada
6. **Puede explorar contenido educativo** → Modales informativos

## 🛠️ Configuración de Desarrollo

### Variables de Entorno
```bash
VITE_API_BASE_URL=http://localhost:3000  # URL del backend
```

### Scripts Disponibles
```json
{
  "dev": "vite",           // Servidor de desarrollo
  "build": "vite build",   // Build de producción
  "lint": "eslint .",      // Linting
  "preview": "vite preview" // Preview del build
}
```

### Puerto de Desarrollo
- **Frontend:** Puerto por defecto de Vite (usualmente 5173)
- **Backend esperado:** Puerto 3000

## 🚨 Manejo de Errores

### Errores de Backend
```javascript
catch (err) {
  console.error(err);
  alert("No se pudo calcular el impuesto. Verifica que el backend esté corriendo.");
}
```

### Validaciones Frontend
- **Ingresos vacíos:** Botón deshabilitado
- **Ingresos no numéricos:** Filtrado automático
- **Ingresos <= 0:** Return temprano en función de cálculo

## 📱 Características de Accesibilidad

- **Labels semánticos** en todos los formularios
- **Focus states** claramente definidos
- **Contraste de colores** adecuado
- **Estructura HTML semántica**
- **Iconos con significado** (Lucide React)

## 🎯 Próximos Requerimientos para Backend

### API Endpoint Requerido
El backend debe implementar un endpoint que:

1. **Reciba:** Ingresos mensuales, tipo de actividad, tiempo del negocio
2. **Calcule:** Impuesto mensual según tabla RST de Colombia
3. **Retorne:** Impuesto calculado, tarifa aplicada, información formateada

### Tabla RST Sugerida (Para Backend)
El backend debería implementar una tabla similar a:

```javascript
// Ejemplo de estructura de tarifas RST
const tarifasRST = {
  "venta-productos": {
    "1-3-anos": 0.008,    // 0.8%
    "4-6-anos": 0.012,    // 1.2%
    "7-mas-anos": 0.016,  // 1.6%
  },
  "servicios-personales": {
    "1-3-anos": 0.015,    // 1.5%
    "4-6-anos": 0.025,    // 2.5%
    "7-mas-anos": 0.035,  // 3.5%
  },
  // ... más actividades
};
```

### Cálculo Esperado
```javascript
// Lógica que debería implementar el backend
const impuestoMensual = ingresosMensuales * tarifa;
```

---

**Nota:** Este documento describe el estado actual del frontend. El backend debe implementar la lógica de cálculo basada en las tarifas oficiales del RST en Colombia.
