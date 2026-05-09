import { Link, useLocation } from 'react-router-dom';
import { Book, Users, ClipboardList, UserSquare, Library, Home, LogOut, ShieldCheck } from 'lucide-react';

const Layout = ({ children, setEmpleado, empleado }) => {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('empleado');
    setEmpleado(null);
  };

  const menuItems = [
    { name: 'Dashboard', icon: Home, path: '/' },
    { name: 'Libros', icon: Book, path: '/libros' },
    { name: 'Préstamos', icon: ClipboardList, path: '/prestamos' },
    { name: 'Usuarios', icon: Users, path: '/usuarios' },
    { name: 'Autores', icon: UserSquare, path: '/autores' },
    { name: 'Categorías', icon: Library, path: '/categorias' },
  ];

  if (empleado?.rol === 'JEFE') {
    menuItems.push({ name: 'Operadores', icon: ShieldCheck, path: '/empleados' });
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans text-gray-800">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <Library className="w-6 h-6 text-indigo-600 mr-2" />
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">BiblioTech</h1>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 flex flex-col justify-between">
          <ul className="space-y-1 px-3">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-3 py-2.5 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-indigo-50 text-indigo-700 font-medium' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          
          <div className="px-3 mt-8 border-t border-gray-100 pt-4">
            <button 
                onClick={handleLogout}
                className="w-full flex items-center px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
            >
                <LogOut className="w-5 h-5 mr-3" />
                Cerrar Sesión
            </button>
          </div>
        </nav>
      </aside>
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm z-10">
          <h2 className="text-xl font-semibold text-gray-800">
            {menuItems.find(item => item.path === location.pathname)?.name || 'Panel'}
          </h2>
          <div className="flex items-center space-x-3">
            <div className="flex flex-col text-right">
                <span className="text-sm font-bold text-gray-800">{empleado?.nombre}</span>
                <span className="text-xs text-gray-500">{empleado?.rol}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border-2 border-indigo-200 uppercase">
              {empleado?.nombre?.charAt(0) || 'A'}
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
