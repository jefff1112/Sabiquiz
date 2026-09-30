# 📋 REPORTE COMPLETO DE ANÁLISIS - PROYECTO SABIQUIZ

**Fecha del análisis:** 27 de septiembre de 2026  
**Versión del proyecto:** 1.0.0  
**Stack:** Node.js + Express + MySQL + Socket.IO + HTML/CSS/JavaScript  
**Base de datos:** MySQL (sabiquiz_db en localhost:3306)

---

## 1. RESUMEN EJECUTIVO

### Estado General del Proyecto: **BUENO** ✅

El proyecto Sabiquiz está **funcional y listo para presentación en la Feria CIMAT 2026**, con una arquitectura sólida, base de datos completa y funcionalidades core implementadas. Sin embargo, existen **problemas de integridad de datos** y **deuda técnica** que deben corregirse antes de producción.

### 🟢 Puntos Fuertes
| Área | Detalle |
|------|---------|
| **Arquitectura** | Separación clara backend/frontend, rutas modulares, modelos organizados |
| **Base de datos** | 21 tablas bien estructuradas, FKs definidas, índices apropiados |
| **Contenido educativo** | 7 materias × 30 niveles × 5 preguntas = **1,050 preguntas** completas |
| **Funcionalidades core** | Auth JWT, Quiz, Progreso, 1vs1 tiempo real (Socket.IO), Logros, Sugerencias, Admin |
| **Gamificación** | XP, niveles, rachas, partidas ganadas, minijuegos (4 tipos), logros (19) |
| **Tiempo real** | Socket.IO implementado para 1vs1 y notificaciones push |
| **Seguridad base** | Bcrypt (10 rounds), JWT con expiración 7d, rate limiting login (5 intentos/15min) |

### 🔴 Puntos Débiles Críticos
| Problema | Severidad | Impacto |
|----------|-----------|---------|
| **101 registros huérfanos** en `progreso_usuario` | **ALTA** | Datos corruptos de progreso, estadísticas incorrectas |
| **5 preguntas con solo 2 opciones** | **MEDIA** | UX pobre, quizzes incompletos (Matemáticas: 2, Inglés: 3) |
| **Duplicados de índices** en tabla `partidas` (room_code x3) | **BAJA** | Desperdicio de espacio, confusión |
| **CSS/JS inline masivo** en HTMLs | **MEDIA** | Mantenibilidad difícil, ~66KB HTML duplicado |
| **.env con secretos reales** en repositorio | **ALTA** | Riesgo seguridad si repo es público |

### ⚠️ Riesgos Identificados
1. **Integridad referencial rota** - Progreso apunta a niveles que ya no existen (migración incompleta)
2. **Credenciales expuestas** - JWT_SECRET, EMAIL_PASS, DB_PASSWORD en .env commiteado
3. **Sin tests automatizados** - Riesgo de regresiones
4. **Logs de auditoría vacíos** - `logs_auditoria` y `matchmaking` sin usar
5. **Falta paginación** en endpoints de ranking/usuarios (carga todos los registros)

---

## 2. ESTRUCTURA DEL PROYECTO

### Árbol de Directorios (sin node_modules)
```
SABIQUIZ/
├── .git/
├── css/
│   └── styles.css (62,435 bytes)
├── img/ (19 archivos, ~2.5 MB total)
├── js/
│   ├── app.js (8,829 bytes)
│   └── translations.js (6,931 bytes)
├── materias/
│   ├── matematicas/
│   │   └── minijuegos/
│   ├── *-data.js (7 archivos, ~350 KB total)
│   └── *.html (21 archivos HTML de materias/minijuegos)
├── server/
│   ├── config/
│   │   ├── database.js
│   │   └── email.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Usuario.js
│   │   ├── Progreso.js
│   │   ├── Pregunta.js
│   │   └── Logro.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── quiz.js
│   │   ├── progress.js
│   │   ├── suggestions.js
│   │   ├── matches.js
│   │   └── minigames.js
│   ├── scripts/ (13 scripts de migración/test)
│   └── server.js (26,356 bytes - punto de entrada principal)
├── .env (1,173 bytes) ⚠️ SECRETS EXPUESTOS
├── .gitignore
├── package.json / package-lock.json
├── serviceAccountKey.json (Firebase)
├── index.html (358 bytes - redirect)
├── login.html (27,054 bytes)
├── main_menu.html (66,824 bytes)
├── profile.html (30,179 bytes)
├── leaderboard.html (23,475 bytes)
├── quiz_runner.html (27,153 bytes)
├── admin_panel.html (22,787 bytes)
├── suggestions.html (15,580 bytes)
├── forgot-password.html (7,641 bytes)
├── reset-password.html (13,375 bytes)
├── niveles.html (7,175 bytes)
└── REPORTE_QA.md (7,075 bytes)
```

