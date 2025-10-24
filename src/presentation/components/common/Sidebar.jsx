import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ isVisible, toggleSidebar }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate(); 
    
    // Determinar el segmento base de la ruta
    const baseRoute = user?.role === 'admin' ? '/admin-view' : '/standard-view';
    const profileLink = `${baseRoute}/profile`;

    // Función para cerrar sesión y luego cerrar el sidebar
    const handleLogout = () => {
        logout(); 
        toggleSidebar(); 
        navigate('/', { replace: true }); 
    };

    return (
        <div style={{ ...styles.sidebar, right: isVisible ? '0' : '-300px' }}>
            <button onClick={toggleSidebar} style={styles.closeButton}>X</button>
            
            <div style={styles.userInfoBox}>
                <span style={styles.emailText}>✉️ {user?.email || 'email@dominio.com'}</span>
            </div>

            <ul style={styles.menuList}>
                {/* 2. Opción de Perfil */}
                <li style={styles.menuItem}>
                    <Link 
                        to={profileLink} 
                        onClick={toggleSidebar} 
                        style={styles.menuLink}
                    >
                        ⚙️ Perfil
                    </Link>
                </li>
                <li style={styles.separator}></li>
                {/* 3. Opción Cerrar Sesión */}
                <li style={styles.menuItem}>
                    <button onClick={handleLogout} style={styles.logoutBtn}>
                        ➡️ Cerrar sesión
                    </button>
                </li>
            </ul>
        </div>
    );
};

// Estilos del Sidebar 
const styles = {
    sidebar: {
        position: 'fixed',
        top: 0,
        width: '300px',
        height: '100%',
        backgroundColor: '#36393f',
        boxShadow: '-4px 0 8px rgba(0, 0, 0, 0.4)',
        transition: 'right 0.3s ease-in-out', 
        padding: '20px',
        zIndex: 1000,
        color: 'white',
    },
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'transparent',
        border: 'none',
        color: 'white',
        fontSize: '18px',
        cursor: 'pointer',
    },
    userInfoBox: {
        padding: '20px 0',
        borderBottom: '1px solid #444',
        marginBottom: '15px',
        textAlign: 'left',
    },
    emailText: {
        fontSize: '14px',
        color: '#ccc',
        display: 'block',
    },
    menuList: {
        listStyle: 'none',
        padding: 0,
    },
    menuItem: {
        margin: '10px 0',
    },
    menuLink: {
        textDecoration: 'none',
        color: 'white',
        display: 'block',
        padding: '10px 0',
        borderRadius: '4px',
    },
    logoutBtn: {
        background: 'none',
        border: 'none',
        color: 'white',
        fontSize: '16px',
        width: '100%',
        textAlign: 'left',
        padding: '10px 0',
        cursor: 'pointer',
    },
    separator: {
        height: '1px',
        backgroundColor: '#444',
        margin: '15px 0',
    }
};

export default Sidebar;