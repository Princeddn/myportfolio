/*
 * Motion du prototype "langage Apple" — sans dépendance externe.
 *
 * Trois mécaniques seulement :
 *   1. reveal à l'entrée dans le viewport (IntersectionObserver)
 *   2. scène épinglée dont le chapitre actif suit la progression du scroll
 *   3. filet de la barre de navigation au premier défilement
 *
 * Le fichier est chargé sans `defer` pour poser `has-js` avant le premier
 * rendu : sans cette classe, le CSS affiche tout le contenu en clair.
 */

(function () {
    'use strict';

    document.documentElement.classList.add('has-js');

    const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    function initReveals() {
        const targets = document.querySelectorAll('[data-reveal]');
        if (!targets.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;
                    entry.target.classList.add('is-revealed');
                    observer.unobserve(entry.target);
                }
            },
            { rootMargin: '0px 0px -12% 0px', threshold: 0.15 }
        );

        for (const target of targets) observer.observe(target);
    }

    function activateChapter(stage, index) {
        const groups = [
            stage.querySelectorAll('.chapter'),
            stage.querySelectorAll('.stage__figure'),
            stage.querySelectorAll('.stage__dot')
        ];

        for (const group of groups) {
            group.forEach((element, position) => {
                element.classList.toggle('is-active', position === index);
            });
        }
    }

    /**
     * Traduit la position de la scène épinglée en index de chapitre.
     * La progression va de 0 (haut de la scène atteint) à 1 (bas atteint),
     * répartie uniformément entre les chapitres.
     */
    function chapterIndexFor(stage, chapterCount) {
        const rect = stage.getBoundingClientRect();
        const scrollable = rect.height - window.innerHeight;
        if (scrollable <= 0) return 0;

        const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
        return Math.min(Math.floor(progress * chapterCount), chapterCount - 1);
    }

    function initStage() {
        const stage = document.querySelector('.stage');
        if (!stage) return;

        const chapterCount = stage.querySelectorAll('.chapter').length;
        if (!chapterCount) return;

        let currentIndex = -1;
        let ticking = false;

        function update() {
            ticking = false;
            const index = chapterIndexFor(stage, chapterCount);
            if (index === currentIndex) return;
            currentIndex = index;
            activateChapter(stage, index);
        }

        // Le scroll est échantillonné une fois par frame : lire le layout à
        // chaque événement provoquerait un reflow synchrone par tick.
        function onScroll() {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(update);
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        update();
    }

    function initNav(nav) {
        const observer = new IntersectionObserver(
            ([entry]) => nav.classList.toggle('is-scrolled', !entry.isIntersecting),
            { threshold: 1 }
        );

        const sentinel = document.createElement('div');
        sentinel.setAttribute('aria-hidden', 'true');
        nav.parentNode.insertBefore(sentinel, nav);
        observer.observe(sentinel);
    }

    /**
     * Bascule la barre en clair ou sombre selon la section qu'elle survole.
     * La fenêtre d'observation est réduite à la bande occupée par la barre.
     */
    function initNavContrast(nav) {
        const darkScenes = document.querySelectorAll('.scene--dark');
        if (!darkScenes.length) return;

        const navHeight = nav.offsetHeight;
        // Un ensemble plutôt qu'un booléen : deux sections peuvent changer
        // d'état dans le même lot d'entrées, l'ordre n'est alors pas garanti.
        const activeScenes = new Set();

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) activeScenes.add(entry.target);
                    else activeScenes.delete(entry.target);
                }
                nav.classList.toggle('is-dark', activeScenes.size > 0);
            },
            {
                rootMargin: `0px 0px -${Math.max(window.innerHeight - navHeight, 0)}px 0px`
            }
        );

        for (const scene of darkScenes) observer.observe(scene);
    }

    function initNavigation() {
        const nav = document.querySelector('.a-nav');
        if (!nav) return;

        initNav(nav);
        initNavContrast(nav);
    }

    function init() {
        if (!prefersReducedMotion) initReveals();
        initStage();
        initNavigation();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