### Estadísticas de Archivos
| Tipo | Cantidad | Tamaño Total |
|------|----------|--------------|
| `.html` | 13 (raíz) + 21 (materias) = **34** | ~310 KB |
| `.js` (backend) | 15 | ~120 KB |
| `.js` (frontend data) | 7 | ~350 KB |
| `.js` (utils) | 2 | ~15 KB |
| `.css` | 1 | 62 KB |
| `.json` | 3 | ~152 KB |
| `.sql` / scripts | 13 | ~100 KB |
| Imágenes | 19 | ~2.5 MB |
| **TOTAL (sin node_modules)** | **~110 archivos** | **~3.6 MB** |

### package.json - Dependencias
```json
{
  "dependencies": {
    "bcrypt": "^5.1.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.22.2",
    "firebase-admin": "^11.11.0",
    "http": "^0.0.1-security",
    "jsonwebtoken": "^9.0.0",
    "mysql2": "^3.6.0",
    "nodemailer": "^9.0.3",
    "socket.io": "^4.8.3",
    "socket.io-client": "^4.8.3"
  },
  "devDependencies": { "nodemon": "^2.0.22" }
}
```
**Scripts disponibles:** `start`, `dev`, `migrate`, `test:db`, `migrate-{maths,lenguaje,ciencias,sociales,ingles,programacion,salud}`

---

## 3. ANÁLISIS DEL CÓDIGO FUENTE

### 3.1 Backend (`server/`)

#### server.js (Punto de entrada - 747 líneas)
- **Express + HTTP + Socket.IO** en un solo archivo
- Sirve estáticos desde raíz del proyecto (`express.static(publicPath)`)
- Rutas HTML hardcodeadas (14 rutas GET para páginas)
- **Lógica 1vs1 completa en el servidor:** matchmaking, salas, juego, timers, guardado en BD
- **Filtro de preguntas por nivel promedio** de los jugadores (muy bien implementado)
- Fallback a preguntas hardcodeadas si falla BD
- Exporta `io`, `sendNotification`, `userSockets` para uso en rutas

#### Modelos
| Modelo | Propósito | Métodos Clave |
|--------|-----------|---------------|
| **Usuario.js** | Auth, perfil, stats, password history, login attempts | `create`, `findByEmail`, `verifyPassword`, `changePassword`, `registrarIntento`, `getIntentosFallidos`, `isAdmin` |
| **Progreso.js** | CRUD progreso por materia/nivel | `getProgresoByMateria`, `getAllProgreso`, `updateProgress` (upsert), `getNivelesDesbloqueados` |
| **Pregunta.js** | Consultas de preguntas con opciones | `getByNivel`, `getRandomQuestions`, `countByMateria`, `adjuntarOpciones` |
| **Logro.js** | Sistema de achievements | `getAll`, `getByUsuario`, `checkAndUnlock` (lógica completa de 5 tipos) |

#### Middleware (`auth.js`)
- `authMiddleware`: Verifica JWT, adjunta `req.usuario`, `req.usuarioId`, `req.usuarioRol`
- `adminMiddleware`: Igual + verifica `rol === 'admin'`
- **Duplicación de código** entre ambos (podría refactorizarse)

#### Rutas API
| Archivo | Prefijo | Endpoints Principales |
|---------|---------|----------------------|
| `auth.js` | `/api/auth` | `POST /register`, `POST /login`, `GET /profile`, `PUT /profile`, `GET /isAdmin`, `GET /users`, `GET /ranking`, `POST /forgot-password`, `GET /verify-reset-token/:token`, `POST /reset-password`, `POST /check-attempts` |
| `quiz.js` | `/api/quiz` | `GET /nivel/:nivelId`, `GET /random/:materiaId`, `POST /submit`, `GET /materias`, `GET /materia/:materiaId/niveles` |
| `progress.js` | `/api/progress` | `GET /`, `GET /materia/:id`, `GET /desbloqueados`, `GET /stats`, `GET /historial-partidas`, `GET /notificaciones`, `PUT /notificaciones/:id/leer`, `PUT /notificaciones/leer-todas`, `DELETE /notificaciones/:id`, `DELETE /notificaciones`, `GET /logros`, `POST /logros/check` |
| `suggestions.js` | `/api/suggestions` | `POST /`, `GET /pendientes` (admin), `POST /aprobar/:id` (admin), `POST /rechazar/:id` (admin), `GET /mis-sugerencias` |
| `matches.js` | `/api/matches` | `POST /create`, `POST /join/:roomCode`, `GET /status/:roomCode`, `POST /finish/:partidaId` |
| `minigames.js` | `/api/minigames` | `GET /progreso`, `POST /submit` |

#### Configuración
- `database.js`: Pool MySQL2 (10 conexiones, timezone UTC, dateStrings)
- `email.js`: Nodemailer Gmail SMTP, template HTML para reset password

#### Scripts de Migración (13 archivos)
- `migrate-firebase.js`: Migración completa Firebase → MySQL (usuarios, preguntas, progreso)
- `migrate-maths.js`, `migrate-lenguaje.js`, etc.: Migración por materia desde archivos JS
- `migrate-progress-from-users.js`, `migrate-progress-only.js`: Migración progreso
- `create-minigames-table.js`, `seed-minigame-logros.js`: Minijuegos
- `test-db.js`: Verificación conexión y conteos

