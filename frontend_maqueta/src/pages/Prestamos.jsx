import { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { ArrowLeftRight, CheckCircle } from 'lucide-react';

const API_URL = 'http://localhost:8080/prestamos';
const API_USUARIOS = 'http://localhost:8080/usuarios';
const API_LIBROS = 'http://localhost:8080/libros';

const Prestamos = () => {
  const [formData, setFormData] = useState({
    id: '',
    fechaPrestamo: '',
    fechaDevolucion: '',
    estado: 'Prestado',
    usuarioId: '',
    libroId: ''
  });
  const [prestamosList, setPrestamosList] = useState([]);
  const [usuariosList, setUsuariosList] = useState([]);
  const [librosList, setLibrosList] = useState([]);

  useEffect(() => {
    getPrestamos();
    getUsuarios();
    getLibros();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const limpiarCampos = () => {
    setFormData({
      id: '',
      fechaPrestamo: '',
      fechaDevolucion: '',
      estado: 'Prestado',
      usuarioId: '',
      libroId: ''
    });
  };

  const getPrestamos = () => {
    axios.get(API_URL).then(res => setPrestamosList(res.data)).catch(console.error);
  };

  const getUsuarios = () => {
    axios.get(API_USUARIOS).then(res => setUsuariosList(res.data)).catch(console.error);
  };

  const getLibros = () => {
    axios.get(API_LIBROS).then(res => setLibrosList(res.data)).catch(console.error);
  };

  const crearPrestamo = () => {
    if (!formData.usuarioId || !formData.libroId) {
        alert("Debes seleccionar un usuario y un libro.");
        return;
    }
    const { id, usuarioId, libroId, ...dataToCreate } = formData;
    
    const payload = {
      ...dataToCreate,
      usuario: { id: parseInt(usuarioId) },
      libro: { id: parseInt(libroId) }
    };

    axios.post(API_URL, payload)
      .then(() => {
        getPrestamos();
        limpiarCampos();
        alert("Préstamo registrado con éxito");
      })
      .catch(error => {
          console.error("Error al agregar prestamo:", error);
          alert(error.response?.data?.message || error.response?.data || "Error al registrar el préstamo.");
      });
  };

  const buscarPrestamo = () => {
    if (!formData.id) {
      alert("Por favor ingrese el ID para buscar");
      return;
    }
    axios.get(`${API_URL}/${formData.id}`)
      .then(response => {
        const data = response.data;
        setFormData({
          id: data.id || '',
          fechaPrestamo: data.fechaPrestamo || '',
          fechaDevolucion: data.fechaDevolucion || '',
          estado: data.estado || 'Prestado',
          usuarioId: data.usuario?.id || '',
          libroId: data.libro?.id || ''
        });
      })
      .catch(error => alert("Préstamo no registrado"));
  };

  const modificarPrestamo = () => {
    if (!formData.id) {
      alert("Por favor ingrese el ID para modificar");
      return;
    }
    
    const payload = {
      id: formData.id,
      fechaPrestamo: formData.fechaPrestamo,
      fechaDevolucion: formData.fechaDevolucion,
      estado: formData.estado,
      usuario: { id: parseInt(formData.usuarioId) },
      libro: { id: parseInt(formData.libroId) }
    };

    axios.put(`${API_URL}/${formData.id}`, payload)
      .then(() => {
        getPrestamos();
        limpiarCampos();
        alert("Préstamo modificado");
      })
      .catch(error => console.error("Error al modificar prestamo:", error));
  };

  const eliminarPrestamo = () => {
    if (!formData.id) {
      alert("Por favor ingrese el ID para eliminar");
      return;
    }
    if (confirm("¿Estás seguro de que quieres eliminar este préstamo del historial?")) {
      axios.delete(`${API_URL}/${formData.id}`)
        .then(() => {
          getPrestamos();
          limpiarCampos();
        })
        .catch(error => console.error("Error al eliminar prestamo:", error));
    }
  };

  const handleDevolverRápido = async (id) => {
    if (confirm('¿Confirmar la devolución de este libro al inventario?')) {
      try {
        await axios.put(`${API_URL}/devolver/${id}`);
        getPrestamos(); 
        alert('Libro devuelto exitosamente al inventario.');
      } catch (error) {
        alert(error.response?.data?.message || 'Error al devolver el libro.');
      }
    }
  };

  // Opciones para react-select
  const usuarioOptions = usuariosList.map(u => ({
    value: u.id,
    label: `${u.documento} - ${u.nombre} ${u.apellido}`
  }));

  const libroOptions = librosList.map(l => ({
    value: l.id,
    label: `${l.isbn} - ${l.titulo}`
  }));

  const prestamosFiltrados = prestamosList.filter(prestamo => {
    let matchUsuario = true;
    let matchLibro = true;

    if (formData.usuarioId) {
      matchUsuario = prestamo.usuario?.id === parseInt(formData.usuarioId);
    }
    if (formData.libroId) {
      matchLibro = prestamo.libro?.id === parseInt(formData.libroId);
    }

    return matchUsuario && matchLibro;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Préstamos</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <input type="text" name="id" value={formData.id} onChange={handleChange} placeholder="Id. Préstamo (Buscar/Modificar/Eliminar)" className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none" />
        
        <div className="z-30 relative">
            <Select 
                options={usuarioOptions} 
                onChange={(option) => setFormData({ ...formData, usuarioId: option ? option.value : '' })}
                value={usuarioOptions.find(o => o.value === formData.usuarioId) || null}
                placeholder="🔍 Buscar Lector (Doc o Nombre)..."
                isClearable
                noOptionsMessage={() => "Lector no encontrado"}
            />
        </div>

        <div className="z-20 relative">
            <Select 
                options={libroOptions} 
                onChange={(option) => setFormData({ ...formData, libroId: option ? option.value : '' })}
                value={libroOptions.find(o => o.value === formData.libroId) || null}
                placeholder="🔍 Buscar Libro (ISBN o Título)..."
                isClearable
                noOptionsMessage={() => "Libro no encontrado"}
            />
        </div>
        
        <div>
            <label className="block text-xs text-gray-500 mb-1">Fecha Préstamo (AAAA-MM-DD)</label>
            <input type="date" name="fechaPrestamo" value={formData.fechaPrestamo} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none" />
        </div>
        <div>
            <label className="block text-xs text-gray-500 mb-1">Fecha Devolución Límite</label>
            <input type="date" name="fechaDevolucion" value={formData.fechaDevolucion} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none" />
        </div>
        
        <div>
            <label className="block text-xs text-gray-500 mb-1">Estado</label>
            <select name="estado" value={formData.estado} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none">
                <option value="Prestado">Prestado</option>
                <option value="Devuelto">Devuelto</option>
            </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <button onClick={crearPrestamo} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-medium">Registrar Préstamo</button>
        <button onClick={getPrestamos} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition font-medium">Consultar Todo</button>
        <button onClick={buscarPrestamo} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition font-medium">Buscar</button>
        <button onClick={modificarPrestamo} className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition font-medium">Modificar</button>
        <button onClick={eliminarPrestamo} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition font-medium">Eliminar</button>
        <button onClick={limpiarCampos} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition font-medium">Limpiar Campos</button>
      </div>

      {prestamosFiltrados.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200 text-sm uppercase text-gray-600">
                <th className="p-3">ID</th>
                <th className="p-3">Libro</th>
                <th className="p-3">Usuario</th>
                <th className="p-3">Fechas</th>
                <th className="p-3">Estado</th>
                <th className="p-3 text-right">Acción Rápida</th>
              </tr>
            </thead>
            <tbody>
              {prestamosFiltrados.map((prestamo) => {
                const isActivo = prestamo.estado !== 'Devuelto';
                return (
                  <tr key={prestamo.id} className="border-b border-gray-100 hover:bg-indigo-50 transition cursor-pointer" onClick={() => setFormData({
                    id: prestamo.id,
                    fechaPrestamo: prestamo.fechaPrestamo,
                    fechaDevolucion: prestamo.fechaDevolucion,
                    estado: prestamo.estado,
                    usuarioId: prestamo.usuario?.id || '',
                    libroId: prestamo.libro?.id || ''
                  })}>
                    <td className="p-3 font-medium text-indigo-600">{prestamo.id}</td>
                    <td className="p-3">
                      <div className="font-medium text-gray-900">{prestamo.libro?.titulo || 'Desconocido'}</div>
                    </td>
                    <td className="p-3">
                      <div className="text-gray-900">{prestamo.usuario?.nombre} {prestamo.usuario?.apellido}</div>
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                      <div><span className="text-gray-500">Préstamo:</span> {prestamo.fechaPrestamo}</div>
                      <div><span className="text-gray-500">Límite:</span> {prestamo.fechaDevolucion}</div>
                    </td>
                    <td className="p-3">
                      {isActivo ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                          {prestamo.estado || 'Activo'}
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                          Devuelto
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      {isActivo ? (
                        <button 
                          onClick={() => handleDevolverRápido(prestamo.id)}
                          className="inline-flex items-center justify-end text-emerald-600 hover:text-emerald-800 transition-colors font-medium text-sm"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Marcar Devuelto
                        </button>
                      ) : (
                        <span className="text-gray-400 text-sm italic">Completado</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center p-8 text-gray-500 bg-gray-50 rounded-lg">No hay préstamos registrados. Usa el formulario superior para registrar uno.</div>
      )}
    </div>
  );
};

export default Prestamos;
