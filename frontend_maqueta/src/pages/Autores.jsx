import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080/autors';

const Autores = () => {
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    apellido: '',
    nacionalidad: ''
  });
  const [autoresList, setAutoresList] = useState([]);

  useEffect(() => {
    getAutores();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const limpiarCampos = () => {
    setFormData({
      id: '',
      nombre: '',
      apellido: '',
      nacionalidad: ''
    });
  };

  const getAutores = () => {
    axios.get(API_URL)
      .then(response => setAutoresList(response.data))
      .catch(error => console.error("Error al obtener autores:", error));
  };

  const crearAutor = () => {
    const { id, ...dataToCreate } = formData;
    axios.post(API_URL, dataToCreate)
      .then(() => {
        getAutores();
        limpiarCampos();
      })
      .catch(error => console.error("Error al agregar autor:", error));
  };

  const buscarAutor = () => {
    if (!formData.id) {
      alert("Por favor ingrese el ID para buscar");
      return;
    }
    axios.get(`${API_URL}/${formData.id}`)
      .then(response => {
        const data = response.data;
        setFormData({
          id: data.id || '',
          nombre: data.nombre || '',
          apellido: data.apellido || '',
          nacionalidad: data.nacionalidad || ''
        });
      })
      .catch(error => alert("Autor no registrado"));
  };

  const modificarAutor = () => {
    if (!formData.id) {
      alert("Por favor ingrese el ID para modificar");
      return;
    }
    axios.put(`${API_URL}/${formData.id}`, formData)
      .then(() => {
        getAutores();
        limpiarCampos();
      })
      .catch(error => console.error("Error al modificar autor:", error));
  };

  const eliminarAutor = () => {
    if (!formData.id) {
      alert("Por favor ingrese el ID para eliminar");
      return;
    }
    if (confirm("¿Estás seguro de que quieres eliminar este autor?")) {
      axios.delete(`${API_URL}/${formData.id}`)
        .then(() => {
          getAutores();
          limpiarCampos();
        })
        .catch(error => console.error("Error al eliminar autor:", error));
    }
  };

  const autoresFiltrados = autoresList.filter(autor => {
    let matchId = true;
    let matchNombre = true;
    let matchApellido = true;
    if (formData.id) matchId = autor.id.toString() === formData.id;
    if (formData.nombre) matchNombre = autor.nombre.toLowerCase().includes(formData.nombre.toLowerCase());
    if (formData.apellido) matchApellido = autor.apellido.toLowerCase().includes(formData.apellido.toLowerCase());
    return matchId && matchNombre && matchApellido;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Autores</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <input type="text" name="id" value={formData.id} onChange={handleChange} placeholder="ID (Buscar/Modificar/Eliminar)" className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none" />
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none" />
        <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} placeholder="Apellido" className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none" />
        <input type="text" name="nacionalidad" value={formData.nacionalidad} onChange={handleChange} placeholder="Nacionalidad" className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none" />
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <button onClick={crearAutor} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-medium">Agregar</button>
        <button onClick={getAutores} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition font-medium">Consultar Todo</button>
        <button onClick={buscarAutor} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition font-medium">Buscar</button>
        <button onClick={modificarAutor} className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition font-medium">Modificar</button>
        <button onClick={eliminarAutor} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition font-medium">Eliminar</button>
        <button onClick={limpiarCampos} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition font-medium">Limpiar Campos</button>
      </div>

      {autoresFiltrados.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200 text-sm uppercase text-gray-600">
                <th className="p-3">ID</th>
                <th className="p-3">Nombre</th>
                <th className="p-3">Apellido</th>
                <th className="p-3">Nacionalidad</th>
              </tr>
            </thead>
            <tbody>
              {autoresFiltrados.map(autor => (
                <tr key={autor.id} className="border-b border-gray-100 hover:bg-indigo-50 transition cursor-pointer" onClick={() => setFormData(autor)}>
                  <td className="p-3 font-medium text-indigo-600">{autor.id}</td>
                  <td className="p-3">{autor.nombre}</td>
                  <td className="p-3">{autor.apellido}</td>
                  <td className="p-3">{autor.nacionalidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center p-8 text-gray-500 bg-gray-50 rounded-lg">No hay autores registrados. Usa el botón "Consultar Todo" o agrega uno nuevo.</div>
      )}
    </div>
  );
};

export default Autores;
