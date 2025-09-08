# 🔄 Guía de Reorganización del Proyecto - SimulaTuImpuesto

## 📁 Estructura Actual vs Estructura Objetivo

### ❌ Estructura Actual (Solo Frontend)
```
simula-tu-impuesto/
├── src/
├── public/
├── package.json
├── README.md
└── ... (archivos del frontend)
```

### ✅ Estructura Objetivo (Monorepo)
```
simula-tu-impuesto/
├── README.md                    # README principal del proyecto
├── .gitignore                   # Gitignore principal
├── frontend/                    # Carpeta del frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── README.md               # README específico del frontend
│   └── ... (archivos del frontend)
├── backend/                     # Carpeta del backend
│   ├── src/
│   ├── package.json
│   ├── README.md               # README específico del backend
│   └── ... (archivos del backend)
└── docs/                       # Documentación general
    ├── FRONTEND_DOCUMENTATION.md
    └── API_DOCUMENTATION.md
```

## 🚀 Pasos para Reorganizar

### Paso 1: Crear las carpetas principales
```powershell
# Desde la raíz del proyecto
mkdir frontend
mkdir backend
mkdir docs
```

### Paso 2: Mover archivos del frontend
```powershell
# Mover archivos específicos del frontend
Move-Item src frontend/
Move-Item public frontend/
Move-Item index.html frontend/
Move-Item package.json frontend/
Move-Item package-lock.json frontend/
Move-Item vite.config.js frontend/
Move-Item tailwind.config.js frontend/
Move-Item postcss.config.js frontend/
Move-Item eslint.config.js frontend/
Move-Item node_modules frontend/
```

### Paso 3: Mover documentación
```powershell
# Mover documentación específica
Move-Item FRONTEND_DOCUMENTATION.md docs/
```

### Paso 4: Crear README principal del proyecto
Crear un nuevo `README.md` en la raíz que explique todo el proyecto.

### Paso 5: Crear README específico del frontend
Crear `frontend/README.md` con instrucciones específicas del frontend.

### Paso 6: Preparar carpeta del backend
La carpeta `backend/` estará lista para recibir los archivos del backend.

## 📝 Scripts Sugeridos para package.json Principal

```json
{
  "name": "simula-tu-impuesto",
  "version": "1.0.0",
  "description": "Calculadora de impuestos RST para emprendedores colombianos",
  "scripts": {
    "dev": "concurrently \"npm run dev:frontend\" \"npm run dev:backend\"",
    "dev:frontend": "cd frontend && npm run dev",
    "dev:backend": "cd backend && npm run dev",
    "build": "npm run build:frontend && npm run build:backend",
    "build:frontend": "cd frontend && npm run build",
    "build:backend": "cd backend && npm run build",
    "install:all": "npm install && cd frontend && npm install && cd ../backend && npm install"
  },
  "devDependencies": {
    "concurrently": "^8.2.0"
  }
}
```

## 🔧 Configuración de Git

### Actualizar .gitignore principal
```gitignore
# Dependencies
node_modules/
frontend/node_modules/
backend/node_modules/

# Build outputs
frontend/dist/
backend/dist/
backend/build/

# Environment variables
.env
.env.local
.env.production
frontend/.env*
backend/.env*

# Logs
*.log
npm-debug.log*
frontend/npm-debug.log*
backend/npm-debug.log*

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
```

## 🌐 URLs de Desarrollo

- **Frontend:** http://localhost:5173 (Vite default)
- **Backend:** http://localhost:3000
- **API Base:** http://localhost:3000/api

## 📦 Comandos de Instalación

```bash
# Instalar dependencias en todas las carpetas
npm run install:all

# O manualmente:
npm install              # Raíz (para concurrently)
cd frontend && npm install
cd ../backend && npm install
```

## 🚀 Comandos de Desarrollo

```bash
# Ejecutar frontend y backend simultáneamente
npm run dev

# Ejecutar solo frontend
npm run dev:frontend

# Ejecutar solo backend
npm run dev:backend
```

---

**¿Quieres que ejecute estos pasos automáticamente?**
