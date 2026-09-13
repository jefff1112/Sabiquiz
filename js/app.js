// ============================================
// SABIQUIZ - APP.JS (VERSIÓN CON MYSQL)
// ============================================
// Esta versión mantiene todas las funciones originales
// pero reemplaza Firebase por nuestra API REST
// ============================================

// ============================================
// CONFIGURACIÓN DE LA API
// ============================================
const API_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:3000/api' : (window.location.origin + '/api');

// ============================================
// FUNCIONES DE AUTENTICACIÓN (Reemplazan Firebase Auth)
// ============================================

// Obtener el token almacenado
function getToken() {
    return localStorage.getItem('token');
}

// Obtener el usuario actual
function getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
}

// Verificar si está autenticado
function isAuthenticated() {
    return !!getToken();
}

// Cerrar sesión (reemplaza firebase.auth().signOut())
async function logoutUser() {
    try {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    }
}

// ============================================
// FUNCIÓN PARA PETICIONES A LA API
// ============================================
async function apiRequest(endpoint, options = {}) {
    const token = getToken();
    
    const headers = {
        'Content-Type': 'application/json',
    };
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    const finalOptions = {
        ...options,
        headers: {
            ...headers,
            ...options.headers
        }
    };
    
    try {
        const response = await fetch(`${API_URL}${endpoint}`, finalOptions);
        const data = await response.json();
        
        if (!response.ok) {
            if (response.status === 401) {
                // Token expirado, redirigir al login
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                if (!window.location.pathname.includes('login.html')) {
                    window.location.href = 'login.html';
                }
            }
            throw new Error(data.error || 'Error en la petición');
        }
        
        return data;
    } catch (error) {
        console.error('Error en apiRequest:', error);
        throw error;
    }
}

// ============================================
// FUNCIONES ORIGINALES (Mantienen el mismo nombre)
// ============================================

// ---------------------------------------------
// Función original: obtenerUsuarioActual()
// Antes: firebase.auth().currentUser
// Ahora: getCurrentUser()
// ---------------------------------------------
function obtenerUsuarioActual() {
    return getCurrentUser();
}

// ---------------------------------------------
// Función original: obtenerMaterias()
// Antes: firebase.firestore().collection('materias').get()
// Ahora: apiRequest('/quiz/materias')
// ---------------------------------------------
async function obtenerMaterias() {
    try {
        const data = await apiRequest('/quiz/materias');
        return data.materias || [];
    } catch (error) {
        console.error('Error obteniendo materias:', error);
        return [];
    }
}

// ---------------------------------------------
// Función original: obtenerNiveles(materiaId)
// Antes: firebase.firestore().collection('niveles').where('materiaId', '==', materiaId).get()
// Ahora: apiRequest(`/quiz/materia/${materiaId}/niveles`)
// ---------------------------------------------
async function obtenerNiveles(materiaId) {
    try {
        const data = await apiRequest(`/quiz/materia/${materiaId}/niveles`);
        return data.niveles || [];
    } catch (error) {
        console.error('Error obteniendo niveles:', error);
        return [];
    }
}

// ---------------------------------------------
// Función original: obtenerPreguntas(nivelId)
// Antes: firebase.firestore().collection('preguntas').where('nivelId', '==', nivelId).get()
// Ahora: apiRequest(`/quiz/nivel/${nivelId}`)
// ---------------------------------------------
async function obtenerPreguntas(nivelId) {
    try {
        const data = await apiRequest(`/quiz/nivel/${nivelId}`);
        return data.preguntas || [];
    } catch (error) {
        console.error('Error obteniendo preguntas:', error);
        return [];
    }
}

// ---------------------------------------------
// Función original: obtenerProgreso(usuarioId)
// Antes: firebase.firestore().collection('progreso').where('usuarioId', '==', usuarioId).get()
// Ahora: apiRequest('/progress')
// ---------------------------------------------
async function obtenerProgreso() {
    try {
        const data = await apiRequest('/progress');
        return data.progreso || {};
    } catch (error) {
        console.error('Error obteniendo progreso:', error);
        return {};
    }
}

// ---------------------------------------------
// Función original: guardarProgreso(usuarioId, nivelId, datos)
// Antes: firebase.firestore().collection('progreso').add() o .update()
// Ahora: apiRequest('/quiz/submit', method: 'POST')
// ---------------------------------------------
async function guardarProgreso(nivelId, respuestas, tiempo) {
    try {
        const data = await apiRequest('/quiz/submit', {
            method: 'POST',
            body: JSON.stringify({
                nivelId,
                respuestas,
                tiempo
            })
        });
        return data;
    } catch (error) {
        console.error('Error guardando progreso:', error);
        throw error;
    }
}

// ---------------------------------------------
// Función original: obtenerStats(usuarioId)
// Antes: firebase.firestore().collection('stats').doc(usuarioId).get()
// Ahora: apiRequest('/progress/stats')
// ---------------------------------------------
async function obtenerStats() {
    try {
        const data = await apiRequest('/progress/stats');
        return data.stats || {};
    } catch (error) {
        console.error('Error obteniendo stats:', error);
        return {};
    }
}

// ---------------------------------------------
// Función original: obtenerDesbloqueados(usuarioId)
// Antes: firebase.firestore().collection('progreso').where('usuarioId', '==', usuarioId).where('completado', '==', true).get()
// Ahora: apiRequest('/progress/desbloqueados')
// ---------------------------------------------
async function obtenerDesbloqueados() {
    try {
        const data = await apiRequest('/progress/desbloqueados');
        return data.desbloqueados || [];
    } catch (error) {
        console.error('Error obteniendo desbloqueados:', error);
        return [];
    }
}

// ---------------------------------------------
// Función original: sugerirPregunta(datos)
// Antes: firebase.firestore().collection('sugerencias').add(datos)
// Ahora: apiRequest('/suggestions', method: 'POST')
// ---------------------------------------------
async function sugerirPregunta(datos) {
    try {
        const data = await apiRequest('/suggestions', {
            method: 'POST',
            body: JSON.stringify(datos)
        });
        return data;
    } catch (error) {
        console.error('Error sugiriendo pregunta:', error);
        throw error;
    }
}

// ============================================
// FUNCIONES DE AYUDA PARA MANTENER COMPATIBILIDAD
// ============================================

// Convertir datos de Firebase a formato MySQL (si es necesario)
function convertirFormatoFirebaseAMySQL(datosFirebase) {
    // Esta función mapea los campos de Firebase a MySQL
    // Ejemplo: { displayName: 'Juan' } → { username: 'Juan' }
    return datosFirebase;
}

// ============================================
// EXPORTAR (si se usa con módulos)
// ============================================
// Si tu proyecto usa módulos, descomenta esto:
// module.exports = {
//     getToken,
//     getCurrentUser,
//     isAuthenticated,
//     logoutUser,
//     apiRequest,
//     obtenerUsuarioActual,
//     obtenerMaterias,
//     obtenerNiveles,
//     obtenerPreguntas,
//     obtenerProgreso,
//     guardarProgreso,
//     obtenerStats,
//     obtenerDesbloqueados,
//     sugerirPregunta
// };s