import React, { useState } from "react";

// Aquí guardamos la dirección del servidor donde está la API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { User, Lock, Mail, UserPlus, LogIn } from "lucide-react";

// Este componente muestra la ventana para iniciar sesión o registrarse
// onClose: sirve para cerrar la ventana
// onLogin: sirve para avisar que el usuario ya inició sesión
const AuthModal = ({ onClose, onLogin }) => {
  // Si es true, estamos en modo "iniciar sesión". Si es false, en "registrar"
  const [isLogin, setIsLogin] = useState(true);
  // Aquí guardamos lo que el usuario escribe en los campos
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  // Esto sirve para mostrar un mensaje de "cargando..." mientras se procesa
  const [loading, setLoading] = useState(false);
  // Aquí guardamos los mensajes de error para mostrarlos si algo sale mal
  const [error, setError] = useState("");

  // Esta función se ejecuta cuando el usuario le da al botón de enviar
  // Puede ser para iniciar sesión o para crear una cuenta nueva
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue
    setLoading(true); // Muestra el mensaje de cargando
    setError(""); // Borra errores anteriores

    try {
      // Aquí enviamos los datos al servidor
      // "action" dice si es login o registro
      const response = await fetch(`${API_BASE_URL}/api/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: isLogin ? "login" : "register",
          ...formData,
        }),
      });

      // Recibimos la respuesta del servidor
      const data = await response.json();

      if (data.success) {
        // Si todo salió bien:
        // Guardamos el usuario y el token para recordar que ya inició sesión
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        // Avisamos al resto de la app que el usuario ya está autenticado
        onLogin(data.data.user, data.data.token);
        // Cerramos la ventana
        onClose();
      } else {
        // Si hubo algún error, lo mostramos
        setError(data.error || "Error en la autenticación");
      }
    } catch (err) {
      // Si no pudimos conectar con el servidor, mostramos este error
      setError({
        value: err,
        message: "No se pudo conectar con el servidor. Intenta más tarde.",
      });
    } finally {
      setLoading(false); // Quitamos el mensaje de cargando
    }
  };

  // Esta función actualiza lo que el usuario escribe en los campos
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4">
        <div className="text-center mb-6">
          <div className="text-3xl mb-2">
            {isLogin ? (
              <LogIn className="mx-auto w-12 h-12 text-green-600" />
            ) : (
              <UserPlus className="mx-auto w-12 h-12 text-green-600" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            {isLogin
              ? "Accede a tu historial de cálculos"
              : "Guarda y descarga tus cálculos"}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="inline w-4 h-4 mr-2" />
                Nombre (opcional)
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Tu nombre"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="inline w-4 h-4 mr-2" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Lock className="inline w-4 h-4 mr-2" />
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            {loading
              ? "Cargando..."
              : isLogin
              ? "Iniciar Sesión"
              : "Crear Cuenta"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-green-600 hover:text-green-700 text-sm"
          >
            {isLogin
              ? "¿No tienes cuenta? Regístrate"
              : "¿Ya tienes cuenta? Inicia sesión"}
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