### 3.2 Frontend (HTMLs en raíz y `materias/`)

#### Páginas Principales
| Archivo | Propósito | APIs que Consume | Estado |
|---------|-----------|------------------|--------|
| `login.html` | Login/Registro con validación tiempo real | `/api/auth/login`, `/api/auth/register`, `/api/auth/check-attempts` | ✅ Completo, robusto |
| `main_menu.html` | Hub central: materias, 1vs1, notificaciones, admin | `/api/auth/profile`, `/api/auth/isAdmin`, `/api/progress/stats`, `/api/progress/notificaciones`, `/api/quiz/materias`, Socket.IO | ✅ Completo, 1vs1 integrado |
| `profile.html` | Perfil usuario, stats, XP, avatar | `/api/auth/profile`, `/api/progress/stats`, `/api/progress/logros` | ✅ Funcional |
| `leaderboard.html` | Ranking con podio top 3 + lista | `/api/auth/ranking`, `/api/auth/users` | ✅ Visual atractivo |
| `quiz_runner.html` | Ejecución de quiz por nivel | `/api/quiz/nivel/:id`, `/api/quiz/submit` | ✅ Funcional |
| `admin_panel.html` | Moderación sugerencias | `/api/suggestions/pendientes`, `/api/suggestions/aprobar/:id`, `/api/suggestions/rechazar/:id` | ✅ Completo |
| `suggestions.html` | Formulario sugerir preguntas | `/api/suggestions`, `/api/suggestions/mis-sugerencias`, `/api/quiz/materias` | ✅ Funcional |
| `forgot-password.html` / `reset-password.html` | Recuperación contraseña | `/api/auth/forgot-password`, `/api/auth/verify-reset-token`, `/api/auth/reset-password` | ✅ Completo con email |

#### Materias (`materias/*.html`)
- 7 páginas de selección de niveles (lenguaje, matematicas, ciencias, sociales, ingles, programacion, salud)
- 6 minijuegos con versión `_juego.html`: balanzas, puzzle, regresion, tiro + matematicas_minijuegos, matematicas_quizzes
- Cada materia tiene su `*-data.js` con preguntas hardcodeadas (legacy, ya migradas a BD)

#### JavaScript Auxiliar (`js/`)
- `app.js`: Funciones utilitarias compartidas (auth, apiRequest, UI helpers)
- `translations.js`: i18n básico ES/EN (incompleto, solo algunas keys)

#### CSS (`css/styles.css` - 62 KB, 2000+ líneas)
- **Problema:** Estilos duplicados, múltiples redefiniciones de mismas clases (`.container`, `.subject-grid`, `.level-btn`, `.profile-card`, etc.)
- CSS inline en cada HTML duplica ~80% de styles.css
- Variables CSS (`:root`) definidas pero no usadas consistentemente
- Media queries repetidas
- Animaciones Uiverse.io para leaderboard (buen detalle visual)

### 3.3 Calidad General del Código
| Aspecto | Evaluación |
|---------|------------|
| **Backend** | Bien estructurado, modular, buenas prácticas (async/await, transacciones, validación) |
| **Frontend** | Funcional pero **monolítico**: HTML+CSS+JS mezclados, difícil mantenimiento |
| **Patrones** | MVC ligero en backend, SPAs simples en frontend |
| **Errores visibles** | Ninguno crítico en lógica, pero hay `console.log` en producción |
| **Hardcodeo** | `localhost:3000` en Socket.IO client, algunas URLs relativas |

---

## 4. ANÁLISIS DE LA BASE DE DATOS

### 4.1 Estructura de Tablas (21 tablas)

