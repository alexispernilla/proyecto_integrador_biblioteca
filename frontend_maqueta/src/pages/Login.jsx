import { useState } from 'react';
import axios from 'axios';
import { Library, Lock, Mail } from 'lucide-react';

const Login = ({ setEmpleado }) => {
  const [credenciales, setCredenciales] = useState({ correo: '', contrasena: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredenciales({ ...credenciales, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/empleados/login', credenciales);
      const empleado = response.data;
      localStorage.setItem('empleado', JSON.stringify(empleado));
      setEmpleado(empleado);
    } catch (err) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center text-indigo-600">
          <Library size={48} />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          BiblioTech
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Panel Administrativo
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Correo Electrónico
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="correo"
                  required
                  className="pl-10 block w-full p-2.5 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm outline-none"
                  placeholder="admin@biblioteca.com"
                  value={credenciales.correo}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="contrasena"
                  required
                  className="pl-10 block w-full p-2.5 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm outline-none"
                  placeholder="••••••••"
                  value={credenciales.contrasena}
                  onChange={handleChange}
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center font-medium">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
              >
                Ingresar al Sistema
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
