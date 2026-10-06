const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('#theme-toggle');
const menuLabels = document.documentElement.lang === 'en'
    ? { open: 'Open menu', close: 'Close menu' }
    : { open: 'Abrir menú', close: 'Cerrar menú' };

function setMenu(open) {
    navLinks.classList.toggle('active', open);
    menuIcon.setAttribute('aria-expanded', open);
    menuIcon.setAttribute('aria-label', open ? menuLabels.close : menuLabels.open);
    //Cambiamos el icono del menú entre 'fa-bars' y 'fa-x'
    menuIcon.querySelector('i').className = open ? 'fa-solid fa-x' : 'fa-solid fa-bars';
}

menuIcon.onclick = () => setMenu(!navLinks.classList.contains('active'));

//Cerramos el menú al pulsar un enlace
navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
});

//Tema claro/oscuro
function currentTheme() {
    return document.documentElement.dataset.theme ||
        (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

function updateThemeIcon() {
    themeToggle.querySelector('i').className =
        currentTheme() === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

themeToggle.onclick = () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
    updateThemeIcon();
};
updateThemeIcon();

//Animación de aparición al hacer scroll
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

//Resaltamos en el menú la sección visible
const sectionLinks = new Map();
navLinks.querySelectorAll('a').forEach((link) => {
    const section = document.querySelector(link.getAttribute('href'));
    if (section) sectionLinks.set(section, link);
});

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            navLinks.querySelectorAll('a').forEach((a) => a.classList.remove('active'));
            sectionLinks.get(entry.target).classList.add('active');
        }
    });
}, { rootMargin: '-45% 0px -50% 0px' });

sectionLinks.forEach((_, section) => navObserver.observe(section));