| Tabla | Propósito | Registros | PK | FKs Principales |
|-------|-----------|-----------|----|-----------------|
| `usuarios` | Usuarios del sistema | 29 | id (UUID) | - |
| `materias` | 7 materias curriculares | 7 | id (AI) | - |
| `niveles` | 30 niveles por materia | 210 | id (AI) | materia_id → materias |
| `preguntas` | Preguntas por nivel | 1,050 | id (AI) | nivel_id → niveles |
| `opciones` | Opciones de respuesta | 3,295 | id (AI) | pregunta_id → preguntas |
| `progreso_usuario` | Progreso quiz por usuario/nivel | 142 | id (AI) | usuario_id → usuarios, nivel_id → niveles |
| `partidas` | Partidas 1vs1 históricas | 17 | id (AI) | anfitrion_id, oponente_id, ganador_id → usuarios |
| `sugerencias_preguntas` | Preguntas sugeridas por usuarios | 8 | id (AI) | usuario_id → usuarios, materia_id → materias, nivel_id → niveles |
| `logros` | Definición de achievements | 19 | id (AI) | - |
| `usuario_logros` | Logros desbloqueados | 23 | id (AI) | usuario_id → usuarios, logro_id → logros |
| `notificaciones` | Notificaciones en tiempo real | 1 | id (AI) | usuario_id → usuarios |
| `login_attempts` | Auditoría de logins | 66 | id (AI) | usuario_id → usuarios |
| `password_history` | Historial contraseñas | 1 | id (AI) | usuario_id → usuarios |
| `log_sugerencias` | Log de acciones en sugerencias | 8 | id (AI) | sugerencia_id → sugerencias_preguntas, usuario_id → usuarios |
| `progreso_minijuego` | Progreso minijuegos | 20 | id (AI) | usuario_id → usuarios |
| `detalles_partida` | Detalle respuestas por partida | 0 | id (AI) | partida_id → partidas, usuario_id → usuarios, pregunta_id → preguntas |
| `logs_auditoria` | Auditoría general eventos | 0 | id (AI) | usuario_id → usuarios |
| `matchmaking` | Cola de emparejamiento | 0 | id (AI) | usuario_id → usuarios, materia_id → materias |
| `ranking_completo` | Vista materializada ranking | 29 | - | - |
| `infomaterias` | Vista resumen por materia | 7 | - | - |
| `password_history` | Historial cambios password | 1 | id (AI) | usuario_id → usuarios |

### 4.2 Contenido y Completitud

#### Materias y Niveles ✅ **COMPLETO**
| Materia | ID | Orden | Niveles | Preguntas | Opciones |
|---------|-----|-------|---------|-----------|----------|
| Ciencias | 1 | 1 | 30 | 150 | 600 |
| Matemáticas | 2 | 2 | 30 | 150 | 448 ⚠️ |
| Programación | 3 | 3 | 30 | 150 | 450 |
| Salud | 4 | 4 | 30 | 150 | 450 |
| Lenguaje | 5 | 5 | 30 | 150 | 450 |
| Sociales | 6 | 6 | 30 | 150 | 450 |
| Inglés | 7 | 7 | 30 | 150 | 447 ⚠️ |
| **TOTAL** | | | **210** | **1,050** | **3,295** |

**Promedio:** 5 preguntas/nivel, 3.14 opciones/pregunta (algunas con 2)

#### Integridad de Datos

| Verificación | Resultado | Detalle |
|--------------|-----------|---------|
| Preguntas sin nivel válido | ✅ 0 | Todas referencian niveles existentes |
| Opciones sin pregunta válida | ✅ 0 | Todas referencian preguntas existentes |
| Preguntas con 0 correctas | ✅ 0 | Todas tienen exactamente 1 correcta |
| Preguntas con >1 correcta | ✅ 0 | Ninguna |
| Preguntas con <3 opciones | ⚠️ **5** | IDs: 538, 598 (Mat), 1186, 1191, 1203 (Inglés) |
| Progreso duplicado (usuario+nivel) | ✅ 0 | Unique key `uk_usuario_nivel` funciona |
| Niveles completados con 0 estrellas | ✅ 0 | No hay inconsistencias |
| Partidas sin ganador | ⚠️ 7/17 | 7 partidas finalizadas sin ganador asignado |
| Partidas sin fecha_fin | ✅ 0 | Todas tienen fecha_fin |
| Room codes duplicados | ✅ 0 | Unique index funciona |

#### 🚨 **PROBLEMA CRÍTICO: 101 Registros Huérfanos en `progreso_usuario`**
```sql
-- Estos nivel_id NO existen en la tabla niveles (1-10, 16, 17, 21-35)
SELECT DISTINCT nivel_id FROM progreso_usuario 
WHERE nivel_id NOT IN (SELECT id FROM niveles);
-- Resultado: 26 IDs huérfanos afectando a 101 registros
```
**Causa:** Migración de datos antigua (posiblemente de Firebase) usó IDs autonuméricos 1-30 que no coinciden con los IDs auto_increment actuales de MySQL (que empezaron en 1 pero por materia).

**Usuarios afectados:** `9sfMgq3B` (usuario) con 20 registros, `7dbc9c87` (Jeffersitoooooo) con 1 registro

#### Usuarios (29 total, 1 admin)
| Usuario | Rol | Partidas | Ganadas | pvpXP | Última conexión |
|---------|-----|----------|---------|-------|-----------------|
| CIMAT (4873ac38) | usuario | 17 | 4 | 345 | 27 Sep 2026 |
| Jeffersitoooooo (7dbc9c87) | **admin** | 19 | 6 | 345 | 27 Sep 2026 |
| karla20 (twym5pFO) | usuario | 9 | 3 | 0 | - |
| usuario (9sfMgq3B) | usuario | 47 | 8 | 0 | - |
| CHAO0cnp | usuario | 2 | 0 | 0 | - |
| *24 usuarios más* | usuario | 0 | 0 | 0 | Nunca |

- **Sin duplicados** de email/username ✅
- **13 usuarios sin progreso** (45%) - registrados pero nunca jugaron
- **Admin real:** Solo `Jeffersitoooooo` tiene `rol='admin'` (el usuario `admin` tiene rol `usuario` ⚠️)

