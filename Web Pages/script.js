const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('.section');
const menuIcon = document.getElementById('menu-icon');
const nav = document.querySelector('nav');
function navigateToSection(event) {
    event.preventDefault(); 
    sections.forEach(section => section.classList.remove('active'));
    navLinks.forEach(link => link.classList.remove('active'));
    const targetId = event.target.getAttribute('href').substring(1); 
    document.getElementById(targetId).classList.add('active');
    event.target.classList.add('active');
    nav.classList.remove('active');
}
navLinks.forEach(link => link.addEventListener('click', navigateToSection));
menuIcon.addEventListener('click', () => {
    nav.classList.toggle('active');
});
