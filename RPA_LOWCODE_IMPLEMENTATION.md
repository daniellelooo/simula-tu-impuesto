# 🤖 Integración RPA + Low-Code con n8n

## 📋 Resumen de la implementación

Hemos implementado la funcionalidad para importar datos desde archivos Excel, procesarlos y calcular impuestos en lote usando n8n como plataforma de automatización low-code.

---

## 🗄️ Cambios en la Base de Datos

### Nuevo modelo: `ImportedSale`

```prisma
model ImportedSale {
  id                String   @id @default(cuid())
  userId            String?  // Usuario que importó el archivo (opcional)
  ventasMensuales   Float
  tipoActividad     String
  tiempoActividad   String
  deducciones       Float?
  ingresosBrutos    Float?
  gastosDeducibles  Float?
  fileName          String?  // Nombre del archivo Excel
  rowNumber         Int?     // Número de fila en el Excel
  processed         Boolean  @default(false) // Si ya se procesó o no
  createdAt         DateTime @default(now())

  user User? @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

**Propósito**: Guardar temporalmente los datos importados desde archivos Excel antes de procesarlos.

---

## 🚀 Nuevos Endpoints de la API

### 1. `/api/upload-excel` (POST)

**Propósito**: Recibir datos procesados del Excel desde n8n y guardarlos en la base de datos.

**Body (JSON)**:

```json
{
  "rows": [
    {
      "ventasMensuales": 1000000,
      "tipoActividad": "venta_productos",
      "tiempoActividad": "1-3_años",
      "deducciones": 50000,
      "ingresosBrutos": 1200000,
      "gastosDeducibles": 100000
    }
  ],
  "fileName": "ventas_enero.xlsx"
}
```

**Respuesta exitosa**:

```json
{
  "success": true,
  "data": {
    "totalRows": 10,
    "savedRows": 10,
    "message": "Se importaron 10 registros correctamente"
  }
}
```

### 2. `/api/upload-excel` (GET)

**Propósito**: Obtener las ventas importadas del usuario autenticado.

**Headers requeridos**:

```
Authorization: Bearer <token>
```

**Respuesta**:

```json
{
  "success": true,
  "data": [
    {
      "id": "abc123",
      "ventasMensuales": 1000000,
      "tipoActividad": "venta_productos",
      "processed": false,
      "createdAt": "2025-11-05T10:00:00Z"
    }
  ]
}
```

### 3. `/api/process-batch` (POST)

**Propósito**: Procesar todas las ventas importadas pendientes (calcular impuestos en lote).

**Headers requeridos**:

```
Authorization: Bearer <token>
```

**Respuesta**:

```json
{
  "success": true,
  "data": {
    "totalProcessed": 10,
    "results": [
      {
        "rowNumber": 1,
        "impuestoMensual": 14000,
        "impuestoAnual": 168000
      }
    ],
    "message": "Se procesaron 10 ventas correctamente"
  }
}
```

---

## 🔄 Flujo completo de trabajo

### Diagrama del proceso

```
Usuario sube Excel
       ↓
n8n lee el archivo
       ↓
n8n extrae datos (CSV/Excel)
       ↓
n8n itera sobre cada fila
       ↓
n8n envía datos a /api/upload-excel
       ↓
Backend guarda en ImportedSale
       ↓
Usuario ejecuta proceso de lote
       ↓
/api/process-batch calcula impuestos
       ↓
Se guardan en Calculation
       ↓
(Opcional) n8n genera PDFs
       ↓
(Opcional) n8n envía correos
```

---

## 📝 Formato del archivo Excel

El archivo Excel debe tener las siguientes columnas (pueden estar en cualquier orden):

| Columna          | Tipo   | Requerido | Descripción                                                                    |
| ---------------- | ------ | --------- | ------------------------------------------------------------------------------ |
| ventasMensuales  | Número | Sí        | Ventas mensuales en COP                                                        |
| tipoActividad    | Texto  | Sí        | Valores: `venta_productos`, `servicios_personales`, `venta_ambulante`, `otros` |
| tiempoActividad  | Texto  | Sí        | Valores: `1-3_años`, `4-6_años`, `7+_años`                                     |
| deducciones      | Número | No        | Deducciones permitidas                                                         |
| ingresosBrutos   | Número | No        | Ingresos brutos totales                                                        |
| gastosDeducibles | Número | No        | Gastos deducibles                                                              |

**Ejemplo de Excel**:

| ventasMensuales | tipoActividad        | tiempoActividad | deducciones | ingresosBrutos | gastosDeducibles |
| --------------- | -------------------- | --------------- | ----------- | -------------- | ---------------- |
| 1000000         | venta_productos      | 1-3_años        | 50000       | 1200000        | 100000           |
| 800000          | servicios_personales | 4-6_años        | 30000       | 850000         | 50000            |

---

## 🔧 Configuración de n8n

### Nodos necesarios:

1. **When clicking 'Execute workflow'** - Inicio manual
2. **Read/Write Files from Disk** - Leer archivo Excel
3. **Extract from File** - Convertir Excel a datos
4. **Loop Over Items** - Iterar sobre filas
5. **HTTP Request** - Enviar a `/api/upload-excel`
6. **HTTP Request** - Llamar a `/api/process-batch`
7. **(Opcional) HTTP Request** - Generar PDFs
8. **(Opcional) Send email** - Enviar correos

### Configuración del nodo HTTP Request para `/api/upload-excel`:

- **Method**: POST
- **URL**: `http://localhost:3000/api/upload-excel`
- **Body Content Type**: JSON
- **JSON/RAW Parameters**:
  ```json
  {
    "rows": {{ $json.data }},
    "fileName": "{{ $('Read/Write Files from Disk').item.json.fileName }}"
  }
  ```

---

## 🎯 Próximos pasos

1. ✅ Modelos de base de datos creados
2. ✅ Endpoints de API implementados
3. ⏳ Configurar flujo en n8n
4. ⏳ Probar importación de Excel
5. ⏳ Integrar generación de PDFs en lote
6. ⏳ Configurar envío de correos automáticos

---

## 🧪 Cómo probar

### 1. Preparar el archivo Excel

- Crea un archivo con las columnas mencionadas arriba
- Guárdalo en una ubicación accesible (ej: `C:\Users\Daniel\Documents\ventas.xlsx`)

### 2. Configurar n8n

- Inicia n8n: `n8n`
- Crea un nuevo workflow
- Sigue la guía de configuración de nodos

### 3. Ejecutar el flujo

- Haz clic en "Execute Workflow" en n8n
- Verifica que los datos se guarden en la base de datos
- Llama a `/api/process-batch` para calcular impuestos

### 4. Verificar resultados

- Revisa la tabla `ImportedSale` en Prisma Studio
- Revisa la tabla `Calculation` para ver los cálculos generados

---

## 📚 Recursos adicionales

- [Documentación de n8n](https://docs.n8n.io/)
- [Prisma Client API](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

## 🐛 Troubleshooting

### Error: "Property 'importedSale' does not exist"

**Solución**: Reinicia el servidor de desarrollo del backend después de ejecutar `npx prisma generate`.

### Error: "Cannot read property of undefined"

**Solución**: Verifica que el archivo Excel tenga todas las columnas requeridas.

### Error: "CORS policy"

**Solución**: Asegúrate de que los endpoints tengan los headers CORS configurados correctamente.

---

Creado: Noviembre 5, 2025
