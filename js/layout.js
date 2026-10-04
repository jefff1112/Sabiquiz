/**
 * Sabiquiz Layout & Navbar Manager
 * Handles injecting navbar, theme toggling, auth state, and global UI elements
 */
(function() {
  'use strict';

  const SabiquizLayout = {
    config: {
      excludePages: ['login.html', 'forgot-password.html', 'reset-password.html', 'register.html'],
      apiBaseUrl: (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') 
        ? 'http://localhost:3000/api' 
        : (window.location.origin + '/api')
    },

    init: function() {
      // 1. Initialize Theme early
      this.initTheme();

      // 2. Clean stale legacy controls that were left behind by the old layout
      document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('navbar-container')) {
          const legacySelectors = [
            '.language-switcher',
            '.header-buttons',
            '.menu-actions',
            '#notificationsBtn',
            '#logoutBtn',
            '.btn-admin',
            '.btn-notifications',
            '.btn-profile',
            '.btn-leaderboard',
            '.btn-logout'
          ];

          legacySelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
              el.style.display = 'none';
            });
          });
        }
      });

      // 3. Check if page needs layout
      const currentPath = window.location.pathname;
      const currentPage = currentPath.split('/').pop() || 'index.html';
      
      if (this.config.excludePages.includes(currentPage) || currentPath.endsWith('/') && this.config.excludePages.includes('index.html')) {
        return; // Don't inject on auth pages
      }

      // 4. Inject Navbar and FAB
      this.injectLayout();
    },

    getSystemTheme: function() {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    },

    applyTheme: function(mode) {
      const nextTheme = mode === 'auto' ? this.getSystemTheme() : (mode || 'light');
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('theme', mode || 'auto');
      this.updateThemeIcon();
    },

    initTheme: function() {
      const saved = localStorage.getItem('theme') || 'auto';
      this.applyTheme(saved);
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      const handleSystemThemeChange = () => {
        if (localStorage.getItem('theme') === 'auto') {
          document.documentElement.setAttribute('data-theme', this.getSystemTheme());
          this.updateThemeIcon();
        }
      };
      if (media.addEventListener) {
        media.addEventListener('change', handleSystemThemeChange);
      } else if (media.addListener) {
        media.addListener(handleSystemThemeChange);
      }
      document.addEventListener('DOMContentLoaded', () => this.updateThemeIcon());
    },

    toggleTheme: function() {
      document.body.classList.add('theme-transitioning');
      const current = localStorage.getItem('theme') || 'auto';
      const next = current === 'dark' ? 'light' : current === 'light' ? 'auto' : 'dark';
      this.applyTheme(next);
      setTimeout(() => document.body.classList.remove('theme-transitioning'), 300);
    },

    updateThemeIcon: function() {
      const icon = document.getElementById('themeToggle')?.querySelector('.theme-icon');
      if (icon) {
        const themeMode = localStorage.getItem('theme') || 'auto';
        const actualTheme = themeMode === 'auto' ? this.getSystemTheme() : themeMode;
        if (themeMode === 'auto') {
          icon.textContent = actualTheme === 'dark' ? '☀️' : '🌙';
          icon.title = 'Tema automático';
        } else {
          icon.textContent = actualTheme === 'dark' ? '☀️' : '🌙';
          icon.title = actualTheme === 'dark' ? 'Cambiar a claro' : 'Cambiar a oscuro';
        }
      }
    },

    injectLayout: async function() {
      try {
        // Wait for DOM
        if (document.readyState === 'loading') {
          await new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve));
        }

        const isSubfolder = window.location.pathname.includes('/materias/');
        const prefix = isSubfolder ? '../' : '';

        // Fetch Navbar
        const response = await fetch(`${prefix}components/navbar.html`);
        if (!response.ok) throw new Error('Failed to load navbar');
        
        let html = await response.text();
        
        // Adjust paths if in subfolder
        if (isSubfolder) {
          html = html.replace(/(href|src)="([^"]*)"/g, (match, p1, p2) => {
            if (p2.startsWith('http') || p2.startsWith('#') || p2.startsWith('data:')) return match;
            return `${p1}="${prefix}${p2}"`;
          });
        }

        // Inject HTML
        const container = document.getElementById('navbar-container');
        if (container) {
          container.innerHTML = html;
        } else {
          document.body.insertAdjacentHTML('afterbegin', html);
        }

        // Inject FAB
        this.injectSabiFAB(prefix);

        // Initialize features
        this.initNavbarEvents();
        this.updateAuthUI(prefix);
        this.setActiveLink();
        this.updateNavProgressBar();
        this.updateNavNotifications();
        
        // Setup onboarding
        this.initOnboarding();

      } catch (err) {
        console.error('Error injecting layout:', err);
      }
    },

    initNavbarEvents: function() {
      // Theme toggle
      const themeBtn = document.getElementById('themeToggle');
      if (themeBtn) {
        themeBtn.addEventListener('click', () => this.toggleTheme());
        this.updateThemeIcon(); // Ensure icon is correct on load
      }

      // User Menu Toggle
      const menuTrigger = document.getElementById('userMenuTrigger');
      const userMenu = document.getElementById('userMenu');
      if (menuTrigger && userMenu) {
        menuTrigger.addEventListener('click', (e) => {
          e.stopPropagation();
          userMenu.classList.toggle('open');
          const isExpanded = userMenu.classList.contains('open');
          menuTrigger.setAttribute('aria-expanded', isExpanded);
        });

        document.addEventListener('click', (e) => {
          if (!userMenu.contains(e.target)) {
            userMenu.classList.remove('open');
            menuTrigger.setAttribute('aria-expanded', 'false');
          }
        });

        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            userMenu.classList.remove('open');
            menuTrigger.setAttribute('aria-expanded', 'false');
          }
        });
      }

      // Logout
      const logoutBtn = document.getElementById('navLogoutBtn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
          e.preventDefault();
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          const isSubfolder = window.location.pathname.includes('/materias/');
          window.location.href = isSubfolder ? '../login.html' : 'login.html';
        });
      }

      // Hamburger Menu
      const hamburger = document.getElementById('navbarHamburger');
      const navLinks = document.getElementById('navbarLinks');
      if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
          const isOpen = navLinks.classList.toggle('open');
          hamburger.classList.toggle('active');
          hamburger.setAttribute('aria-expanded', isOpen);
          document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
          });
        });
      }

      // Notifications
      const notifBtn = document.getElementById('navNotificationsBtn');
      if (notifBtn) {
        notifBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          // If main_menu has its own showNotifications, use that
          if (typeof window.showNotifications === 'function') {
            window.showNotifications();
            return;
          }
          // Otherwise use the built-in panel
          SabiLayout.toggleNotificationsPanel();
        });
      }
    },

    updateAuthUI: function(prefix) {
      const userStr = localStorage.getItem('user');
      if (!userStr) return;

      try {
        const user = JSON.parse(userStr);
        
        // Update Name
        const nameEl = document.getElementById('navUserName');
        if (nameEl) nameEl.textContent = user.username || 'Usuario';
        
        // Update Avatar
        const avatarEl = document.getElementById('navUserAvatar');
        if (avatarEl && user.avatar) {
          avatarEl.src = user.avatar.startsWith('http') ? user.avatar : `${prefix}${user.avatar}`;
        }
        
        // Admin link
        const adminLink = document.getElementById('navAdminLink');
        if (adminLink && user.rol === 'admin') {
          adminLink.style.display = 'flex';
          adminLink.href = `${prefix}admin_panel.html`;
        }
      } catch (e) {
        console.error('Error parsing user data for UI', e);
      }
    },

    setActiveLink: function() {
      const currentPath = window.location.pathname;
      const page = currentPath.split('/').pop() || 'index.html';
      
      const links = document.querySelectorAll('#navbarLinks a');
      links.forEach(link => {
        const dataPage = link.getAttribute('data-page');
        if (dataPage && page.includes(dataPage)) {
          link.classList.add('active');
        } else if (link.getAttribute('href') && link.getAttribute('href').includes(page) && page !== '') {
           link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    },

    updateNavNotifications: async function() {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        
        const response = await fetch(`${this.config.apiBaseUrl}/progress/notificaciones`, {
          headers: { 
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json' 
          }
        });
        
        const data = await response.json();
        if (data.success && data.notificaciones) {
          const unread = data.notificaciones.filter(n => !n.leida).length;
          const badge = document.getElementById('navNotifCount');
          
          if (badge) {
            if (unread > 0) {
              badge.textContent = unread > 99 ? '99+' : unread;
              badge.style.display = 'flex';
            } else {
              badge.style.display = 'none';
            }
          }
        }
      } catch (e) {
        console.warn('Could not load notifications', e);
      }
    },

    toggleNotificationsPanel: async function() {
      const existing = document.getElementById('layoutNotifPanel');
      if (existing) { existing.remove(); return; }

      const token = localStorage.getItem('token');
      if (!token) return;

      let notifs = [];
      try {
        const resp = await fetch(`${this.config.apiBaseUrl}/progress/notificaciones`, {
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        });
        const data = await resp.json();
        if (data.success) notifs = data.notificaciones || [];
      } catch(e) { console.warn('No se pudieron cargar notificaciones', e); }

      const panel = document.createElement('div');
      panel.id = 'layoutNotifPanel';
      panel.style.cssText = `position:fixed;top:70px;right:20px;width:380px;max-height:460px;overflow-y:auto;background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);box-shadow:var(--shadow-lg);z-index:1001;padding:var(--space-4);animation:fadeInUp .2s ease;`;

      const noLeidas = notifs.filter(n => !n.leida).length;
      let html = `<div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid var(--color-border);padding-bottom:var(--space-3);margin-bottom:var(--space-3);">
        <div><h3 style="margin:0;color:var(--color-text);font-size:16px;">🔔 Notificaciones</h3>
        <small style="color:var(--color-text-muted);">${notifs.length} total (${noLeidas} sin leer)</small></div>
        <div style="display:flex;gap:var(--space-1);align-items:center;">
          ${noLeidas > 0 ? `<button onclick="SabiLayout._markAllNotifs()" style="background:none;border:none;color:var(--color-primary-500);cursor:pointer;font-size:12px;padding:4px 8px;">✅ Marcar todas</button>` : ''}
          <button onclick="document.getElementById('layoutNotifPanel')?.remove()" style="background:none;border:none;font-size:20px;cursor:pointer;color:var(--color-text-muted);padding:0 4px;">✕</button>
        </div></div>`;

      if (notifs.length === 0) {
        html += `<div style="text-align:center;padding:30px 0;color:var(--color-text-muted);"><div style="font-size:48px;margin-bottom:10px;">📭</div><p>No tienes notificaciones</p></div>`;
      } else {
        const sorted = [...notifs].sort((a,b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion));
        sorted.forEach(n => {
          const fecha = new Date(n.fecha_creacion);
          const icono = n.tipo === 'suggestion_approved' ? '✅' : n.tipo === 'suggestion_rejected' ? '❌' : n.tipo === 'new_logro' ? '🏅' : '⭐';
          html += `<div style="padding:10px 12px;margin-bottom:8px;background:${n.leida ? 'var(--color-bg)' : 'var(--color-primary-50)'};border-radius:var(--radius-md);border-left:3px solid ${n.leida ? 'var(--color-border)' : 'var(--color-primary-500)'};display:flex;justify-content:space-between;align-items:start;gap:8px;">
            <div style="flex:1;">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:3px;">
                <span style="font-size:16px;">${icono}</span>
                <span style="font-size:11px;color:var(--color-text-muted);">${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}</span>
                ${!n.leida ? '<span style="font-size:10px;background:var(--color-primary-500);color:white;padding:1px 8px;border-radius:10px;">Nuevo</span>' : ''}
              </div>
              <div style="font-size:14px;color:var(--color-text);word-break:break-word;">${n.mensaje}</div>
            </div>
            <div style="display:flex;flex-direction:column;gap:4px;flex-shrink:0;">
              ${!n.leida ? `<button onclick="SabiLayout._markNotif(${n.id})" style="background:none;border:none;color:var(--color-primary-500);cursor:pointer;font-size:11px;padding:2px 6px;">✅ Leer</button>` : ''}
              <button onclick="SabiLayout._deleteNotif(${n.id})" style="background:none;border:none;color:var(--color-accent-red);cursor:pointer;font-size:11px;padding:2px 6px;">🗑 Eliminar</button>
            </div>
          </div>`;
        });
      }

      panel.innerHTML = html;
      document.body.appendChild(panel);

      // Close on click outside
      const closeHandler = (e) => {
        if (!panel.contains(e.target) && e.target.id !== 'navNotificationsBtn' && !e.target.closest('#navNotificationsBtn')) {
          panel.remove();
          document.removeEventListener('click', closeHandler);
        }
      };
      setTimeout(() => document.addEventListener('click', closeHandler), 100);
    },

    _markNotif: async function(id) {
      const token = localStorage.getItem('token');
      try {
        await fetch(`${this.config.apiBaseUrl}/progress/notificaciones/${id}/leer`, {
          method: 'PUT', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        });
        document.getElementById('layoutNotifPanel')?.remove();
        this.toggleNotificationsPanel();
        this.updateNavNotifications();
      } catch(e) { console.error('Error marcando notificación:', e); }
    },

    _markAllNotifs: async function() {
      const token = localStorage.getItem('token');
      try {
        await fetch(`${this.config.apiBaseUrl}/progress/notificaciones/leer-todas`, {
          method: 'PUT', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        });
        document.getElementById('layoutNotifPanel')?.remove();
        this.toggleNotificationsPanel();
        this.updateNavNotifications();
      } catch(e) { console.error('Error marcando notificaciones:', e); }
    },

    _deleteNotif: async function(id) {
      const token = localStorage.getItem('token');
      try {
        await fetch(`${this.config.apiBaseUrl}/progress/notificaciones/${id}`, {
          method: 'DELETE', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        });
        document.getElementById('layoutNotifPanel')?.remove();
        this.toggleNotificationsPanel();
        this.updateNavNotifications();
      } catch(e) { console.error('Error eliminando notificación:', e); }
    },

    updateNavProgressBar: async function() {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        
        const response = await fetch(`${this.config.apiBaseUrl}/progress/stats`, {
          headers: { 
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json' 
          }
        });
        
        const data = await response.json();
        if (data.success && data.stats) {
          const completed = data.stats.niveles_completados || 0;
          const total = 700; // total levels across all subjects
          const percentage = Math.min((completed / total) * 100, 100);
          
          const fill = document.getElementById('navbarProgressFill');
          if (fill) {
            fill.style.width = percentage + '%';
            fill.title = `${percentage.toFixed(0)}% completado · ${completed} / ${total} niveles`;
          }
        }
      } catch (e) {
        console.warn('Could not update progress bar', e);
      }
    },

    injectSabiFAB: function(prefix) {
      if (document.getElementById('sabiFab')) return;
      
      const fabHtml = `
        <button class="fab" id="sabiFab" aria-label="Hablar con Sabi">
          <img src="${prefix}img/sabi/sabi_saludando.png" alt="Sabi">
          <span class="fab-badge" id="sabiFabBadge" style="display:none;"></span>
        </button>
      `;
      
      document.body.insertAdjacentHTML('beforeend', fabHtml);
      
      const fab = document.getElementById('sabiFab');
      fab.addEventListener('click', () => {
        if (window.SabiChat) {
           // Toggle chat if it exists globally
           if (typeof window.SabiChat.toggle === 'function') {
               window.SabiChat.toggle();
           }
        } else if (window.SabiInjector && typeof window.SabiInjector.inyectar === 'function') {
           window.SabiInjector.inyectar();
        } else {
           // Show a toast message if Sabi is unavailable
           const toast = document.createElement('div');
           toast.textContent = 'Sabi no está disponible en esta página';
           toast.style.cssText = 'position:fixed;bottom:90px;right:20px;background:rgba(0,0,0,0.8);color:white;padding:10px 20px;border-radius:8px;z-index:9999;transition:opacity 0.3s;';
           document.body.appendChild(toast);
           setTimeout(() => {
               toast.style.opacity = '0';
               setTimeout(() => toast.remove(), 300);
           }, 3000);
        }
      });
    },

    initOnboarding: function() {
      const isDone = localStorage.getItem('sabiquiz-onboarding-done');
      const isMainMenu = window.location.pathname.endsWith('main_menu.html');
      
      if (!isDone && isMainMenu) {
        // Delay to let the page render fully
        setTimeout(() => this.runOnboarding(), 1500);
      }
    },

    runOnboarding: function() {
      if (this._onboardingRunning) return;
      this._onboardingRunning = true;
      
      this._onboardingSteps = [
        {
          target: '.navbar-brand',
          message: '¡Hola! Soy Sabi, tu guía de aprendizaje. 🐶 Te voy a mostrar cómo funciona SabiQuiz.',
          position: 'bottom'
        },
        {
          target: '.quick-actions',
          message: 'Aquí tienes acciones rápidas: duelos 1vs1, jugar contra mí (Sabi IA) o entrar a torneos. ¡Elige tu favorito!',
          position: 'bottom'
        },
        {
          target: '#subjectsGrid',
          message: 'Estas son tus materias. Haz clic en una para empezar a aprender y ganar estrellas. ⭐',
          position: 'top'
        },
        {
          target: '#sabiFab',
          message: '¿Necesitas ayuda? Yo estoy siempre aquí abajo. ¡Haz clic en mí para chatear!',
          position: 'left'
        }
      ];

      this._currentOnboardingStep = 0;

      // Create overlay
      let overlay = document.getElementById('onboarding-overlay');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'onboarding-overlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.6);z-index:9998;transition:opacity 0.3s;';
        document.body.appendChild(overlay);
      }

      // Create tooltip container
      let tooltip = document.getElementById('onboarding-tooltip');
      if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'onboarding-tooltip';
        tooltip.style.cssText = `
          position:fixed;z-index:10000;background:var(--color-surface, white);
          border-radius:16px;padding:20px;max-width:320px;width:90%;
          box-shadow:0 20px 60px rgba(0,0,0,0.3);transition:all 0.3s ease;
          font-family:'Poppins',system-ui,sans-serif;
        `;
        document.body.appendChild(tooltip);
      }

      // Expose methods for the buttons
      window.nextOnboardingStep = () => {
        this._currentOnboardingStep++;
        this.showOnboardingStep(this._currentOnboardingStep);
      };

      window.skipOnboardingStep = () => {
        this.showOnboardingStep(this._onboardingSteps.length);
      };

      this.showOnboardingStep(0);
    },

    showOnboardingStep: function(index) {
      const overlay = document.getElementById('onboarding-overlay');
      const tooltip = document.getElementById('onboarding-tooltip');
      
      if (!overlay || !tooltip) return;

      if (index >= this._onboardingSteps.length) {
        // Onboarding complete
        overlay.style.opacity = '0';
        tooltip.style.opacity = '0';
        setTimeout(() => {
          overlay.remove();
          tooltip.remove();
          document.querySelectorAll('.onboarding-highlight').forEach(el => {
            el.classList.remove('onboarding-highlight');
            el.style.position = '';
            el.style.zIndex = '';
          });
        }, 300);
        localStorage.setItem('sabiquiz-onboarding-done', 'true');
        this._onboardingRunning = false;
        delete window.nextOnboardingStep;
        delete window.skipOnboardingStep;
        return;
      }

      const step = this._onboardingSteps[index];
      const targetEl = document.querySelector(step.target);

      // Remove previous highlight
      document.querySelectorAll('.onboarding-highlight').forEach(el => {
        el.classList.remove('onboarding-highlight');
        el.style.position = '';
        el.style.zIndex = '';
      });

      // Highlight target
      if (targetEl) {
        targetEl.classList.add('onboarding-highlight');
        if (getComputedStyle(targetEl).position === 'static') {
            targetEl.style.position = 'relative';
        }
        targetEl.style.zIndex = '9999';
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      // Update tooltip content
      tooltip.innerHTML = `
        <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:16px;">
          <img src="img/sabi/sabi_saludando.png" alt="Sabi" style="width:48px;height:48px;border-radius:50%;flex-shrink:0;">
          <p style="margin:0;font-size:15px;line-height:1.5;color:var(--color-text, #1a1a2e);">${step.message}</p>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:12px;color:var(--color-text-muted, #6b7280);">${index + 1} / ${this._onboardingSteps.length}</span>
          <div style="display:flex;gap:8px;">
            <button onclick="window.skipOnboardingStep()" type="button" style="padding:8px 16px;border:none;border-radius:8px;background:transparent;color:var(--color-text-muted, #6b7280);cursor:pointer;font-size:14px;font-family:inherit;">Saltar</button>
            <button onclick="window.nextOnboardingStep()" type="button" style="padding:8px 20px;border:none;border-radius:8px;background:var(--color-primary-500, #8b5cf6);color:white;cursor:pointer;font-weight:600;font-size:14px;font-family:inherit;box-shadow:0 4px 12px rgba(139,92,246,0.3);">
              ${index === this._onboardingSteps.length - 1 ? '¡Empezar!' : 'Siguiente →'}
            </button>
          </div>
        </div>
      `;

      // Position tooltip near target
      if (targetEl) {
        setTimeout(() => {
          const rect = targetEl.getBoundingClientRect();
          const tooltipRect = tooltip.getBoundingClientRect();
          
          if (step.position === 'bottom') {
            tooltip.style.top = (rect.bottom + 12) + 'px';
            tooltip.style.left = Math.max(10, Math.min(rect.left, window.innerWidth - tooltipRect.width - 10)) + 'px';
          } else if (step.position === 'top') {
            tooltip.style.top = (rect.top - tooltipRect.height - 12) + 'px';
            tooltip.style.left = Math.max(10, Math.min(rect.left, window.innerWidth - tooltipRect.width - 10)) + 'px';
          } else if (step.position === 'left') {
            tooltip.style.top = Math.max(10, rect.top - 20) + 'px';
            tooltip.style.left = Math.max(10, rect.left - tooltipRect.width - 12) + 'px';
          }

          // Ensure tooltip is on screen
          const tRect = tooltip.getBoundingClientRect();
          if (tRect.bottom > window.innerHeight) {
            tooltip.style.top = (window.innerHeight - tRect.height - 20) + 'px';
          }
          if (tRect.top < 10) {
            tooltip.style.top = '10px';
          }
        }, 100);
      } else {
        // Fallback: center on screen
        tooltip.style.top = '50%';
        tooltip.style.left = '50%';
        tooltip.style.transform = 'translate(-50%, -50%)';
      }
    }
  };

  // Expose for debugging
  window.SabiquizLayout = SabiquizLayout;

  // Run initialization
  SabiquizLayout.init();

})();
