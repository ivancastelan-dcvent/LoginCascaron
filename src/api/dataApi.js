import { DATA_MOCK } from '../data/mockData';
// Usar 'api' de axios.js aquí en una app real
// import api from './axios'; 

// MOCK DE VALIDACIÓN DE TOKEN
const mockTokenValidation = (token) => {
    if (token.includes('YWRtaW4')) return 'admin';
    if (token.includes('c3RhbmRhcmQ')) return 'standard';
    return null;
};

export const fetchDashboardData = async (token) => {
    const role = mockTokenValidation(token);

    if (!role) {
        return { success: false, data: [], error: "Token inválido o expirado." };
    }

    try {
        await new Promise(resolve => setTimeout(resolve, 500)); 

        return { success: true, data: DATA_MOCK[role] };
        
    } catch (error) {
        return { success: false, data: [], error: "Error en la petición de datos." };
    }
};