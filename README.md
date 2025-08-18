# 🧮 SimulaTuImpuesto

Una aplicación web interactiva que ayuda a emprendedores colombianos a calcular cuánto pagarían en impuestos si formalizan su negocio bajo el Régimen Simple de Tributación (RST).

## 🎯 Objetivo

Reducir la barrera de entrada a la formalización empresarial en Colombia proporcionando información clara y accesible sobre las obligaciones tributarias, desmitificando conceptos erróneos y mostrando que formalizar un negocio no es tan costoso como muchos creen.

## ✨ Características Principales

### 🧮 Calculadora RST

- **Simulación en tiempo real** de impuestos según ingresos mensuales
- **Múltiples tipos de actividad**: Venta de productos, servicios personales, venta ambulante, otros
- **Tarifas progresivas** basadas en el tiempo del negocio (1-3 años, 4-6 años, 7+ años)
- **Resultados detallados** con desglose visual de información

### 📚 Contenido Educativo

- **¿Qué es RST?**: Explicación del Régimen Simple de Tributación
- **Beneficios de formalización**: Acceso a créditos, seguridad social, clientes corporativos
- **Desmitificación**: Aclaración de creencias falsas sobre impuestos

### 🎨 Diseño

- **Interfaz moderna** con Tailwind CSS
- **Responsive design** optimizado para móviles y desktop
- **UX intuitiva** con formularios guiados y resultados claros

## 🛠️ Tecnologías Utilizadas

### Frontend

- **React 18** - Biblioteca de interfaz de usuario
- **Vite** - Build tool y desarrollo rápido
- **Tailwind CSS 3** - Framework de estilos utilitarios
- **Lucide React** - Iconos modernos y consistentes

### Herramientas de Desarrollo

- **ESLint** - Linting y calidad de código
- **PostCSS** - Procesamiento de CSS
- **Autoprefixer** - Compatibilidad entre navegadores

## 🏗️ Arquitectura del Código

### Componentes Principales

#### `App.jsx` - Componente Principal

```javascript
// Estado principal de la aplicación
const [ingresos, setIngresos] = useState("");
const [tipoActividad, setTipoActividad] = useState("venta-productos");
const [tiempoNegocio, setTiempoNegocio] = useState("1-3-anos");
const [resultado, setResultado] = useState(null);
```

#### Lógica de Cálculo

```javascript
// Tarifas RST por actividad y tiempo
const tarifasRST = {
  "venta-productos": {
    "1-3-anos": 0.01, // 1%
    "4-6-anos": 0.015, // 1.5%
    "7-mas-anos": 0.02, // 2%
  },
  // ... más actividades
};
```

#### Funcionalidades Clave

- **formatCurrency()**: Formato de moneda colombiana
- **calcularImpuestos()**: Lógica principal de cálculo
- **handleIngresosChange()**: Formateo en tiempo real de inputs

### Estructura de Carpetas

```
simula-tu-impuesto/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx          # Componente principal
│   ├── main.jsx         # Punto de entrada
│   └── index.css        # Estilos globales y utilidades
├── tailwind.config.js   # Configuración de Tailwind
├── vite.config.js       # Configuración de Vite
└── package.json         # Dependencias y scripts
```

## 🚀 Instalación y Desarrollo

### Prerrequisitos

