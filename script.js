// ─── Theme ───────────────────────────────────────────────
const body        = document.body;
const themeToggle = document.getElementById('themeToggle');
const themeMenu   = document.getElementById('themeMenu');

const iconSun    = themeToggle.querySelector('.icon-sun');
const iconMoon   = themeToggle.querySelector('.icon-moon');
const iconSystem = themeToggle.querySelector('.icon-system');

const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');



// ── helpers ──────────────────────────────────────────────
function resolvedTheme(pref) {
    if (pref === 'system') return mediaQuery.matches ? 'light' : 'dark';
    return pref;
}

function applyTheme(pref) {
    const actual = resolvedTheme(pref);
    body.classList.toggle('light', actual === 'light');
    body.classList.toggle('dark',  actual === 'dark');

    iconSun.style.display    = pref === 'light'  ? 'block' : 'none';
    iconMoon.style.display   = pref === 'dark'   ? 'block' : 'none';
    iconSystem.style.display = pref === 'system' ? 'block' : 'none';


    themeMenu.querySelectorAll('.theme-option').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === pref);
        btn.setAttribute('aria-pressed', btn.dataset.theme === pref);
    });

    themeToggle.setAttribute('aria-label', `Theme: ${pref}`);
}

function initTheme() {
    const saved = localStorage.getItem('theme') || 'system';
    applyTheme(saved);
}

// ── menu show / hide ──────────────────────────────────────
const themeWrapper = themeToggle.closest('.theme-toggle-wrapper');
let menuTimeout;

function showMenu() {
    clearTimeout(menuTimeout);
    themeMenu.classList.add('visible');
}

function hideMenu() {
    menuTimeout = setTimeout(() => themeMenu.classList.remove('visible'), 80);
}

// the whole wrapper is the hover zone — moving between button
// and any option never drops hover
themeWrapper.addEventListener('mouseenter', showMenu);
themeWrapper.addEventListener('mouseleave', hideMenu);

themeToggle.addEventListener('click', () => {
    themeMenu.classList.contains('visible') ? hideMenu() : showMenu();
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') themeMenu.classList.remove('visible');
});

// ── option clicks ─────────────────────────────────────────
themeMenu.querySelectorAll('.theme-option').forEach(btn => {
    btn.addEventListener('click', () => {
        const pref = btn.dataset.theme;
        localStorage.setItem('theme', pref);
        applyTheme(pref);
        themeMenu.classList.remove('visible');
    });
});

// ── OS theme changes ──────────────────────────────────────
mediaQuery.addEventListener('change', () => {
    if (localStorage.getItem('theme') === 'system') applyTheme('system');
});

initTheme();