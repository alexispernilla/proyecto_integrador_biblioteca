import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080/empleados';

const Empleados = () => {
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    correo: '',
    contrasena: '',
    rol: 'OPERADOR'
  });
  const [empleadosList, setEmpleadosList] = useState([]);

  useEffect(() => {
    getEmpleados();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const limpiarCampos = () => {
    setFormData({
      id: '',
      nombre: '',
      correo: '',
      contrasena: '',
      rol: 'OPERADOR'
    });
  };

  const getEmpleados = () => {
    axios.get(API_URL).then(res => setEmpleadosList(res.data)).catch(console.error);
  };

  const crearEmpleado = () => {
    const { id, ...dataToCreate } = formData;
    axios.post(API_URL, dataToCreate)
      .then(() => {
        getEmpleados();
        limpiarCampos();
      })
      .catch(error => alert("Error: El correo podría estar en uso."));
  };

  const buscarEmpleado = () => {
    if (!formData.id) return alert("Por favor ingrese el ID");
    axios.get(`${API_URL}/${formData.id}`)
      .then(response => setFormData(response.data))
      .catch(() => alert("Empleado no registrado"));
  };

  const modificarEmpleado = () => {
    if (!formData.id) return alert("Por favor ingrese el ID");
    axios.put(`${API_URL}/${formData.id}`, formData)
      .then(() => {
        getEmpleados();
        limpiarCampos();
      })
      .catch(console.error);
  };

  const eliminarEmpleado = () => {
    if (!formData.id) return alert("Por favor ingrese el ID");
    if (confirm("¿Seguro que quieres eliminar a este empleado?")) {
      axios.delete(`${API_URL}/${formData.id}`)
        .then(() => {
          getEmpleados();
          limpiarCampos();
        })
        .catch(console.error);
    }
  };

  const empleadosFiltrados = empleadosList.filter(emp => {
    let matchId = true;
    let matchNombre = true;
    let matchCorreo = true;
    if (formData.id) matchId = emp.id.toString() === formData.id;
    if (formData.nombre) matchNombre = emp.nombre.toLowerCase().includes(formData.nombre.toLowerCase());
    if (formData.correo) matchCorreo = emp.correo.toLowerCase().includes(formData.correo.toLowerCase());
    return matchId && matchNombre && matchCorreo;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Operadores (Solo Jefe)</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <input type="text" name="id" value={formData.id} onChange={handleChange} placeholder="Id. Empleado (Buscar/Modificar/Eliminar)" className="p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-indigo-500" />
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre Completo" className="p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-indigo-500" />
        <input type="email" name="correo" value={formData.correo} onChange={handleChange} placeholder="Correo Electrónico" className="p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-indigo-500" />
        <input type="password" name="contrasena" value={formData.contrasena} onChange={handleChange} placeholder="Contraseña" className="p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-indigo-500" />
        <select name="rol" value={formData.rol} onChange={handleChange} className="p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="OPERADOR">OPERADOR</option>
          <option value="JEFE">JEFE</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <button onClick={crearEmpleado} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium transition">Agregar</button>
        <button onClick={buscarEmpleado} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 font-medium transition">Buscar</button>
        <button onClick={modificarEmpleado} className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 font-medium transition">Modificar</button>
        <button onClick={eliminarEmpleado} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-medium transition">Eliminar</button>
        <button onClick={limpiarCampos} className="px-4 py-2 bg-gray-200 text-gray-800 rounded font-medium transition">Limpiar</button>
      </div>

      {empleadosFiltrados.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200 text-sm uppercase text-gray-600">
                  <th className="p-3">ID</th>
                  <th className="p-3">Nombre</th>
                  <th className="p-3">Correo</th>
                  <th className="p-3">Rol</th>
                </tr>
              </thead>
              <tbody>
                {empleadosFiltrados.map(emp => (
                  <tr key={emp.id} className="border-b border-gray-100 hover:bg-indigo-50 transition cursor-pointer" onClick={() => setFormData({...emp, contrasena: ''})}>
                    <td className="p-3 font-medium text-indigo-600">{emp.id}</td>
                    <td className="p-3">{emp.nombre}</td>
                    <td className="p-3">{emp.correo}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded text-xs font-bold ${emp.rol === 'JEFE' ? 'bg-purple-100 text-purple-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {emp.rol}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      ) : (
          <div className="text-center p-8 text-gray-500 bg-gray-50 rounded-lg">No hay empleados registrados.</div>
      )}
    </div>
  );
};

export default Empleados;
