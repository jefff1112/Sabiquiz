// ============================================
// SABI CHAT - Lógica completa del panel de chat tutor
// ============================================
// Uso: window.SabiChat = new SabiChatPanel(); SabiChat.inicializar(contexto);
// ============================================

class SabiChatPanel {
  constructor() {
    this.contexto = { materia: 'General', nivel: 1, pregunta: '', opciones: [], intento: 0 };
    this.historial = [];
    this.sessionId = null;
    this.panelAbierto = false;
    this.enviando = false;
    this.inactividadTimer = null;
    this.elemento = null;
    this.fabElement = null;
    this._initialized = false;

    // Recuperar sessionId de localStorage
    try {
      this.sessionId = localStorage.getItem('sabi_sessionId') || null;
    } catch (e) { /* ignore */ }
  }

  // ============================================
  // INICIALIZACIÓN
  // ============================================

  inicializar(contexto) {
    if (this._initialized) {
      if (contexto) this.setContexto(contexto);
      return;
    }

    if (contexto) {
      this.contexto = { ...this.contexto, ...contexto };
    }

    this._inyectarCSS();
    this._inyectarHTML();
    this._bindEvents();
    this._initialized = true;

    console.log('🤖 Sabi Chat inicializado:', this.contexto);
  }

  // ============================================
  // INYECCIÓN DE CSS Y HTML
  // ============================================

  _inyectarCSS() {
    if (document.getElementById('sabi-chat-css')) return;
    const link = document.createElement('link');
    link.id = 'sabi-chat-css';
    link.rel = 'stylesheet';
    // Resolver ruta relativa desde cualquier página (incluidas las de /materias/)
    const base = window.location.pathname.includes('/materias/') ? '../css/sabi_chat.css' : 'css/sabi_chat.css';
    link.href = base;
    document.head.appendChild(link);
  }

