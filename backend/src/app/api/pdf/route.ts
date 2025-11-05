import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '../../../lib/middleware'

// Headers para permitir CORS en la API
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

// Handler para preflight de CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  })
}

// Endpoint principal para generar el HTML del PDF
export async function POST(request: NextRequest) {
  // Verifica que el usuario esté autenticado
  const authUser = getAuthUser(request);
  
  if (!authUser) {
    return NextResponse.json(
      { success: false, error: 'No autorizado' },
      { status: 401, headers: corsHeaders }
    );
  }

  try {
    // Obtiene los datos del cálculo enviados por el frontend
    const { calculationData } = await request.json();

    // Genera el HTML que será convertido a PDF en el frontend
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Reporte de Cálculo RST</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { font-size: 24px; font-weight: bold; color: #059669; }
          .subtitle { color: #6b7280; margin-top: 5px; }
          .section { margin: 20px 0; padding: 15px; border: 1px solid #e5e7eb; border-radius: 8px; }
          .result { background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); }
          .amount { font-size: 32px; font-weight: bold; color: #059669; text-align: center; }
          .details { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px; }
          .detail-item { padding: 10px; background: #f9fafb; border-radius: 6px; }
          .label { font-weight: bold; color: #374151; }
          .value { color: #059669; font-weight: 600; }
          .footer { margin-top: 40px; text-align: center; color: #6b7280; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">🧮 Simula tu Impuesto</div>
          <div class="subtitle">Reporte de Cálculo - Régimen Simple de Tributación</div>
          <div class="subtitle">Generado el ${new Date().toLocaleDateString('es-CO')}</div>
        </div>

        <div class="section result">
          <h3>💰 Resultado del Cálculo</h3>
          <div class="amount">$${calculationData.impuestoMensual?.toLocaleString('es-CO') || '0'} COP</div>
          <div style="text-align: center; margin-top: 10px; color: #6b7280;">Impuesto mensual a pagar</div>
        </div>

        <div class="section">
          <h3>📊 Detalles del Cálculo</h3>
          <div class="details">
            <div class="detail-item">
              <div class="label">Ventas Mensuales:</div>
              <div class="value">$${calculationData.ventasMensuales?.toLocaleString('es-CO') || '0'} COP</div>
            </div>
            <div class="detail-item">
              <div class="label">Ventas Anuales:</div>
              <div class="value">$${calculationData.ventasAnuales?.toLocaleString('es-CO') || '0'} COP</div>
            </div>
            <div class="detail-item">
              <div class="label">Tipo de Actividad:</div>
              <div class="value">${calculationData.tipoActividad || 'No especificado'}</div>
            </div>
            <div class="detail-item">
              <div class="label">Tiempo de Actividad:</div>
              <div class="value">${calculationData.tiempoActividad || 'No especificado'}</div>
            </div>
            <div class="detail-item">
              <div class="label">Porcentaje de Impuesto:</div>
              <div class="value">${calculationData.porcentajeImpuesto || '0'}%</div>
            </div>
            <div class="detail-item">
              <div class="label">Impuesto Anual:</div>
              <div class="value">$${calculationData.impuestoAnual?.toLocaleString('es-CO') || '0'} COP</div>
            </div>
          </div>
        </div>

        ${calculationData.deducciones > 0 || calculationData.gastosDeducibles > 0 ? `
        <div class="section">
          <h3>📋 Deducciones y Gastos</h3>
          <div class="details">
            <div class="detail-item">
              <div class="label">Deducciones:</div>
              <div class="value">$${calculationData.deducciones?.toLocaleString('es-CO') || '0'} COP</div>
            </div>
            <div class="detail-item">
              <div class="label">Gastos Deducibles:</div>
              <div class="value">$${calculationData.gastosDeducibles?.toLocaleString('es-CO') || '0'} COP</div>
            </div>
            <div class="detail-item">
              <div class="label">Base Gravable:</div>
              <div class="value">$${calculationData.baseGravable?.toLocaleString('es-CO') || '0'} COP</div>
            </div>
          </div>
        </div>
        ` : ''}

        <div class="section">
          <h3>ℹ️ Información Importante</h3>
          <p><strong>Régimen Simple de Tributación (RST):</strong> Este es un régimen especial diseñado para facilitar el cumplimiento de las obligaciones tributarias de los pequeños contribuyentes.</p>
          <p><strong>Nota:</strong> Este cálculo es una simulación basada en las tarifas vigentes del RST. Para información oficial, consulte directamente con la DIAN.</p>
        </div>

        <div class="footer">
          <p>Generado por Simula tu Impuesto - Herramienta educativa para emprendedores colombianos</p>
          <p>Este documento no constituye asesoría tributaria oficial</p>
        </div>
      </body>
      </html>
    `;

    // Retorna el HTML y el nombre sugerido del archivo
    return NextResponse.json({
      success: true,
      data: {
        htmlContent,
        filename: `calculo-rst-${new Date().toISOString().split('T')[0]}.pdf`
      }
    }, { headers: corsHeaders });

  } catch (error) {
    console.error('Error generando PDF:', error);
    return NextResponse.json(
      { success: false, error: 'Error generando el reporte' },
      { status: 500, headers: corsHeaders }
    );
  }
}
