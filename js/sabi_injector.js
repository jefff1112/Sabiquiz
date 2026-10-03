// ============================================
// SABI INJECTOR - Inyección automática del chat tutor
// ============================================
// Incluir UNA VEZ en cualquier página: <script src="js/sabi_injector.js"></script>
// Detecta automáticamente si la página necesita chat y el contexto educativo.
// ============================================

(function () {
  'use strict';

  // Evitar doble inyección
  if (window.__sabiInjectorLoaded) return;
  window.__sabiInjectorLoaded = true;

  // ============================================
  // DETECCIÓN: ¿Esta página necesita el chat?
  // ============================================
  function necesitaChatSabi() {
    const path = window.location.pathname.toLowerCase();

    // Páginas donde SÍ se muestra el chat
    const paginasConChat = [
      'quiz_runner',
      'niveles',
      '_juego',         // todos los minijuegos: balanzas_juego, puzzle_juego, etc.
      'funcion_lineal',
      'trigonometria',
      'torneos',
      'torneo_detalle'
    ];

    // Verificar por ruta
    if (paginasConChat.some(p => path.includes(p))) return true;

    // Verificar por elementos DOM (para páginas no estándar)
    if (document.getElementById('quiz-game')) return true;
    if (document.getElementById('gameCanvas')) return true;
    if (document.querySelector('.level-grid, #level-grid')) return true;

    return false;
  }

  // ============================================
  // DETECCIÓN AUTOMÁTICA DE CONTEXTO
  // ============================================
  function detectarContexto() {
    const ctx = { materia: null, nivel: null, pregunta: null, opciones: [] };
    const params = new URLSearchParams(window.location.search);

    // 1. Quiz normal (quiz_runner.html?subject=X&level=Y)
    if (window.location.pathname.includes('quiz_runner')) {
      ctx.materia = _capitalizarMateria(params.get('subject') || window.materiaNombre || 'General');
      ctx.nivel = parseInt(params.get('level')) || window.nivelNumero || 1;
      const qText = document.getElementById('questionText');
      if (qText) ctx.pregunta = qText.textContent;
      ctx.opciones = Array.from(document.querySelectorAll('.option-btn, .option-button')).map(b => b.textContent.trim());
      return ctx;
    }

    // 2. Minijuegos quiz-style (funcion_lineal_juego, trigonometria_juego)
    if (window.NIVEL_ID_BASE !== undefined && window.currentLevel !== undefined) {
      ctx.materia = 'Matemáticas';
      ctx.nivel = window.currentLevel;
      const hint = document.getElementById('hintLine') || document.getElementById('challenge');
      if (hint) ctx.pregunta = hint.textContent;
      return ctx;
    }

    // 3. Minijuegos puros (balanzas, puzzle, regresion, tiro)
    if (window.levelConfigs || window.LEVELS || window.location.pathname.includes('_juego')) {
      ctx.nivel = parseInt(params.get('nivel')) || 1;
      ctx.materia = _extraerMateriaDeUrl(window.location.pathname);
      return ctx;
    }

    // 4. Niveles / Práctica
    if (window.location.pathname.includes('niveles')) {
      ctx.materia = _capitalizarMateria(params.get('subject') || 'General');
      ctx.nivel = parseInt(params.get('level')) || 1;
      return ctx;
    }

    // 5. Torneos
    if (window.location.pathname.includes('torneo')) {
      ctx.materia = 'Torneo';
      ctx.nivel = 1;
      return ctx;
    }

    // 6. Fallback: intentar extraer de la URL
    ctx.materia = _extraerMateriaDeUrl(window.location.pathname);
    ctx.nivel = parseInt(params.get('nivel') || params.get('level')) || 1;

    return ctx.materia ? ctx : null;
  }

  // ============================================
  // UTILIDADES DE CONTEXTO
  // ============================================
  function _extraerMateriaDeUrl(pathname) {
    const mapa = {
      'funcion_lineal': 'Matemáticas',
      'trigonometria': 'Matemáticas',
      'balanzas': 'Matemáticas',
      'puzzle': 'Matemáticas',
      'regresion': 'Matemáticas',
      'tiro': 'Matemáticas',
      'matematicas': 'Matemáticas',
      'ciencias': 'Ciencias',
      'lenguaje': 'Lenguaje',
      'ingles': 'Inglés',
      'sociales': 'Sociales',
      'programacion': 'Programación',
      'salud': 'Salud'
    };

    for (const [key, val] of Object.entries(mapa)) {
      if (pathname.toLowerCase().includes(key)) return val;
    }
    return null;
  }

  function _capitalizarMateria(str) {
    if (!str) return 'General';
    const mapa = {
      'matematicas': 'Matemáticas', 'maths': 'Matemáticas', 'math': 'Matemáticas',
      'ciencias': 'Ciencias', 'science': 'Ciencias',
      'lenguaje': 'Lenguaje', 'language': 'Lenguaje',
      'ingles': 'Inglés', 'english': 'Inglés',
      'sociales': 'Sociales', 'social': 'Sociales',
      'programacion': 'Programación', 'programming': 'Programación',
      'salud': 'Salud', 'health': 'Salud'
    };
    return mapa[str.toLowerCase()] || str.charAt(0).toUpperCase() + str.slice(1);
  }

  // ============================================
  // CARGA DEL MÓDULO CHAT
  // ============================================
  function cargarScript(src, callback) {
    const script = document.createElement('script');
    // Resolver ruta desde /materias/
    if (window.location.pathname.includes('/materias/') && !src.startsWith('http') && !src.startsWith('/') && !src.startsWith('../')) {
      script.src = '../' + src;
    } else {
      script.src = src;
    }
    script.onload = callback;
    script.onerror = () => console.error('❌ Error cargando Sabi Chat:', src);
    document.head.appendChild(script);
  }

  // ============================================
  // INYECCIÓN PRINCIPAL
  // ============================================
  function inyectarSabi() {
    // Verificar que el usuario esté autenticado
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('🤖 Sabi: Usuario no autenticado, chat no inyectado');
      return;
    }

    // Verificar si la página necesita chat
    if (!necesitaChatSabi()) {
      console.log('🤖 Sabi: Página no requiere chat');
      return;
    }

    // Detectar contexto
    const contexto = detectarContexto();
    if (!contexto) {
      console.log('🤖 Sabi: No se pudo detectar contexto');
      return;
    }

    // Cargar sabi_chat.js si no está cargado
    if (typeof SabiChatPanel === 'undefined') {
      cargarScript('js/sabi_chat.js', () => {
        _inicializarChat(contexto);
      });
    } else {
      _inicializarChat(contexto);
    }
  }

  function _inicializarChat(contexto) {
    if (typeof SabiChatPanel === 'undefined') {
      console.error('❌ SabiChatPanel no disponible');
      return;
    }

    window.SabiChat = new SabiChatPanel();
    window.SabiChat.inicializar(contexto);

    // Observer para actualizar pregunta cuando cambia el DOM (quiz_runner)
    _observarCambiosPregunta();

    console.log('🤖 Sabi Chat inyectado:', contexto);
  }

  // ============================================
  // OBSERVER: Detectar cambios de pregunta en quiz_runner
  // ============================================
  function _observarCambiosPregunta() {
    const questionEl = document.getElementById('questionText');
    if (!questionEl || !window.SabiChat) return;

    const observer = new MutationObserver(() => {
      const pregunta = questionEl.textContent;
      const opciones = Array.from(document.querySelectorAll('.option-btn, .option-button')).map(b => b.textContent.trim());
      window.SabiChat.actualizarPregunta(pregunta, opciones);
    });

    observer.observe(questionEl, { childList: true, characterData: true, subtree: true });
  }

  // ============================================
  // AUTO-EJECUCIÓN
  // ============================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      // Pequeño delay para que las variables globales del juego se inicialicen
      setTimeout(inyectarSabi, 500);
    });
  } else {
    setTimeout(inyectarSabi, 500);
  }

  // Exponer para uso manual
  window.SabiInjector = {
    inyectar: inyectarSabi,
    detectarContexto,
    necesitaChatSabi
  };

})();