#### Partidas 1vs1 (17 jugadas)
- Todas `tipo_juego='normal'` salvo 1 `maths`
- 10 con ganador, 7 empates (ganador_id=NULL)
- 2 usuarios principales: CIMAT vs Jeffersitoooooo
- Room codes únicos ✅ (formato `p_timestamp_random`)

#### Logros (19 definidos, 23 desbloqueados)
| Tipo | Logros | Condiciones |
|------|--------|-------------|
| `partidas` | 4 | 1, 10, 50, 100 partidas |
| `niveles` | 3 | 1, 5, 20 niveles completados |
| `estrellas` | 3 | 1, 10, 50 estrellas totales |
| `minijuegos` (específicos) | 4 | 1 y 5 niveles por minijuego (puzzle, balanzas, tiro, regresion) |
| `minijuegos` (general) | 1 | 4 minijuegos distintos |
| **Total** | **15 + 4** = 19 | |

**Desbloqueados:** CIMAT tiene 12 logros, Jeffersitoooooo tiene 5, resto 0

#### Notificaciones y Auditoría
- `notificaciones`: 1 registro (leída)
- `login_attempts`: 66 intentos (32 fallidos = 48% tasa fallo)
- `logs_auditoria`: **VACÍA** (tabla existe pero no se usa)
- `matchmaking`: **VACÍA** (tabla existe pero matchmaking se maneja en memoria en server.js)

---

## 5. ANÁLISIS DE INTEGRACIÓN CÓDIGO ↔ BASE DE DATOS

### ✅ Alineación Correcta
- Todas las tablas referenciadas en código existen en BD
- Columnas consultadas coinciden con esquema
- Foreign keys en BD coinciden con JOINs en código
- Tipos de datos consistentes (UUID char(36) para usuarios, INT UNSIGNED para resto)

### ⚠️ Discrepancias Encontradas

| Código | Base de Datos | Problema |
|--------|---------------|----------|
| `Usuario.findById` selecciona `nivel_usuario`, `experiencia_total`, `created_at`, `updated_at` | Estas columnas **existen** pero no se usan en frontend | Columnas legacy sin uso |
| `progreso_usuario` usa `ON DUPLICATE KEY UPDATE` | Unique key `uk_usuario_nivel` en (usuario_id, nivel_id) | ✅ Correcto |
| `partidas` room_code generado en `handleEndGame` vs `matches.js` | Generación distinta: `p_ts_random` vs `Math.random().toString(36)` | **Inconsistencia** - podría colisionar |
| `server.js` matchmaking en memoria | Tabla `matchmaking` vacía | Tabla no usada, lógica solo en memoria |
| `Logro.checkAndUnlock` consulta `progreso_minijuego` | Tabla existe y tiene datos | ✅ Correcto |
| `suggestions.js` parsea `opciones` como JSON o CSV | BD guarda JSON, código maneja ambos | ✅ Robusto |

### 🗑️ Código Muerto / Tablas No Usadas
| Tabla | Usada en Código | Estado |
|-------|-----------------|--------|
| `logs_auditoria` | ❌ No | **Muerta** - solo creada, nunca insertada |
| `matchmaking` | ❌ No | **Muerta** - lógica en memoria en server.js |
| `ranking_completo` | ❌ No | **Vista materializada** no consultada (se usa query dinámica) |
| `infomaterias` | ❌ No | **Vista** no consultada |
| `detalles_partida` | ❌ No | **Vacía** - preparada para futuro uso |
| `password_history` | ✅ Solo en Usuario.js | Parcial (1 registro) |

---

## 6. ANÁLISIS DE SEGURIDAD

| Vulnerabilidad | Severidad | Estado | Evidencia |
|----------------|-----------|--------|-----------|
| **Contraseñas hasheadas (bcrypt 10)** | - | ✅ **OK** | `Usuario.create` usa `bcrypt.hash(password, 10)` |
| **JWT con expiración 7d** | - | ✅ **OK** | `jwt.sign({id}, secret, {expiresIn: '7d'})` |
| **Rutas protegidas con authMiddleware** | - | ✅ **OK** | Todas las rutas `/api/*` (exceto auth) usan middleware |
| **Rutas admin con adminMiddleware** | - | ✅ **OK** | `/api/suggestions/pendientes`, `/aprobar`, `/rechazar` |
| **Secrets en .env commiteado** | 🔴 **CRÍTICA** | ❌ **FALLA** | JWT_SECRET, EMAIL_PASS, DB_PASSWORD en repo |
| **.env en .gitignore** | 🔴 **CRÍTICA** | ❌ **FALLA** | `.gitignore` no incluye `.env` |
| **Validación inputs backend** | 🟡 Media | ⚠️ **Parcial** | Validación básica en auth, poca en quiz/suggestions |
| **Inyección SQL** | - | ✅ **OK** | Uso de `pool.query(sql, params)` con placeholders |
| **XSS en frontend** | 🟡 Media | ⚠️ **Riesgo** | `innerHTML` en notificaciones, `JSON.parse` en sugerencias sin sanitizar |
| **Rate limiting login** | - | ✅ **OK** | 5 intentos/15min por email/IP (excepto admin) |
| **Recuperación password segura** | - | ✅ **OK** | Token JWT 15min, email, hash nuevo, historial |
| **CORS configurado** | - | ✅ **OK** | Orígenes específicos en Socket.IO, `cors()` en Express |
| **Helmet / CSP** | 🟡 Media | ❌ **Falta** | No hay headers de seguridad HTTP |

