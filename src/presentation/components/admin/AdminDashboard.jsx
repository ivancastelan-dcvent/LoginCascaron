import React, { useState, useEffect } from 'react'; 
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'; 
import { fetchDashboardData } from '../../../api/dataApi'; 

const ROLE_REDIRECTS = { 
    'standard': '/standard-view'
}; 

const AdminDashboard = () => {
    const { user, logout } = useAuth(); 
    const navigate = useNavigate(); 
    const userRole = user?.role;
    const [dashboardData, setDashboardData] = useState([]);
    const [isCheckingRole, setIsCheckingRole] = useState(true); 
    const [apiError, setApiError] = useState(null); 

    useEffect(() => {
        // Obtenemos el token directamente del objeto user
        const token = user?.token;

        // Si userRole no está disponible o el token falta, salimos
        if (!userRole || !token) {
            if (!userRole) return; 
        }

        // 1. LÓGICA DE VERIFICACIÓN DE ROL Y REDIRECCIÓN
        if (userRole !== 'admin') {
            const redirectPath = ROLE_REDIRECTS[userRole];

            if (redirectPath) {
                navigate(redirectPath, { replace: true });
            } else {
                navigate("/", { replace: true });
            }
            setIsCheckingRole(false);
            
        } else {
            // 2. LÓGICA DE CARGA DE DATOS ASÍNCRONA (con JWT)
            const fetchData = async () => {
                try {
                    // CLAVE: Pasamos el token a la función de API
                    const result = await fetchDashboardData(token); 
                    
                    if (result.success) {
                        setDashboardData(result.data);
                        setApiError(null);
                    } else {
                        // Si la API mock retorna un error (ej. token inválido)
                        setApiError(result.error || "Error al cargar los datos.");
                        setDashboardData([]);
                    }
                } catch (err) {
                    setApiError("Error de conexión con la API simulada o token.");
                    setDashboardData([]);
                } finally {
                    // Finaliza la verificación
                    setIsCheckingRole(false);
                }
            };
            
            fetchData();
        }
    }, [user, navigate]); 

    // --- RENDERIZADO CONDICIONAL ---

    // 1. Muestra estado de carga
    if (isCheckingRole) {
        return <p style={{ padding: '20px', color: 'gray' }}>Verificando permisos y cargando dashboard...</p>;
    }
    
    // 2. Muestra error de API
    if (apiError) {
        return (
            <div style={{ color: 'red', padding: '20px' }}>
                <h2>Error de Carga</h2>
                <p>{apiError}</p>
            </div>
        );
    }
    
    // 3. Renderizado final
    return (
        <div style={{ border: '2px solid red', padding: '20px' }}>
            <h2>ADMINISTRADOR: Vista Crítica 👑</h2>
            <h3>Bienvenido, {user?.username} (Rol: {userRole})</h3>

            <h4>Contenido de Administración (Cargado con JWT):</h4>
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

export default AdminDashboard;