# Script de prueba para los endpoints de importación
# Ejecutar desde PowerShell

Write-Host "🧪 Probando endpoints de importación..." -ForegroundColor Green

# 1. Datos de ejemplo para enviar
$testData = @{
    rows = @(
        @{
            ventasMensuales = 1000000
            tipoActividad = "venta_productos"
            tiempoActividad = "1-3_años"
            deducciones = 50000
            ingresosBrutos = 1200000
            gastosDeducibles = 100000
        },
        @{
            ventasMensuales = 800000
            tipoActividad = "servicios_personales"
            tiempoActividad = "4-6_años"
            deducciones = 30000
            ingresosBrutos = 850000
            gastosDeducibles = 50000
        }
    )
    fileName = "ventas_test.xlsx"
} | ConvertTo-Json -Depth 10

Write-Host "`n📤 Prueba 1: Enviando datos a /api/upload-excel..." -ForegroundColor Cyan

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/upload-excel" `
        -Method Post `
        -ContentType "application/json" `
        -Body $testData
    
    Write-Host "✅ Respuesta:" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
}

Write-Host "`n⏸️  Presiona Enter para continuar con la siguiente prueba..." -ForegroundColor Yellow
Read-Host

# 2. Probar obtener las ventas importadas (requiere autenticación)
Write-Host "`n📥 Prueba 2: Obteniendo ventas importadas (sin token)..." -ForegroundColor Cyan

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/upload-excel" `
        -Method Get
    
    Write-Host "✅ Respuesta:" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "⚠️  Esperado: Debe pedir autenticación" -ForegroundColor Yellow
    Write-Host "Error: $_" -ForegroundColor Yellow
}

Write-Host "`n⏸️  Presiona Enter para continuar con la siguiente prueba..." -ForegroundColor Yellow
Read-Host

# 3. Probar el proceso en lote (requiere autenticación)
Write-Host "`n⚙️  Prueba 3: Procesando ventas en lote (sin token)..." -ForegroundColor Cyan

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/process-batch" `
        -Method Post `
        -ContentType "application/json"
    
    Write-Host "✅ Respuesta:" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "⚠️  Esperado: Debe pedir autenticación" -ForegroundColor Yellow
    Write-Host "Error: $_" -ForegroundColor Yellow
}

Write-Host "`n✅ Pruebas completadas!" -ForegroundColor Green
Write-Host "`n📝 Notas:" -ForegroundColor Yellow
Write-Host "- El endpoint /api/upload-excel (POST) debe funcionar sin token" -ForegroundColor White
Write-Host "- Los endpoints GET y /api/process-batch requieren token JWT" -ForegroundColor White
Write-Host "- Para probar con token, primero debes hacer login y copiar el token" -ForegroundColor White
