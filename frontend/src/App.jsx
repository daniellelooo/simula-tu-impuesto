import React, { useState, useEffect } from "react";
import { LogOut, User } from "lucide-react";
import AuthModal from "./components/AuthModal";
import AdvancedCalculator from "./components/AdvancedCalculator";
import SimpleCalculator from "./components/SimpleCalculator";

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [useAdvanced, setUseAdvanced] = useState(false);

  // Verificar si hay un token guardado al cargar la app
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("token", authToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setShowAuth(false);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUseAdvanced(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              🧮 Simula tu Impuesto
            </h1>
            <p className="text-sm text-gray-600">
              Calculadora de Régimen Simple de Tributación (RST)
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg">
                  <User className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    {user.name || user.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-red-600 hover:text-red-700 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  <span className="text-sm">Salir</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Iniciar Sesión
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Mode Toggle */}
        <div className="mb-8 bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => setUseAdvanced(false)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                !useAdvanced
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              📊 Calculadora Básica
            </button>
            <button
              onClick={() => setUseAdvanced(true)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                useAdvanced
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              disabled={!user}
            >
              🚀 Calculadora Avanzada
              {!user && <span className="text-xs block">(Requiere login)</span>}
            </button>
          </div>
        </div>

        {/* Calculator Component */}
        {useAdvanced ? (
          <AdvancedCalculator user={user} token={token} />
        ) : (
          <SimpleCalculator />
        )}

        {/* Info Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              💡 ¿Qué es el RST?
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              El Régimen Simple de Tributación (RST) es un sistema especial para
              pequeñas empresas que simplifica el pago de impuestos. Permite
              pagar un porcentaje fijo sobre los ingresos brutos.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              📈 Beneficios
            </h3>
            <ul className="text-gray-600 text-sm space-y-1">
              <li>• Simplificación tributaria</li>
              <li>• Menor carga administrativa</li>
              <li>• Tarifas preferenciales</li>
              <li>• Facilidad de cálculo</li>
            </ul>
          </div>
        </div>
      </main>

      {/* Auth Modal */}
      {showAuth && (
        <AuthModal onClose={() => setShowAuth(false)} onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
