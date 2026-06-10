const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

function updateActiveLink() {
    const scrollY = window.scrollY;
    const offset  = 100; // Sesuaikan dengan tinggi navbar

    let currentId = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - offset;
        if (scrollY >= sectionTop) {
            currentId = section.getAttribute('id');
        }
    });

    navAnchors.forEach(anchor => {
        anchor.classList.remove('active');
        if (anchor.getAttribute('href') === `#${currentId}`) {
            anchor.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
updateActiveLink();