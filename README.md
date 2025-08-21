# 🧮 SimulaTuImpuesto - Monorepo

Una aplicación web completa que ayuda a emprendedores colombianos a calcular cuánto pagarían en impuestos si formalizan su negocio bajo el Régimen Simple de Tributación (RST).

## 📁 Estructura del Proyecto

```
simula-tu-impuesto/
├── 📱 frontend/          # Aplicación React + Vite
├── 🔧 backend/           # API Node.js/Express (pendiente)
├── 📚 docs/              # Documentación del proyecto
├── README.md             # Este archivo
└── .gitignore            # Archivos ignorados por Git
```

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 16+
- npm o yarn

### Instalación Completa
```bash
# Clonar el repositorio
git clone https://github.com/daniellelooo/simula-tu-impuesto.git
cd simula-tu-impuesto

# Instalar dependencias del frontend
cd frontend
npm install

# Volver a la raíz (cuando esté listo el backend)
cd ..
```

### Desarrollo
```bash
# Solo frontend (por ahora)
cd frontend
npm run dev

# Acceder a: http://localhost:5173
```

## 🎯 Funcionalidades

### ✅ Frontend (Completado)
- 🧮 **Calculadora RST interactiva**
- 💰 **Formateo de moneda colombiana**
- 📱 **Diseño responsive con Tailwind CSS**
- 📚 **Sección educativa sobre formalización**
- 🎨 **Interfaz moderna e intuitiva**

### ✅ Backend (Completado)
- 🔗 **API REST con Next.js 15**
- 📊 **Tabla de tarifas RST oficiales implementada**
- ✅ **Validaciones de datos**
- 🔒 **Manejo de errores y CORS**
- 🧮 **Endpoint `/api/calcular` funcional**

## 🛠️ Tecnologías

### Frontend
- **React 19.1.1** - Biblioteca de UI
- **Vite 7.1.2** - Build tool y desarrollo
- **Tailwind CSS 3.4.17** - Estilos utilitarios
- **Lucide React** - Iconos modernos

### Backend (Completado)
- **Next.js 15.4.7** - Framework full-stack
- **Node.js** - Runtime de JavaScript
- **TypeScript 5** - Tipado estático
- **API Routes** - Endpoints RESTful integrados

## 📋 Scripts Disponibles

### Frontend
```bash
cd frontend
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Preview del build
npm run lint     # Linting con ESLint
```

### Proyecto Completo (Futuro)
```bash
npm run dev              # Frontend + Backend simultáneamente
npm run dev:frontend     # Solo frontend
npm run dev:backend      # Solo backend
npm run build           # Build completo
npm run install:all     # Instalar todas las dependencias
```

## 🌐 URLs de Desarrollo

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:3000 (cuando esté listo)
- **API:** http://localhost:3000/api (cuando esté listo)

## 📚 Documentación

- [**Frontend Documentation**](./docs/FRONTEND_DOCUMENTATION.md) - Documentación completa del frontend
- [**API Documentation**](./docs/API_DOCUMENTATION.md) - Documentación de la API (pendiente)
- [**Reorganization Guide**](./REORGANIZATION_GUIDE.md) - Guía de reorganización del proyecto

## 🎯 Objetivo del Proyecto

Reducir la barrera de entrada a la formalización empresarial en Colombia proporcionando:

1. **📊 Cálculos precisos** del RST según actividad y tiempo
2. **📚 Información educativa** sobre beneficios de formalización  
3. **🚫 Desmitificación** de creencias falsas sobre impuestos
4. **💡 Interfaz accesible** para emprendedores sin conocimientos técnicos

## 🇨🇴 Contexto Colombiano

### Régimen Simple de Tributación (RST)
- Sistema simplificado para pequeñas empresas
- Tarifas progresivas según actividad y tiempo
- Una sola declaración que incluye múltiples impuestos
- Ideal para microempresarios

### Tipos de Actividad Soportados
- 🛍️ **Venta de productos**
- 👥 **Servicios personales** 
- 🚶 **Venta ambulante**
- 🔧 **Otros tipos de actividad**

### Rangos de Tiempo
- 📅 **1-3 años** de operación
- 📅 **4-6 años** de operación  
- 📅 **7+ años** de operación

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👨‍💻 Autor

**Daniel** - [@daniellelooo](https://github.com/daniellelooo)

## 🆘 Soporte

¿Tienes preguntas? ¿Encontraste un bug? ¿Quieres sugerir una mejora?

- 🐛 [Reportar un bug](https://github.com/daniellelooo/simula-tu-impuesto/issues)
- 💡 [Sugerir una mejora](https://github.com/daniellelooo/simula-tu-impuesto/issues)
- 📧 [Contacto directo](mailto:tu-email@dominio.com)

---

⭐ **¡Dale una estrella si este proyecto te ayuda!** ⭐
