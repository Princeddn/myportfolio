/**
 * ========================================
 * JOURNEY ANIMATIONS - Voyage Immersif
 * Portfolio Prince Noukounwoui
 * ========================================
 *
 * Système d'animation cinématique qui transforme
 * la visite du portfolio en un voyage narratif
 */

(function() {
    'use strict';

    // ================================
    // CONFIGURATION
    // ================================

    const CONFIG = {
        // Sections du voyage (dans l'ordre)
        sections: [
            { id: 'accueil', label: 'Accueil', icon: '🏠' },
            { id: 'apropos', label: 'À propos', icon: '👤' },
            { id: 'experiences', label: 'Expertise', icon: '💼' },
            { id: 'competences', label: 'Skills', icon: '⚙️' },
            { id: 'projets', label: 'Projets', icon: '🚀' },
            { id: 'certifications', label: 'Certifs', icon: '📜' },
            { id: 'formation', label: 'Formation', icon: '🎓' },
            { id: 'rendezvous', label: 'Contact', icon: '📅' }
        ],

        // Seuils d'animation
        revealThreshold: 0.15,
        cardThreshold: 0.1,

        // Délais (en ms)
        staggerDelay: 100,
        loaderDuration: 800,

        // Particules
        particleCount: 15,

        // Breakpoints
        mobileBreakpoint: 768,
        tabletBreakpoint: 1024
    };

    // ================================
    // STATE
    // ================================

    const state = {
        currentSection: 0,
        scrollProgress: 0,
        isLoaded: false,
        observers: [],
        cursorPosition: { x: 0, y: 0 }
    };

    // ================================
    // UTILITIES
    // ================================

    const utils = {
        // Debounce function
        debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        // Throttle function
        throttle(func, limit) {
            let inThrottle;
            return function(...args) {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },

        // Check if element is in viewport
        isInViewport(element, threshold = 0) {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            return (
                rect.top <= windowHeight * (1 - threshold) &&
                rect.bottom >= windowHeight * threshold
            );
        },

        // Get scroll progress (0-1)
        getScrollProgress() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            return scrollHeight > 0 ? scrollTop / scrollHeight : 0;
        },

        // Check if mobile
        isMobile() {
            return window.innerWidth <= CONFIG.mobileBreakpoint;
        },

        // Check if tablet
        isTablet() {
            return window.innerWidth <= CONFIG.tabletBreakpoint && window.innerWidth > CONFIG.mobileBreakpoint;
        },

        // Check if reduced motion preferred
        prefersReducedMotion() {
            return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        }
    };

    // ================================
    // JOURNEY PROGRESS INDICATOR
    // ================================

    const journeyProgress = {
        element: null,
        progressLine: null,
        steps: [],

        init() {
            if (utils.isMobile() || utils.isTablet()) return;

            this.createElement();
            this.bindEvents();
        },

        createElement() {
            // Create main container
            this.element = document.createElement('div');
            this.element.className = 'journey-progress';
            this.element.setAttribute('aria-label', 'Navigation du voyage');

            // Create background line
            const line = document.createElement('div');
            line.className = 'journey-line';
            this.element.appendChild(line);

            // Create progress line
            this.progressLine = document.createElement('div');
            this.progressLine.className = 'journey-line-progress';
            this.element.appendChild(this.progressLine);

            // Create steps
            CONFIG.sections.forEach((section, index) => {
                const step = document.createElement('div');
                step.className = 'journey-step';
                step.setAttribute('data-section', section.id);
                step.setAttribute('role', 'button');
                step.setAttribute('tabindex', '0');
                step.setAttribute('aria-label', `Aller à ${section.label}`);

                const label = document.createElement('span');
                label.className = 'journey-step-label';
                label.textContent = section.label;
                step.appendChild(label);

                // Click event
                step.addEventListener('click', () => this.navigateToSection(section.id));
                step.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') this.navigateToSection(section.id);
                });

                this.element.appendChild(step);
                this.steps.push(step);
            });

            document.body.appendChild(this.element);
        },

        bindEvents() {
            // Update on scroll
            window.addEventListener('scroll', utils.throttle(() => this.update(), 50));
        },

        update() {
            // Calculate progress
            const progress = utils.getScrollProgress();
            this.progressLine.style.height = `${progress * 100}%`;

            // Find current section
            let currentIndex = 0;
            CONFIG.sections.forEach((section, index) => {
                const element = document.getElementById(section.id);
                if (element && utils.isInViewport(element, 0.5)) {
                    currentIndex = index;
                }
            });

            // Update steps
            this.steps.forEach((step, index) => {
                step.classList.remove('active', 'completed');
                if (index < currentIndex) {
                    step.classList.add('completed');
                } else if (index === currentIndex) {
                    step.classList.add('active');
                }
            });

            state.currentSection = currentIndex;
        },

        navigateToSection(sectionId) {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    // ================================
    // CINEMATIC REVEALS
    // ================================

    const cinematicReveals = {
        observers: [],
        retryCount: 0,
        maxRetries: 10,

        init() {
            // Attendre que le contenu dynamique soit chargé
            this.waitForContent();
        },

        waitForContent() {
            // Vérifier si le contenu dynamique existe
            const cards = document.querySelectorAll(
                '.domain-card, .project-card, .skill-item, .certification-item, .education-item'
            );

            if (cards.length > 0) {
                console.log(`🎬 Journey: ${cards.length} éléments trouvés, initialisation des animations`);
                this.setupAllObservers();
            } else if (this.retryCount < this.maxRetries) {
                this.retryCount++;
                console.log(`🔄 Journey: Attente du contenu dynamique (tentative ${this.retryCount}/${this.maxRetries})`);
                setTimeout(() => this.waitForContent(), 500);
            } else {
                console.log('⚠️ Journey: Contenu non trouvé, animations désactivées');
            }
        },

        setupAllObservers() {
            // Ajouter la classe journey-ready au body pour activer les animations
            document.body.classList.add('journey-ready');

            this.setupSectionObserver();
            this.setupCardObserver();
            this.setupTimelineObserver();

            // Forcer la vérification immédiate des éléments visibles
            setTimeout(() => this.checkVisibleElements(), 100);
        },

        checkVisibleElements() {
            // Révéler immédiatement les éléments déjà visibles à l'écran
            const allCards = document.querySelectorAll(
                '.domain-card, .project-card, .skill-item, .certification-item, .education-item'
            );

            allCards.forEach((card, index) => {
                if (utils.isInViewport(card, 0)) {
                    setTimeout(() => {
                        card.classList.add('journey-visible');
                    }, index * 50);
                }
            });
        },

        setupSectionObserver() {
            const sections = document.querySelectorAll('.section');

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('in-view');
                            this.revealSectionContent(entry.target);
                        }
                    });
                },
                { threshold: CONFIG.revealThreshold, rootMargin: '0px 0px -50px 0px' }
            );

            sections.forEach(section => observer.observe(section));
            this.observers.push(observer);
        },

        revealSectionContent(section) {
            // Révéler les cartes de cette section avec un effet staggered
            const cards = section.querySelectorAll(
                '.domain-card, .project-card, .skill-item, .certification-item, .education-item'
            );
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('journey-visible');
                }, 100 + index * CONFIG.staggerDelay);
            });
        },

        setupCardObserver() {
            const cards = document.querySelectorAll(
                '.domain-card, .project-card, .skill-item, .certification-item'
            );

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry, index) => {
                        if (entry.isIntersecting && !entry.target.classList.contains('journey-visible')) {
                            // Calculate stagger delay based on position
                            const siblings = Array.from(entry.target.parentElement?.children || []);
                            const siblingIndex = siblings.indexOf(entry.target);

                            setTimeout(() => {
                                entry.target.classList.add('journey-visible');
                            }, siblingIndex * CONFIG.staggerDelay);
                        }
                    });
                },
                { threshold: CONFIG.cardThreshold, rootMargin: '0px 0px -30px 0px' }
            );

            cards.forEach(card => observer.observe(card));
            this.observers.push(observer);
        },

        setupTimelineObserver() {
            const timeline = document.querySelector('.education-timeline');
            const items = document.querySelectorAll('.education-item');

            if (!timeline) return;

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('journey-visible');

                            // Reveal items with stagger
                            items.forEach((item, index) => {
                                setTimeout(() => {
                                    item.classList.add('journey-visible');
                                }, 300 + index * 200);
                            });
                        }
                    });
                },
                { threshold: 0.2 }
            );

            observer.observe(timeline);
            this.observers.push(observer);
        },

        destroy() {
            this.observers.forEach(observer => observer.disconnect());
            this.observers = [];
            document.body.classList.remove('journey-ready');
        }
    };

    // ================================
    // HERO JOURNEY ENTRANCE
    // ================================

    const heroEntrance = {
        init() {
            const hero = document.querySelector('.hero');
            if (!hero) return;

            // Wait for content to load, then trigger animation
            setTimeout(() => {
                hero.classList.add('journey-loaded');
            }, 300);
        }
    };

    // ================================
    // FLOATING PARTICLES
    // ================================

    const floatingParticles = {
        container: null,
        particles: [],

        init() {
            if (utils.isMobile() || utils.prefersReducedMotion()) return;

            this.createContainer();
            this.createParticles();
        },

        createContainer() {
            this.container = document.createElement('div');
            this.container.className = 'journey-particles';
            this.container.setAttribute('aria-hidden', 'true');
            document.body.appendChild(this.container);
        },

        createParticles() {
            const colors = [
                'var(--primary-color)',
                'var(--secondary-color)',
                'var(--accent-color)',
                'var(--success-color)'
            ];

            for (let i = 0; i < CONFIG.particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'journey-particle';

                // Random properties
                const size = Math.random() * 4 + 2;
                const left = Math.random() * 100;
                const delay = Math.random() * 15;
                const duration = Math.random() * 10 + 10;
                const color = colors[Math.floor(Math.random() * colors.length)];

                particle.style.cssText = `
                    width: ${size}px;
                    height: ${size}px;
                    left: ${left}%;
                    background: ${color};
                    animation-delay: ${delay}s;
                    animation-duration: ${duration}s;
                `;

                this.container.appendChild(particle);
                this.particles.push(particle);
            }
        },

        destroy() {
            if (this.container) {
                this.container.remove();
            }
            this.particles = [];
        }
    };

    // ================================
    // CURSOR GLOW EFFECT
    // ================================

    const cursorGlow = {
        element: null,

        init() {
            if (utils.isMobile() || utils.isTablet()) return;

            this.createElement();
            this.bindEvents();
        },

        createElement() {
            this.element = document.createElement('div');
            this.element.className = 'journey-cursor-glow';
            document.body.appendChild(this.element);
        },

        bindEvents() {
            document.addEventListener('mousemove', utils.throttle((e) => {
                this.update(e.clientX, e.clientY);
            }, 16));

            document.addEventListener('mouseenter', () => {
                this.element.classList.add('visible');
            });

            document.addEventListener('mouseleave', () => {
                this.element.classList.remove('visible');
            });
        },

        update(x, y) {
            if (!this.element) return;
            this.element.style.left = `${x}px`;
            this.element.style.top = `${y}px`;
            state.cursorPosition = { x, y };
        },

        destroy() {
            if (this.element) {
                this.element.remove();
            }
        }
    };

    // ================================
    // LOADING SCREEN
    // ================================

    const loadingScreen = {
        element: null,
        progressBar: null,
        progress: 0,

        init() {
            this.createElement();
            this.simulateLoading();
        },

        createElement() {
            this.element = document.createElement('div');
            this.element.className = 'journey-loader';
            this.element.innerHTML = `
                <div class="journey-loader-content">
                    <div class="journey-loader-logo">PN</div>
                    <div class="journey-loader-bar">
                        <div class="journey-loader-progress"></div>
                    </div>
                    <div class="journey-loader-text">Préparation du voyage...</div>
                </div>
            `;
            document.body.appendChild(this.element);
            this.progressBar = this.element.querySelector('.journey-loader-progress');
        },

        simulateLoading() {
            const interval = setInterval(() => {
                this.progress += Math.random() * 15 + 5;
                if (this.progress >= 100) {
                    this.progress = 100;
                    clearInterval(interval);
                    this.hide();
                }
                this.updateProgress();
            }, 100);
        },

        updateProgress() {
            if (this.progressBar) {
                this.progressBar.style.width = `${this.progress}%`;
            }
        },

        hide() {
            setTimeout(() => {
                this.element.classList.add('hidden');
                state.isLoaded = true;

                // Remove from DOM after animation
                setTimeout(() => {
                    this.element.remove();
                }, 600);
            }, 300);
        }
    };

    // ================================
    // MAGNETIC HOVER EFFECT
    // ================================

    const magneticHover = {
        elements: [],

        init() {
            if (utils.isMobile()) return;

            this.elements = document.querySelectorAll('.btn, .nav-link, .contact-option');
            this.bindEvents();
        },

        bindEvents() {
            this.elements.forEach(element => {
                element.classList.add('magnetic-hover');

                element.addEventListener('mousemove', (e) => {
                    const rect = element.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;

                    // Subtle magnetic effect
                    const moveX = x * 0.1;
                    const moveY = y * 0.1;

                    element.style.transform = `translate(${moveX}px, ${moveY}px)`;
                });

                element.addEventListener('mouseleave', () => {
                    element.style.transform = '';
                });
            });
        }
    };

    // ================================
    // SCROLL-TRIGGERED COUNTERS (opt-in)
    // ================================

    const scrollCounters = {
        counters: [],
        observed: new Set(),

        init() {
            // Ne pas interférer avec les compteurs gérés par script.js
            // Utiliser uniquement des éléments explicitement opt-in.
            this.counters = document.querySelectorAll('.journey-counter');
            if (!this.counters.length) return;
            this.setupObserver();
        },

        setupObserver() {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && !this.observed.has(entry.target)) {
                            this.observed.add(entry.target);
                            this.animateCounter(entry.target);
                        }
                    });
                },
                { threshold: 0.5 }
            );

            this.counters.forEach(counter => observer.observe(counter));
        },

        animateCounter(element) {
            const target = parseInt(element.getAttribute('data-target') || element.textContent) || 0;
            const duration = 2000;
            const start = 0;
            const startTime = performance.now();

            const parent = element.closest('.stat-item') || element.closest('.hero-stat');

            const update = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function (ease-out)
                const easeOut = 1 - Math.pow(1 - progress, 3);

                const current = Math.round(start + (target - start) * easeOut);
                element.textContent = current;

                if (parent) {
                    parent.classList.add('counting');
                    setTimeout(() => parent.classList.remove('counting'), 100);
                }

                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            };

            requestAnimationFrame(update);
        }
    };

    // ================================
    // SPLIT TEXT ANIMATION
    // ================================

    const splitText = {
        init() {
            // Apply to hero title for dramatic effect
            const heroTitle = document.querySelector('.hero-title .name-part');
            if (heroTitle) {
                this.splitElement(heroTitle);
            }
        },

        splitElement(element) {
            const text = element.textContent;
            element.innerHTML = '';
            element.classList.add('journey-split-text');

            text.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.className = 'char';
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.transitionDelay = `${index * 0.03}s`;
                element.appendChild(span);
            });

            // Trigger animation after a short delay
            setTimeout(() => {
                element.classList.add('revealed');
            }, 800);
        }
    };

    // ================================
    // PARALLAX EFFECTS
    // ================================

    const parallaxEffects = {
        elements: [],

        init() {
            if (utils.prefersReducedMotion()) return;

            // Add parallax to hero background
            const heroCanvas = document.querySelector('.iot-canvas');
            if (heroCanvas) {
                this.elements.push({
                    element: heroCanvas,
                    speed: 0.3
                });
            }

            // Add parallax to profile image
            const profileCircle = document.querySelector('.profile-circle');
            if (profileCircle) {
                this.elements.push({
                    element: profileCircle,
                    speed: -0.1
                });
            }

            this.bindEvents();
        },

        bindEvents() {
            window.addEventListener('scroll', utils.throttle(() => this.update(), 16));
        },

        update() {
            const scrollY = window.pageYOffset;

            this.elements.forEach(({ element, speed }) => {
                const yPos = scrollY * speed;
                element.style.transform = `translateY(${yPos}px)`;
            });
        }
    };

    // ================================
    // CHAPTER INDICATORS
    // ================================

    const chapterIndicators = {
        init() {
            if (utils.isMobile()) return;

            const sections = document.querySelectorAll('.section');

            sections.forEach((section, index) => {
                if (index === 0) return; // Skip hero

                const indicator = document.createElement('div');
                indicator.className = 'chapter-indicator';
                indicator.innerHTML = `
                    <span class="chapter-number">0${index}</span>
                    <span class="chapter-line"></span>
                `;
                section.insertBefore(indicator, section.firstChild);
            });
        }
    };

    // ================================
    // KEYBOARD NAVIGATION
    // ================================

    const keyboardNav = {
        init() {
            document.addEventListener('keydown', (e) => {
                // Arrow up/down to navigate sections
                if (e.key === 'ArrowDown' && e.altKey) {
                    e.preventDefault();
                    this.navigateSection(1);
                } else if (e.key === 'ArrowUp' && e.altKey) {
                    e.preventDefault();
                    this.navigateSection(-1);
                }
            });
        },

        navigateSection(direction) {
            const newIndex = Math.max(0, Math.min(
                CONFIG.sections.length - 1,
                state.currentSection + direction
            ));

            const section = CONFIG.sections[newIndex];
            const element = document.getElementById(section.id);

            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    // ================================
    // INITIALIZE
    // ================================

    function init() {
        console.log('🚀 Journey Animations: Initializing...');

        // Check for reduced motion preference
        if (utils.prefersReducedMotion()) {
            console.log('⚡ Reduced motion detected, minimal animations');
            heroEntrance.init();
            return;
        }

        // Initialize loading screen first
        loadingScreen.init();

        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initComponents);
        } else {
            initComponents();
        }
    }

    function initComponents() {
        // Wait a bit for the loader
        setTimeout(() => {
            try {
                // Core animations
                heroEntrance.init();
                cinematicReveals.init();
                scrollCounters.init();

                // Progress indicator (disabled)
                // journeyProgress.init();

                // Visual enhancements
                floatingParticles.init();
                cursorGlow.init();
                chapterIndicators.init();

                // Interactive features
                magneticHover.init();
                keyboardNav.init();

                // Parallax (subtle)
                parallaxEffects.init();

                console.log('✅ Journey Animations: All components initialized');
            } catch (error) {
                console.error('❌ Journey Animations error:', error);
                // Fallback: s'assurer que tout le contenu est visible
                ensureContentVisible();
            }
        }, CONFIG.loaderDuration + 200);

        // Fallback de sécurité après 5 secondes
        setTimeout(() => {
            ensureContentVisible();
        }, 5000);
    }

    // Fonction de sécurité pour s'assurer que le contenu est visible
    function ensureContentVisible() {
        const hiddenElements = document.querySelectorAll(
            '.domain-card:not(.journey-visible), .project-card:not(.journey-visible), ' +
            '.skill-item:not(.journey-visible), .certification-item:not(.journey-visible), ' +
            '.education-item:not(.journey-visible)'
        );

        hiddenElements.forEach(el => {
            el.classList.add('journey-visible');
        });

        // S'assurer que toutes les sections sont visibles
        document.querySelectorAll('.section').forEach(section => {
            section.classList.add('in-view');
        });
    }

    // ================================
    // CLEANUP
    // ================================

    function destroy() {
        cinematicReveals.destroy();
        floatingParticles.destroy();
        cursorGlow.destroy();
    }

    // ================================
    // PUBLIC API
    // ================================

    window.JourneyAnimations = {
        init,
        destroy,
        state,
        config: CONFIG,
        utils
    };

    // Auto-initialize
    init();

})();
