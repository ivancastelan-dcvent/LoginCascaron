import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Toolbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();

  // El Toolbar se enfoca en el usuario
  return (
    <header style={styles.header}>
      {/* Elemento Izquierdo: Título de la Aplicación */}
      <div style={styles.leftContent}>
         <span style={styles.appTitle}>APLICACIÓN SEGURA</span>
      </div>
      
      {/* Elemento Derecho: Nombre del Usuario y Botón de Sidebar */}
      <div style={styles.rightContent}>
        
        {/* Nombre del Usuario con Emote (como en la imagen) */}
        <span style={styles.userName}>{user?.fullName || user?.username} </span>
        
        {/* Botón/Área para Abrir el Sidebar (Toggle) */}
        <button onClick={toggleSidebar} style={styles.menuButton} title="Menú de Usuario">
            ☰
        </button>
      </div>
    </header>
  );
};

// Estilos básicos para la barra de herramientas
const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#282c34',
        color: 'white',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        position: 'sticky', 
        top: 0,
        zIndex: 10,
    },
    appTitle: {
        color: '#61dafb', 
        fontWeight: 'bold',
        fontSize: '18px',
    },
    leftContent: {
    },
    rightContent: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
    },
    userName: {
        color: 'white',
        fontWeight: 'bold',
        paddingRight: '10px', 
    },
    menuButton: {
        padding: '8px 12px',
        backgroundColor: 'transparent',
        color: 'white',
        border: '1px solid #61dafb', 
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        marginLeft: '10px', 
    }
};

export default Toolbar;