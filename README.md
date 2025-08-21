# 🧮 Simula tu Impuesto

Una aplicación web educativa que simula el cálculo del **Régimen Simple de Tributación (RST)** colombiano, ayudando a emprendedores y pequeños empresarios a entender sus obligaciones fiscales.

## 🎯 ¿Qué es?

Esta aplicación permite a los emprendedores colombianos calcular de manera precisa cuánto pagarían en impuestos si formalizan su negocio bajo el Régimen Simple de Tributación, desmitificando la complejidad del sistema tributario.

## 🏗️ Arquitectura del Proyecto

```
simula-tu-impuesto/ (Monorepo)
├── 📱 frontend/          # React + Vite (Puerto 5173)
├── 🔧 backend/           # Next.js API (Puerto 3000)
├── 📦 package.json       # Scripts del monorepo
├── ⚙️ vercel.json        # Configuración de despliegue
└── 📄 README.md          # Este archivo
```

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 18+
- npm

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/daniellelooo/simula-tu-impuesto.git
cd simula-tu-impuesto

# Instalar dependencias
npm install
```

### Desarrollo
```bash
# Iniciar frontend + backend simultáneamente
npm run dev

# URLs:
# Frontend: http://localhost:5173
# Backend API: http://localhost:3000
```

### Scripts Disponibles
```bash
npm run dev              # Desarrollo: Frontend + Backend
npm run dev:frontend     # Solo frontend
npm run dev:backend      # Solo backend
npm run build           # Build de ambos proyectos
npm run install:all     # Instalar dependencias en frontend y backend
```

## � Stack Tecnológico

### Frontend
- **React 19** - Interfaz de usuario moderna
- **Vite** - Build tool rápido
- **Tailwind CSS** - Estilos utilitarios
- **Lucide React** - Iconografía

### Backend
- **Next.js 15** - Framework full-stack
- **TypeScript** - Tipado estático
- **API Routes** - Endpoints RESTful

## ⚡ Funcionalidades

### ✅ Calculadora de RST
- Ingreso de ventas mensuales
- Cálculo automático de impuestos según actividad y tiempo
- Visualización de resultados en tiempo real

### ✅ Contenido Educativo
- Explicación del RST y sus beneficios
- Requisitos para acceder al régimen
- Ejemplos prácticos de cálculo

### ✅ Interfaz Intuitiva
- Diseño responsive para móvil y desktop
- Navegación fluida entre secciones
- Feedback visual inmediato

## 🔄 Flujo de la Aplicación

1. **Usuario ingresa datos** → Ventas mensuales, actividad, tiempo
2. **Frontend valida** → Campos requeridos y formato
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

### URLs de Producción
- **Demo**: [simula-tu-impuesto.vercel.app](https://simula-tu-impuesto.vercel.app)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👨‍💻 Autor

**Daniel** - [@daniellelooo](https://github.com/daniellelooo)

---

⭐ **¡Dale una estrella si este proyecto te ayuda!** ⭐
