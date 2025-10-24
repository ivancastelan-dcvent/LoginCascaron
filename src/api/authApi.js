// Nota: No se necesita Axios para este mock pero en un proyecto real si.

// Mock de Respuesta de API para Login (Simulando la validación del JWT)
export const loginUser = async (username, password) => {
    await new Promise(resolve => setTimeout(resolve, 500)); 

    if (username === "admin" && password === "password123") {
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