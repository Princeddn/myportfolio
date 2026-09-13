/*
 * Motion design premium — layer GSAP + Lenis.
 * Complète les systèmes existants (journey-animations = reveals de cartes,
 * script.js = typewriter/compteurs) sans les dupliquer :
 *   - Smooth scroll inertiel (Lenis)
 *   - Timeline d'entrée cinématique du hero
 *   - Boutons magnétiques + tilt 3D de la photo de profil
 *   - Parallax du hero et reveal des titres de section (ScrollTrigger)
 * Tout est désactivé si l'utilisateur préfère réduire les animations.
 */

(function () {
    'use strict';

    const prefersReducedMotion =
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    if (prefersReducedMotion || typeof gsap === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    /* ---------- Smooth scroll inertiel ---------- */
    function initSmoothScroll() {
        if (typeof Lenis === 'undefined' || isTouchDevice) return;

        const lenis = new Lenis({
            duration: 1.1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        // Synchronise Lenis avec le ticker GSAP pour un scrub parfaitement fluide
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);

        // Les ancres de navigation passent par Lenis pour garder l'inertie
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', (event) => {
                const target = document.querySelector(anchor.getAttribute('href'));
                if (!target) return;
                event.preventDefault();
                lenis.scrollTo(target, { offset: -70 });
            });
        });
    }

    /* ---------- Entrée cinématique du hero ---------- */
    // script.js remplit #nom-titre depuis cv.json (fetch async) : on attend
    // que le nom soit posé avant de le découper, sinon il serait écrasé.
    function whenHeroTitleReady(callback) {
        const titleContainer = document.getElementById('nom-titre');
        if (!titleContainer) return;

        const startedAt = performance.now();
        (function check() {
            const isPopulated = !titleContainer.querySelector('.name-part');
            if (isPopulated || performance.now() - startedAt > 2000) {
                callback(titleContainer);
            } else {
                requestAnimationFrame(check);
            }
        })();
    }

    function initHeroIntro(title) {
        if (!title || !title.textContent.trim()) return;

        // Découpe le nom en lettres pour un reveal en cascade
        const letters = title.textContent.split('');
        title.textContent = '';
        title.style.display = 'inline-block';
        letters.forEach((letter) => {
            const span = document.createElement('span');
            span.className = 'hero-letter';
            span.style.display = 'inline-block';
            span.style.whiteSpace = 'pre';
            span.textContent = letter;
            title.appendChild(span);
        });

        const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

        timeline
            .from('.hero-greeting', { y: 24, opacity: 0, duration: 0.6 })
            .from('.hero-letter', {
                y: 90,
                opacity: 0,
                rotateX: -80,
                duration: 0.8,
                stagger: 0.035,
            }, '-=0.25')
            .from('.hero-dynamic-subtitle', { y: 20, opacity: 0, duration: 0.5 }, '-=0.4')
            .from('.hero-stat', { y: 30, opacity: 0, duration: 0.5, stagger: 0.12 }, '-=0.2')
            .from('.hero-location', { y: 16, opacity: 0, duration: 0.4 }, '-=0.25')
            .from('.hero-buttons .btn', {
                y: 24,
                opacity: 0,
                scale: 0.92,
                duration: 0.45,
                stagger: 0.1,
            }, '-=0.2')
            .from('.profile-circle', {
                scale: 0.7,
                opacity: 0,
                duration: 1,
                ease: 'elastic.out(1, 0.6)',
            }, '-=0.9');
    }

    /* ---------- Parallax du hero au scroll ---------- */
    function initHeroParallax() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        gsap.to('.hero-text', {
            y: -60,
            opacity: 0.25,
            ease: 'none',
            scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
        });
        gsap.to('.hero-image', {
            y: -120,
            ease: 'none',
            scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
        });
    }

    /* ---------- Reveal des titres de section ---------- */
    function initSectionTitles() {
        document.querySelectorAll('.section-title').forEach((sectionTitle) => {
            gsap.from(sectionTitle, {
                y: 40,
                opacity: 0,
                duration: 0.7,
                ease: 'power3.out',
                scrollTrigger: { trigger: sectionTitle, start: 'top 85%' },
            });
        });
    }

    /* ---------- Boutons magnétiques ---------- */
    function initMagneticButtons() {
        if (isTouchDevice) return;

        const STRENGTH = 0.35;
        document.querySelectorAll('.hero-buttons .btn, .btn-explore').forEach((button) => {
            button.addEventListener('mousemove', (event) => {
                const rect = button.getBoundingClientRect();
                const relativeX = event.clientX - rect.left - rect.width / 2;
                const relativeY = event.clientY - rect.top - rect.height / 2;
                gsap.to(button, {
                    x: relativeX * STRENGTH,
                    y: relativeY * STRENGTH,
                    duration: 0.3,
                    ease: 'power2.out',
                });
            });
            button.addEventListener('mouseleave', () => {
                gsap.to(button, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
            });
        });
    }

    /* ---------- Tilt 3D de la photo de profil ---------- */
    function initProfileTilt() {
        if (isTouchDevice) return;

        const circle = document.querySelector('.profile-circle');
        if (!circle) return;

        const MAX_TILT = 12;
        circle.style.transformStyle = 'preserve-3d';
        circle.parentElement.style.perspective = '800px';

        circle.addEventListener('mousemove', (event) => {
            const rect = circle.getBoundingClientRect();
            const ratioX = (event.clientX - rect.left) / rect.width - 0.5;
            const ratioY = (event.clientY - rect.top) / rect.height - 0.5;
            gsap.to(circle, {
                rotateY: ratioX * MAX_TILT * 2,
                rotateX: -ratioY * MAX_TILT * 2,
                scale: 1.04,
                duration: 0.4,
                ease: 'power2.out',
            });
        });
        circle.addEventListener('mouseleave', () => {
            gsap.to(circle, {
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                duration: 0.7,
                ease: 'elastic.out(1, 0.5)',
            });
        });
    }

    /* ---------- Parallax léger des illustrations de domaine ---------- */
    function initDomainIllustrationsParallax() {
        // Les cartes sont injectées dynamiquement : on attend leur création
        const container = document.querySelector('#experiences .cards-grid');
        if (!container) return;

        const observer = new MutationObserver(() => {
            const illustrations = container.querySelectorAll('.domain-illustration');
            if (!illustrations.length) return;
            observer.disconnect();
            illustrations.forEach((illustration) => {
                gsap.fromTo(illustration,
                    { y: 40 },
                    {
                        y: -20,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: illustration.closest('.domain-card'),
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true,
                        },
                    });
            });
        });
        observer.observe(container, { childList: true });
    }

    function init() {
        initSmoothScroll();
        whenHeroTitleReady(initHeroIntro);
        initHeroParallax();
        initSectionTitles();
        initMagneticButtons();
        initProfileTilt();
        initDomainIllustrationsParallax();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
