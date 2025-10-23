import React, { createContext, useState, useContext } from 'react';

// 1. Crear el contexto
const AuthContext = createContext(null);

// 2. Hook personalizado para consumir el contexto fácilmente
export const useAuth = () => useContext(AuthContext);

// 3. Proveedor del contexto (AuthProvider)
export const AuthProvider = ({ children }) => {
  // Inicialmente, el usuario no está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Para guardar datos del usuario

  // *** MOCK DE USUARIO FIJO ***
  const USER_MOCK = {
    username: "admin",
    password: "password123"
  };

  // Simulación de Login
  const login = (username, password) => {
    // Verificar las credenciales del usuario fijo
    if (username === USER_MOCK.username && password === USER_MOCK.password) {
      setIsAuthenticated(true);
      setUser({ username: USER_MOCK.username }); // Guardamos el nombre de usuario
      return true; // Éxito
    }
    return false; // Error
  };

  // Función de Logout
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};