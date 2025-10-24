import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

// Datos Ficticios (MOCK)
const DATA_MOCK = {
  admin: [
    { id: 1, content: "Reporte de Administración Total", level: "Alta" },
    { id: 2, content: "Gráfico de Ingresos del Mes", level: "Alta" }
  ],
  standard: [
    { id: 3, content: "Mi Perfil Personal", level: "Media" },
    { id: 4, content: "Notificaciones Recientes", level: "Baja" }
  ]
};

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [dashboardData, setDashboardData] = useState([]);

  // Efecto para cargar datos al dependiendo del rol
  useEffect(() => {
    if (user?.role) {
      setDashboardData(DATA_MOCK[user.role] || []);
    }
  }, [user]);

  return (
    <div>
      <h1>
        Bienvenido, {user?.username}! 
        {user?.role === 'admin' ? ' 👑 (Administrador)' : ' (Estándar)'}
      </h1>
      <p>Estás viendo el contenido de tu rol ({user?.role}).</p>

      {/* 1. Renderizado Condicional de Componentes/Secciones */}
      {user?.role === 'admin' && (
        <div style={{ border: '2px solid red', padding: '10px', margin: '15px 0' }}>
          <h3>Panel de Herramientas de Administración</h3>
          <p>Acceso a configuraciones globales y reportes críticos.</p>
        </div>
      )}

      {/* 2. Visualización de Datos Específicos del Rol */}
      <h3>Contenido de tu Dashboard:</h3>
      {dashboardData.length > 0 ? (
        <ul>
          {dashboardData.map(item => (
            <li key={item.id}>
              **{item.content}** - (Prioridad: {item.level})
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay datos disponibles para este rol.</p>
      )}

      <button onClick={logout} style={{ marginTop: '20px' }}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Dashboard;