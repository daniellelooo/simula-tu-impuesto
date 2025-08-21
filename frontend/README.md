# 📱 Frontend - Simula tu Impuesto

Interfaz React que proporciona una calculadora interactiva del Régimen Simple de Tributación (RST) para emprendedores colombianos.

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
Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

### Build de Producción
```bash
npm run build
npm run preview
```

## 🛠️ Tecnologías

- **React 19** - Biblioteca de UI
- **Vite** - Build tool y servidor de desarrollo
- **Tailwind CSS** - Framework de estilos utilitarios
- **Lucide React** - Biblioteca de iconos
- **ESLint** - Linting y calidad de código

## 📁 Estructura

```
frontend/
├── public/              # Archivos estáticos
├── src/
│   ├── App.jsx         # Componente principal
│   ├── main.jsx        # Punto de entrada
│   ├── index.css       # Estilos globales
│   └── assets/         # Recursos (imágenes, etc.)
├── package.json        # Dependencias y scripts
├── vite.config.js      # Configuración de Vite
├── tailwind.config.js  # Configuración de Tailwind
└── README.md           # Este archivo
```

## 🧮 Funcionalidades

### Calculadora RST
- Input de ingresos con formato de moneda colombiana
- Selección de tipo de actividad económica
- Selección de tiempo del negocio
- Cálculo automático via API backend
- Resultados visuales detallados

### Sección Educativa
- Información sobre qué es el RST
- Beneficios de la formalización empresarial
- Desmitificación de creencias falsas sobre impuestos

### UI/UX
- Diseño responsive (mobile-first)
- Interfaz intuitiva y accesible
- Animaciones y transiciones suaves
- Componentes reutilizables

## 🔗 Integración con Backend

### Variables de Entorno
Crea un archivo `.env` (opcional):
```bash
VITE_API_BASE_URL=http://localhost:3000
```

### API Calls
El frontend espera un endpoint en:
```
POST http://localhost:3000/api/calcular
```

**Request:**
```json
{
  "ingresos": 800000,
  "tipoActividad": "venta-productos", 
  "tiempoNegocio": "1-3-anos"
}
```

**Response:**
```json
{
  "ingresosMensuales": 800000,
  "impuestoMensual": 8000,
  "tarifa": 1.0,
  "tipoActividad": "Venta de productos"
}
```

## 🎨 Personalización

### Colores
Los colores principales están definidos en `tailwind.config.js`:
- Verde: Para acciones principales y éxito
- Azul: Para información
- Gris: Para texto y fondos neutros
- Rojo: Para alertas y correcciones

### Componentes CSS
En `src/index.css` se definen clases utilitarias:
```css
.btn-primary    # Botones principales
.input-field    # Campos de formulario
.card          # Tarjetas de contenido
```

## 📱 Responsive Design

El diseño está optimizado para:
- 📱 **Mobile:** 320px - 768px
- 💻 **Tablet:** 768px - 1024px  
- 🖥️ **Desktop:** 1024px+

## 🧪 Testing

```bash
# Linting
npm run lint

# Verificar tipos (si se agrega TypeScript)
npm run type-check
```

## 🚀 Deployment

### Netlify
```bash
npm run build
# Sube la carpeta `dist/`
```

### Vercel
```bash
npm run build
# Conecta el repositorio en Vercel
```

### Variables de Entorno en Producción
```bash
VITE_API_BASE_URL=https://tu-api-production.com
```

## 🔧 Scripts Disponibles

```json
{
  "dev": "vite",                    // Servidor de desarrollo
  "build": "vite build",            // Build de producción  
  "lint": "eslint .",               // Linting con ESLint
  "preview": "vite preview"         // Preview del build
}
```

##  Problemas Conocidos

- El backend debe estar corriendo en puerto 3000 para los cálculos
- Sin backend, la calculadora mostrará un error

## 🤝 Contribución

1. Haz fork del proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📞 Soporte

¿Problemas con el frontend?
- Revisa que Node.js esté actualizado
- Verifica que todas las dependencias estén instaladas
- Asegúrate de que el puerto 5173 esté disponible
