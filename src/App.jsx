import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './components/AdminDashboard';
import StandardDashboard from './components/StandardDashboard';
import Layout from './components/Layout'; 

function App() {
  return (
    <div>

      <div style={{ padding: '0px' }}>
        <Routes>
          
          {/* 1. RUTA RAÍZ: La página de Login es la primera que se muestra (./). */}
          <Route path="/" element={<Login />} /> 

          {/* 2. GRUPO DE RUTAS PROTEGIDAS: Protegidas por autenticación */}
          <Route element={<ProtectedRoute />}>
            
            {/* 3. LAYOUT WRAPPER: Todas las rutas protegidas usan el Layout (Toolbar + Sidebar) */}
            <Route element={<Layout />}>
              
              {/* Rutas Principales de Dashboard (Protegidas y con Layout) */}
              <Route path="/admin-view" element={<AdminDashboard />} />    
              <Route path="/standard-view" element={<StandardDashboard />} /> 
              
              {/* Rutas Hijas para la navegación del Sidebar */}
              <Route path="/admin-view/:section" element={<AdminDashboard />} />
              <Route path="/standard-view/:section" element={<StandardDashboard />} />
            </Route>
          </Route>

          <Route path="*" element={<h1>404 - Ruta no encontrada</h1>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;