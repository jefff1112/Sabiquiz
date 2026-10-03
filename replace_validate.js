const fs = require('fs');
let content = fs.readFileSync('C:\\Users\\jeffe\\OneDrive\\Desktop\\SABIQUIZ\\materias\\trigonometria_juego.html', 'utf8');

const newValidate = `        // ============================================
        // VALIDACIÓN Y GUARDADO (AUTO-GUARDAR)
        // ============================================
        function validate() {
            console.log('>>> validate called, allValidated:', allValidated, 'isSaved:', isSaved, 'pendingStars:', pendingStars);
            if (isSaved) {
                console.log('validate: isSaved true, returning');
                return;
            }

            const err = currentError();
            const objetivo = currentTargets().map(t => t + "°").join(" o ");

            if (err > TOL_VALIDAR) {
                showFeedback(
                    `Todavía no. Estás a <b>${err.toFixed(1)}°</b> de ${objetivo}. ` +
                    `Necesitas un error de ${TOL_VALIDAR}° o menos para superar la ronda.`,
                    "error"
                );
                setSabi("sabi_anima.png", "¡Casi! Sigue moviendo el punto rojo para acercarte al objetivo.");
                return;
            }

            roundErrors.push(err);
            roundIndex++;

            if (roundIndex < cfg.rounds.length) {
                const siguiente = cfg.rounds[roundIndex].targets[0];
                showFeedback(`✓ Ronda superada con un error de <b>${err.toFixed(1)}°</b>. Ahora ajusta a <b>${siguiente}°</b>.`, "success");
                setSabi("sabi_celebrando.png", `¡Muy bien! Error de ${err.toFixed(1)}°. Vamos por la siguiente ronda.`);
                setChallengeText();
                render();
                return;
            }

            // Todas las rondas validadas → calcular estrellas y AUTO-GUARDAR
            const peorError = Math.max.apply(null, roundErrors);
            pendingStars = peorError <= TOL_3 ? 3 : peorError <= TOL_2 ? 2 : 1;
            allValidated = true;

            console.log('validate: all rounds done, pendingStars=', pendingStars, 'auto-saving...');
            
            // Mostrar estrellas
            updateStars(pendingStars);

            const detalle = cfg.rounds.length > 1
                ? `Error máximo en las ${cfg.rounds.length} rondas: <b>${peorError.toFixed(1)}°</b>.`
                : `Error final: <b>${peorError.toFixed(1)}°</b>.`;

            showFeedback(`✓ ¡Desafío completado! ${detalle} Obtienes <b>${pendingStars} estrella(s)</b>. Guardando...`, "success");
            if (pendingStars > 0) confetti();
            setSabi(pendingStars === 3 ? "sabi_medalla.png" : "sabi_celebrando.png",
                pendingStars === 3
                    ? "¡Perfecto! Dominaste el círculo unitario. Progreso guardado."
                    : "¡Bien hecho! Progreso guardado. Elige el siguiente nivel.");
            setChallengeText();
            render();

            // AUTO-GUARDAR inmediatamente
            saveResult();
        }`;

const regex = /function validate\(\) \{[\s\S]*?render\(\);\s*\}/;
if (content.replace(regex, newValidate) !== content) {
    fs.writeFileSync('C:\\Users\\jeffe\\OneDrive\\Desktop\\SABIQUIZ\\materias\\trigonometria_juego.html', content.replace(regex, newValidate), 'utf8');
    console.log('✅ Reemplazo exitoso');
} else {
    console.log('No se pudo reemplazar');
}