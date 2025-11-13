import React, { useState } from "react";
import { Calculator, Info, CheckCircle, AlertCircle } from "lucide-react";

const SimpleCalculator = () => {
  const [ingresos, setIngresos] = useState("");
  const [tipoActividad, setTipoActividad] = useState("venta-productos");
  const [tiempoNegocio, setTiempoNegocio] = useState("1-3-anos");
  const [resultado, setResultado] = useState(null);
  const [mostrarEducativo, setMostrarEducativo] = useState(false);

  // Cálculo local (sin backend)
  const calcularImpuestos = () => {
    const ingresosMensuales = parseFloat(ingresos.replace(/[^\d]/g, ""));
    if (!ingresosMensuales || ingresosMensuales <= 0) return;

    try {
      // Tabla de tarifas RST local
      const tarifasRST = {
        "venta-productos": {
          "1-3-anos": 0.008, // 0.8%
          "4-6-anos": 0.012, // 1.2%
          "7-mas-anos": 0.016, // 1.6%
        },
        "servicios-personales": {
          "1-3-anos": 0.015, // 1.5%
          "4-6-anos": 0.025, // 2.5%
          "7-mas-anos": 0.035, // 3.5%
        },
        "venta-ambulante": {
          "1-3-anos": 0.008, // 0.8%
          "4-6-anos": 0.012, // 1.2%
          "7-mas-anos": 0.016, // 1.6%
        },
        otro: {
          "1-3-anos": 0.015, // 1.5%
          "4-6-anos": 0.025, // 2.5%
          "7-mas-anos": 0.035, // 3.5%
        },
      };

      // Obtener tarifa según actividad y tiempo
      const tarifa = tarifasRST[tipoActividad]?.[tiempoNegocio] || 0.015;
      const impuestoMensual = ingresosMensuales * tarifa;

      // Nombres descriptivos para mostrar
      const tiposActividad = {
        "venta-productos": "Venta de productos",
        "servicios-personales": "Servicios personales",
        "venta-ambulante": "Venta ambulante",
        otro: "Otros",
      };

      const tiemposNegocio = {
        "1-3-anos": "1 a 3 años",
        "4-6-anos": "4 a 6 años",
        "7-mas-anos": "7 años o más",
      };

      setResultado({
        ingresosMensuales,
        tipoActividad: tiposActividad[tipoActividad],
        tiempoNegocio: tiemposNegocio[tiempoNegocio],
        tarifa: (tarifa * 100).toFixed(1), // Para mostrar como porcentaje
        impuestoMensual,
        impuestoAnual: impuestoMensual * 12,
        ingresosDespues: ingresosMensuales - impuestoMensual,
      });
    } catch (error) {
      console.error("Error calculando:", error);
    }
  };

  // Formateo de moneda (pesos colombianos)
  const formatMoney = (amount) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Formateo de input con separadores
  const formatInputValue = (value) => {
    const numero = value.replace(/[^\d]/g, "");
    return new Intl.NumberFormat("es-CO").format(numero);
  };

  return (
    <div className="space-y-8">
      {/* Main Calculator Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center">
          <Calculator className="w-6 h-6 mr-2 text-green-600" />
          📊 Información de tu negocio
        </h2>

        <div className="space-y-8">
          {/* Ingresos Input */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-4">
              💰 Ingresos mensuales promedio
            </label>
            <div className="relative">
              <span className="absolute left-4 top-4 text-gray-500 text-xl">
                $
              </span>
              <input
                type="text"
                value={ingresos}
                onChange={(e) => setIngresos(formatInputValue(e.target.value))}
                placeholder="800.000"
                className="w-full pl-12 pr-4 py-4 text-xl border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring focus:ring-green-200 transition-all"
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Ingresa el promedio mensual de tus ventas o ingresos
            </p>
          </div>

          {/* Tipo de Actividad */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-4">
              🏪 Tipo de actividad económica
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  value: "venta-productos",
                  label: "Venta de productos",
                  icon: "🛒",
                },
                {
                  value: "servicios-personales",
                  label: "Servicios personales",
                  icon: "👤",
                },
                {
                  value: "venta-ambulante",
                  label: "Venta ambulante",
                  icon: "🚶‍♂️",
                },
                { value: "otro", label: "Otro tipo", icon: "📋" },
              ].map((tipo) => (
                <label
                  key={tipo.value}
                  className={`cursor-pointer flex items-center p-4 border-2 rounded-xl transition-all ${
                    tipoActividad === tipo.value
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="tipoActividad"
                    value={tipo.value}
                    checked={tipoActividad === tipo.value}
                    onChange={(e) => setTipoActividad(e.target.value)}
                    className="sr-only"
                  />
                  <span className="text-2xl mr-3">{tipo.icon}</span>
                  <span className="font-medium text-gray-700">
                    {tipo.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Tiempo en el Negocio */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-4">
              📅 Tiempo en el negocio
            </label>
            <select
              value={tiempoNegocio}
              onChange={(e) => setTiempoNegocio(e.target.value)}
              className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring focus:ring-green-200 transition-all"
            >
              <option value="1-3-anos">1 a 3 años</option>
              <option value="4-6-anos">4 a 6 años</option>
              <option value="7-mas-anos">7 años o más</option>
            </select>
          </div>

          {/* Calculate Button */}
          <button
            onClick={calcularImpuestos}
            disabled={!ingresos}
            className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 disabled:scale-100 text-lg shadow-lg"
          >
            🧮 Calcular mis impuestos
          </button>
        </div>
      </div>

      {/* Results */}
      {resultado && (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            📊 Tus resultados
          </h3>

          {/* Main Result */}
          <div className="text-center bg-gradient-to-br from-green-500 to-teal-600 text-white p-8 rounded-2xl mb-8">
            <div className="text-6xl font-bold mb-4">
              {formatMoney(resultado.impuestoMensual)}
            </div>
            <div className="text-2xl mb-2">por mes en impuestos</div>
            <div className="text-lg opacity-90">
              Tarifa RST: {resultado.tarifa}%
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl text-center">
              <div className="text-3xl mb-3">📈</div>
              <div className="text-2xl font-bold text-blue-800 mb-2">
                {formatMoney(resultado.impuestoAnual)}
              </div>
              <div className="text-blue-600 font-medium">Impuesto anual</div>
            </div>

            <div className="bg-green-50 border border-green-200 p-6 rounded-xl text-center">
              <div className="text-3xl mb-3">💸</div>
              <div className="text-2xl font-bold text-green-800 mb-2">
                {formatMoney(resultado.ingresosDespues)}
              </div>
              <div className="text-green-600 font-medium">
                Ingresos después de impuestos
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 p-6 rounded-xl text-center">
              <div className="text-3xl mb-3">📊</div>
              <div className="text-2xl font-bold text-purple-800 mb-2">
                {resultado.tarifa}%
              </div>
              <div className="text-purple-600 font-medium">Tarifa efectiva</div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl">
            <h4 className="font-bold text-gray-800 mb-3">📝 Resumen:</h4>
            <ul className="space-y-2 text-gray-700">
              <li>
                <strong>Actividad:</strong> {resultado.tipoActividad}
              </li>
              <li>
                <strong>Tiempo en el negocio:</strong> {resultado.tiempoNegocio}
              </li>
              <li>
                <strong>Ingresos mensuales:</strong>{" "}
                {formatMoney(resultado.ingresosMensuales)}
              </li>
              <li>
                <strong>Tarifa RST aplicada:</strong> {resultado.tarifa}%
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Educational Content */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800">
            📚 ¿Qué es el RST?
          </h3>
          <button
            onClick={() => setMostrarEducativo(!mostrarEducativo)}
            className="flex items-center text-green-600 hover:text-green-700 font-medium"
          >
            <Info className="w-5 h-5 mr-2" />
            {mostrarEducativo ? "Ocultar" : "Más info"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">
                Simplificación tributaria
              </h4>
              <p className="text-gray-600 text-sm">
                Una sola tarifa para todos tus impuestos nacionales
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">
                Tarifas preferenciales
              </h4>
              <p className="text-gray-600 text-sm">
                Porcentajes más bajos que el régimen ordinario
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">
                Menos papelería
              </h4>
              <p className="text-gray-600 text-sm">
                Declaraciones más simples y menos documentos
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">
                Ideal para PYMES
              </h4>
              <p className="text-gray-600 text-sm">
                Pensado para pequeñas y medianas empresas
              </p>
            </div>
          </div>
        </div>

        {mostrarEducativo && (
          <div className="border-t border-gray-200 pt-6">
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-amber-800 mb-2">
                    ⚠️ Importante recordar:
                  </h4>
                  <ul className="text-amber-700 text-sm space-y-1">
                    <li>
                      • Esta es una simulación con fines educativos únicamente
                    </li>
                    <li>
                      • Los cálculos pueden variar según tu situación específica
                    </li>
                    <li>
                      • Consulta siempre con un contador o la DIAN para casos
                      oficiales
                    </li>
                    <li>
                      • Las tarifas pueden cambiar según la normativa vigente
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleCalculator;
