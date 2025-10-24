import React, { createContext, useState, useContext } from 'react';
import { loginUser } from '../../api/authApi'; 

// 1. Crear el contexto
const AuthContext = createContext(null);

// 2. Hook personalizado para consumir el contexto fácilmente
export const useAuth = () => useContext(AuthContext);

// 3. Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); 

  // Simulación de Login usando el servicio de API
  const login = async (username, password) => {
    // Llama al servicio de infraestructura/API (authApi.js)
    const response = await loginUser(username, password);

    if (response.success) {
      setIsAuthenticated(true);
      // Guardar el objeto user que incluye el token (JWT simulado)
      setUser({ ...response.user, token: response.token }); 
      return { ...response.user, token: response.token };
    }
    return null;
  };

  // Función de Logout
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    // Nota: Aquí, en una app real, también eliminaras el token de localStorage.
  };

  const value = {
    isAuthenticated,
    user, 
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};