  _inyectarHTML() {
    // Botón flotante (FAB)
    const fab = document.createElement('button');
    fab.className = 'sabi-chat-fab sabi-chat-fab--pulse';
    fab.id = 'sabiChatFab';
    fab.title = 'Hablar con Sabi 🤖';
    fab.innerHTML = '<img src="' + this._resolverRutaImg('img/sabi/sabi_saludando.png') + '" alt="Sabi">';
    document.body.appendChild(fab);
    this.fabElement = fab;

    // Panel de chat
    const panel = document.createElement('div');
    panel.className = 'sabi-chat-panel sabi-chat-panel--hidden';
    panel.id = 'sabiChatPanel';
    panel.innerHTML = `
      <div class="sabi-chat-header" id="sabiChatHeader">
        <img src="${this._resolverRutaImg('img/sabi/sabi_saludando.png')}" alt="Sabi" class="sabi-chat-header-avatar" id="sabiHeaderAvatar">
        <div class="sabi-chat-header-info">
          <p class="sabi-chat-header-title">Sabi 🤖</p>
          <p class="sabi-chat-header-status" id="sabiHeaderStatus">Tu tutor IA</p>
        </div>
        <button class="sabi-chat-header-close" id="sabiChatClose" title="Minimizar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>
      <div class="sabi-chat-body" id="sabiChatBody">
        <div class="sabi-chat-welcome">
          <img src="${this._resolverRutaImg('img/sabi/sabi_saludando.png')}" alt="Sabi">
          <p><strong>¡Hola! Soy Sabi 🤖</strong></p>
          <p>Tu tutor IA. Pregúntame sobre ${this._escape(this.contexto.materia)}.</p>
        </div>
        <div class="sabi-chat-chips" id="sabiChips">
          <button class="sabi-chat-chip" data-msg="Dame una pista">💡 Pista</button>
          <button class="sabi-chat-chip" data-msg="Explícame el concepto">📖 Explícame</button>
          <button class="sabi-chat-chip" data-msg="¿Qué fórmula debo usar?">🔢 Fórmula</button>
        </div>
      </div>
      <div class="sabi-chat-input-area">
        <div class="sabi-chat-typing" id="sabiTyping" style="display:none;">
          <img src="${this._resolverRutaImg('img/sabi/sabi_pensando.png')}" alt="Pensando" class="sabi-chat-typing-avatar">
          <span>Sabi está pensando</span>
          <div class="sabi-chat-typing-dots"><span></span><span></span><span></span></div>
        </div>
        <div class="sabi-chat-input-wrapper">
          <input type="text" class="sabi-chat-input" id="sabiChatInput" placeholder="Escribe tu duda..." maxlength="500" autocomplete="off">
          <button class="sabi-chat-send-btn" id="sabiSendBtn" title="Enviar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(panel);
    this.elemento = panel;
  }

  // ============================================
  // EVENTOS
  // ============================================

  _bindEvents() {
    // FAB: abrir/cerrar panel
    this.fabElement.addEventListener('click', () => this.toggle());

    // Header: minimizar/expandir
    document.getElementById('sabiChatHeader').addEventListener('click', (e) => {
      // Evitar que el click del botón close propague
      if (e.target.closest('#sabiChatClose')) return;
      const panel = this.elemento;
      panel.classList.toggle('sabi-chat-panel--minimized');
    });

    // Botón close
    document.getElementById('sabiChatClose').addEventListener('click', (e) => {
      e.stopPropagation();
      this.cerrar();
    });

    // Enviar
    document.getElementById('sabiSendBtn').addEventListener('click', () => this._enviar());
    document.getElementById('sabiChatInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this._enviar();
      }
    });

    // Chips de acciones rápidas
    document.getElementById('sabiChips').addEventListener('click', (e) => {
      const chip = e.target.closest('.sabi-chat-chip');
      if (chip && chip.dataset.msg) {
        document.getElementById('sabiChatInput').value = chip.dataset.msg;
        this._enviar();
      }
    });

    // Resetear timer de inactividad al escribir
    document.getElementById('sabiChatInput').addEventListener('input', () => {
      this._resetInactividadTimer();
    });
  }

  // ============================================
  // ABRIR / CERRAR
  // ============================================

  toggle() {
    if (this.panelAbierto) {
      this.cerrar();
    } else {
      this.abrir();
    }
  }

  abrir() {
    this.panelAbierto = true;
    this.elemento.classList.remove('sabi-chat-panel--hidden');
    this.elemento.classList.remove('sabi-chat-panel--minimized');
    this.fabElement.classList.add('sabi-chat-fab--hidden');
    this._resetInactividadTimer();
    // Focus en el input
    setTimeout(() => {
      document.getElementById('sabiChatInput')?.focus();
    }, 350);
  }

  cerrar() {
    this.panelAbierto = false;
    this.elemento.classList.add('sabi-chat-panel--hidden');
    this.fabElement.classList.remove('sabi-chat-fab--hidden');
    clearTimeout(this.inactividadTimer);
  }

  // ============================================
  // CONTEXTO
  // ============================================

  setContexto(ctx) {
    this.contexto = { ...this.contexto, ...ctx };
    this.contexto.intento = 0;

    // Actualizar status en header
    const status = document.getElementById('sabiHeaderStatus');
    if (status) {
      status.textContent = ctx.materia ? `${ctx.materia} - Nivel ${ctx.nivel || '?'}` : 'Tu tutor IA';
    }
  }

  actualizarPregunta(pregunta, opciones) {
    this.contexto.pregunta = pregunta || '';
    this.contexto.opciones = opciones || [];
    this.contexto.intento = 0;
  }

  // ============================================
  // ENVIAR MENSAJE
  // ============================================

  async _enviar() {
    const input = document.getElementById('sabiChatInput');
    const mensaje = (input.value || '').trim();
    if (!mensaje || this.enviando) return;

    this.contexto.intento = (this.contexto.intento || 0) + 1;
    this.enviando = true;

    // Mostrar mensaje del usuario
    this._agregarMensaje('user', mensaje);
    input.value = '';
    input.disabled = true;
    document.getElementById('sabiSendBtn').disabled = true;

    // Ocultar chips después del primer mensaje
    const chips = document.getElementById('sabiChips');
    if (chips) chips.style.display = 'none';

    // Mostrar "escribiendo"
    this._mostrarEscribiendo(true);
    this._actualizarAvatar('img/sabi/sabi_pensando.png');

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No autenticado');

      const apiBase = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
        ? 'http://localhost:3000/api'
        : (window.location.origin + '/api');

      const response = await fetch(`${apiBase}/sabi/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          mensaje,
          contexto: {
            materia: this.contexto.materia,
            nivel: this.contexto.nivel,
            pregunta: this.contexto.pregunta,
            opciones: this.contexto.opciones,
            intento: this.contexto.intento,
            sessionId: this.sessionId
          }
        })
      });

      const data = await response.json();

      this._mostrarEscribiendo(false);

      if (data.success) {
        this._agregarMensaje('sabi', data.respuesta, data.imagen);
        this._actualizarAvatar(data.imagen || 'img/sabi/sabi_curioso.png');

        // Guardar sessionId
        if (data.sessionId) {
          this.sessionId = data.sessionId;
          try { localStorage.setItem('sabi_sessionId', data.sessionId); } catch (e) { /* ignore */ }
        }
      } else {
        this._agregarMensaje('sabi', '😅 Hubo un error. ¿Puedes intentarlo de nuevo?', 'img/sabi/sabi_confundido.png');
        this._actualizarAvatar('img/sabi/sabi_confundido.png');
      }
    } catch (error) {
      console.error('Error enviando a Sabi:', error);
      this._mostrarEscribiendo(false);

      // Fallback offline
      const respuestaOffline = this._respuestaOffline();
      this._agregarMensaje('sabi', respuestaOffline, 'img/sabi/sabi_confundido.png');
      this._actualizarAvatar('img/sabi/sabi_confundido.png');
    } finally {
      this.enviando = false;
      input.disabled = false;
      document.getElementById('sabiSendBtn').disabled = false;
      input.focus();
      this._resetInactividadTimer();
    }
  }

  // ============================================
  // MENSAJES UI
  // ============================================

  _agregarMensaje(rol, texto, imagenSabi) {
    const body = document.getElementById('sabiChatBody');
    const div = document.createElement('div');
    div.className = `sabi-chat-msg sabi-chat-msg--${rol}`;

    const textoSafe = this._escape(texto);

    if (rol === 'sabi') {
      const imgSrc = this._resolverRutaImg(imagenSabi || 'img/sabi/sabi_curioso.png');
      div.innerHTML = `
        <img src="${imgSrc}" alt="Sabi" class="sabi-chat-msg-avatar">
        <div class="sabi-chat-msg-bubble">${textoSafe}</div>
      `;
    } else {
      div.innerHTML = `<div class="sabi-chat-msg-bubble">${textoSafe}</div>`;
    }

    body.appendChild(div);
    body.scrollTop = body.scrollHeight;

    // Guardar en historial local
    this.historial.push({ rol, contenido: texto });
    if (this.historial.length > 50) {
      this.historial = this.historial.slice(-50);
    }
  }

  _mostrarEscribiendo(visible) {
    const typing = document.getElementById('sabiTyping');
    if (typing) {
      typing.style.display = visible ? 'flex' : 'none';
    }
    // Scroll al fondo
    if (visible) {
      const body = document.getElementById('sabiChatBody');
      body.scrollTop = body.scrollHeight;
    }
  }

  _actualizarAvatar(src) {
    const avatar = document.getElementById('sabiHeaderAvatar');
    if (avatar) {
      avatar.src = this._resolverRutaImg(src);
    }
  }

  // ============================================
  // INACTIVIDAD
  // ============================================

  _resetInactividadTimer() {
    clearTimeout(this.inactividadTimer);
    this.inactividadTimer = setTimeout(() => {
      if (this.panelAbierto) {
        this._actualizarAvatar('img/sabi/sabi_durmiendo.png');
        const status = document.getElementById('sabiHeaderStatus');
        if (status) status.textContent = '💤 Zzz...';
      }
    }, 30000);
  }

  // ============================================
  // FALLBACK OFFLINE
  // ============================================

  _respuestaOffline() {
    const materia = this.contexto.materia || 'General';
    const pistas = [
      `🤔 No pude conectarme al servidor. Pero te doy un tip: piensa en los conceptos clave de ${materia}.`,
      `📡 Error de conexión. Mientras tanto, intenta descartar las opciones que sabes que son incorrectas.`,
      `⚡ Sin conexión por ahora. Revisa la teoría del nivel para encontrar la respuesta.`
    ];
    return pistas[Math.floor(Math.random() * pistas.length)];
  }

  // ============================================
  // UTILIDADES
  // ============================================

  _escape(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  _resolverRutaImg(src) {
    if (!src) return '';
    // Si estamos en /materias/, necesitamos subir un nivel
    if (window.location.pathname.includes('/materias/') && !src.startsWith('http') && !src.startsWith('/') && !src.startsWith('../')) {
      return '../' + src;
    }
    return src;
  }

  // ============================================
  // API PÚBLICA
  // ============================================

  /** Envía un mensaje programáticamente */
  sendMessage(texto) {
    const input = document.getElementById('sabiChatInput');
    if (input) {
      input.value = texto;
      this._enviar();
    }
  }

  /** Muestra un mensaje de Sabi programáticamente */
  showSabiMessage(texto, imagen) {
    this._agregarMensaje('sabi', texto, imagen);
  }
}

// Exportar como módulo ES si se usa con import
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SabiChatPanel };
}
