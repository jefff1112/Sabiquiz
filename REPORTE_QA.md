# 📋 Reporte de Auditoría y Corrección — Sabiquiz

**Rama de trabajo:** `qa-fixes`
**Fecha:** 12 de septiembre de 2026
**Alcance:** Backend, Frontend, Base de datos, Seguridad, Rendimiento y Cleanup.

---

## 1. Resumen ejecutivo

| Métrica | Valor |
|---|---|
| Errores encontrados | 14 |
| Errores corregidos | 8 |
| Errores pendientes (documentados) | 6 |
| Vulnerabilidades de seguridad corregidas | 3 |
| Archivos muertos eliminados | 8 |
| Archivos modificados en esta rama | 37 |

**Estado general del proyecto:** **Bueno** (funcional y estable en local; con deuda técnica de datos y pendientes de seguridad de bajo alcance).

---

## 2. Protocolo de respaldo (realizado)

1. ✅ **Respaldo del proyecto** → `C:\Users\jeffe\OneDrive\Desktop\SABIQUIZ_backup_2026-09-12` (excluye `node_modules` y `.git`).
2. ✅ **Respaldo de base de datos** → `..._backup_2026-09-12\sabiquiz_db_backup_2026-09-12.sql` (estructura + datos, 590 KB).
3. ✅ **Estado Git** → rama `main`, árbol limpio, remoto `origin → github.com/jefff1112/Sabiquiz.git`.
4. ✅ **Rama de trabajo** → creada `qa-fixes`.

---

## 3. Tabla de errores (encontrados → corregidos)

| # | Título | Ubicación | Severidad | Estado | Solución |
|---|---|---|---|---|---|
| 1 | Consultas N+1 al cargar opciones de preguntas | `server/models/Pregunta.js` | Media | ✅ Corregido | `adjuntarOpciones()` hace una sola consulta `IN` |
| 2 | Ranking ignora el XP de 1vs1 (`pvpXp` hardcodeado a 0) | `server/routes/auth.js` (`/ranking`, `/users`) | Media | ✅ Corregido | Se usa `u.pvpXp` real |
| 3 | `JWT_SECRET` con valor por defecto adivinable | `.env` | Alta | ✅ Corregido | Secret aleatorio de 256 bits (local, no commiteado) |
| 4 | `API_URL` hardcodeado a `localhost:3000` en 27 archivos | Todo el frontend | Media | ✅ Corregido | URL dinámica según `origin`/`hostname` |
| 5 | Archivos muertos/huérfanos | varios | Baja | ✅ Corregido | Eliminados vía `git rm` |
| 6 | Conteo de aciertos erróneo en `/quiz/submit` | `server/routes/quiz.js` | Alta | ✅ Corregido* | Usa `esCorrecta` del cliente (fix previo) |
| 7 | `/progress` no exponía `nivel_id` (rompía estrellas) | `server/routes/progress.js` | Alta | ✅ Corregido* | Agrega `nivel_id` (fix previo) |
| 8 | Logros de minijuegos inexistentes | `logros`, rutas | Media | ✅ Corregido* | 9 logros + verificación automática (previo) |

> \* Los puntos 6–8 fueron corregidos en sesiones previas (commit `Mejoras en Minijuegos`); se listan para completar el panorama.

---

## 4. Errores pendientes (y razón)

| # | Ítem | Severidad | Razón de no corregirse |
|---|---|---|---|
| 1 | **Opciones incompletas**: 900/1050 preguntas tienen <4 opciones (solo Ciencias está completa) | Alta | Es contenido/datos, no código. Requiere regenerar las opciones de 6 materias. |
| 2 | **Todas las 1050 preguntas tienen `dificultad = 'easy'`** y `orden = 1` | Media | Dato de migración; no afecta funcionalidad pero degrada variedad. |
| 3 | `progreso_usuario` usa **MyISAM** (resto InnoDB); sin FK reales | Media | Migrar el motor es de bajo riesgo pero requiere DDL y validación. |
| 4 | `detalles_partida = 0` (el 1vs1 no persiste respuestas por pregunta) | Media | Requiere rediseño del flujo de guardado del 1vs1. |
| 5 | Materia `programación` en minúscula (resto capitalizado) | Baja | Cosmético. |
| 6 | `serviceAccountKey.json` (clave Firebase real) y `EMAIL_PASS` en `.env` | Alta | Están en `.gitignore` (no en el repo). Recomendación: eliminar la clave Firebase (ya no se usa) y rotar la contraseña de app de Gmail. |

