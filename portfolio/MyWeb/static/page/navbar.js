const navLinkEl = document.querySelectorAll('.navbar-link');
const sectionEl = document.querySelectorAll('section');
const navbarEl = document.querySelector('.navbar-layout');
const navListEl = document.querySelector('.navbar-list')

const navPosition = navbarEl.offsetTop;
document.documentElement.style.setProperty(
    '--scroll-margin', navPosition + 'px'
);

window.addEventListener('DOMContentLoaded', () => {
    const navActiveEl = document.querySelector('.navbar-active');
    moveIndicator(navActiveEl, navListEl);
})

window.addEventListener('scroll', () => {
    if (window.scrollY > navListEl.offsetTop) {
        if (navListEl.classList.contains('navbar-blur')) return;
        navListEl.classList.add('navbar-blur');
    } else if (navListEl.classList.contains('navbar-blur')){
        navListEl.classList.remove('navbar-blur');
    }
})

currSection = 'about'
window.addEventListener('scroll', () => {
    sectionEl.forEach(sectionEl => {
        const startPoint = document.querySelector('.about-layout').offsetTop;
        currScrollPoint = Math.round(window.scrollY + (startPoint + 50))
        if (currScrollPoint >= sectionEl.offsetTop) {
            currSection = sectionEl.id;
        }
    })
    navLinkEl.forEach(navLink => {
        if (navLink.href.includes(currSection)) {
            navLinkEl.forEach(navLink =>{navLink.classList.remove('navbar-active')})
            navLink.classList.add('navbar-active');

            const navActiveEl = document.querySelector('.navbar-active');
            moveIndicator(navActiveEl, navListEl);
        }
    })
})

function moveIndicator(currActiveLink, currLeft) {
    const navIndicator = document.querySelector('.navbar-indicator');
    navIndicator.style.height = window.getComputedStyle(currActiveLink).getPropertyValue('height')
    navIndicator.style.width = window.getComputedStyle(currActiveLink).getPropertyValue('width')
    navIndicator.style.left = currActiveLink.getBoundingClientRect().left - currLeft.getBoundingClientRect().left + 'px'
}