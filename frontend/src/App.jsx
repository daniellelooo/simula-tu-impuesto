import React, { useState } from "react";
import { Calculator, Info, CheckCircle, AlertCircle } from "lucide-react";

const App = () => {
  const [ingresos, setIngresos] = useState("");
  const [tipoActividad, setTipoActividad] = useState("venta-productos");
  const [tiempoNegocio, setTiempoNegocio] = useState("1-3-anos");
  const [resultado, setResultado] = useState(null);
  const [mostrarEducativo, setMostrarEducativo] = useState(false);

  // 🔗 Cálculo temporal local (sin backend)
  const calcularImpuestos = async () => {
    const ingresosMensuales = parseFloat(ingresos.replace(/[^\d]/g, ""));
    if (!ingresosMensuales || ingresosMensuales <= 0) return;

    try {
      // Tabla de tarifas RST local
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

      // Obtener tarifa según actividad y tiempo
      const tarifa = tarifasRST[tipoActividad]?.[tiempoNegocio] || 0.015;
      const impuestoMensual = ingresosMensuales * tarifa;

      // Nombres descriptivos para mostrar
      const tiposActividad = {
        "venta-productos": "Venta de productos",
        "servicios-personales": "Servicios personales", 
        "venta-ambulante": "Venta ambulante",
        "otro": "Otros"
      };

      // Simular respuesta del backend
      const data = {
        ingresosMensuales: ingresosMensuales,
        impuestoMensual: Math.round(impuestoMensual),
        tarifa: (tarifa * 100).toFixed(1),
        tipoActividad: tiposActividad[tipoActividad] || "Otros"
      };

      setResultado(data);
    } catch (err) {
      console.error(err);
      alert("Error al calcular el impuesto");
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleIngresosChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, "");
    const formatted = new Intl.NumberFormat("es-CO").format(value);
    setIngresos(formatted);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Calculator className="w-10 h-10 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-800">
              SimulaTuImpuesto
            </h1>
          </div>
          <h2 className="text-xl text-gray-600 mb-2">
            Calcula cuánto pagarías si legalizas tu negocio
          </h2>
          <p className="text-gray-500">
            Régimen Simple de Tributación (RST) - Colombia
          </p>
        </div>

        {/* Formulario y Resultados - Centrados */}
        <div className="max-w-3xl mx-auto mb-16">
          {/* Formulario Principal - Más ancho y centrado */}
          <div className="card mb-8">
            <div className="space-y-8">
              {/* Ingresos */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  ¿Cuáles son tus ingresos mensuales aproximados?
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-4 text-gray-500 text-xl">
                    $
                  </span>
                  <input
                    type="text"
                    value={ingresos}
                    onChange={handleIngresosChange}
                    placeholder="800.000"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-xl font-medium"
                  />
                </div>
              </div>

              {/* Tipo de Actividad */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  ¿Qué tipo de actividad realizas?
                </label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { value: "venta-productos", label: "Venta de productos" },
                    {
                      value: "servicios-personales",
                      label: "Servicios personales",
                    },
                    { value: "venta-ambulante", label: "Venta ambulante" },
                    { value: "otro", label: "Otro" },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center space-x-3 cursor-pointer bg-gray-50 hover:bg-gray-100 p-4 rounded-lg border transition-colors"
                    >
                      <input
                        type="radio"
                        name="tipoActividad"
                        value={option.value}
                        checked={tipoActividad === option.value}
                        onChange={(e) => setTipoActividad(e.target.value)}
                        className="w-5 h-5 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-gray-700 font-medium">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tiempo del Negocio */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  ¿Hace cuánto tienes el negocio?
                </label>
                <select
                  value={tiempoNegocio}
                  onChange={(e) => setTiempoNegocio(e.target.value)}
                  className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
                >
                  <option value="1-3-anos">Entre 1 y 3 años</option>
                  <option value="4-6-anos">Entre 4 y 6 años</option>
                  <option value="7-mas-anos">7 años o más</option>
                </select>
              </div>

              {/* Botón Calcular */}
              <button
                onClick={calcularImpuestos}
                disabled={!ingresos}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-4 px-8 rounded-xl transition-colors duration-200 text-xl"
              >
                🧮 Simular Impuestos
              </button>
            </div>
          </div>

          {/* Resultados - Centrados */}
          {resultado && (
            <div className="card">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Si te formalizaras hoy, podrías pagar aproximadamente:
              </h3>

              <div className="text-center bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 mb-6 border-2 border-green-200">
                <div className="text-5xl font-bold text-green-600 mb-3">
                  {formatCurrency(resultado.impuestoMensual)}
                </div>
                <div className="text-lg text-gray-700 font-medium">al mes</div>
                <div className="text-sm text-gray-500 mt-2 font-medium">
                  Régimen sugerido: RST ({resultado.tarifa}%)
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <div className="text-2xl mb-2">📊</div>
                  <div className="text-sm text-gray-600">Actividad</div>
                  <div className="font-semibold text-blue-800">
                    {resultado.tipoActividad}
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-xl">
                  <div className="text-2xl mb-2">💰</div>
                  <div className="text-sm text-gray-600">
                    Ingresos mensuales
                  </div>
                  <div className="font-semibold text-green-800">
                    {formatCurrency(resultado.ingresosMensuales)}
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl">
                  <div className="text-2xl mb-2">📈</div>
                  <div className="text-sm text-gray-600">Tarifa aplicada</div>
                  <div className="font-semibold text-purple-800">
                    {resultado.tarifa}%
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Secciones Educativas - Ahora abajo del formulario */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Aprende más sobre formalización
          </h3>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <button
              onClick={() => setMostrarEducativo("rst")}
              className="bg-blue-100 hover:bg-blue-200 p-6 rounded-xl text-center transition-all duration-200 hover:shadow-lg"
            >
              <Info className="w-8 h-8 mx-auto mb-3 text-blue-600" />
              <div className="text-lg font-semibold text-blue-800 mb-2">
                ¿Qué es RST?
              </div>
              <div className="text-sm text-blue-600">
                Conoce el régimen tributario
              </div>
            </button>

            <button
              onClick={() => setMostrarEducativo("beneficios")}
              className="bg-green-100 hover:bg-green-200 p-6 rounded-xl text-center transition-all duration-200 hover:shadow-lg"
            >
              <CheckCircle className="w-8 h-8 mx-auto mb-3 text-green-600" />
              <div className="text-lg font-semibold text-green-800 mb-2">
                Beneficios
              </div>
              <div className="text-sm text-green-600">
                Ventajas de formalizarse
              </div>
            </button>

            <button
              onClick={() => setMostrarEducativo("mitos")}
              className="bg-yellow-100 hover:bg-yellow-200 p-6 rounded-xl text-center transition-all duration-200 hover:shadow-lg"
            >
              <AlertCircle className="w-8 h-8 mx-auto mb-3 text-yellow-600" />
              <div className="text-lg font-semibold text-yellow-800 mb-2">
                Mitos
              </div>
              <div className="text-sm text-yellow-600">
                Desmintiendo creencias falsas
              </div>
            </button>
          </div>

          {/* Modal Educativo */}
          {mostrarEducativo && (
            <div className="card max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  {mostrarEducativo === "rst" && "¿Qué es el RST?"}
                  {mostrarEducativo === "beneficios" &&
                    "Beneficios de formalizarse"}
                  {mostrarEducativo === "mitos" && "Mitos sobre impuestos"}
                </h3>
                <button
                  onClick={() => setMostrarEducativo(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="text-gray-600 text-lg leading-relaxed">
                {mostrarEducativo === "rst" && (
                  <div>
                    <p className="mb-4">
                      El Régimen Simple de Tributación (RST) es un sistema
                      simplificado para pequeñas empresas en Colombia.
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Una sola tarifa que incluye varios impuestos</li>
                      <li>Proceso simplificado de declaración</li>
                      <li>
                        Tarifas progresivas según el tiempo y tipo de actividad
                      </li>
                      <li>Ideal para microempresarios</li>
                    </ul>
                  </div>
                )}

                {mostrarEducativo === "beneficios" && (
                  <div>
                    <ul className="list-disc list-inside space-y-3">
                      <li>
                        <strong>Acceso a créditos:</strong> Los bancos confían
                        más en empresas formales
                      </li>
                      <li>
                        <strong>Seguridad social:</strong> Salud y pensión para
                        ti y tu familia
                      </li>
                      <li>
                        <strong>Clientes corporativos:</strong> Muchas empresas
                        solo compran a proveedores formales
                      </li>
                      <li>
                        <strong>Protección legal:</strong> Tu negocio está
                        protegido por la ley
                      </li>
                      <li>
                        <strong>Crecimiento:</strong> Puedes expandir sin
                        límites legales
                      </li>
                    </ul>
                  </div>
                )}

                {mostrarEducativo === "mitos" && (
                  <div>
                    <div className="space-y-4">
                      <div className="bg-red-50 p-4 rounded-lg">
                        <p className="font-semibold text-red-700 mb-2">
                          ❌ "Los impuestos son muy altos"
                        </p>
                        <p className="text-red-600">
                          ✅ En RST puedes pagar desde 0.8% hasta 3.5% de tus
                          ingresos
                        </p>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg">
                        <p className="font-semibold text-red-700 mb-2">
                          ❌ "Es muy complicado"
                        </p>
                        <p className="text-red-600">
                          ✅ RST simplifica todo en una sola declaración
                        </p>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg">
                        <p className="font-semibold text-red-700 mb-2">
                          ❌ "No vale la pena"
                        </p>
                        <p className="text-red-600">
                          ✅ Los beneficios superan ampliamente los costos
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>
            * Los cálculos son aproximados y basados en el RST vigente. Consulta
            con un contador para casos específicos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
