import { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

const API_URL = 'http://localhost:8080/libros';
const API_AUTORES = 'http://localhost:8080/autors';
const API_CATEGORIAS = 'http://localhost:8080/categorias';

const Libros = () => {
  const [formData, setFormData] = useState({
    id: '',
    titulo: '',
    isbn: '',
    editorial: '',
    anioPublicacion: '',
    cantidadEjemplares: '',
    disponible: 'true',
    autorId: '',
    categoriaId: ''
  });
  
  const [librosList, setLibrosList] = useState([]);
  const [autoresList, setAutoresList] = useState([]);
  const [categoriasList, setCategoriasList] = useState([]);

  useEffect(() => {
    getLibros();
    getAutores();
    getCategorias();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const limpiarCampos = () => {
    setFormData({
      id: '',
      titulo: '',
      isbn: '',
      editorial: '',
      anioPublicacion: '',
      cantidadEjemplares: '',
      disponible: 'true',
      autorId: '',
      categoriaId: ''
    });
  };

  const getLibros = () => {
    axios.get(API_URL)
      .then(response => setLibrosList(response.data))
      .catch(error => console.error("Error al obtener libros:", error));
  };

  const getAutores = () => {
    axios.get(API_AUTORES)
      .then(response => setAutoresList(response.data))
      .catch(error => console.error("Error al obtener autores:", error));
  };

  const getCategorias = () => {
    axios.get(API_CATEGORIAS)
      .then(response => setCategoriasList(response.data))
      .catch(error => console.error("Error al obtener categorias:", error));
  };

  const crearLibro = () => {
    if (!formData.autorId || !formData.categoriaId) {
        alert("Debes seleccionar un autor y una categoría");
        return;
    }
    const { id, autorId, categoriaId, ...dataToCreate } = formData;
    
    const payload = {
        ...dataToCreate, 
        disponible: formData.disponible === 'true',
        autor: { id: parseInt(autorId) },
        categoria: { id: parseInt(categoriaId) }
    };

    axios.post(API_URL, payload)
      .then(() => {
        getLibros();
        limpiarCampos();
        alert("Libro registrado con éxito");
      })
      .catch(error => {
        console.error("Error al agregar libro:", error);
        alert(error.response?.data?.message || "Error al registrar el libro.");
      });
  };

  const buscarLibro = () => {
    if (!formData.id) {
      alert("Por favor ingrese el ID para buscar");
      return;
    }
    axios.get(`${API_URL}/${formData.id}`)
      .then(response => {
        const data = response.data;
        setFormData({
          id: data.id || '',
          titulo: data.titulo || '',
          isbn: data.isbn || '',
          editorial: data.editorial || '',
          anioPublicacion: data.anioPublicacion || '',
          cantidadEjemplares: data.cantidadEjemplares || '',
          disponible: data.disponible ? 'true' : 'false',
          autorId: data.autor?.id || '',
          categoriaId: data.categoria?.id || ''
        });
      })
      .catch(error => alert("Libro no registrado"));
  };

  const modificarLibro = () => {
    if (!formData.id) {
      alert("Por favor ingrese el ID para modificar");
      return;
    }
    
    const payload = {
        ...formData,
        disponible: formData.disponible === 'true',
        autor: { id: parseInt(formData.autorId) },
        categoria: { id: parseInt(formData.categoriaId) }
    };

    axios.put(`${API_URL}/${formData.id}`, payload)
      .then(() => {
        getLibros();
        limpiarCampos();
        alert("Libro modificado con éxito");
      })
      .catch(error => console.error("Error al modificar libro:", error));
  };

  const eliminarLibro = () => {
    if (!formData.id) {
      alert("Por favor ingrese el ID para eliminar");
      return;
    }
    if (confirm("¿Estás seguro de que quieres eliminar este libro?")) {
      axios.delete(`${API_URL}/${formData.id}`)
        .then(() => {
          getLibros();
          limpiarCampos();
        })
        .catch(error => alert("No se puede eliminar. Verifica que no tenga préstamos activos."));
    }
  };

  const autorOptions = autoresList.map(a => ({
    value: a.id,
    label: `${a.nombre} ${a.apellido}`
  }));

  const categoriaOptions = categoriasList.map(c => ({
    value: c.id,
    label: c.nombre
  }));

  const librosFiltrados = librosList.filter(libro => {
    let matchId = true;
    let matchTitulo = true;
    let matchIsbn = true;
    if (formData.id) matchId = libro.id.toString() === formData.id;
    if (formData.titulo) matchTitulo = libro.titulo.toLowerCase().includes(formData.titulo.toLowerCase());
    if (formData.isbn) matchIsbn = libro.isbn.includes(formData.isbn);
    return matchId && matchTitulo && matchIsbn;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Libros</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <input type="text" name="id" value={formData.id} onChange={handleChange} placeholder="Id. Libro (Buscar/Modificar/Eliminar)" className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none" />
        <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} placeholder="Título" className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none" />
        <input type="text" name="isbn" value={formData.isbn} onChange={handleChange} placeholder="ISBN" className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none" />
        <input type="text" name="editorial" value={formData.editorial} onChange={handleChange} placeholder="Editorial" className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none" />
        <input type="number" name="anioPublicacion" value={formData.anioPublicacion} onChange={handleChange} placeholder="Año de Publicación" className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none" />
        <input type="number" name="cantidadEjemplares" value={formData.cantidadEjemplares} onChange={handleChange} placeholder="Cantidad de Ejemplares" className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none" />
        
        <div className="z-30 relative">
            <Select 
                options={autorOptions} 
                onChange={(option) => setFormData({ ...formData, autorId: option ? option.value : '' })}
                value={autorOptions.find(o => o.value === formData.autorId) || null}
                placeholder="🔍 Buscar Autor..."
                isClearable
                noOptionsMessage={() => "Autor no encontrado"}
            />
        </div>

        <div className="z-20 relative">
            <Select 
                options={categoriaOptions} 
                onChange={(option) => setFormData({ ...formData, categoriaId: option ? option.value : '' })}
                value={categoriaOptions.find(o => o.value === formData.categoriaId) || null}
                placeholder="🔍 Buscar Categoría..."
                isClearable
                noOptionsMessage={() => "Categoría no encontrada"}
            />
        </div>

        <select name="disponible" value={formData.disponible} onChange={handleChange} className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none">
            <option value="true">Disponible</option>
            <option value="false">Agotado</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <button onClick={crearLibro} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-medium">Agregar</button>
        <button onClick={getLibros} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition font-medium">Consultar Todo</button>
        <button onClick={buscarLibro} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition font-medium">Buscar</button>
        <button onClick={modificarLibro} className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition font-medium">Modificar</button>
        <button onClick={eliminarLibro} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition font-medium">Eliminar</button>
        <button onClick={limpiarCampos} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition font-medium">Limpiar Campos</button>
      </div>

      {librosFiltrados.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200 text-sm uppercase text-gray-600">
                <th className="p-3">ID</th>
                <th className="p-3">Título</th>
                <th className="p-3">ISBN</th>
                <th className="p-3">Autor</th>
                <th className="p-3">Categoría</th>
                <th className="p-3">Año</th>
                <th className="p-3">Ejemplares</th>
                <th className="p-3">Disponible</th>
              </tr>
            </thead>
            <tbody>
              {librosFiltrados.map(libro => (
                <tr key={libro.id} className="border-b border-gray-100 hover:bg-indigo-50 transition cursor-pointer" onClick={() => setFormData({
                  id: libro.id,
                  titulo: libro.titulo,
                  isbn: libro.isbn,
                  editorial: libro.editorial,
                  anioPublicacion: libro.anioPublicacion,
                  cantidadEjemplares: libro.cantidadEjemplares,
                  disponible: libro.disponible ? 'true' : 'false',
                  autorId: libro.autor?.id || '',
                  categoriaId: libro.categoria?.id || ''
                })}>
                  <td className="p-3 font-medium text-indigo-600">{libro.id}</td>
                  <td className="p-3">{libro.titulo}</td>
                  <td className="p-3">{libro.isbn}</td>
                  <td className="p-3">{libro.autor?.nombre} {libro.autor?.apellido}</td>
                  <td className="p-3">{libro.categoria?.nombre}</td>
                  <td className="p-3">{libro.anioPublicacion}</td>
                  <td className="p-3">{libro.cantidadEjemplares}</td>
                  <td className="p-3">{libro.disponible ? 'Sí' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center p-8 text-gray-500 bg-gray-50 rounded-lg">No hay libros registrados. Usa el botón "Consultar Todo" o agrega uno nuevo.</div>
      )}
    </div>
  );
};

export default Libros;
