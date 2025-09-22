// js/translations.js

// 1. El Diccionario con todas las frases de tu sitio web.
const translations = {
    es: {
        // --- Títulos de Páginas ---
        loginTitle: "SabiQuiz - Iniciar Sesión",
        mainMenuTitle: "SabiQuiz - Menú Principal",
        profileTitle: "SabiQuiz - Mi Perfil",
        leaderboardTitle: "SabiQuiz - Ranking",
        quizTitle: "SabiQuiz - Quiz",
        languageTitle: "SabiQuiz - Lenguaje",
        mathsTitle: "SabiQuiz - Matemáticas",
        // ... (añade títulos para las otras materias si quieres)

        // --- Página de Login ---
        loginHeader: "Iniciar Sesión",
        loginSubHeader: "¡Bienvenido de vuelta a SabiQuiz!",
        emailLabel: "Correo Electrónico:",
        passwordLabel: "Contraseña:",
        loginBtn: "Iniciar Sesión",
        noAccount: "¿No tienes una cuenta?",
        registerHere: "Crea una aquí",
        createAccountHeader: "Crear Cuenta",
        createAccountBtn: "Crear Cuenta",
        hasAccount: "¿Ya tienes una cuenta?",
        loginHere: "Inicia sesión",

        // --- Menú Principal ---
        welcome: "¡Bienvenido,",
        chooseSubject: "Elige tu materia para comenzar",
        ranking: "Ranking",
        profile: "Mi Perfil",
        logout: "Cerrar Sesión",
        duelMode: "Modo Duelo 1vs1",
        findMatch: "🚀 Buscar Partida Rápida",
        findingOpponent: "Buscando oponente...",
        cancel: "Cancelar",
        playWithCode: "O juega con un amigo usando un código:",
        createRoom: "Crear Sala",
        joinRoom: "Unirse a Sala",

        // --- Página de Perfil ---
        level: "NIVEL",
        playedMatches: "Partidas Jugadas",
        wonMatches: "Partidas Ganadas",
        quizXp: "XP de Quizzes",
        pvpXp: "XP de 1vs1",
        backToMenu: "← Volver al Menú",

        // --- Página de Ranking ---
        leaderboardHeader: "🏆 Tabla de Clasificación 🏆",
        leaderboardSubHeader: "¡Los mejores jugadores de SabiQuiz!",

        // --- Pop-up Partida Encontrada ---
        opponentFound: "¡Oponente Encontrado!",
        accept: "✅ Aceptar",
        reject: "❌ Rechazar",

        // --- Pantalla de Resultados 1vs1 ---
        results: "Resultados",
        rematch: "Revancha",

        // --- Página de Materias ---
        backToSubjects: "← Volver a materias",
        languageSubject: "Lenguaje",
        mathsSubject: "Matemáticas",
        // ... (nombres de las otras materias)

        // --- Página del Quiz Runner ---
        backToLevels: "← Volver a los niveles",
        question: "Pregunta",
        points: "Puntos",
        time: "Tiempo",
        levelCompleted: "¡Nivel Completado!",
        levelFailed: "¡Nivel Fallido!",
        finalScore: "Tu puntaje final:",
    },
    en: {
        // --- Page Titles ---
        loginTitle: "SabiQuiz - Sign In",
        mainMenuTitle: "SabiQuiz - Main Menu",
        profileTitle: "SabiQuiz - My Profile",
        leaderboardTitle: "SabiQuiz - Leaderboard",
        quizTitle: "SabiQuiz - Quiz",
        languageTitle: "SabiQuiz - Language",
        mathsTitle: "SabiQuiz - Mathematics",
        // ... (add titles for other subjects if you want)

        // --- Login Page ---
        loginHeader: "Sign In",
        loginSubHeader: "Welcome back to SabiQuiz!",
        emailLabel: "Email:",
        passwordLabel: "Password:",
        loginBtn: "Sign In",
        noAccount: "Don't have an account?",
        registerHere: "Create one here",
        createAccountHeader: "Create Account",
        createAccountBtn: "Create Account",
        hasAccount: "Already have an account?",
        loginHere: "Sign in",

        // --- Main Menu ---
        welcome: "Welcome,",
        chooseSubject: "Choose your subject to begin",
        ranking: "Leaderboard",
        profile: "My Profile",
        logout: "Log Out",
        duelMode: "Duel Mode 1vs1",
        findMatch: "🚀 Quick Match",
        findingOpponent: "Finding opponent...",
        cancel: "Cancel",
        playWithCode: "Or play with a friend using a code:",
        createRoom: "Create Room",
        joinRoom: "Join Room",

        // --- Profile Page ---
        level: "LEVEL",
        playedMatches: "Matches Played",
        wonMatches: "Matches Won",
        quizXp: "Quiz XP",
        pvpXp: "1vs1 XP",
        backToMenu: "← Back to Menu",

        // --- Leaderboard Page ---
        leaderboardHeader: "🏆 Leaderboard 🏆",
        leaderboardSubHeader: "The best players in SabiQuiz!",

        // --- Match Found Pop-up ---
        opponentFound: "Opponent Found!",
        accept: "✅ Accept",
        reject: "❌ Decline",
        
        // --- 1vs1 Results Screen ---
        results: "Results",
        rematch: "Rematch",

        // --- Subjects Page ---
        backToSubjects: "← Back to subjects",
        languageSubject: "Language",
        mathsSubject: "Mathematics",
        // ... (names of other subjects)

        // --- Quiz Runner Page ---
        backToLevels: "← Back to levels",
        question: "Question",
        points: "Points",
        time: "Time",
        levelCompleted: "Level Complete!",
        levelFailed: "Level Failed!",
        finalScore: "Your final score:",
    }
};

// 2. La Lógica para aplicar las traducciones.
function applyTranslations(lang) {
    if (!['es', 'en'].includes(lang)) lang = 'es'; // Idioma por defecto
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = translations[lang]?.[key];
        
        if (translation) {
            // Caso especial para el saludo, que incluye el nombre de usuario
            if (key === 'welcomeMessage') {
                const username = element.getAttribute('data-username') || '';
                element.textContent = `${translation} ${username}!`;
            } else {
                element.textContent = translation;
            }
        }
    });

    // Casos especiales para textos con HTML adentro
    const toggleForm = document.getElementById('toggle-form');
    if (toggleForm) {
        const isLoginMode = document.getElementById('form-title').getAttribute('data-translate') === 'loginHeader';
        if (isLoginMode) {
            toggleForm.innerHTML = `<span data-translate="noAccount">${translations[lang]['noAccount']}</span> <a href="#">${translations[lang]['registerHere']}</a>`;
        } else {
            toggleForm.innerHTML = `<span data-translate="hasAccount">${translations[lang]['hasAccount']}</span> <a href="#">${translations[lang]['loginHere']}</a>`;
        }
    }
}

function setLanguage(lang) {
    localStorage.setItem('language', lang);
    applyTranslations(lang);
}

function loadLanguage() {
    const savedLang = localStorage.getItem('language') || 'es';
    applyTranslations(savedLang);
}

// 3. Exportamos las funciones para que otras páginas puedan usarlas.
export { setLanguage, loadLanguage, translations };

