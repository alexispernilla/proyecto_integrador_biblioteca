import { Book, Users, ClipboardList } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center">
    <div className={`p-4 rounded-lg ${color} mr-4`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({ libros: 0, usuarios: 0, prestamosActivos: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [resLibros, resUsuarios, resPrestamos] = await Promise.all([
          axios.get(`${API_URL}/libros`).catch(() => ({ data: [] })),
          axios.get(`${API_URL}/usuarios`).catch(() => ({ data: [] })),
          axios.get(`${API_URL}/prestamos`).catch(() => ({ data: [] }))
        ]);
        
        setStats({
          libros: resLibros.data.length,
          usuarios: resUsuarios.data.length,
          prestamosActivos: resPrestamos.data.filter(p => p.estado !== 'Devuelto').length
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    
    fetchStats();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Bienvenido al Panel de Control</h1>
        <p className="text-gray-500 mt-1">Aquí tienes un resumen del estado actual de la biblioteca.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Libros" value={stats.libros} icon={Book} color="bg-indigo-500" />
        <StatCard title="Total Usuarios" value={stats.usuarios} icon={Users} color="bg-emerald-500" />
        <StatCard title="Préstamos Activos" value={stats.prestamosActivos} icon={ClipboardList} color="bg-amber-500" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <div className="mx-auto w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
          <Book className="w-8 h-8 text-indigo-600" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Empieza a gestionar</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Utiliza el menú lateral para navegar entre los módulos. Puedes empezar agregando nuevos libros o registrando préstamos.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