- Node.js 16+
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/simula-tu-impuesto.git
cd simula-tu-impuesto

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run preview  # Vista previa de producción
npm run lint     # Verificar calidad de código
```

## 📊 Funcionalidades Detalladas

### Sistema de Tarifas RST

La aplicación implementa las tarifas oficiales del Régimen Simple de Tributación:

| Actividad            | 1-3 años | 4-6 años | 7+ años |
| -------------------- | -------- | -------- | ------- |
| Venta de productos   | 1%       | 1.5%     | 2%      |
| Servicios personales | 2.5%     | 3%       | 3.5%    |
| Venta ambulante      | 0.8%     | 1.2%     | 1.6%    |
| Otros                | 2%       | 2.5%     | 3%      |

### Validaciones Implementadas

- **Formato de moneda**: Separadores de miles automáticos
- **Entrada numérica**: Solo acepta números válidos
- **Cálculos en tiempo real**: Actualización inmediata de resultados

## 🎯 Metodología de Desarrollo

### Principios Aplicados

1. **Mobile First**: Diseño responsive desde móvil hacia desktop
2. **Componente único**: Arquitectura simple para prototipo rápido
3. **Estado local**: Uso de React hooks para gestión de estado
4. **Utility-first CSS**: Tailwind para desarrollo ágil

### Decisiones Técnicas

- **React sin backend**: Cálculos del lado cliente para simplicidad
- **Vite sobre Create React App**: Build más rápido y configuración moderna
- **Tailwind v3**: Estabilidad sobre funcionalidades experimentales

## 🔮 Roadmap y Mejoras Futuras

### 📈 Fase 2 - Expansión de Funcionalidades

- [ ] **Comparador de regímenes**: RST vs Régimen Ordinario
- [ ] **Calculadora de beneficios**: Proyección de ahorros anuales
- [ ] **Simulador de crecimiento**: Impacto fiscal del crecimiento del negocio
- [ ] **Exportar resultados**: PDF con resumen de simulación
- [ ] **Historial de cálculos**: Guardar simulaciones anteriores

### 🎨 Fase 3 - Mejoras de UX

- [ ] **Gráficos interactivos**: Visualización de datos con Chart.js
- [ ] **Animaciones**: Micro-interacciones para mejor experiencia
- [ ] **Tutorial guiado**: Onboarding para nuevos usuarios
- [ ] **Modo oscuro**: Alternativa visual
- [ ] **PWA**: Funcionalidad offline

### 🧠 Fase 4 - Inteligencia y Contenido

- [ ] **Chatbot educativo**: Asistente virtual para preguntas
- [ ] **Guías paso a paso**: Proceso completo de formalización
- [ ] **Calculadora de costos**: Incluir otros gastos de formalización
- [ ] **Base de conocimiento**: FAQ expandida
- [ ] **Videos educativos**: Contenido multimedia

### 🔧 Fase 5 - Mejoras Técnicas

- [ ] **Backend API**: Base de datos para analytics y usuarios
- [ ] **Autenticación**: Cuentas de usuario personalizadas
- [ ] **Testing**: Cobertura de pruebas unitarias e integración
- [ ] **CI/CD**: Pipeline automatizado de desarrollo
- [ ] **Performance**: Optimización de carga y renderizado
- [ ] **SEO avanzado**: Optimización para motores de búsqueda

### 🌐 Fase 6 - Expansión

- [ ] **Multi-país**: Soporte para otros países latinoamericanos
- [ ] **Multi-idioma**: Internacionalización
- [ ] **API pública**: Permitir integraciones externas
- [ ] **Versión móvil nativa**: App para Android/iOS
- [ ] **Integración DIAN**: Conexión con servicios oficiales

## 🤝 Contribuciones

### Cómo Contribuir

1. Fork el proyecto
2. Crear branch para feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push al branch (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request

### Reportar Issues

- Usar templates de issues para bugs y feature requests
- Incluir información del navegador y sistema operativo
- Proporcionar pasos para reproducir bugs

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.

## 👨‍💻 Autor

**Daniel Leon Lopez**

## 🙏 Agradecimientos

- **DIAN Colombia** - Por la información oficial sobre el RST
- **Comunidad React** - Por las herramientas y documentación
- **Tailwind CSS** - Por el framework de diseño
- **Emprendedores colombianos** - Inspiración para crear esta herramienta

## 📞 Soporte

Si tienes preguntas o necesitas ayuda:

- 📧 Email: tu-email@dominio.com
- 💬 Discussions: Usar GitHub Discussions para preguntas
- 🐛 Bugs: Reportar en GitHub Issues

---

⭐ **Si este proyecto te fue útil, no olvides darle una estrella en GitHub**

_Creado con ❤️ para la comunidad emprendedora colombiana_
