// src/components/Layout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Toolbar from './Toolbar';
import Sidebar from './Sidebar';

const Layout = () => {
  // Estado para controlar la visibilidad del Sidebar
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  // Función para abrir/cerrar el Sidebar
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div>
      {/* 1. Toolbar: Siempre visible en la parte superior. 
          Pasa la función toggleSidebar al Toolbar. */}
      <Toolbar toggleSidebar={toggleSidebar} />
      
      {/* 2. Contenido Principal: Aquí se renderizarán los Dashboards 
          (AdminDashboard o StandardDashboard) a través de <Outlet />. */}
      <main style={styles.mainContent}>
        <Outlet />
      </main>
      
      {/* 3. Sidebar: Se desliza desde la derecha, usa el estado de visibilidad. */}
      <Sidebar isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
    </div>
  );
};

// Estilos básicos
const styles = {
    mainContent: {
        padding: '20px',
    }
};

export default Layout;