import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h2>Dashboard (Vista Protegida) 🔒</h2>
      <h3>¡Hola, {user?.username}!</h3>
      <p>Esta es tu zona privada.</p>
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  );
};

export default Dashboard;