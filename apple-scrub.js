/*
 * Scrub au scroll — le média avance au rythme du défilement, épinglé à l'écran.
 *
 * Deux sources possibles sur la même section :
 *   data-scrub-src + data-scrub-count  → séquence d'images rendue sur un canvas
 *   data-scrub-video                   → vidéo dont le currentTime est piloté
 *
 * La séquence d'images est la plus fluide : chaque position de scroll tombe sur
 * une image entière. Le seek vidéo dépend des images-clés du fichier et saccade
 * sur iOS si l'encodage n'a pas un GOP court.
 */

(function () {
    'use strict';

    const PREVIEW_STEP = 8; // Une image sur huit d'abord : l'effet est lisible avant la fin du préchargement.

    function frameUrl(template, index) {
        return template.replace('{index}', String(index).padStart(3, '0'));
    }

    function loadImage(src) {
        return new Promise((resolve) => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.onerror = () => resolve(null);
            image.src = src;
        });
    }

    /**
     * Charge la séquence en deux passes pour que la section devienne
     * utilisable sans attendre la totalité des images.
     */
    async function loadSequence(template, count, onReady) {
        const frames = new Array(count).fill(null);

        for (let pass = 0; pass < 2; pass++) {
            const step = pass === 0 ? PREVIEW_STEP : 1;
            for (let i = 0; i < count; i += step) {
                if (frames[i]) continue;
                frames[i] = await loadImage(frameUrl(template, i));
            }
            onReady(frames);
        }

        return frames;
    }

    /** Exécute le rappel quand la section entre dans un rayon d'un écran et demi. */
    function whenNear(section, callback) {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                observer.disconnect();
                callback();
            },
            { rootMargin: '150% 0px' }
        );

        observer.observe(section);
    }

    /**
     * Progression de la section dans le viewport, de 0 (haut atteint) à 1 (bas
     * atteint). La partie non épinglée de la section définit la durée du scrub.
     */
    function progressOf(section) {
        const rect = section.getBoundingClientRect();
        const scrollable = rect.height - window.innerHeight;
        if (scrollable <= 0) return 0;
        return Math.min(Math.max(-rect.top / scrollable, 0), 1);
    }

    function drawFrame(canvas, image) {
        if (!image) return;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
    }

    /**
     * Aligne la résolution interne du canvas sur sa taille d'affichage réelle.
     * Sans cela le rendu est flou sur les écrans à forte densité. Le facteur est
     * plafonné à 2 : au-delà le gain est invisible et le coût de dessin double.
     */
    function fitCanvas(canvas, ratio) {
        const width = Math.round(
            canvas.getBoundingClientRect().width *
                Math.min(window.devicePixelRatio || 1, 2)
        );
        if (!width || width === canvas.width) return false;

        canvas.width = width;
        canvas.height = Math.round(width / ratio);
        return true;
    }

    /** Retourne l'image la plus proche déjà chargée, pour éviter un trou visuel. */
    function nearestLoaded(frames, index) {
        if (frames[index]) return frames[index];
        for (let offset = 1; offset < frames.length; offset++) {
            if (frames[index - offset]) return frames[index - offset];
            if (frames[index + offset]) return frames[index + offset];
        }
        return null;
    }

    function initSequence(section, canvas) {
        const template = section.dataset.scrubSrc;
        const count = Number(section.dataset.scrubCount);
        if (!template || !count) return;

        const ratio = canvas.width / canvas.height;
        let frames = [];
        let lastIndex = -1;

        function render() {
            const resized = fitCanvas(canvas, ratio);
            const index = Math.min(
                Math.round(progressOf(section) * (count - 1)),
                count - 1
            );
            if (index === lastIndex && !resized) return;
            lastIndex = index;
            drawFrame(canvas, nearestLoaded(frames, index));
        }

        // Le préchargement n'est déclenché qu'à l'approche de la section :
        // une séquence complète pèse plusieurs mégaoctets et n'a aucune raison
        // de concurrencer le chargement du haut de page.
        whenNear(section, () => {
            loadSequence(template, count, (loaded) => {
                frames = loaded;
                lastIndex = -1;
                render();
            });
        });

        return render;
    }

    function initVideo(section, video) {
        let lastTime = -1;

        function render() {
            if (!video.duration) return;
            const time = progressOf(section) * video.duration;
            // Un seek sous 1/50e de seconde ne produit aucune image nouvelle.
            if (Math.abs(time - lastTime) < 0.02) return;
            lastTime = time;
            video.currentTime = time;
        }

        video.addEventListener('loadedmetadata', render);
        return render;
    }

    /** Cadence les rendus sur la fréquence d'affichage plutôt que sur le scroll. */
    function bindToScroll(render) {
        let ticking = false;

        function onScroll() {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(() => {
                ticking = false;
                render();
            });
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        render();
    }

    function initSection(section) {
        const canvas = section.querySelector('.scrub__canvas');
        const video = section.querySelector('.scrub__video');

        const render = canvas
            ? initSequence(section, canvas)
            : video && initVideo(section, video);

        if (!render) return;

        section.classList.add('is-ready');
        bindToScroll(render);
    }

    function init() {
        // Sans mouvement, la section reste sur sa première image : le contenu
        // de l'overlay porte alors seul le message.
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        for (const section of document.querySelectorAll('.scrub')) {
            initSection(section);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
