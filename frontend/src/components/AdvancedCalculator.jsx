import React, { useState } from "react";

// URL base de la API, obtenida de las variables de entorno
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { Calculator, Download, History, Plus, Minus } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const AdvancedCalculator = ({ user, token }) => {
  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    ventasMensuales: "",
    tipoActividad: "venta_productos",
    tiempoActividad: "1-3_años",
    deducciones: "",
    ingresosBrutos: "",
    gastosDeducibles: "",
  });
  // Estado para el resultado del cálculo
  const [resultado, setResultado] = useState(null);
  // Estado para el historial de cálculos
  const [historial, setHistorial] = useState([]);
  // Mostrar/ocultar opciones avanzadas
  const [showAdvanced, setShowAdvanced] = useState(false);
  // Estado de carga para mostrar spinner o deshabilitar botones
  const [loading, setLoading] = useState(false);

  // Formatea un número como moneda COP
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Maneja los cambios en los inputs del formulario
  const handleInputChange = (field, value) => {
    // Si el campo es numérico, lo formatea con separadores de miles
    if (
      [
        "ventasMensuales",
        "deducciones",
        "ingresosBrutos",
        "gastosDeducibles",
      ].includes(field)
    ) {
      const numericValue = value.replace(/[^\d]/g, "");
      const formatted = new Intl.NumberFormat("es-CO").format(numericValue);
      setFormData((prev) => ({ ...prev, [field]: formatted }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  // Envía los datos al backend para calcular impuestos
  const calcularImpuestos = async () => {
    const ventasMensuales = parseFloat(
      formData.ventasMensuales.replace(/[^\d]/g, "")
    );
    if (!ventasMensuales || ventasMensuales <= 0) return;

    setLoading(true);

    try {
      // Prepara los datos para enviar al backend
      const calculationData = {
        ventasMensuales,
        tipoActividad: formData.tipoActividad,
        tiempoActividad: formData.tiempoActividad,
        deducciones: parseFloat(
          formData.deducciones.replace(/[^\d]/g, "") || 0
        ),
        ingresosBrutos: parseFloat(
          formData.ingresosBrutos.replace(/[^\d]/g, "") || 0
        ),
        gastosDeducibles: parseFloat(
          formData.gastosDeducibles.replace(/[^\d]/g, "") || 0
        ),
      };

      const headers = {
        "Content-Type": "application/json",
      };

      // Si hay token, se agrega al header para autenticación
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      // Realiza la petición al backend
      const response = await fetch(`${API_BASE_URL}/api/calcular`, {
        method: "POST",
        headers,
        body: JSON.stringify(calculationData),
      });

      const data = await response.json();

      if (data.success) {
        setResultado(data.data);
      } else {
        alert(data.error || "Error en el cálculo");
      }
    } catch {
      alert("Error de conexión. Verifica que el backend esté funcionando.");
    } finally {
      setLoading(false);
    }
  };

  // Obtiene el historial de cálculos del usuario autenticado
  const obtenerHistorial = React.useCallback(async () => {
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/historial`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setHistorial(data.data);
      }
    } catch (error) {
      console.error("Error obteniendo historial:", error);
    }
  }, [token]);

  // Genera y descarga el PDF del resultado usando html2canvas y jsPDF
  const descargarPDF = async () => {
    if (!resultado) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/pdf`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ calculationData: resultado }),
      });

      const data = await response.json();

      if (data.success) {
        // Renderiza el HTML recibido en un div temporal
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = data.data.htmlContent;
        tempDiv.style.position = "absolute";
        tempDiv.style.left = "-9999px";
        tempDiv.style.width = "210mm"; // A4 width
        document.body.appendChild(tempDiv);

        // Convierte el HTML a imagen y la agrega al PDF
        const canvas = await html2canvas(tempDiv, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(data.data.filename);

        document.body.removeChild(tempDiv);
      }
    } catch (error) {
      console.error("Error generando PDF:", error);
      alert("Error generando el PDF");
    }
  };

  // Carga el historial automáticamente cuando el token cambia
  React.useEffect(() => {
    if (token) {
      obtenerHistorial();
    }
  }, [token, obtenerHistorial]);

  // Tipos de actividad disponibles
  const tiposActividad = {
    venta_productos: "Venta de productos",
    servicios_personales: "Servicios personales",
    venta_ambulante: "Venta ambulante",
    otros: "Otros",
  };

  return (
    <div className="space-y-8">
      {/* Formulario Principal */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center">
            <Calculator className="w-6 h-6 mr-2 text-green-600" />
            Calculadora RST Avanzada
          </h3>
          {user && (
            <div className="text-sm text-gray-600">
              Hola, {user.name || user.email}
            </div>
          )}
        </div>

        <div className="space-y-6">
          {/* Ingresos principales */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              Ventas mensuales *
            </label>
            <div className="relative">
              <span className="absolute left-4 top-4 text-gray-500 text-xl">
                $
              </span>
              <input
                type="text"
                value={formData.ventasMensuales}
                onChange={(e) =>
                  handleInputChange("ventasMensuales", e.target.value)
                }
                placeholder="800.000"
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-xl font-medium"
              />
            </div>
          </div>

          {/* Tipo de actividad */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-4">
              Tipo de actividad *
            </label>
            <div className="grid sm:grid-cols-2 gap-3">
              {Object.entries(tiposActividad).map(([value, label]) => (
                <label
                  key={value}
                  className="flex items-center space-x-3 cursor-pointer bg-gray-50 hover:bg-gray-100 p-4 rounded-lg border transition-colors"
                >
                  <input
                    type="radio"
                    name="tipoActividad"
                    value={value}
                    checked={formData.tipoActividad === value}
                    onChange={(e) =>
                      handleInputChange("tipoActividad", e.target.value)
                    }
                    className="w-5 h-5 text-green-600 focus:ring-green-500"
                  />
                  <span className="font-medium text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Tiempo de actividad */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              Tiempo en el negocio *
            </label>
            <select
              value={formData.tiempoActividad}
              onChange={(e) =>
                handleInputChange("tiempoActividad", e.target.value)
              }
              className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
            >
              <option value="1-3_años">1 a 3 años</option>
              <option value="4-6_años">4 a 6 años</option>
              <option value="7+_años">7 años o más</option>
            </select>
          </div>

          {/* Opciones avanzadas */}
          <div>
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center text-green-600 hover:text-green-700 font-medium"
            >
              {showAdvanced ? (
                <Minus className="w-4 h-4 mr-2" />
              ) : (
                <Plus className="w-4 h-4 mr-2" />
              )}
              Opciones avanzadas (deducciones y gastos)
            </button>

            {showAdvanced && (
              <div className="mt-4 space-y-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ingresos brutos (si diferentes a ventas)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">
                      $
                    </span>
                    <input
                      type="text"
                      value={formData.ingresosBrutos}
                      onChange={(e) =>
                        handleInputChange("ingresosBrutos", e.target.value)
                      }
                      placeholder="0"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deducciones permitidas
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">
                      $
                    </span>
                    <input
                      type="text"
                      value={formData.deducciones}
                      onChange={(e) =>
                        handleInputChange("deducciones", e.target.value)
                      }
                      placeholder="0"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gastos deducibles
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">
                      $
                    </span>
                    <input
                      type="text"
                      value={formData.gastosDeducibles}
                      onChange={(e) =>
                        handleInputChange("gastosDeducibles", e.target.value)
                      }
                      placeholder="0"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Botón de cálculo */}
          <button
            onClick={calcularImpuestos}
            disabled={!formData.ventasMensuales || loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 text-lg"
          >
            {loading ? "Calculando..." : "🧮 Calcular Impuestos"}
          </button>
        </div>
      </div>

      {/* Resultados */}
      {resultado && (
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">💰 Resultados</h3>
            {user && (
              <div className="flex space-x-2">
                <button
                  onClick={descargarPDF}
                  className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descargar PDF
                </button>
                <button
                  onClick={obtenerHistorial}
                  className="flex items-center bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                  <History className="w-4 h-4 mr-2" />
                  Ver Historial
                </button>
              </div>
            )}
          </div>

          <div className="text-center bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl mb-6">
            <div className="text-5xl font-bold text-green-600 mb-2">
              {formatCurrency(resultado.impuestoMensual)}
            </div>
            <div className="text-lg text-gray-700">al mes</div>
            <div className="text-sm text-gray-500 mt-2">
              Régimen Simple de Tributación ({resultado.porcentajeImpuesto}%)
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-xl">
              <div className="text-2xl mb-2">📊</div>
              <div className="text-sm text-gray-600">Impuesto Anual</div>
              <div className="font-semibold text-blue-800">
                {formatCurrency(resultado.impuestoAnual)}
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-xl">
              <div className="text-2xl mb-2">💰</div>
              <div className="text-sm text-gray-600">Ventas Anuales</div>
              <div className="font-semibold text-green-800">
                {formatCurrency(resultado.ventasAnuales)}
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl">
              <div className="text-2xl mb-2">📈</div>
              <div className="text-sm text-gray-600">Base Gravable</div>
              <div className="font-semibold text-purple-800">
                {formatCurrency(
                  resultado.baseGravable || resultado.ventasMensuales
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Historial */}
      {user && historial.length > 0 && (
        <div className="card">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <History className="w-6 h-6 mr-2 text-green-600" />
            Historial de Cálculos
          </h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {historial.slice(0, 10).map((calculo) => (
              <div key={calculo.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-green-600">
                      {formatCurrency(calculo.impuestoMensual)}/mes
                    </div>
                    <div className="text-sm text-gray-600">
                      {tiposActividad[calculo.tipoActividad]} •{" "}
                      {calculo.tiempoActividad}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(calculo.createdAt).toLocaleDateString("es-CO")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedCalculator;
