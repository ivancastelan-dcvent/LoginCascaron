import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

// 1. Crear el contexto
const AuthContext = createContext(null);

// 2. Hook personalizado para consumir el contexto fácilmente
export const useAuth = () => useContext(AuthContext);

// Mock de Respuesta de API (Simulando la validación y emisión del JWT)
const mockLoginAPI = async (username, password) => {
    await new Promise(resolve => setTimeout(resolve, 500)); 

    if (username === "admin" && password === "password123") {
        // Token simulado (admin: role.admin.signature)
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.YWRtaW4.SflKxw'; 
        return { 
            success: true, 
            token, 
            user: { 
                username: "admin", 
                role: "admin", 
                fullName: "Admin Global del Sistema",
                email: "admin.global@system.com" 
            }
        };
    }
    if (username === "user" && password === "password456") {
        // Token simulado (standard: role.standard.signature)
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.c3RhbmRhcmQ.SflKxw';
        return { 
            success: true, 
            token, 
            user: { 
                username: "user", 
                role: "standard",
                fullName: "Iván Castelan Estrada", 
                email: "ivan.castelan@gmail.com"
            }
        };
    }

    return { success: false, error: 'Credenciales inválidas.' };
};

// 3. Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Almacenaremos el usuario y el token
  const [user, setUser] = useState(null); 

  // Simulación de Login usando el mock de la API
  const login = async (username, password) => {
    const response = await mockLoginAPI(username, password);

    if (response.success) {
      setIsAuthenticated(true);
      // Guardar el objeto user, *incluyendo el token*
      setUser({ ...response.user, token: response.token }); 
      return { ...response.user, token: response.token };
    }
    return null;
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