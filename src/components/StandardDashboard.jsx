import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; 
import { fetchDashboardData } from '../api/api'; 

const StandardDashboard = () => {
    const { user, logout } = useAuth(); 
    const navigate = useNavigate(); 
    const userRole = user?.role;
    const [dashboardData, setDashboardData] = useState([]);
    const [isCheckingRole, setIsCheckingRole] = useState(true); 
    const [apiError, setApiError] = useState(null); 

    useEffect(() => {
        const token = user?.token;

        // Si el userRole no está disponible o el token falta, salimos
        if (!userRole || !token) {
            if (!userRole) return; 
        }
        
        // 1. LÓGICA DE VERIFICACIÓN DE ROL Y REDIRECCIÓN
        if (userRole !== 'standard') {
            let redirectPath = '/';

            // Si es un Admin, lo enviamos a la vista Admin
            if (userRole === 'admin') {
                redirectPath = '/admin-view';
            } 

            if (redirectPath !== '/') {
                navigate(redirectPath, { replace: true });
            } else {
                navigate('/', { replace: true }); 
            }
            setIsCheckingRole(false);
            return;
        } 
        
        // 2. LÓGICA DE CARGA DE DATOS ASÍNCRONA (con JWT)
        // Solo se ejecuta si el rol es 'standard'
        const fetchData = async () => {
            try {
                const result = await fetchDashboardData(token); 
                
                if (result.success) {
                    setDashboardData(result.data);
                    setApiError(null);
                } else {
                    setApiError(result.error || "Error al cargar los datos del dashboard estándar.");
                    setDashboardData([]);
                }
            } catch (err) {
                setApiError("Error de conexión con la API simulada.");
                setDashboardData([]);
            } finally {
                setIsCheckingRole(false);
            }
        };
        
        fetchData();
        
    }, [userRole, navigate, user]); 
    
    // --- RENDERIZADO CONDICIONAL ---

    // Muestra estado de carga/verificación
    if (isCheckingRole) {
        return <p style={{ padding: '20px', color: 'gray' }}>Verificando permisos y cargando tu dashboard...</p>;
    }

    // Muestra error de API si ocurre
    if (apiError) {
        return (
            <div style={{ color: 'red', padding: '20px' }}>
                <h2>Error de Carga</h2>
                <p>{apiError}</p>
            </div>
        );
    }

    // Renderizado final para el rol 'standard'
    return (
        <div style={{ border: '2px solid blue', padding: '20px' }}>
            <h2>USUARIO ESTÁNDAR: Vista de Perfil 👤</h2>
            <h3>Hola, {user?.username} (Rol: {userRole})</h3>
            
            <h4>Mi Contenido (Cargado por API Mock con JWT):</h4>
            <ul>
                {dashboardData.map(item => (
                    <li key={item.id}>
                        **{item.content}** (Nivel: {item.level})
                    </li>
                ))}
            </ul>
            </div>
        );
    };
    
    export default StandardDashboard;