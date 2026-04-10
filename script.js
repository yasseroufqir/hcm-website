// ── AOS (scroll animations) ──
AOS.init({ duration: 800, once: true, offset: 100 });

// ── Lenis (smooth scroll) ──
const lenis = new Lenis({ duration: 1.2 });
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// ── tsParticles (causal graph hero background) ──
tsParticles.load("particles-hero", {
    fullScreen: { enable: false },
    particles: {
        number: { value: 70, density: { enable: true, area: 800 } },
        color: { value: ["#6366f1", "#22d3ee", "#818cf8"] },
        shape: { type: "circle" },
        opacity: { value: { min: 0.3, max: 0.7 } },
        size: { value: { min: 2, max: 5 } },
        links: {
            enable: true,
            color: { value: "#6366f1" },
            opacity: 0.2,
            distance: 160,
            width: 1.2,
            triangles: { enable: true, opacity: 0.02 }
        },
        move: {
            enable: true,
            speed: 0.8,
            direction: "none",
            outModes: "bounce",
            attract: { enable: true, rotateX: 600, rotateY: 1200 }
        },
    },
    interactivity: {
        events: {
            onHover: { enable: true, mode: "grab" },
            onClick: { enable: true, mode: "push" }
        },
        modes: {
            grab: { distance: 180, links: { opacity: 0.45, color: "#22d3ee" } },
            push: { quantity: 2 }
        },
    },
    detectRetina: true,
});

// ── GLightbox (benchmark images) ──
GLightbox({ selector: '.glightbox' });

// ── KaTeX (render .equation elements and data-latex elements) ──
document.querySelectorAll('.equation').forEach(el => {
    // If element has data-latex, use that; otherwise use textContent
    const tex = el.dataset.latex || el.textContent;
    if (tex && tex.trim()) {
        katex.render(tex.trim(), el, { throwOnError: false, displayMode: true });
    }
});

// Also render .ident-formula elements that have data-latex
document.querySelectorAll('[data-latex]').forEach(el => {
    if (!el.classList.contains('equation')) {
        const tex = el.dataset.latex;
        if (tex && tex.trim()) {
            katex.render(tex.trim(), el, { throwOnError: false, displayMode: true });
        }
    }
});

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

// Smooth scroll for anchor links (integrates with Lenis)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            lenis.scrollTo(target, { offset: -80 });
        }
    });
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
