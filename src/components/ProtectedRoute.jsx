import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  // Si no está autenticado, lo enviamos a la página de login
  if (!isAuthenticated) {
    // 'replace' evita que la ruta protegida quede en el historial
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, renderiza el componente hijo de la ruta
  return <Outlet />;
};

export default ProtectedRoute;