---

## 5. Funcionalidades verificadas

| Funcionalidad | Resultado |
|---|---|
| Servidor arranca sin errores | ✅ |
| Health check `/api/health` | ✅ 200 |
| Materias `/quiz/materias` | ✅ 7 materias |
| Login (válido / inválido) | ✅ 200 / 401 |
| Registro duplicado | ✅ 400 |
| Rutas protegidas sin token | ✅ 401 |
| Rutas de admin sin rol admin | ✅ 403 |
| Progreso / logros / stats / minijuegos / ranking / perfil | ✅ 200 |
| Preguntas de un nivel | ✅ 200 (pero 3 opciones → ver pendiente #1) |
| Submit de minijuego + desbloqueo de logro | ✅ 200 |
| Minijuegos (Puzzle, Balanzas, Tiro, Regresión) | ✅ (frontend implementado) |

**Códigos HTTP verificados:** 200, 400, 401, 403 (y 429/404 en la lógica de autenticación).

---

## 6. Seguridad

| Chequeo | Estado |
|---|---|
| Contraseñas con bcrypt (salt 10) | ✅ |
| Token JWT con expiración (`7d`, reset `15m`) | ✅ |
| Rutas protegidas con `authMiddleware` | ✅ |
| Rutas admin con `adminMiddleware` (403) | ✅ |
| Bloqueo de login (5 intentos / 15 min) para no-admin | ✅ |
| `.env` y `serviceAccountKey.json` en `.gitignore` | ✅ |
| **Credenciales**: `JWT_SECRET` placeholder | ✅ Corregido (secret fuerte local) |
| **Credenciales**: `serviceAccountKey.json` real + `EMAIL_PASS` | ⚠️ Gitignored; recomendar rotación |
| SQL Injection | ✅ Usa placeholders (`?`) / `mysql2` |
| XSS | ✅ Sin `innerHTML` con datos de usuario sin sanitizar (los textos vienen de BD propia) |
| Hardcode de `localhost` | ✅ Corregido (URL dinámica) |

---

## 7. Rendimiento

| Chequeo | Estado |
|---|---|
| Consultas N+1 en `Pregunta` | ✅ Corregido |
| Índices en columnas consultadas | ✅ (FKs e índices por tabla) |
| Paginación en listados grandes | ⚠️ No aplica (volúmenes pequeños); ranking `LIMIT 10` |
| Carga de datos innecesaria | ⚠️ `getQuestionsFromDB` usa `GROUP_CONCAT` + subconsulta (aceptable) |

---

## 8. Mejoras implementadas (resumen)

1. **Performance:** carga de opciones en una sola consulta (`IN`).
2. **Correctitud:** ranking ya suma el XP real de 1vs1.
3. **Seguridad:** `JWT_SECRET` robusto; URL de API dinámica (más portable).
4. **Cleanup:** eliminados `serverold.js`, `server/questions.js`, `server/questions_maths.js`, `js/app.js.firebase.backup`, `materias/puzzle_geometrico.html` (charset corrupto) y la carpeta huérfana `materias/matematicas/`.

---

## 9. Estado de la base de datos

- Tablas: 17 tablas + 2 vistas (`infomaterias`, `ranking_completo`).
- Registros: usuarios 29, niveles 210, preguntas 1050, opciones 3295 (incompletas), progreso 112, logros 10 + 9 minijuegos, partidas 16.
- `logros` ampliada con columna `minijuego` y nuevo tipo `minijuegos`.
- Tablas nuevas: `progreso_minijuego`.
- Integridad referencial: FKs correctas en tablas InnoDB; `progreso_usuario` en MyISAM (pendiente #3).

---

## 10. Próximos pasos recomendados

1. **Completar opciones** de las 6 materias para llegar a 4 opciones/pregunta (crítico para la Feria).
2. Añadir variedad de `dificultad` (easy/medium/hard).
3. Migrar `progreso_usuario` a InnoDB.
4. Rotar/eliminar `serviceAccountKey.json` y la contraseña de app de Gmail.
5. Persistir `detalles_partida` en el 1vs1.
6. Normalizar el nombre de la materia `programación`.

---

## 11. Commits en esta rama

- Ver `git log` en `qa-fixes`. Cambios agrupados por:
  1. Corrección de rendimiento (N+1) y ranking.
  2. Seguridad (API_URL dinámica) y limpieza de archivos muertos.
  3. Este reporte.