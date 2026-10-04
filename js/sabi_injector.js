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
      '_juego',
      'funcion_lineal',
      'trigonometria',
      'torneos',
      'torneo_detalle',
      'suggestions',
      'main_menu'
    ];

    // Verificar por ruta
    if (paginasConChat.some(p => path.includes(p))) return true;

    // Verificar por elementos DOM (para páginas no estándar)
    if (document.getElementById('quiz-game')) return true;
    if (document.getElementById('gameCanvas')) return true;
    if (document.querySelector('.level-grid, #level-grid')) return true;
    if (document.querySelector('.suggestions-container')) return true;

    return false;
  }

  // ============================================
  // DETECCIÓN AUTOMÁTICA DE CONTEXTO
  // ============================================
  function detectarContexto() {
    const ctx = { materia: null, nivel: null, pregunta: null, opciones: [] };
    const params = new URLSearchParams(window.location.search);
    const pathname = window.location.pathname.toLowerCase();

    // 1. Quiz normal (quiz_runner.html?subject=X&level=Y)
    if (pathname.includes('quiz_runner')) {
      ctx.materia = _capitalizarMateria(params.get('subject') || window.materiaNombre || 'General');
      ctx.nivel = parseInt(params.get('level')) || window.nivelNumero || 1;
      const qText = document.getElementById('questionText');
      if (qText) ctx.pregunta = qText.textContent;
      ctx.opciones = Array.from(document.querySelectorAll('.option-btn, .option-button')).map(b => b.textContent.trim());
      return ctx;
    }

    // 2. Minijuegos quiz-style: Función Lineal y Trigonometría
    if (pathname.includes('funcion_lineal_juego') || pathname.includes('trigonometria_juego')) {
      ctx.materia = 'Matemáticas';
      ctx.nivel = window.currentLevel || parseInt(params.get('nivel')) || 1;
      // Leer la instrucción/reto del juego
      const challenge = document.getElementById('challenge');
      const hintLine = document.getElementById('hintLine');
      const levelTitle = document.querySelector('.level-title');
      if (challenge) {
        ctx.pregunta = challenge.textContent.trim();
      } else if (hintLine) {
        ctx.pregunta = hintLine.textContent.trim();
      } else if (levelTitle) {
        ctx.pregunta = levelTitle.textContent.trim();
      }
      // Descripción del tipo de juego para Sabi
      if (pathname.includes('funcion_lineal')) {
        ctx.pregunta = (ctx.pregunta || '') + ' [Minijuego: Función Lineal - ajustar sliders de pendiente e intercepto]';
      } else {
        ctx.pregunta = (ctx.pregunta || '') + ' [Minijuego: Trigonometría - resolver ángulos y lados]';
      }
      return ctx;
    }

    // 3. Minijuegos puros: Puzzle, Balanzas, Regresión, Tiro Parabólico
    if (pathname.includes('_juego')) {
      ctx.materia = 'Matemáticas';
      ctx.nivel = window.currentLevel || parseInt(params.get('nivel')) || 1;
      
      // Intentar leer la instrucción del DOM
      const hintLine = document.getElementById('hintLine');
      const levelTitle = document.querySelector('.level-title');
      const challenge = document.getElementById('challenge');
      
      if (hintLine && hintLine.textContent.trim()) {
        ctx.pregunta = hintLine.textContent.trim();
      } else if (challenge && challenge.textContent.trim()) {
        ctx.pregunta = challenge.textContent.trim();
      } else if (levelTitle && levelTitle.textContent.trim()) {
        ctx.pregunta = levelTitle.textContent.trim();
      }

      // Agregar tipo de minijuego para que Sabi sepa qué juego es
      if (pathname.includes('puzzle')) {
        ctx.pregunta = (ctx.pregunta || 'Puzzle Geométrico') + ' [Minijuego: arrastrar figuras geométricas al lugar correcto]';
      } else if (pathname.includes('balanzas')) {
        ctx.pregunta = (ctx.pregunta || 'Balanzas') + ' [Minijuego: equilibrar ecuaciones con balanzas, encontrar el valor de X]';
      } else if (pathname.includes('regresion')) {
        ctx.pregunta = (ctx.pregunta || 'Regresión') + ' [Minijuego: ajustar la recta de regresión a los puntos del gráfico]';
      } else if (pathname.includes('tiro')) {
        ctx.pregunta = (ctx.pregunta || 'Tiro Parabólico') + ' [Minijuego: configurar ángulo y velocidad para acertar al objetivo]';
      }
      return ctx;
    }

    // 4. Niveles / Práctica
    if (pathname.includes('niveles')) {
      ctx.materia = _capitalizarMateria(params.get('subject') || 'General');
      ctx.nivel = parseInt(params.get('level')) || 1;
      return ctx;
    }

    // 5. Torneos
    if (pathname.includes('torneo')) {
      ctx.materia = 'Torneo';
      ctx.nivel = 1;
      return ctx;
    }

    // 6. Sugerencias
    if (pathname.includes('suggestions')) {
      ctx.materia = 'Creación de Preguntas';
      ctx.nivel = 1;
      ctx.pregunta = 'El usuario está sugiriendo una nueva pregunta para Sabiquiz. Ayúdale a pensar en buenas preguntas o validar que sus opciones sean lógicas.';
      return ctx;
    }

    // 7. Fallback: intentar extraer de la URL
    ctx.materia = _extraerMateriaDeUrl(pathname);
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
      if (window.__sabiChatLoading) {
        // Wait for it to finish loading
        const checkInterval = setInterval(() => {
          if (typeof SabiChatPanel !== 'undefined') {
            clearInterval(checkInterval);
            _inicializarChat(contexto);
          }
        }, 100);
        return;
      }
      window.__sabiChatLoading = true;
      cargarScript('js/sabi_chat.js', () => {
        window.__sabiChatLoading = false;
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
    if (!window.SabiChat) return;

    // Observer para quiz_runner (questionText)
    const questionEl = document.getElementById('questionText');
    if (questionEl) {
      const observer = new MutationObserver(() => {
        const pregunta = questionEl.textContent;
        const opciones = Array.from(document.querySelectorAll('.option-btn, .option-button')).map(b => b.textContent.trim());
        window.SabiChat.actualizarPregunta(pregunta, opciones);
      });
      observer.observe(questionEl, { childList: true, characterData: true, subtree: true });
    }

    // Observer para minijuegos (hintLine, challenge)
    const hintEl = document.getElementById('hintLine') || document.getElementById('challenge');
    if (hintEl) {
      const observer2 = new MutationObserver(() => {
        const pregunta = hintEl.textContent.trim();
        if (pregunta) window.SabiChat.actualizarPregunta(pregunta, []);
      });
      observer2.observe(hintEl, { childList: true, characterData: true, subtree: true });
    }
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
