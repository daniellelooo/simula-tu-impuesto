# 🚀 Deployment Guide - SimulaTuImpuesto

## 📋 Configuración para Vercel

### Opción 1: Solo Frontend (Recomendada para pruebas)

1. **En Vercel Dashboard:**
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

2. **Variables de entorno en Vercel:**
   ```
   VITE_API_BASE_URL = https://tu-backend-url.vercel.app
   ```

### Opción 2: Monorepo completo

1. **Usar el archivo `vercel.json` incluido**
2. **Variables de entorno:**
   ```
   VITE_API_BASE_URL = https://tu-backend-url.vercel.app
   ```

## 🔧 Pasos para solucionar el error actual:

### 1. Configurar el proyecto en Vercel:

```bash
# Configuraciones en Vercel Dashboard
Root Directory: frontend
Build Command: npm run build  
Output Directory: dist
Install Command: npm install
```

### 2. O usar la configuración del monorepo:

```bash
# Si usas vercel.json (ya incluido)
Root Directory: . (raíz)
Build Command: (usar el del vercel.json)
Output Directory: frontend/dist
```

### 3. Variables de entorno en Vercel:

- `VITE_API_BASE_URL`: URL de tu backend en producción

## 🌐 URLs de ejemplo:

- **Frontend:** https://simula-tu-impuesto.vercel.app
- **Backend:** https://simula-tu-impuesto-backend.vercel.app (deploy por separado)

## 💡 Recomendación:

Para simplificar, despliega **solo el frontend** en Vercel:
1. Ve a Vercel Dashboard
2. Conecta tu repositorio
3. Configura Root Directory: `frontend`
4. Deploy!

El backend puede desplegarse por separado o usar una API externa.