### Recomendaciones Inmediatas de Seguridad
1. **ELIMINAR .env del repo** y agregar a `.gitignore` **YA**
2. Rotar `JWT_SECRET`, `EMAIL_PASS`, `DB_PASSWORD`
3. Agregar `helmet` middleware
4. Sanitizar outputs en frontend (notificaciones, sugerencias)
5. Validar/escapar `opciones` JSON en suggestions.js

---

## 7. ANÁLISIS DE RENDIMIENTO

| Área | Problema | Recomendación |
|------|----------|---------------|
| **Consultas N+1** | `Pregunta.adjuntarOpciones` hace 1 query por lote de preguntas | ✅ Ya optimizado: 1 query para todas las opciones con `IN (...)` |
| **Índices faltantes** | `progreso_usuario(usuario_id, completado)` para stats | Agregar índice compuesto |
| **Paginación** | `/api/auth/users` y `/ranking` cargan **TODOS** usuarios | Agregar `LIMIT/OFFSET` + paginación frontend |
| **Datos innecesarios** | `quiz_runner` carga todas las opciones aunque solo necesite texto | ✅ OK - necesita opciones para mostrar |
| **Imágenes sin optimizar** | 19 imágenes PNG/JPG, algunas >300KB (vs.png 359KB) | Comprimir WebP, responsive images |
| **CSS no minimizado** | 62KB con duplicados masivos | Minificar, eliminar duplicados, usar build tool |
| **JS no minimizado** | HTMLs tienen ~50KB JS inline cada uno | Extraer a archivos, minificar, code-split |
| **Socket.IO rooms en memoria** | `rooms` y `matchmakingPool` en objeto JS | OK para escala actual, Redis para escalar |
| **Query ranking compleja** | Subqueries por usuario en SELECT | ✅ Aceptable para <100 usuarios, vista materializada para escala |

### Cuellos de Botella Potenciales
1. **Ranking sin paginación** - Fallará con >1000 usuarios
2. **`quiz_runner` carga preguntas una a una** - OK, pero podría precargar
3. **Minijuegos guardan progreso individual** - 4 tablas separadas por tipo

---

## 8. ANÁLISIS DE COMPLETITUD Y FUNCIONALIDADES

### Funcionalidades Core para Feria CIMAT 2026

| Funcionalidad | Backend | Frontend | Funciona | Bugs Conocidos | Prioridad CIMAT |
|---------------|---------|----------|----------|----------------|-----------------|
| **Auth (Login/Registro)** | ✅ | ✅ | ✅ | Rate limit bypass admin | 🔴 Crítica |
| **Recuperación contraseña** | ✅ | ✅ | ✅ | Email real necesario | 🔴 Crítica |
| **Quiz por niveles** | ✅ | ✅ | ✅ | 5 preguntas con 2 opciones | 🔴 Crítica |
| **Progreso usuario** | ✅ | ✅ | ✅ | 101 registros huérfanos | 🔴 Crítica |
| **Selección materias/niveles** | ✅ | ✅ | ✅ | - | 🔴 Crítica |
| **Modo 1vs1 tiempo real** | ✅ | ✅ | ✅ | Matchmaking solo memoria, 7 partidas sin ganador | 🔴 Crítica |
| **Minijuegos (4 tipos)** | ✅ | ✅ | ✅ | Solo 1 usuario con progreso | 🟡 Alta |
| **Sistema logros (19)** | ✅ | ✅ | ✅ | Check manual necesario | 🟡 Alta |
| **Sugerencias usuarios** | ✅ | ✅ | ✅ | Solo 8 sugerencias (todas aprobadas) | 🟢 Media |
| **Panel admin** | ✅ | ✅ | ✅ | Usuario 'admin' no es admin real | 🟡 Alta |
| **Ranking/Leaderboard** | ✅ | ✅ | ✅ | Sin paginación | 🟢 Media |
| **Notificaciones tiempo real** | ✅ | ✅ | ✅ | Solo 1 notificación de prueba | 🟢 Media |
| **Perfil usuario** | ✅ | ✅ | ✅ | Avatar editable pero no subida real | 🟢 Media |
| **Internacionalización** | ⚠️ Parcial | ⚠️ Parcial | ⚠️ | Solo ES/EN básico, keys incompletas | 🔵 Baja |
| **Auditoría/Logs** | ❌ | ❌ | ❌ | Tablas vacías | 🔵 Baja |

