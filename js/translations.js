const translations = {
    es: {
        // Títulos de Páginas
        loginTitle: "SabiQuiz - Iniciar Sesión",
        mainMenuTitle: "SabiQuiz - Menú Principal",
        profileTitle: "SabiQuiz - Mi Perfil",
        leaderboardTitle: "SabiQuiz - Ranking",
        quizTitle: "SabiQuiz - Quiz",
        // Login
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
        // Menú Principal
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
        // Perfil
        level: "NIVEL",
        playedMatches: "Partidas Jugadas",
        wonMatches: "Partidas Ganadas",
        quizXp: "XP de Quizzes",
        pvpXp: "XP de 1vs1",
        backToMenu: "← Volver al Menú",
        // Ranking
        leaderboardHeader: "🏆 Tabla de Clasificación 🏆",
        leaderboardSubHeader: "¡Los mejores jugadores de SabiQuiz!",
        // Pop-up Partida Encontrada
        opponentFound: "¡Oponente Encontrado!",
        accept: "✅ Aceptar",
        reject: "❌ Rechazar",
        // Resultados 1vs1
        results: "Resultados",
        rematch: "Revancha",
        exit: "Salir", // <-- ¡NUEVO!
        // Notificaciones 1vs1
        opponentLeft: "ha abandonado la partida.", // <-- ¡NUEVO!
        wantsRematch: "quiere la revancha!", // <-- ¡NUEVO!
        // Quizzes de Materias
        backToSubjects: "← Volver a materias",
        question: "Pregunta",
        points: "Puntos",
        time: "Tiempo",
        levelCompleted: "¡Nivel Completado!",
        levelFailed: "¡Nivel Fallido!",
        finalScore: "Tu puntaje final:",
        backToLevels: "Volver a los niveles"
    },
    en: {
        // Page Titles
        loginTitle: "SabiQuiz - Sign In",
        mainMenuTitle: "SabiQuiz - Main Menu",
        profileTitle: "SabiQuiz - My Profile",
        leaderboardTitle: "SabiQuiz - Leaderboard",
        quizTitle: "SabiQuiz - Quiz",
        // Login
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
        // Main Menu
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
        // Profile
        level: "LEVEL",
        playedMatches: "Matches Played",
        wonMatches: "Matches Won",
        quizXp: "Quiz XP",
        pvpXp: "1vs1 XP",
        backToMenu: "← Back to Menu",
        // Leaderboard
        leaderboardHeader: "🏆 Leaderboard 🏆",
        leaderboardSubHeader: "The best players in SabiQuiz!",
        // Match Found Pop-up
        opponentFound: "Opponent Found!",
        accept: "✅ Accept",
        reject: "❌ Decline",
        // 1vs1 Results Screen
        results: "Results",
        rematch: "Rematch",
        exit: "Exit", // <-- NEW!
        // 1vs1 Notifications
        opponentLeft: "has left the match.", // <-- NEW!
        wantsRematch: "wants a rematch!", // <-- NEW!
        // Subject Quizzes
        backToSubjects: "← Back to subjects",
        question: "Question",
        points: "Points",
        time: "Time",
        levelCompleted: "Level Complete!",
        levelFailed: "Level Failed!",
        finalScore: "Your final score:",
        backToLevels: "Back to levels"
    }
};

function applyTranslations(lang) {
    if (!['es', 'en'].includes(lang)) lang = 'es';
    document.documentElement.lang = lang;
    
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            if (key === 'welcomeMessage') return; // Se maneja por separado
            element.textContent = translations[lang][key];
        }
    });

    const toggleFormText = document.getElementById('toggle-form');
    if (toggleFormText) {
        const formTitleEl = document.getElementById('form-title');
        const isLogin = formTitleEl.getAttribute('data-translate') === 'loginHeader';
        if (isLogin) {
            toggleFormText.innerHTML = `<span data-translate="noAccount">${translations[lang]['noAccount']}</span> <a href="#">${translations[lang]['registerHere']}</a>`;
        } else {
            toggleFormText.innerHTML = `<span data-translate="hasAccount">${translations[lang]['hasAccount']}</span> <a href="#">${translations[lang]['loginHere']}</a>`;
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

export { setLanguage, loadLanguage, translations };
