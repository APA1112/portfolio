const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.onclick = () => {
    //Cambiamos la clase 'active' para mostrar u ocultar el menú
    navLinks.classList.toggle('active');
    //Cambiamos el icono del menú entre 'fa-bars' y 'fa-x'
    menuIcon.classList.toggle('fa-x');
    menuIcon.classList.toggle('fa-bars');
}