### Funcionalidades Incompletas / A Medias
1. **Matchmaking persistente** - Tabla creada pero lógica en memoria
2. **Auditoría** - Tablas y modelo listos, sin instrumentación
3. **i18n** - Solo 2 keys traducidas, hardcodeado en HTMLs
4. **Subida de avatar** - Input file en perfil pero sin endpoint upload
5. **Detalles de partida** - Tabla `detalles_partida` vacía, no se popula

### Funcionalidades Faltantes
1. **Tests automatizados** (unit + integration)
2. **CI/CD pipeline**
3. **Monitoreo / Health checks** (solo `/api/health` básico)
4. **Backup / Restore strategy**
5. **Documentación API** (OpenAPI/Swagger)
6. **Rate limiting global** (solo en login)
7. **WebSockets escalables** (Redis adapter para multi-instancia)

---

## 9. ANÁLISIS DE DEPENDENCIAS Y MANTENIBILIDAD

### Dependencias (package.json)
| Paquete | Versión | Estado | Vulnerabilidades Conocidas |
|---------|---------|--------|---------------------------|
| express | 4.22.2 | Actual | Ninguna crítica |
| mysql2 | 3.6.0 | Actual | Ninguna |
| socket.io | 4.8.3 | Actual | Ninguna |
| jsonwebtoken | 9.0.0 | Actual | Ninguna |
| bcrypt | 5.1.0 | Actual | Ninguna |
| nodemailer | 9.0.3 | Actual | Ninguna |
| firebase-admin | 11.11.0 | **Antiguo** (actual 12.x) | Revisar si se usa (solo migración) |
| cors | 2.8.5 | Actual | Ninguna |
| dotenv | 16.0.3 | Actual | Ninguna |

**Node.js requerido:** No especificado en `package.json` (recomendado `>=18`)

### Código Muerto / Técnico
| Hallazgo | Ubicación | Esfuerzo Limpieza |
|----------|-----------|-------------------|
| `logs_auditoria` tabla + modelo sin uso | BD + Usuario.js | Bajo |
| `matchmaking` tabla + modelo sin uso | BD + server.js | Bajo |
| `ranking_completo` vista no consultada | BD | Bajo |
| `infomaterias` vista no consultada | BD | Bajo |
| `detalles_partida` tabla vacía | BD | Medio (requiere implementar) |
| CSS duplicado (~60% de styles.css) | styles.css + HTMLs inline | **Alto** |
| JS inline en 13 HTMLs principales | login.html, main_menu.html, etc. | **Alto** |
| `console.log` en producción | server.js, routes, models | Bajo |
| Código comentado en server.js | Líneas 472-459 (fallback questions) | Bajo |
| TODOs/FIXMEs | Pocos visibles | - |

### Consistencia de Estilo
- **Backend:** Buena consistencia, async/await, try/catch, transacciones
- **Frontend:** Inconsistente - cada HTML tiene su propio CSS/JS inline
- **Nombramiento:** Mixto (camelCase JS, snake_case BD, español/inglés mezclado)
- **Comentarios:** Buenos en backend (secciones marcadas), escasos en frontend

---

## 10. RECOMENDACIONES PRIORITARIAS (TOP 10)

| # | Mejora | Impacto | Urgencia | Esfuerzo | Descripción |
|---|--------|---------|----------|----------|-------------|
| **1** | **Eliminar .env del repo + rotar secrets** | 🔴 Crítico | **INMEDIATA** | 1h | `.gitignore`, `git filter-branch`, regenerar JWT_SECRET, EMAIL_PASS, DB_PASSWORD |
| **2** | **Limpiar 101 registros huérfanos en progreso_usuario** | 🔴 Crítico | **ALTA** | 2h | DELETE WHERE nivel_id NOT IN (SELECT id FROM niveles) + re-migrar progreso real |
| **3** | **Corregir 5 preguntas con 2 opciones** | 🔴 Crítico | **ALTA** | 1h | Agregar 3ra/4ta opción a preguntas 538, 598, 1186, 1191, 1203 |
| **4** | **Extraer CSS/JS a archivos separados + build** | 🟡 Alto | **ALTA** | 8-16h | Vite/Webpack, eliminar inline, minificar, code-split |
| **5** | **Agregar paginación a ranking/usuarios** | 🟡 Alto | **MEDIA** | 4h | `LIMIT/OFFSET` en backend + paginador frontend |
| **6** | **Implementar helmet + CSP + sanitización XSS** | 🟡 Alto | **MEDIA** | 4h | `npm i helmet dompurify`, middleware, sanitizar outputs |
| **7** | **Unificar generación room_code** | 🟢 Medio | **MEDIA** | 1h | Una sola función en utils, usar en server.js y matches.js |
| **8** | **Migrar matchmaking a BD + limpiar tablas muertas** | 🟢 Medio | **BAJA** | 4h | Usar tabla `matchmaking`, eliminar `logs_auditoria`, `infomaterias`, `ranking_completo` si no se usan |
| **9** | **Tests automatizados + CI/CD** | 🟢 Medio | **BAJA** | 16h | Jest + Supertest, GitHub Actions, coverage >80% |
| **10** | **Documentación API (Swagger) + README técnico** | 🔵 Bajo | **BAJA** | 8h | `swagger-jsdoc`, documentar endpoints, modelos, flujo 1vs1 |

