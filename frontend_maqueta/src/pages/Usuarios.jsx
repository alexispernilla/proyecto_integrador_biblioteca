import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080/usuarios';

const Usuarios = () => {
  const [formData, setFormData] = useState({
    id: '',
    documento: '',
    nombre: '',
    apellido: '',
    telefono: '',
    correo: ''
  });
  const [usuariosList, setUsuariosList] = useState([]);

  // Cargar usuarios al entrar
  useEffect(() => {
    getUsuarios();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const limpiarCampos = () => {
    setFormData({
      id: '',
      documento: '',
      nombre: '',
      apellido: '',
      telefono: '',
      correo: ''
    });
  };

  // endPoint del API para consulta general
  const getUsuarios = () => {
    axios.get(API_URL)
      .then(response => {
        setUsuariosList(response.data);
      })
      .catch(error => console.error("Error al obtener usuarios:", error));
  };

  // endPoint del API para crear
  const crearUsuario = () => {
    const { id, ...dataToCreate } = formData;
    axios.post(API_URL, dataToCreate)
      .then(() => {
        getUsuarios();
        limpiarCampos();
      })
      .catch(error => console.error("Error al agregar usuario:", error));
  };

  // endPoint del API para buscar por ID
  const buscarUsuario = () => {
    if (!formData.id) {
      alert("Por favor ingrese el ID para buscar");
      return;
    }
    axios.get(`${API_URL}/${formData.id}`)
      .then(response => {
        const data = response.data;
        setFormData({
          id: data.id || '',
          documento: data.documento || '',
          nombre: data.nombre || '',
          apellido: data.apellido || '',
          telefono: data.telefono || '',
          correo: data.correo || ''
        });
      })
      .catch(error => alert("Usuario no registrado"));
  };

  // endPoint del API para modificar
  const modificarUsuario = () => {
    if (!formData.id) {
      alert("Por favor ingrese el ID para modificar");
      return;
    }
    axios.put(`${API_URL}/${formData.id}`, formData)
      .then(() => {
        getUsuarios();
        limpiarCampos();
      })
      .catch(error => console.error("Error al modificar usuario:", error));
  };

  // endPoint del API para eliminar
  const eliminarUsuario = () => {
    if (!formData.id) {
      alert("Por favor ingrese el ID para eliminar");
      return;
    }
    if (confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      axios.delete(`${API_URL}/${formData.id}`)
        .then(() => {
          getUsuarios();
          limpiarCampos();
        })
        .catch(error => console.error("Error al eliminar usuario:", error));
    }
  };

  const usuariosFiltrados = usuariosList.filter(usuario => {
    let matchId = true;
    let matchDoc = true;
    let matchNombre = true;

    if (formData.id) matchId = usuario.id.toString() === formData.id;
    if (formData.documento) matchDoc = usuario.documento.includes(formData.documento);
    if (formData.nombre) matchNombre = usuario.nombre.toLowerCase().includes(formData.nombre.toLowerCase());

    return matchId && matchDoc && matchNombre;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Usuarios</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <input type="text" name="id" value={formData.id} onChange={handleChange} placeholder="Id. Usuario (Buscar/Modificar/Eliminar)" className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none" />
        <input type="text" name="documento" value={formData.documento} onChange={handleChange} placeholder="Documento" className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none" />
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none" />
        <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} placeholder="Apellido" className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none" />
        <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Teléfono" className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none" />
        <input type="email" name="correo" value={formData.correo} onChange={handleChange} placeholder="Correo" className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none" />
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <button onClick={crearUsuario} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-medium">Agregar</button>
        <button onClick={getUsuarios} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition font-medium">Consultar Todo</button>
        <button onClick={buscarUsuario} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition font-medium">Buscar</button>
        <button onClick={modificarUsuario} className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition font-medium">Modificar</button>
        <button onClick={eliminarUsuario} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition font-medium">Eliminar</button>
        <button onClick={limpiarCampos} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition font-medium">Limpiar Campos</button>
      </div>

      {usuariosFiltrados.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200 text-sm uppercase text-gray-600">
                <th className="p-3">ID</th>
                <th className="p-3">Documento</th>
                <th className="p-3">Nombre</th>
                <th className="p-3">Apellido</th>
                <th className="p-3">Teléfono</th>
                <th className="p-3">Correo</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.map(usuario => (
                <tr key={usuario.id} className="border-b border-gray-100 hover:bg-indigo-50 transition cursor-pointer" onClick={() => setFormData(usuario)}>
                  <td className="p-3 font-medium text-indigo-600">{usuario.id}</td>
                  <td className="p-3">{usuario.documento}</td>
                  <td className="p-3">{usuario.nombre}</td>
                  <td className="p-3">{usuario.apellido}</td>
                  <td className="p-3">{usuario.telefono}</td>
                  <td className="p-3">{usuario.correo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center p-8 text-gray-500 bg-gray-50 rounded-lg">No hay usuarios registrados. Usa el botón "Consultar Todo" o agrega uno nuevo.</div>
      )}
    </div>
  );
};

export default Usuarios;
