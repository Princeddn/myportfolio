/*
 * Bascule entre le thème de base (clair) et le thème "Kali" (dark terminal).
 * Le choix est mémorisé dans localStorage. Le thème est appliqué le plus tôt
 * possible (dès le parsing du <head>) pour éviter un flash visuel au chargement.
 */

const THEME_STORAGE_KEY = 'portfolio-theme';
const KALI = 'kali';

function getStoredTheme() {
    return localStorage.getItem(THEME_STORAGE_KEY);
}

function applyTheme(theme) {
    if (theme === KALI) {
        document.documentElement.setAttribute('data-theme', KALI);
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
}

// Application immédiate (anti-FOUC) : le thème de base reste le défaut.
applyTheme(getStoredTheme());

function updateToggleIcon(button, theme) {
    const isKali = theme === KALI;
    button.innerHTML = isKali
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-terminal"></i>';
    button.setAttribute(
        'aria-label',
        isKali ? 'Revenir au thème clair' : 'Activer le thème Kali'
    );
}

function setupThemeToggle() {
    const button = document.getElementById('theme-toggle');
    if (!button) {
        return;
    }

    let current = getStoredTheme() === KALI ? KALI : 'base';
    updateToggleIcon(button, current);

    button.addEventListener('click', () => {
        current = current === KALI ? 'base' : KALI;
        applyTheme(current);
        localStorage.setItem(THEME_STORAGE_KEY, current);
        updateToggleIcon(button, current);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupThemeToggle);
} else {
    setupThemeToggle();
}
