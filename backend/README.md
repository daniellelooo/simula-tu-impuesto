# 🔧 Backend - SimulaTuImpuesto (Placeholder)

API REST para el cálculo de impuestos del Régimen Simple de Tributación (RST) en Colombia.

## 🚧 Estado: En Desarrollo

Esta carpeta está preparada para recibir el código del backend. El agente de IA del backend debe implementar aquí la API.

## 📋 Requerimientos del Backend

### Endpoint Principal
**POST** `/api/calcular`

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

### Tecnologías Sugeridas
- **Node.js** + **Express.js**
- **CORS** para permitir requests del frontend
- **Helmet** para seguridad
- **Morgan** para logging

### Puerto de Desarrollo
- **Backend:** `3000`
- **Frontend:** `5173`

### Estructura Sugerida
```
backend/
├── src/
│   ├── app.js           # Configuración de Express
│   ├── server.js        # Servidor principal
│   ├── routes/
│   │   └── api.js       # Rutas de la API
│   ├── controllers/
│   │   └── calcular.js  # Lógica de cálculo
│   ├── data/
│   │   └── tarifas.js   # Tabla de tarifas RST
│   └── utils/
│       └── validation.js # Validaciones
├── package.json
├── .env.example
└── README.md
```

### Variables de Entorno
```bash
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## 📊 Tabla RST a Implementar

```javascript
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
  "venta-ambulante": {
    "1-3-anos": 0.008,    // 0.8%
    "4-6-anos": 0.012,    // 1.2%
    "7-mas-anos": 0.016,  // 1.6%
  },
  "otro": {
    "1-3-anos": 0.015,    // 1.5%
    "4-6-anos": 0.025,    // 2.5%
    "7-mas-anos": 0.035,  // 3.5%
  }
};
```

## 🔄 Flujo de Desarrollo

1. El frontend envía datos del formulario
2. El backend valida los datos
3. Se busca la tarifa correcta en la tabla RST
4. Se calcula: `impuestoMensual = ingresos * tarifa`
5. Se retorna el resultado formateado

---

**Ver:** [Frontend Documentation](../docs/FRONTEND_DOCUMENTATION.md) para más detalles de la integración.
