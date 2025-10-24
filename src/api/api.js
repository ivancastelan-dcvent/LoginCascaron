import axios from 'axios';
import { DATA_MOCK } from '../data/mockData';

// Función mock para simular la validación del token en el backend
const mockTokenValidation = (token) => {
    // Simula la decodificación y validación del token
    if (token.includes('YWRtaW4')) return 'admin';
    if (token.includes('c3RhbmRhcmQ')) return 'standard';
    return null;
};

// Función principal para obtener datos del dashboard
export const fetchDashboardData = async (token) => { // Requiere el token
    const role = mockTokenValidation(token);

    if (!role) {
        return { success: false, data: [], error: "Token inválido o expirado." };
    }

    try {
        const mockResponse = {
            data: DATA_MOCK[role],
            status: 200,
            config: { headers: { Authorization: `Bearer ${token}` } } 
        };

        await new Promise(resolve => setTimeout(resolve, 500)); 

        if (mockResponse.status === 200) {
            return { success: true, data: mockResponse.data };
        }
        
    } catch (error) {
        return { success: false, data: [], error: error.message };
    }

    return { success: false, data: [] };
};