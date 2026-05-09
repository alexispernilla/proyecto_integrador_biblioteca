import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080/categorias';

const Categorias = () => {
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    descripcion: ''
  });
  const [categoriasList, setCategoriasList] = useState([]);

  useEffect(() => {
    getCategorias();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const limpiarCampos = () => {
    setFormData({
      id: '',
      nombre: '',
      descripcion: ''
    });
  };

  const getCategorias = () => {
    axios.get(API_URL)
      .then(response => setCategoriasList(response.data))
      .catch(error => console.error("Error al obtener categorias:", error));
  };

  const crearCategoria = () => {
    const { id, ...dataToCreate } = formData;
    axios.post(API_URL, dataToCreate)
      .then(() => {
        getCategorias();
        limpiarCampos();
      })
      .catch(error => console.error("Error al agregar categoria:", error));
  };

  const buscarCategoria = () => {
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
          descripcion: data.descripcion || ''
        });
      })
      .catch(error => alert("Categoría no registrada"));
  };

  const modificarCategoria = () => {
    if (!formData.id) {
      alert("Por favor ingrese el ID para modificar");
      return;
    }
    axios.put(`${API_URL}/${formData.id}`, formData)
      .then(() => {
        getCategorias();
        limpiarCampos();
      })
      .catch(error => console.error("Error al modificar categoria:", error));
  };

  const eliminarCategoria = () => {
    if (!formData.id) {
      alert("Por favor ingrese el ID para eliminar");
      return;
    }
    if (confirm("¿Estás seguro de que quieres eliminar esta categoría?")) {
      axios.delete(`${API_URL}/${formData.id}`)
        .then(() => {
          getCategorias();
          limpiarCampos();
        })
        .catch(error => console.error("Error al eliminar categoria:", error));
    }
  };

  const categoriasFiltradas = categoriasList.filter(cat => {
    let matchId = true;
    let matchNombre = true;
    if (formData.id) matchId = cat.id.toString() === formData.id;
    if (formData.nombre) matchNombre = cat.nombre.toLowerCase().includes(formData.nombre.toLowerCase());
    return matchId && matchNombre;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Categorías</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input type="text" name="id" value={formData.id} onChange={handleChange} placeholder="ID (Buscar/Modificar/Eliminar)" className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none" />
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre de la Categoría" className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none" />
        <input type="text" name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Descripción" className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none" />
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <button onClick={crearCategoria} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-medium">Agregar</button>
        <button onClick={getCategorias} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition font-medium">Consultar Todo</button>
        <button onClick={buscarCategoria} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition font-medium">Buscar</button>
        <button onClick={modificarCategoria} className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition font-medium">Modificar</button>
        <button onClick={eliminarCategoria} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition font-medium">Eliminar</button>
        <button onClick={limpiarCampos} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition font-medium">Limpiar Campos</button>
      </div>

      {categoriasFiltradas.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200 text-sm uppercase text-gray-600">
                <th className="p-3">ID</th>
                <th className="p-3">Nombre</th>
                <th className="p-3">Descripción</th>
              </tr>
            </thead>
            <tbody>
              {categoriasFiltradas.map(categoria => (
                <tr key={categoria.id} className="border-b border-gray-100 hover:bg-indigo-50 transition cursor-pointer" onClick={() => setFormData(categoria)}>
                  <td className="p-3 font-medium text-indigo-600">{categoria.id}</td>
                  <td className="p-3">{categoria.nombre}</td>
                  <td className="p-3">{categoria.descripcion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center p-8 text-gray-500 bg-gray-50 rounded-lg">No hay categorías registradas. Usa el botón "Consultar Todo" o agrega una nueva.</div>
      )}
    </div>
  );
};

export default Categorias;
