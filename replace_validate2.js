const fs = require('fs');
let content = fs.readFileSync('C:\\Users\\jeffe\\OneDrive\\Desktop\\SABIQUIZ\\materias\\trigonometria_juego.html', 'utf8');

const newValidate = '        // ============================================\n' +
'        // VALIDACIÓN Y GUARDADO (AUTO-GUARDAR)\n' +
'        // ============================================\n' +
'        function validate() {\n' +
'            console.log(\'>>> validate called, allValidated:\', allValidated, \'isSaved:\', isSaved, \'pendingStars:\', pendingStars);\n' +
'            if (isSaved) {\n' +
'                console.log(\'validate: isSaved true, returning\');\n' +
'                return;\n' +
'            }\n' +
'\n' +
'            const err = currentError();\n' +
'            const objetivo = currentTargets().map(t => t + "°").join(" o ");\n' +
'\n' +
'            if (err > TOL_VALIDAR) {\n' +
'                showFeedback(\n' +
'                    \'Todavía no. Estás a <b>\' + err.toFixed(1) + \'°</b> de \' + objetivo + \'. \' +\n' +
'                    \'Necesitas un error de \' + TOL_VALIDAR + \'° o menos para superar la ronda.\',\n' +
'                    "error"\n' +
'                );\n' +
'                setSabi("sabi_anima.png", "¡Casi! Sigue moviendo el punto rojo para acercarte al objetivo.");\n' +
'                return;\n' +
'            }\n' +
'\n' +
'            roundErrors.push(err);\n' +
'            roundIndex++;\n' +
'\n' +
'            if (roundIndex < cfg.rounds.length) {\n' +
'                const siguiente = cfg.rounds[roundIndex].targets[0];\n' +
'                showFeedback(\'✓ Ronda superada con un error de <b>\' + err.toFixed(1) + \'°</b>. Ahora ajusta a <b>\' + siguiente + \'°</b>.\', "success");\n' +
'                setSabi("sabi_celebrando.png", \'¡Muy bien! Error de \' + err.toFixed(1) + \'°. Vamos por la siguiente ronda.\');\n' +
'                setChallengeText();\n' +
'                render();\n' +
'                return;\n' +
'            }\n' +
'\n' +
'            // Todas las rondas validadas → calcular estrellas y AUTO-GUARDAR\n' +
'            const peorError = Math.max.apply(null, roundErrors);\n' +
'            pendingStars = peorError <= TOL_3 ? 3 : peorError <= TOL_2 ? 2 : 1;\n' +
'            allValidated = true;\n' +
'\n' +
'            console.log(\'validate: all rounds done, pendingStars=\', pendingStars, \'auto-saving...\');\n' +
'            \n' +
'            // Mostrar estrellas\n' +
'            updateStars(pendingStars);\n' +
'\n' +
'            const detalle = cfg.rounds.length > 1\n' +
'                ? \'Error máximo en las \' + cfg.rounds.length + \' rondas: <b>\' + peorError.toFixed(1) + \'°</b>.\'\n' +
'                : \'Error final: <b>\' + peorError.toFixed(1) + \'°</b>.\';\n' +
'\n' +
'            showFeedback(\'✓ ¡Desafío completado! \' + detalle + \' Obtienes <b>\' + pendingStars + \' estrella(s)</b>. Guardando...\', "success");\n' +
'            if (pendingStars > 0) confetti();\n' +
'            setSabi(pendingStars === 3 ? "sabi_medalla.png" : "sabi_celebrando.png",\n' +
'                pendingStars === 3\n' +
'                    ? "¡Perfecto! Dominaste el círculo unitario. Progreso guardado."\n' +
'                    : "¡Bien hecho! Progreso guardado. Elige el siguiente nivel.");\n' +
'            setChallengeText();\n' +
'            render();\n' +
'\n' +
'            // AUTO-GUARDAR inmediatamente\n' +
'            saveResult();\n' +
'        }';

const regex = /function validate\(\) \{[\s\S]*?render\(\);\s*\}/;
if (content.replace(regex, newValidate) !== content) {
    fs.writeFileSync('C:\\Users\\jeffe\\OneDrive\\Desktop\\SABIQUIZ\\materias\\trigonometria_juego.html', content.replace(regex, newValidate), 'utf8');
    console.log('✅ Reemplazo exitoso');
} else {
    console.log('No se pudo reemplazar');
}