import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login, isAuthenticated, user } = useAuth(); 

    // Lógica de Redirección (Si ya está autenticado)
    if (isAuthenticated) {
        // Redirige al usuario a su dashboard correspondiente si ya está logueado
        const path = user?.role === 'admin' ? '/admin-view' : '/standard-view';
        navigate(path, { replace: true });
        return null;
    }

    const handleSubmit = async (e) => { 
        e.preventDefault();
        setError('');

        // Captura el objeto de usuario/token retornado por la función login
        const loggedInUser = await login(username, password);
        
        if (loggedInUser) { 
            let redirectPath = '/';
            if (loggedInUser.role === 'admin') {
                redirectPath = '/admin-view';
            } else if (loggedInUser.role === 'standard') {
                redirectPath = '/standard-view';
            }
            
            navigate(redirectPath, { replace: true });
            
        } else {
            setError('Credenciales inválidas. Usa: admin/password123 o user/password456');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.loginBox}>
                
                {/* Elemento 1: Mensaje de Bienvenida */}
                <h2 style={styles.welcomeText}>¡Bienvenido!</h2>
                <p style={styles.subText}>Accede a tu cuenta.</p>
                
                <form onSubmit={handleSubmit} style={styles.form}>
                    
                    {/* Elemento 2: Campo de Usuario */}
                    <input
                        type="text"
                        placeholder="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={styles.input}
                    />
                    
                    {/* Elemento 3: Campo de Contraseña */}
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                    
                    {/* Mensaje de Error */}
                    {error && <p style={styles.errorText}>{error}</p>}
                    
                    {/* Elemento 4: Botón de Acceder */}
                    <button type="submit" style={styles.button}>
                        ACCEDER
                    </button>
                </form>

                <p style={styles.hint}>Prueba: **admin/password123** | **user/password456**</p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5', 
    },
    loginBox: {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        width: '350px',
    },
    welcomeText: {
        color: '#333',
        fontSize: '28px',
        marginBottom: '5px',
    },
    subText: {
        color: '#666',
        marginBottom: '25px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    input: {
        padding: '12px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '16px',
    },
    button: {
        padding: '12px',
        backgroundColor: '#007bff', 
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        fontWeight: 'bold',
        marginTop: '10px',
        transition: 'background-color 0.3s',
    },
    errorText: {
        color: 'red',
        fontSize: '14px',
        margin: '10px 0 0',
    },
    hint: {
        fontSize: '12px',
        color: '#999',
        marginTop: '20px',
    }
};

export default Login;