// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Apply fade-in to key elements
const animateSelectors = [
    '.about-text', '.about-card',
    '.problem-example', '.step',
    '.method-card', '.motif-card',
    '.result-card', '.equation-highlight',
    '.app-card',
    '.bench-card', '.bench-table-wrap',
    '.arch-card', '.code-tabs', '.library-tech-bar',
    '.team-card', '.ref-card',
    '.diagram-card',
    '.bench-counter', '.id-gallery', '.gallery-stage'
];

animateSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${i * 0.08}s`;
        observer.observe(el);
    });
});

// Code tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// Lightbox
(function() {
    const overlay = document.getElementById('lightbox');
    if (!overlay) return;
    const img = overlay.querySelector('img');
    const close = overlay.querySelector('.lightbox-close');
    document.querySelectorAll('.bench-card img').forEach(cardImg => {
        cardImg.style.cursor = 'zoom-in';
        cardImg.addEventListener('click', () => {
            img.src = cardImg.src;
            img.alt = cardImg.alt;
            overlay.classList.add('active');
        });
    });
    close.addEventListener('click', () => overlay.classList.remove('active'));
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.classList.remove('active'); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') overlay.classList.remove('active'); });
})();

// Identification Gallery tabs
document.querySelectorAll('.gallery-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.gallery-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.gallery-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.panel).classList.add('active');
    });
});

// Motif theory/code toggle
document.querySelectorAll('.motif-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.motif-card');
        card.querySelectorAll('.motif-toggle-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const show = btn.dataset.show;
        card.querySelector('.motif-theory').classList.toggle('active', show === 'theory');
        card.querySelector('.motif-code').classList.toggle('active', show === 'code');
    });
});

// Parallax titles
window.addEventListener('scroll', () => {
    document.querySelectorAll('.section-title').forEach(title => {
        const rect = title.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const offset = (rect.top - window.innerHeight / 2) * 0.04;
            title.style.transform = `translateY(${offset}px)`;
        }
    });
});

// Hero parallax
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-content');
    if (hero) {
        const s = window.scrollY;
        hero.style.transform = `translateY(${s * 0.25}px)`;
        hero.style.opacity = Math.max(0, 1 - s / 700);
    }
});

// Active nav link on scroll
const sections = document.querySelectorAll('.section, .hero');
const navLinkElements = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinkElements.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = '#e8e8f0';
        }
    });
});
