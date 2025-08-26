document.addEventListener('DOMContentLoaded', () => {
    // Detecta si estamos en una página de materia
    const urlParams = new URLSearchParams(window.location.search);
    const subjectId = document.body.dataset.subjectId; // Se leerá desde el HTML de la materia
    
    if (subjectId) {
        initializeLevelSelection(subjectId);
    }
});

function initializeLevelSelection(subjectId) {
    const levelGrid = document.getElementById('level-grid');
    if (!levelGrid) return;
    
    // Asume que la variable 'levels' ya está definida en el HTML de la materia
    const subjectLevels = window.levels; 
    
    if (!subjectLevels || subjectLevels.length === 0) {
        levelGrid.innerHTML = '<p>No hay niveles disponibles para esta materia.</p>';
        return;
    }

    const levelsCompleted = JSON.parse(localStorage.getItem('levelsCompleted')) || {};
    const levelsForSubject = levelsCompleted[subjectId] || {};
    let previousLevelPassed = true;

    subjectLevels.forEach((levelData, index) => {
        const levelId = levelData.id;
        const isLevelCompleted = levelsForSubject[levelId] && levelsForSubject[levelId].score >= levelData.passingScore;
        const isLocked = !previousLevelPassed && levelId !== 1;
        
        const levelCard = document.createElement('a');
        levelCard.className = 'level-card';

        if (isLocked) {
            levelCard.classList.add('locked');
            levelCard.innerHTML = `<img src="../img/lock.png" alt="Candado" class="lock-icon">`;
        } else {
            levelCard.href = `../quiz_runner.html?subject=${subjectId}&level=${levelId}`;
            levelCard.innerHTML = `
                <div class="level-number">${levelId}</div>
                <div class="level-stars">
                    <img src="../img/star_empty.png" alt="estrella vacía" class="star-icon">
                    <img src="../img/star_empty.png" alt="estrella vacía" class="star-icon">
                    <img src="../img/star_empty.png" alt="estrella vacía" class="star-icon">
                </div>
            `;
            if (isLevelCompleted) {
                const starsContainer = levelCard.querySelector('.level-stars');
                starsContainer.innerHTML = '';
                for (let i = 0; i < levelsForSubject[levelId].stars; i++) {
                    starsContainer.innerHTML += `<img src="../img/star_filled.png" alt="estrella llena" class="star-icon">`;
                }
                for (let i = levelsForSubject[levelId].stars; i < 3; i++) {
                    starsContainer.innerHTML += `<img src="../img/star_empty.png" alt="estrella vacía" class="star-icon">`;
                }
            }
        }
        levelGrid.appendChild(levelCard);
        if (isLevelCompleted) {
            previousLevelPassed = true;
        } else {
            previousLevelPassed = false;
        }
    });
}