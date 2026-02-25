// ─── Theme ───────────────────────────────────────────────
const body   = document.body;
const toggle = document.getElementById('themeToggle');

function applyTheme(theme) {
    body.classList.toggle('dark',  theme === 'dark');
    body.classList.toggle('light', theme === 'light');
}

function initTheme() {
    const saved  = localStorage.getItem('theme');
    const prefer = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    applyTheme(saved || prefer);
}

toggle.addEventListener('click', () => {
    const next = body.classList.contains('light') ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem('theme', next);
});

initTheme();