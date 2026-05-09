import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Libros from './pages/Libros';
import Prestamos from './pages/Prestamos';
import Usuarios from './pages/Usuarios';
import Autores from './pages/Autores';
import Categorias from './pages/Categorias';
import Empleados from './pages/Empleados';
import Login from './pages/Login';

function App() {
  const [empleado, setEmpleado] = useState(null);

  useEffect(() => {
    const storedEmpleado = localStorage.getItem('empleado');
    if (storedEmpleado) {
      try {
        setEmpleado(JSON.parse(storedEmpleado));
      } catch (e) {
        localStorage.removeItem('empleado');
      }
    }
  }, []);

  if (!empleado) {
    return <Login setEmpleado={setEmpleado} />;
  }

  return (
    <Router>
      <Layout setEmpleado={setEmpleado} empleado={empleado}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/libros" element={<Libros />} />
          <Route path="/prestamos" element={<Prestamos />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/autores" element={<Autores />} />
          <Route path="/categorias" element={<Categorias />} />
          {empleado.rol === 'JEFE' && <Route path="/empleados" element={<Empleados />} />}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