**Total estimado:** ~50-60 horas de trabajo

---

## 11. ESTADO PARA LA FERIA CIMAT 2026

### ✅ **¿El proyecto está listo para presentarse?**
**SÍ, CON CONDICIONES.** El proyecto demuestra:
- Funcionalidad core completa y jugable
- Arquitectura técnica sólida para un proyecto estudiantil
- Contenido educativo extenso (1,050 preguntas, 7 materias, 210 niveles)
- Innovación técnica: 1vs1 tiempo real con Socket.IO, gamificación completa
- Código backend bien estructurado y mantenible

### ⚠️ **Qué FALTA para estar 100% listo (Bloqueadores)**
1. **Fix crítico seguridad:** .env fuera del repo, secrets rotados (1h)
2. **Fix datos:** Limpiar 101 progresos huérfanos + 5 preguntas con 2 opciones (3h)
3. **Testing manual completo:** Flujo registro → login → quiz → 1vs1 → logros → admin (2h)

### 🌟 **Qué MEJORAR para DESTACAR (Diferenciadores)**
| Mejora | Por qué destaca en CIMAT |
|--------|-------------------------|
| **Dashboard admin en tiempo real** | Socket.IO para ver sugerencias/usuarios live |
| **Analytics visuales** | Charts.js para progreso, heatmaps de materias débiles |
| **Modo torneo 1vs1** | Brackets, espectadores, streaming |
| **IA adaptativa** | Preguntas ajustadas a nivel real (ya tienes filtro por nivel promedio!) |
| **PWA / Offline** | Service workers, cache preguntas, jugar sin internet |
| **Accesibilidad (WCAG)** | Screen readers, contraste, navegación teclado |
| **Multi-idioma real** | ES/EN completo, preparado para más |

---

## 12. PRÓXIMOS PASOS RECOMENDADOS (Plan de Acción)

### Semana 1 (Esta semana - Bloqueadores)
- [ ] Día 1: Seguridad - .env, rotar secrets, helmet
- [ ] Día 2: Datos - Fix progreso huérfano, preguntas 2 opciones
- [ ] Día 3: Testing - Flujo completo E2E manual, documentar bugs
- [ ] Día 4: Polish - CSS/JS extraer de 3 HTMLs críticos (login, main_menu, quiz_runner)
- [ ] Día 5: Demo - Preparar datos demo, usuarios de prueba, script reset BD

### Semana 2 (Mejoras para destacar)
- [ ] Paginación ranking + búsqueda usuarios
- [ ] Matchmaking persistente + cola visual
- [ ] Avatar upload real + cloudinary/local storage
- [ ] Documentación técnica + diagrama ER actualizado

### Semana 3+ (Post-CIMAT / Producción)
- [ ] Tests automatizados + CI/CD
- [ ] PWA + Offline support
- [ ] Refactor frontend a React/Vue/Svelte (opcional)
- [ ] Escalabilidad: Redis adapter Socket.IO, read replicas BD

---

## ANEXO: Diagrama Entidad-Relación (Texto)

```
USUARIOS (1) ─────< (N) PROGRESO_USUARIO >───── (1) NIVELES (N) <───── (1) MATERIAS
      │                                                                       │
      │ (1)                                                                   │ (1)
      ▼                                                                       ▼
PARTIDAS (N) ──< (N) USUARIOS (como anfitrion/oponente/ganador)               │
      │
      │ (1)
      ▼
DETALLES_PARTIDA (N) ──< (1) PREGUNTAS (N) <───── (1) NIVELES
                         │
                         │ (1)
                         ▼
                    OPCIONES (N)

USUARIOS (1) ─────< (N) USUARIO_LOGROS >───── (1) LOGROS
USUARIOS (1) ─────< (N) NOTIFICACIONES
USUARIOS (1) ─────< (N) LOGIN_ATTEMPTS
USUARIOS (1) ─────< (N) PASSWORD_HISTORY
USUARIOS (1) ─────< (N) SUGERENCIAS_PREGUNTAS >───── (1) MATERIAS
SUGERENCIAS (1) ─────< (N) LOG_SUGERENCIAS >───── (1) USUARIOS (moderador)
USUARIOS (1) ─────< (N) PROGRESO_MINIJUEGO
USUARIOS (1) ─────< (N) MATCHMAKING >───── (1) MATERIAS
USUARIOS (1) ─────< (N) LOGS_AUDITORIA
```

---

**Fin del Reporte**  
*Análisis realizado de forma autónoma sin modificaciones al código ni datos*  
*Para consultas sobre hallazgos específicos, revisar scripts `check-db*.js` generados*