// Portfolio de Prince Noukounwoui - Organisé par domaines d'expertise
// Lecture dynamique des données depuis cv.json

// Fonction utilitaire pour générer le chemin des logos
function generateLogoPath(organizationName, type = 'company') {
    // Mapping spécifique pour les organisations
    const logoMappings = {
        'JEEDOM': 'jeedom',
        'Université de Rennes 1': 'UniversiteRennes',
        'Université de Rennes': 'UniversiteRennes',
        'Esmer (École Supérieure des Métiers des Énergies Renouvelables)': 'esmer',
        'Université de Franche-Comté': 'universiteMLP',
        'ISTIC Rennes': 'istic',
        'Qotto': 'qotto',
        'Songhaï Centre': 'Logo_Songhaï',
        'Victron Energy': 'Victron',
        'Victron': 'Victron'
    };

    // Vérifier d'abord le mapping direct
    if (logoMappings[organizationName]) {
        return `./assets/logos/${logoMappings[organizationName]}.png`;
    }

    // Sinon, utiliser la méthode de nettoyage standard
    const cleanName = organizationName
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '')
        .replace(/université-de-/g, '')
        .replace(/école-supérieure-des-métiers-des-énergies-renouvelables/g, 'esmer');

    return `./assets/logos/${cleanName}.png`;
}

// Fonction pour créer un élément logo avec fallback
function createLogoElement(organizationName, type = 'company') {
    const logoPath = generateLogoPath(organizationName, type);
    const fallbackIcon = type === 'school' ? 'fas fa-graduation-cap' : 'fas fa-building';

    return `
        <div class="organization-logo">
            <img src="${logoPath}" alt="Logo ${organizationName}"
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
            <div class="organization-icon ${type}" style="display: none;">
                <i class="${fallbackIcon}"></i>
            </div>
        </div>
    `;
}

// Variables globales
let cvData = {};
let DOMAINS = {};
let COMPANY_DOMAINS = {};
let skillIcons = {};

// Fonction pour charger les données depuis cv.json
async function loadCVData() {
    try {
        const response = await fetch('./cv.json');
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();

        // Assigner les données aux variables globales
        cvData = data;
        DOMAINS = data.domains || {};
        COMPANY_DOMAINS = data.company_domains || {};
        skillIcons = data.skill_icons || {};

        console.log('✅ Données chargées avec succès:', Object.keys(cvData));
        return true;
    } catch (error) {
        console.error('❌ Erreur lors du chargement des données:', error);

        // Fallback avec données minimales pour éviter les erreurs
        cvData = {
            nom: "Prince Noukounwoui",
            titre: "Étudiant en Master 2 Ingénierie Durable des Bâtiments Communicants Intelligents",
            localisation: "Rennes, Bretagne, France",
            coordonnees: {
                email: "noukounwouiprince@gmail.com",
                telephone: "0612719903",
                linkedin: "https://www.linkedin.com/in/prince-noukounwoui-ba1978217",
                photo: "./assets/images/profile.jpg"
            },
            resume: "Portfolio en cours de chargement...",
            experiences: [],
            projets: [],
            competences: [],
            formation: [],
            certifications: []
        };
        DOMAINS = {
            'iot': {
                name: 'IoT & Domotique',
                icon: 'fas fa-home',
                color: 'rgba(0, 122, 255, 0.8)',
                description: 'Smart Home, Smart Building, Smart City',
                technologies: ['IoT', 'Domotique', 'Capteurs'],
                theme: 'iot'
            },
            'energy': {
                name: 'Énergie & Photovoltaïque',
                icon: 'fas fa-solar-panel',
                color: 'rgba(255, 204, 0, 0.8)',
                description: 'Systèmes solaires, monitoring énergétique',
                technologies: ['Photovoltaïque', 'Monitoring'],
                theme: 'solar'
            },
            'electricité': {
                name: 'Réseau électrique',
                icon: 'fas fa-cogs',
                color: 'rgba(175, 82, 222, 0.8)',
                description: 'Réseaux électriques, maintenance',
                technologies: ['Électrotechnique', 'Maintenance'],
                theme: 'network'
            }
        };
        COMPANY_DOMAINS = {};
        skillIcons = {};

        console.log('🔄 Données de fallback chargées');
        return false;
    }
}

let currentDomain = 'iot'; // Domaine par défaut

// Données CV intégrées et prêtes

// Fonction pour calculer la durée totale d'expériences (en mois)
function calculateTotalDurationInMonths(experiences) {
    let totalMonths = 0;

    experiences.forEach(exp => {
        const duration = calculateDurationInMonths(exp.periode);
        totalMonths += duration;
    });

    return totalMonths;
}

// Fonction pour calculer la durée d'une expérience en mois
function calculateDurationInMonths(periode) {
    if (!periode) return 0;

    const parts = periode.split(' - ');
    if (parts.length !== 2) return 0;

    const startStr = parts[0].trim();
    const endStr = parts[1].trim();

    // Mapping des mois français
    const monthMap = {
        'janvier': 0, 'février': 1, 'mars': 2, 'avril': 3, 'mai': 4, 'juin': 5,
        'juillet': 6, 'août': 7, 'septembre': 8, 'octobre': 9, 'novembre': 10, 'décembre': 11
    };

    function parseDate(dateStr) {
        if (dateStr.toLowerCase() === 'présent' || dateStr.toLowerCase() === 'aujourd\'hui') {
            return new Date();
        }

        const parts = dateStr.toLowerCase().split(' ');
        if (parts.length >= 2) {
            const month = monthMap[parts[0]];
            const year = parseInt(parts[1]);
            if (month !== undefined && year) {
                return new Date(year, month, 1);
            }
        }
        return null;
    }

    const startDate = parseDate(startStr);
    const endDate = parseDate(endStr);

    if (!startDate || !endDate) return 0;

    const diffInMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 +
                        (endDate.getMonth() - startDate.getMonth());

    return Math.max(0, diffInMonths);
}

// Fonction pour formater une durée en mois vers texte français
function formatDuration(totalMonths) {
    if (totalMonths === 0) return '';
    if (totalMonths < 1) return '< 1 mois';
    if (totalMonths === 1) return '1 mois';
    if (totalMonths < 12) return `${totalMonths} mois`;

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    if (months === 0) {
        return years === 1 ? '1 an' : `${years} ans`;
    } else {
        const yearStr = years === 1 ? '1 an' : `${years} ans`;
        const monthStr = months === 1 ? '1 mois' : `${months} mois`;
        return `${yearStr} ${monthStr}`;
    }
}

// Fonction pour calculer la durée d'une expérience
function calculateDuration(periode) {
    const months = calculateDurationInMonths(periode);
    return formatDuration(months);
}

// Organiser les expériences par domaines
function organizeExperiencesByDomain() {
    if (!cvData?.experiences) return {};

    const domainExperiences = {};

    // Initialiser tous les domaines
    Object.keys(DOMAINS).forEach(domain => {
        domainExperiences[domain] = [];
    });

    // Classer les expériences par domaine
    cvData.experiences.forEach(experience => {
        const domain = COMPANY_DOMAINS[experience.entreprise];
        if (domain && domainExperiences[domain]) {
            domainExperiences[domain].push({
                ...experience,
                domain: domain
            });
        }
    });

    // Expériences organisées par domaine
    return domainExperiences;
}

// Organiser les projets par domaine
function organizeProjectsByDomain() {
    if (!cvData?.projets) return {};

    const domainProjects = {};

    // Initialiser tous les domaines
    Object.keys(DOMAINS).forEach(domain => {
        domainProjects[domain] = [];
    });

    // Classer les projets par domaine (basé sur la propriété domain)
    cvData.projets.forEach(project => {
        // Utiliser la propriété domain du projet si elle existe, sinon iot par défaut
        const assignedDomain = project.domain || 'iot';

        // Vérifier que le domaine existe dans notre configuration
        if (domainProjects[assignedDomain]) {
            domainProjects[assignedDomain].push({
                ...project,
                domain: assignedDomain
            });
        } else {
            // Si le domaine n'existe pas, l'ajouter à iot par défaut
            domainProjects['iot'].push({
                ...project,
                domain: 'iot'
            });
        }
    });

    // Projets organisés par domaine
    return domainProjects;
}

// Chargement du DOM
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🚀 Démarrage du portfolio...');

    try {
        // Charger les données depuis cv.json
        const dataLoaded = await loadCVData();

        if (!dataLoaded) {
            console.warn('⚠️ Données chargées en mode fallback');
        }

        // Vérifier que les données essentielles sont présentes
        if (!cvData || !cvData.nom) {
            throw new Error('Données CV manquantes ou invalides');
        }

        console.log('📊 Initialisation des composants...');

        // Initialiser les composants de base (qui ne dépendent pas des données)
        if (typeof initNavigation === 'function') initNavigation();
        if (typeof initEnhancedNavigation === 'function') initEnhancedNavigation();
        if (typeof initSmoothScroll === 'function') initSmoothScroll();
        if (typeof createScrollIndicator === 'function') createScrollIndicator();
        if (typeof initCustomCursor === 'function') initCustomCursor();

        // Remplir le contenu (dépend des données)
        console.log('📝 Remplissage du contenu...');
        if (typeof populateContent === 'function') {
            populateContent();
        } else {
            console.warn('⚠️ Fonction populateContent non trouvée');
        }

        // Initialiser les fonctionnalités avancées
        console.log('⚙️ Initialisation des fonctionnalités...');
        if (typeof initDomainNavigation === 'function') initDomainNavigation();
        if (typeof initScrollAnimations === 'function') initScrollAnimations();
        if (typeof initSmoothScrolling === 'function') initSmoothScrolling();
        if (typeof initMessaging === 'function') initMessaging();
        if (typeof initCalendlyListeners === 'function') initCalendlyListeners();

        // Initialiser l'arrière-plan IoT après que tout soit chargé
        setTimeout(() => {
            if (typeof initIoTBackground === 'function') {
                initIoTBackground();
            }
        }, 1000);

        // Mettre à jour les effets de survol après le chargement du contenu
        setTimeout(() => {
            if (typeof updateHoverEffects === 'function') {
                updateHoverEffects();
            }
        }, 1500);

        console.log('✅ Portfolio initialisé avec succès');
    } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation du portfolio:', error);
        // Afficher un message d'erreur à l'utilisateur
        document.body.innerHTML = `
            <div style="padding: 20px; text-align: center; color: red;">
                <h2>Erreur de chargement</h2>
                <p>Une erreur s'est produite lors du chargement du portfolio.</p>
                <p>Détails: ${error.message}</p>
            </div>
        `;
    }
});

// Remplir le contenu de la page
function populateContent() {
    // Remplissage du contenu

    // Informations personnelles
    populatePersonalInfo();

    // Organiser les données par domaines
    const domainExperiences = organizeExperiencesByDomain();
    const domainProjects = organizeProjectsByDomain();

    // Remplir les sections
    populateAboutSection();
    populateDomainCards(domainExperiences, domainProjects);
    populateSkillsByDomain();
    populateProjects();
    populateFormation();
    populateCertifications();

    // Contenu rempli avec succès
}

// Remplir les informations personnelles
function populatePersonalInfo() {
    // Titre et nom
    const nomElement = document.getElementById('nom-titre');
    const titreElement = document.getElementById('titre-professionnel');
    const localisationElement = document.getElementById('localisation');

    if (nomElement) nomElement.textContent = cvData.nom;
    if (titreElement) titreElement.textContent = cvData.titre;
    if (localisationElement) localisationElement.textContent = `📍 ${cvData.localisation}`;

    // Photo de profil
    const profilePhoto = document.getElementById('profile-photo');
    if (profilePhoto && cvData.coordonnees?.photo) {
        profilePhoto.src = cvData.coordonnees.photo;
        profilePhoto.alt = cvData.nom;
        profilePhoto.onerror = function() {
            console.warn('⚠️ Photo non trouvée, affichage de l\'icône par défaut');
            this.style.display = 'none';
            const iconElement = this.parentElement.querySelector('i');
            if (iconElement) iconElement.style.display = 'block';
        };
    }

    // Informations de contact
    const emailElement = document.getElementById('email-contact');
    const phoneElement = document.getElementById('telephone-contact');
    const linkedinElement = document.getElementById('linkedin-contact');

    if (emailElement && cvData.coordonnees?.email) {
        emailElement.textContent = cvData.coordonnees.email;
    }

    if (phoneElement && cvData.coordonnees?.telephone) {
        phoneElement.textContent = cvData.coordonnees.telephone;
    }

    if (linkedinElement && cvData.coordonnees?.linkedin) {
        linkedinElement.href = cvData.coordonnees.linkedin;
        linkedinElement.textContent = 'LinkedIn';
    }

    // Démarrer les animations du hero
    initTypewriterEffect();
    animateHeroStats();

    // Informations personnelles remplies
}

// Animation de frappe (typewriter) avec curseur qui suit
function initTypewriterEffect() {
    const specialties = [
        'IoT & Domotique',
        'Smart Buildings',
        'Énergie Renouvelable',
        'Systèmes Électriques',
        'LoRaWAN & ZigBee',
        'Photovoltaïque'
    ];

    const typewriterElement = document.getElementById('typewriter-text');
    const cursorElement = document.querySelector('.cursor');

    if (!typewriterElement) return;

    // Cacher le curseur fixe s'il existe
    if (cursorElement) {
        cursorElement.style.display = 'none';
    }

    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    function updateDisplay() {
        const currentText = specialties[currentTextIndex];
        const displayText = currentText.substring(0, currentCharIndex);

        // Intégrer le curseur directement dans le texte
        if (isPaused) {
            // Curseur clignotant à la fin du texte complet
            typewriterElement.innerHTML = `${displayText}<span class="typing-cursor blink">|</span>`;
        } else {
            // Curseur fixe pendant la frappe/effacement
            typewriterElement.innerHTML = `${displayText}<span class="typing-cursor">|</span>`;
        }
    }

    function type() {
        const currentText = specialties[currentTextIndex];

        if (!isDeleting && currentCharIndex <= currentText.length) {
            // Écriture
            updateDisplay();
            currentCharIndex++;

            if (currentCharIndex > currentText.length) {
                // Fin d'écriture - pause avec curseur clignotant
                isPaused = true;
                updateDisplay();
                setTimeout(() => {
                    isPaused = false;
                    isDeleting = true;
                    type();
                }, 2000); // Pause de 2 secondes
                return;
            }
        } else if (isDeleting && currentCharIndex >= 0) {
            // Suppression
            updateDisplay();
            currentCharIndex--;

            if (currentCharIndex < 0) {
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % specialties.length;
                currentCharIndex = 0;

                // Petite pause avant de commencer le mot suivant
                setTimeout(() => {
                    type();
                }, 500);
                return;
            }
        }

        if (!isPaused) {
            const typingSpeed = isDeleting ? 50 : 120;
            setTimeout(type, typingSpeed);
        }
    }

    // Démarrer l'animation après un délai
    setTimeout(() => {
        type();
    }, 1500);
}

// Animer les statistiques du hero
function animateHeroStats() {
    // Calculer les années d'expérience basées sur le cumul des expériences
    const totalMonths = calculateTotalDurationInMonths(cvData.experiences || []);
    const yearsExperience = Math.ceil(totalMonths / 12); // Arrondi à la valeur supérieure

    const stats = {
        'years-experience': yearsExperience,
        'projects-count': cvData.projets?.length || 0,
        'domains-count': 3 // IoT, Énergie, electricité
    };

    Object.entries(stats).forEach(([id, target]) => {
        const element = document.getElementById(id);
        if (!element) return;

        let current = 0;
        const increment = target / 30; // 30 frames pour l'animation

        const animate = () => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
            } else {
                element.textContent = Math.floor(current);
                requestAnimationFrame(animate);
            }
        };

        // Démarrer avec un délai
        setTimeout(animate, 1500);
    });
}

// Remplir la section À propos
function populateAboutSection() {
    const resumeText = document.getElementById('resume-text');
    if (resumeText && cvData.resume) {
        resumeText.textContent = cvData.resume;
    }

    // Statistiques (calculées automatiquement)
    const stats = calculateStats();
    updateStatsDisplay(stats);

    // Section À propos remplie
}

// Calculer les statistiques
function calculateStats() {
    // Calculer les années d'expérience basées sur le cumul des expériences
    const totalMonths = calculateTotalDurationInMonths(cvData.experiences || []);
    const yearsExperience = Math.ceil(totalMonths / 12); // Arrondi à la valeur supérieure

    return {
        experience: yearsExperience,
        projets: cvData.projets?.length || 0,
        competences: cvData.competences?.length || 0,
        certifications: cvData.certifications?.length || 0
    };
}

// Mettre à jour l'affichage des statistiques avec animation
function updateStatsDisplay(stats) {
    const statsData = [
        stats.experience,
        stats.projets,
        stats.competences,
        stats.certifications
    ];

    // Mettre à jour les targets des éléments animés
    const animatedStats = document.querySelectorAll('.animated-stat');
    animatedStats.forEach((element, index) => {
        if (statsData[index] !== undefined) {
            element.setAttribute('data-target', statsData[index]);
        }
    });

    // Démarrer l'animation des compteurs
    animateCounters();
}

// Animation des compteurs
function animateCounters() {
    const counters = document.querySelectorAll('.animated-stat');

    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateCounter(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Animer un compteur spécifique
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const numberElement = element.querySelector('.stat-number');
    const duration = 2000; // 2 secondes
    const start = 0;
    const increment = target / (duration / 16); // 60 FPS

    let current = start;
    const timer = setInterval(() => {
        current += increment;

        if (current >= target) {
            numberElement.textContent = target;
            clearInterval(timer);

            // Ajouter une animation de pulse à la fin
            element.classList.add('stat-completed');
        } else {
            numberElement.textContent = Math.floor(current);
        }
    }, 16);
}

// Initialiser les animations de scroll
function initScrollAnimations() {
    // Attendre que tous les éléments soient créés
    setTimeout(() => {
        // Observer pour les éléments à animer au scroll
        const elementsToAnimate = document.querySelectorAll('.skills-grid .skill-item, .projects-grid .project-card, .certifications-grid .certification-item, .education-timeline .education-item, .cards-grid .domain-card');

        console.log('🎬 Elements trouvés pour animation:', elementsToAnimate.length);

        if (elementsToAnimate.length === 0) {
            console.log('⚠️ Aucun élément trouvé, réessai dans 500ms...');
            setTimeout(() => initScrollAnimations(), 500);
            return;
        }

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                // Délai progressif pour un effet de cascade
                setTimeout(() => {
                    entry.target.classList.add('slide-in-up', 'animated');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);

    elementsToAnimate.forEach(element => {
        // État initial pour l'animation
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';

        scrollObserver.observe(element);
    });

    // Animation des barres de progression pour les compétences
    const skillBars = document.querySelectorAll('.skill-level');
    skillBars.forEach(bar => {
        scrollObserver.observe(bar.parentElement);
        bar.parentElement.addEventListener('animationstart', () => {
            const level = bar.getAttribute('data-level') || '80';
            setTimeout(() => {
                bar.style.width = level + '%';
            }, 300);
        });
    });

    // Forcer l'initialisation des animations pour les éléments déjà visibles
    setTimeout(() => {
        forceVisibleAnimations();
    }, 100);
    }, 300); // Fermer le setTimeout principal
}

// Forcer les animations pour les éléments déjà visibles
function forceVisibleAnimations() {
    const elementsToCheck = document.querySelectorAll('.skills-grid .skill-item, .projects-grid .project-card, .certifications-grid .certification-item, .education-timeline .education-item, .cards-grid .domain-card');

    elementsToCheck.forEach((element, index) => {
        if (!element.classList.contains('animated')) {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (isVisible) {
                setTimeout(() => {
                    element.classList.add('slide-in-up', 'animated');
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 50);
            }
        }
    });
}

// Remplir les cartes des domaines
function populateDomainCards(domainExperiences, domainProjects) {
    const container = document.querySelector('#experiences .cards-grid');
    if (!container) return;

    container.innerHTML = '';

    Object.entries(DOMAINS).forEach(([domainKey, domain]) => {
        const experiences = domainExperiences[domainKey] || [];
        const projects = domainProjects[domainKey] || [];

        // Calculer la durée totale d'expérience pour ce domaine
        const totalMonths = calculateTotalDurationInMonths(experiences);
        const totalDuration = formatDuration(totalMonths);

        const card = document.createElement('div');
        card.className = 'card domain-card';
        card.dataset.domain = domainKey;

        card.innerHTML = `
            <div class="domain-header">
                <div class="domain-icon">
                    <i class="${domain.icon}"></i>
                </div>
                <div class="domain-info">
                    <h3>${domain.name}</h3>
                    <p>${domain.description}</p>
                </div>
            </div>

            <div class="domain-stats">
                <div class="domain-stat">
                    <span class="stat-number">${experiences.length}</span>
                    <span class="stat-label">Expérience${experiences.length > 1 ? 's' : ''}</span>
                </div>
                <div class="domain-stat">
                    <span class="stat-number">${projects.length}</span>
                    <span class="stat-label">Projet${projects.length > 1 ? 's' : ''}</span>
                </div>
                ${totalDuration ? `
                <div class="domain-stat">
                    <span class="stat-number"><i class="fas fa-clock" style="color: var(--primary-color);"></i></span>
                    <span class="stat-label">${totalDuration}</span>
                </div>` : ''}
            </div>

            <div class="domain-technologies">
                ${(domain.technologies || []).map(tech =>
                    `<span class="tech-tag">${tech}</span>`
                ).join('')}
            </div>

            <div class="domain-actions">
                <button class="btn btn-secondary btn-explore" data-domain="${domainKey}">
                    <i class="fas fa-search"></i>
                    Explorer ce domaine
                </button>
            </div>
        `;

        container.appendChild(card);
    });

    // Cartes des domaines créées
}

// Explorer un domaine spécifique
function exploreDomain(domainKey) {
    if (!domainKey || !DOMAINS[domainKey]) return;

    currentDomain = domainKey;
    const domain = DOMAINS[domainKey];

    // Changer le thème d'arrière-plan
    if (window.changeBackgroundTheme) {
        window.changeBackgroundTheme(domain.theme);
    }

    // Ouvrir le panel du domaine
    openDomainPanel(domainKey);
}

// Ouvrir le panel d'un domaine
function openDomainPanel(domainKey) {
    const domain = DOMAINS[domainKey];
    if (!domain) return;

    const domainExperiences = organizeExperiencesByDomain()[domainKey] || [];
    const domainProjects = organizeProjectsByDomain()[domainKey] || [];

    const panel = document.getElementById('domain-side-panel');
    if (!panel) return;

    // Remplir le contenu du panel
    document.getElementById('panel-domain-icon').className = domain.icon;
    document.getElementById('panel-domain-name').textContent = domain.name;
    document.getElementById('panel-domain-description').textContent = domain.description;

    // Technologies
    const technologiesContainer = document.getElementById('panel-technologies');
    technologiesContainer.innerHTML = (domain.technologies || []).map(tech =>
        `<div class="tech-item">${tech}</div>`
    ).join('');

    // Expériences
    const experiencesContainer = document.getElementById('panel-experiences');
    if (domainExperiences.length > 0) {
        experiencesContainer.innerHTML = domainExperiences.map(exp => {
            const duration = calculateDuration(exp.periode);

            return `
                <div class="panel-experience-item">
                    <div class="panel-item-header">
                        <div>
                            <div class="panel-item-title">${exp.poste}</div>
                            <div class="panel-item-company">
                                ${createLogoElement(exp.entreprise, 'company')}
                                ${exp.entreprise} - ${exp.lieu}
                            </div>
                        </div>
                        <div class="panel-item-period">${duration || exp.periode}</div>
                    </div>
                    <ul class="experience-missions">
                        ${exp.missions.map(mission => `<li>${mission}</li>`).join('')}
                    </ul>
                </div>
            `;
        }).join('');
        document.querySelector('#panel-experiences').parentElement.style.display = 'block';
    } else {
        document.querySelector('#panel-experiences').parentElement.style.display = 'none';
    }

    // Projets
    const projectsContainer = document.getElementById('panel-projects');
    if (domainProjects.length > 0) {
        projectsContainer.innerHTML = domainProjects.map(project => {
            const orgType = project.organisation.toLowerCase().includes('université') ||
                           project.organisation.toLowerCase().includes('école') ||
                           project.organisation.toLowerCase().includes('esmer') ? 'school' : 'company';

            return `
                <div class="panel-project-item">
                    <div class="panel-item-header">
                        <div>
                            <div class="panel-item-title">${project.nom}</div>
                            <div class="panel-item-company">
                                ${project.organisation !== 'Projet personnel' ? createLogoElement(project.organisation, orgType) : ''}
                                ${project.organisation}
                            </div>
                        </div>
                        <div class="panel-item-period">${project.statut}</div>
                    </div>
                    <div class="panel-item-description">${project.description}</div>
                    <div class="panel-skills">
                        ${project.competences.map(skill =>
                            `<span class="panel-skill-tag">${skill}</span>`
                        ).join('')}
                    </div>
                </div>
            `;
        }).join('');
        document.querySelector('#panel-projects').parentElement.style.display = 'block';
    } else {
        document.querySelector('#panel-projects').parentElement.style.display = 'none';
    }

    // Ajouter les événements de fermeture
    const overlay = panel.querySelector('.side-panel-overlay');
    const closeBtn = panel.querySelector('.panel-close');

    // Nettoyer les anciens event listeners
    if (overlay) {
        overlay.removeEventListener('click', closeDomainPanel);
        overlay.addEventListener('click', closeDomainPanel);
    }
    if (closeBtn) {
        closeBtn.removeEventListener('click', closeDomainPanel);
        closeBtn.addEventListener('click', closeDomainPanel);
    }

    // Échapper pour fermer
    const escapeHandler = function(e) {
        if (e.key === 'Escape') {
            closeDomainPanel();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);

    // Afficher le panel
    panel.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Fermer le panel de domaine
function closeDomainPanel() {
    const panel = document.getElementById('domain-side-panel');
    if (panel) {
        panel.classList.remove('active');
    }
    document.body.style.overflow = 'auto';

    // Retour au thème IoT par défaut
    if (window.changeBackgroundTheme) {
        window.changeBackgroundTheme('iot');
    }
}

// Remplir les compétences par domaine
function populateSkillsByDomain() {
    const container = document.querySelector('#competences .skills-grid');
    if (!container || !cvData.competences) return;

    container.innerHTML = '';

    cvData.competences.forEach(skill => {
        const skillElement = document.createElement('div');
        skillElement.className = 'skill-item';

        const icon = skillIcons[skill] || 'fas fa-star';

        skillElement.innerHTML = `
            <i class="${icon}"></i>
            <span>${skill}</span>
        `;

        container.appendChild(skillElement);
    });

    // Compétences remplies
}

// Remplir la formation
function populateFormation() {
    const container = document.getElementById('formation-timeline');
    if (!container || !cvData.formation) return;

    container.innerHTML = '';

    cvData.formation.forEach((formation, index) => {
        const item = document.createElement('div');
        item.className = `timeline-item ${index % 2 === 0 ? 'left' : 'right'}`;

        item.innerHTML = `
            <div class="timeline-content">
                <div class="timeline-header">
                    ${createLogoElement(formation.ecole, 'school')}
                    <div class="formation-info">
                        <div class="timeline-date">${formation.periode}</div>
                        <h3>${formation.diplome}</h3>
                        <h4>${formation.ecole}</h4>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(item);
    });

    // Formation remplie
}

// Fonction pour générer le logo/icône des certifications
function getCertificationLogo(certificationName) {
    // Mapping spécifique pour les certifications
    const certMappings = {
        'Victron Energy': {
            logo: './assets/logos/Victron.png',
            icon: 'fas fa-bolt',
            color: '#0066CC'
        },
        'LoRa': {
            logo: null,
            icon: 'fas fa-broadcast-tower',
            color: '#00A651'
        },
        'LoRaWAN': {
            logo: null,
            icon: 'fas fa-network-wired',
            color: '#00A651'
        },
        'VRM': {
            logo: './assets/logos/Victron.png',
            icon: 'fas fa-chart-line',
            color: '#0066CC'
        }
    };

    // Chercher une correspondance dans le nom du certificat
    for (const [key, config] of Object.entries(certMappings)) {
        if (certificationName.toLowerCase().includes(key.toLowerCase())) {
            return config;
        }
    }

    // Fallback par défaut
    return {
        logo: null,
        icon: 'fas fa-certificate',
        color: '#007AFF'
    };
}

// Créer un élément logo avec fallback pour les certifications
function createCertificationLogo(certificationName) {
    const config = getCertificationLogo(certificationName);

    if (config.logo) {
        return `
            <div class="certification-logo">
                <img src="${config.logo}" alt="Logo ${certificationName}"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                <div class="certification-icon fallback" style="display: none; color: ${config.color};">
                    <i class="${config.icon}"></i>
                </div>
            </div>
        `;
    } else {
        return `
            <div class="certification-icon" style="color: ${config.color};">
                <i class="${config.icon}"></i>
            </div>
        `;
    }
}

// Remplir les certifications avec logos
function populateCertifications() {
    const container = document.getElementById('certifications-grid');
    if (!container || !cvData.certifications) return;

    container.innerHTML = '';

    cvData.certifications.forEach(cert => {
        const certElement = document.createElement('div');
        certElement.className = 'certification-item';

        certElement.innerHTML = `
            <div class="certification-content">
                ${createCertificationLogo(cert)}
                <div class="certification-text">
                    <h4>${cert}</h4>
                </div>
            </div>
        `;

        container.appendChild(certElement);
    });

    // Certifications remplies avec logos
}

// Remplir les projets avec cartes visuelles
function populateProjects() {
    console.log('🎯 POPULATE PROJECTS: Début de la fonction');
    const container = document.getElementById('projets-grid');
    console.log('📦 Container trouvé:', container);
    console.log('📊 cvData.projets:', cvData.projets);
    if (!container || !cvData.projets) {
        console.log('❌ ERREUR: Container ou cvData.projets manquant');
        return;
    }

    container.innerHTML = '';

    cvData.projets.forEach((projet, index) => {
        const projectElement = document.createElement('div');
        projectElement.className = 'project-card';
        projectElement.setAttribute('data-project-id', index);

        // Déterminer la couleur du statut
        const statusClass = projet.statut.toLowerCase() === 'en cours' ? 'status-active' : 'status-completed';
        const statusIcon = projet.statut.toLowerCase() === 'en cours' ? 'fas fa-clock' : 'fas fa-check-circle';

        projectElement.innerHTML = `
            <div class="project-image">
                <img src="${projet.image}" alt="${projet.nom}"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                <div class="project-image-fallback" style="display: none;">
                    <i class="fas fa-project-diagram"></i>
                </div>
                <div class="project-overlay">
                    <div class="project-status ${statusClass}">
                        <i class="${statusIcon}"></i>
                        ${projet.statut}
                    </div>
                    <button class="btn btn-secondary project-preview-btn" data-project-index="${index}">
                        <i class="fas fa-eye"></i>
                        Aperçu
                    </button>
                </div>
            </div>

            <div class="project-content">
                <div class="project-header">
                    <h3 class="project-title">${projet.nom}</h3>
                    <div class="project-type">
                        <i class="fas fa-tag"></i>
                        ${projet.type}
                    </div>
                </div>

                <div class="project-meta">
                    <span class="project-period">
                        <i class="fas fa-calendar"></i>
                        ${projet.periode}
                    </span>
                    <span class="project-organization">
                        <i class="fas fa-building"></i>
                        ${projet.organisation}
                    </span>
                </div>

                <p class="project-description">${projet.description.substring(0, 120)}...</p>

                <div class="project-tags">
                    ${projet.tags ? projet.tags.map(tag =>
                        `<span class="project-tag">${tag}</span>`
                    ).join('') : ''}
                </div>

                <div class="project-actions">
                    ${projet.liens ? Object.entries(projet.liens).map(([key, url]) => {
                        const linkIcons = {
                            'github': 'fab fa-github',
                            'demo': 'fas fa-external-link-alt',
                            'website': 'fas fa-globe',
                            'video': 'fab fa-youtube',
                            'documentation': 'fas fa-book',
                            'portfolio': 'fas fa-briefcase'
                        };
                        const icon = linkIcons[key] || 'fas fa-link';

                        return `
                            <a href="${url}" target="_blank" rel="noopener noreferrer"
                               class="project-action-btn" title="${key}">
                                <i class="${icon}"></i>
                            </a>
                        `;
                    }).join('') : ''}
                </div>
            </div>
        `;

        // Ajouter animation au scroll
        projectElement.style.opacity = '0';
        projectElement.style.transform = 'translateY(30px)';

        container.appendChild(projectElement);

        // Animation d'apparition avec délai
        setTimeout(() => {
            projectElement.style.transition = 'all 0.6s ease';
            projectElement.style.opacity = '1';
            projectElement.style.transform = 'translateY(0)';
        }, index * 150);
    });

    // Ajouter les gestionnaires d'événements pour les boutons de projet (même logique que les domaines)
    setTimeout(() => {

        // Event listeners pour les boutons d'aperçu (SIMPLE comme les domaines)
        document.querySelectorAll('.project-preview-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const index = parseInt(this.dataset.projectIndex);
                if (!isNaN(index)) {
                    const projet = cvData.projets[index];
                    if (projet) {
                        // Créer une modale simple et élégante
                        const modal = document.createElement('div');
                        modal.style.cssText = `
                            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                            background: linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(0, 122, 255, 0.1));
                            backdrop-filter: blur(30px); -webkit-backdrop-filter: blur(30px);
                            z-index: 10000; display: flex; align-items: center; justify-content: center;
                            animation: fadeIn 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                        `;

                        modal.innerHTML = `
                            <div style="
                                background: linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85));
                                backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(40px);
                                border-radius: 28px; padding: 3rem; max-width: 520px; width: 90%;
                                box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3),
                                           0 0 0 1px rgba(255, 255, 255, 0.3),
                                           inset 0 1px 0 rgba(255, 255, 255, 0.8);
                                position: relative; overflow: hidden;
                                animation: slideUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
                                font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Segoe UI', system-ui, sans-serif;
                                border: 2px solid rgba(255, 255, 255, 0.3);
                            ">
                                <!-- Effet de brillance animé -->
                                <div style="
                                    position: absolute; top: 0; left: 0; right: 0; height: 100%;
                                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
                                    background-size: 200% 100%; animation: modalShine 3s infinite;
                                    pointer-events: none;
                                "></div>

                                <button onclick="this.closest('[style*=fixed]').remove()" style="
                                    position: absolute; top: 1.5rem; right: 1.5rem; z-index: 10;
                                    background: linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(240, 240, 240, 0.8));
                                    border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer;
                                    display: flex; align-items: center; justify-content: center;
                                    color: var(--text-light); font-size: 18px; font-weight: 600;
                                    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.7);
                                    animation: float 4s ease-in-out infinite;
                                ">✕</button>

                                <div style="
                                    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                                    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
                                    background-clip: text; margin: 0 0 2rem 0; padding-right: 4rem;
                                ">
                                    <h3 style="
                                        margin: 0; font-size: 1.75rem; font-weight: 700; line-height: 1.2;
                                        text-shadow: 0 2px 10px rgba(0, 122, 255, 0.3);
                                    ">${projet.nom}</h3>
                                </div>

                                <div style="
                                    margin-bottom: 2rem; padding: 1.5rem; border-radius: 20px;
                                    background: linear-gradient(135deg, rgba(0, 122, 255, 0.1), rgba(88, 86, 214, 0.1));
                                    border: 1px solid rgba(0, 122, 255, 0.2);
                                    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5);
                                ">
                                    <p style="
                                        margin: 0 0 0.8rem 0; color: var(--text-dark);
                                        font-size: 1rem; font-weight: 600; display: flex; align-items: center;
                                    "><span style="
                                        display: inline-block; width: 8px; height: 8px; border-radius: 50%;
                                        background: var(--primary-color); margin-right: 0.8rem;
                                        box-shadow: 0 0 10px var(--primary-color);
                                    "></span>Organisation: <span style="font-weight: 500; margin-left: 0.5rem;">${projet.organisation}</span></p>
                                    <p style="
                                        margin: 0; color: var(--text-dark);
                                        font-size: 1rem; font-weight: 600; display: flex; align-items: center;
                                    "><span style="
                                        display: inline-block; width: 8px; height: 8px; border-radius: 50%;
                                        background: var(--accent-color); margin-right: 0.8rem;
                                        box-shadow: 0 0 10px var(--accent-color);
                                    "></span>Période: <span style="font-weight: 500; margin-left: 0.5rem;">${projet.periode}</span></p>
                                </div>

                                <div style="
                                    padding: 1.5rem; border-radius: 20px; position: relative;
                                    background: linear-gradient(145deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.4));
                                    border: 1px solid rgba(255, 255, 255, 0.3);
                                    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8);
                                    margin-bottom: 2rem;
                                ">
                                    <p style="
                                        margin: 0; color: var(--text-dark); line-height: 1.6;
                                        font-size: 1.05rem; font-weight: 400;
                                    ">${projet.description}</p>
                                </div>

                                ${projet.liens ? `
                                    <div style="
                                        padding: 2rem; border-radius: 20px;
                                        background: linear-gradient(145deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5));
                                        border: 1px solid rgba(255, 255, 255, 0.4);
                                        box-shadow: inset 0 2px 0 rgba(255, 255, 255, 0.9),
                                                   0 8px 32px rgba(0, 0, 0, 0.08);
                                        margin-bottom: 1.5rem;
                                    ">
                                        <h4 style="
                                            margin: 0 0 1.5rem 0; color: var(--text-dark);
                                            font-size: 1.2rem; font-weight: 700;
                                        ">🔗 Liens rapides</h4>
                                        <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
                                            ${Object.entries(projet.liens).map(([key, url], index) => url && url.trim() !== '' && url !== '#' ? `
                                                <a href="${url}" target="_blank" style="
                                                    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                                                    color: white; padding: 0.8rem 1.5rem; border-radius: 16px;
                                                    text-decoration: none; display: inline-flex; align-items: center; gap: 0.6rem;
                                                    font-weight: 600; font-size: 0.95rem;
                                                    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                                                    box-shadow: 0 8px 25px rgba(0, 122, 255, 0.3),
                                                               inset 0 1px 0 rgba(255, 255, 255, 0.3);
                                                    animation: slideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s both;
                                                    position: relative; overflow: hidden;
                                                ">
                                                    <span style="font-size: 1.1rem;">🔗</span>
                                                    ${key.charAt(0).toUpperCase() + key.slice(1)}
                                                    <span style="
                                                        position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
                                                        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
                                                        animation: modalShine 2.5s infinite ${index * 0.3}s;
                                                    "></span>
                                                </a>
                                            ` : '').join('')}
                                        </div>
                                    </div>
                                ` : ''}

                            </div>
                        `;

                        // Fermer en cliquant sur l'overlay
                        modal.addEventListener('click', function(e) {
                            if (e.target === modal) modal.remove();
                        });


                        document.body.appendChild(modal);
                    }
                }
            });
        });


        // Event listeners pour les cartes de projet (COPIE EXACTE des domaines)
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', function(e) {
                if (e.target.closest('.project-preview-btn')) return;
                // Pas d'action sur les cartes de projet (contrairement aux domaines)
            });
        });
    }, 200);

    // Projets remplis
}

// Ouvrir aperçu rapide du projet
function openProjectPreview(projectIndex) {
    const projet = cvData.projets[projectIndex];
    if (!projet) return;

    // Créer modal d'aperçu
    const modal = document.createElement('div');
    modal.className = 'project-preview-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="preview-content">
            <button class="modal-close">
                <i class="fas fa-times"></i>
            </button>

            <div class="preview-image">
                <img src="${projet.image}" alt="${projet.nom}"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                <div class="preview-image-fallback" style="display: none;">
                    <i class="fas fa-project-diagram"></i>
                </div>
            </div>

            <div class="preview-info">
                <h3>${projet.nom}</h3>
                <div class="preview-meta">
                    <span><i class="fas fa-calendar"></i> ${projet.periode}</span>
                    <span><i class="fas fa-building"></i> ${projet.organisation}</span>
                </div>
                <p>${projet.description}</p>

                <div class="preview-actions">
                    ${projet.liens ? Object.entries(projet.liens).map(([key, url]) => {
                        // Ignorer les liens vides ou invalides
                        if (!url || url.trim() === '' || url === '#') {
                            return '';
                        }

                        const linkIcons = {
                            'github': 'fab fa-github',
                            'demo': 'fas fa-external-link-alt',
                            'website': 'fas fa-globe',
                            'video': 'fab fa-youtube',
                            'documentation': 'fas fa-book'
                        };
                        const icon = linkIcons[key] || 'fas fa-link';
                        const label = key.charAt(0).toUpperCase() + key.slice(1);

                        return `
                            <a href="${url}" target="_blank" rel="noopener noreferrer" class="preview-btn" onclick="event.stopPropagation();">
                                <i class="${icon}"></i> ${label}
                            </a>
                        `;
                    }).filter(link => link !== '').join('') : ''}
                    <button class="btn btn-secondary preview-details-btn" data-project-index="${projectIndex}">
                        <i class="fas fa-info-circle"></i> Détails complets
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Ajouter événement de clic sur l'overlay
    const overlay = modal.querySelector('.modal-overlay');
    const content = modal.querySelector('.preview-content');
    const closeBtn = modal.querySelector('.modal-close');

    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            e.stopPropagation();
            closeProjectPreview();
        }
    });

    // Bouton de fermeture
    closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        closeProjectPreview();
    });

    // Empêcher la propagation sur le contenu
    content.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Bouton "Détails complets"
    const detailsBtn = modal.querySelector('.preview-details-btn');
    if (detailsBtn) {
        detailsBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const index = parseInt(this.dataset.projectIndex);
            if (!isNaN(index)) {
                openProjectDetails(index);
            }
        });
    }

    // Prévenir le défilement arrière-plan (mobile et desktop)
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';

    // Échapper pour fermer
    const escapeHandler = function(e) {
        if (e.key === 'Escape') {
            closeProjectPreview();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);

    // Animation d'ouverture
    setTimeout(() => modal.classList.add('active'), 10);
}

// Fermer aperçu
function closeProjectPreview() {
    const modal = document.querySelector('.project-preview-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
            // Restaurer le défilement normal
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }, 300);
    }
}

// Ouvrir détails complets du projet
function openProjectDetails(projectIndex) {
    const projet = cvData.projets[projectIndex];
    if (!projet) return;

    // Fermer aperçu si ouvert
    closeProjectPreview();

    // Créer modal de détails complets
    const modal = document.createElement('div');
    modal.className = 'project-details-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="details-content">
            <div class="details-header">
                <div class="details-title">
                    <h2>${projet.nom}</h2>
                    <span class="project-type-badge">${projet.type}</span>
                </div>
                <button class="modal-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div class="details-body">
                <div class="details-main">
                    <div class="details-image">
                        <img src="${projet.image}" alt="${projet.nom}"
                             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                        <div class="details-image-fallback" style="display: none;">
                            <i class="fas fa-project-diagram"></i>
                        </div>
                    </div>

                    <div class="details-info">
                        <div class="details-meta">
                            <div class="meta-item">
                                <i class="fas fa-calendar"></i>
                                <span>Période : ${projet.periode}</span>
                            </div>
                            <div class="meta-item">
                                <i class="fas fa-building"></i>
                                <span>Organisation : ${projet.organisation}</span>
                            </div>
                            <div class="meta-item">
                                <i class="fas fa-flag"></i>
                                <span>Statut : ${projet.statut}</span>
                            </div>
                        </div>

                        <div class="details-description">
                            <h4><i class="fas fa-info-circle"></i> Description</h4>
                            <p>${projet.description}</p>
                        </div>

                        <div class="details-skills">
                            <h4><i class="fas fa-cogs"></i> Compétences utilisées</h4>
                            <div class="skills-grid">
                                ${projet.competences.map(comp =>
                                    `<span class="skill-badge">${comp}</span>`
                                ).join('')}
                            </div>
                        </div>

                        ${projet.tags ? `
                            <div class="details-tags">
                                <h4><i class="fas fa-tags"></i> Technologies</h4>
                                <div class="tags-grid">
                                    ${projet.tags.map(tag =>
                                        `<span class="tech-badge">${tag}</span>`
                                    ).join('')}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                </div>

                ${projet.liens ? `
                    <div class="details-actions">
                        <h4><i class="fas fa-link"></i> Liens du projet</h4>
                        <div class="action-buttons">
                            ${Object.entries(projet.liens).map(([key, url]) => {
                                const linkIcons = {
                                    'github': 'fab fa-github',
                                    'demo': 'fas fa-external-link-alt',
                                    'website': 'fas fa-globe',
                                    'video': 'fab fa-youtube',
                                    'documentation': 'fas fa-book'
                                };
                                const icon = linkIcons[key] || 'fas fa-link';
                                const label = key.charAt(0).toUpperCase() + key.slice(1);

                                return `
                                    <a href="${url}" target="_blank" rel="noopener noreferrer"
                                       class="action-btn primary">
                                        <i class="${icon}"></i> ${label}
                                    </a>
                                `;
                            }).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Ajouter événement de clic sur l'overlay
    const overlay = modal.querySelector('.modal-overlay');
    const content = modal.querySelector('.details-content');
    const closeBtn = modal.querySelector('.modal-close');

    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            e.stopPropagation();
            closeProjectDetails();
        }
    });

    // Bouton de fermeture
    closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        closeProjectDetails();
    });

    // Empêcher la propagation sur le contenu
    content.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Prévenir le défilement arrière-plan (mobile et desktop)
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';

    // Échapper pour fermer
    const escapeHandler = function(e) {
        if (e.key === 'Escape') {
            closeProjectDetails();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);

    // Animation d'ouverture
    setTimeout(() => modal.classList.add('active'), 10);
}

// Fermer détails
function closeProjectDetails() {
    const modal = document.querySelector('.project-details-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
            // Restaurer le défilement normal
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }, 300);
    }
}

// Navigation entre domaines
function initDomainNavigation() {
    // Attendre que les cartes soient créées
    setTimeout(() => {
        // Event listeners pour les boutons "Explorer ce domaine"
        document.querySelectorAll('.btn-explore').forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const domain = this.dataset.domain;
                if (domain) {
                    exploreDomain(domain);
                }
            });
        });

        // Event listeners pour les cartes de domaine
        document.querySelectorAll('.domain-card').forEach(card => {
            card.addEventListener('click', function(e) {
                if (e.target.closest('.btn-explore')) return;
                const domain = this.dataset.domain;
                if (domain) {
                    exploreDomain(domain);
                }
            });
        });
    }, 200);
}

// Système de curseur interactif (conservé de l'ancien script)
let customCursor = null;
let trailInterval = null;
let particleInterval = null;
let cursorPosition = { x: 0, y: 0 };
let isMobile = false;
let isTablet = false;

// Détection du type d'appareil
function detectDevice() {
    const userAgent = navigator.userAgent;
    const screenWidth = window.innerWidth;

    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) || screenWidth < 768;
    isTablet = (screenWidth >= 768 && screenWidth <= 1024) && /iPad|Android/i.test(userAgent);

    console.log('📱 Appareil détecté:', {
        mobile: isMobile,
        tablet: isTablet,
        desktop: !isMobile && !isTablet,
        screenWidth: screenWidth
    });

    return {
        mobile: isMobile,
        tablet: isTablet,
        desktop: !isMobile && !isTablet
    };
}

// Initialisation du curseur personnalisé
function initCustomCursor() {
    const device = detectDevice();

    customCursor = document.getElementById('custom-cursor');
    if (!customCursor) {
        console.error('❌ Élément custom-cursor non trouvé');
        return;
    }

    // Sur mobile et tablette, masquer le curseur personnalisé et activer le feedback tactile
    if (device.mobile || device.tablet) {
        console.log('📱 Appareil tactile détecté - Curseur personnalisé désactivé');
        customCursor.style.display = 'none';

        document.body.style.cursor = 'auto';
        document.querySelectorAll('*').forEach(el => {
            el.style.cursor = '';
        });

        initTouchFeedback();
        return;
    }

    console.log('🎯 Desktop détecté - Curseur personnalisé activé');

    customCursor.style.display = 'block';
    customCursor.style.visibility = 'visible';
    customCursor.style.opacity = '1';
    customCursor.style.zIndex = '999999';

    let isMoving = false;
    let moveTimeout = null;

    // Suivi de la position de la souris
    document.addEventListener('mousemove', (e) => {
        cursorPosition.x = e.clientX;
        cursorPosition.y = e.clientY;

        if (customCursor) {
            customCursor.style.left = e.clientX + 'px';
            customCursor.style.top = e.clientY + 'px';
        }

        if (!isMoving) {
            isMoving = true;
            startCursorEffects();
        }

        clearTimeout(moveTimeout);
        moveTimeout = setTimeout(() => {
            isMoving = false;
            stopCursorEffects();
        }, 150);

        if (window.updateCursorInfluence) {
            window.updateCursorInfluence(e.clientX, e.clientY);
        }
    });

    // Effets de clic
    document.addEventListener('mousedown', () => {
        if (customCursor) {
            customCursor.classList.add('click');
            createClickParticles();
        }
    });

    document.addEventListener('mouseup', () => {
        if (customCursor) {
            customCursor.classList.remove('click');
        }
    });

    updateHoverEffects();
    console.log('🎯 Curseur personnalisé initialisé');
}

// Mise à jour des effets de survol
function updateHoverEffects() {
    const interactiveElements = document.querySelectorAll('a, button, .btn, .card, [onclick], input, textarea, select');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (customCursor) {
                customCursor.classList.add('hover');
            }
        });

        element.addEventListener('mouseleave', () => {
            if (customCursor) {
                customCursor.classList.remove('hover');
            }
        });
    });

    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, li');
    textElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (customCursor && !element.closest('a, button, .btn')) {
                customCursor.classList.add('text');
            }
        });

        element.addEventListener('mouseleave', () => {
            if (customCursor) {
                customCursor.classList.remove('text');
            }
        });
    });
}

// Effets de traînée et particules
function startCursorEffects() {
    if (!trailInterval) {
        trailInterval = setInterval(createTrail, 50);
    }

    if (!particleInterval) {
        particleInterval = setInterval(() => {
            if (Math.random() < 0.3) {
                createCursorParticle();
            }
        }, 200);
    }
}

function stopCursorEffects() {
    if (trailInterval) {
        clearInterval(trailInterval);
        trailInterval = null;
    }

    if (particleInterval) {
        clearInterval(particleInterval);
        particleInterval = null;
    }
}

// Créer une traînée
function createTrail() {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = cursorPosition.x + 'px';
    trail.style.top = cursorPosition.y + 'px';
    document.body.appendChild(trail);

    setTimeout(() => {
        if (trail.parentNode) {
            trail.parentNode.removeChild(trail);
        }
    }, 800);
}

// Créer des particules lors du clic
function createClickParticles() {
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createCursorParticle(true);
        }, i * 20);
    }
}

// Créer une particule flottante
function createCursorParticle(isClick = false) {
    const particle = document.createElement('div');
    particle.className = 'cursor-particle';

    const offsetX = (Math.random() - 0.5) * (isClick ? 40 : 20);
    const offsetY = (Math.random() - 0.5) * (isClick ? 40 : 20);

    particle.style.left = (cursorPosition.x + offsetX) + 'px';
    particle.style.top = (cursorPosition.y + offsetY) + 'px';

    if (isClick) {
        particle.style.background = 'rgba(255, 59, 48, 0.8)';
        particle.style.width = '6px';
        particle.style.height = '6px';
    }

    document.body.appendChild(particle);

    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 2000);
}

// Adapter le curseur au thème actuel
function updateCursorTheme(themeName) {
    if (!customCursor) return;

    const themeColors = {
        'iot': 'rgba(0, 122, 255, 0.8)',
        'solar': 'rgba(255, 204, 0, 0.8)',
        'network': 'rgba(175, 82, 222, 0.8)',
        'electrical': 'rgba(255, 204, 0, 0.8)'
    };

    const color = themeColors[themeName] || themeColors['iot'];
    customCursor.style.background = `radial-gradient(circle, ${color} 0%, ${color.replace('0.8', '0.3')} 70%, transparent 100%)`;
    customCursor.style.boxShadow = `0 0 20px ${color.replace('0.8', '0.4')}`;
}

window.updateCursorTheme = updateCursorTheme;

// Feedback tactile pour appareils mobiles/tablettes
function initTouchFeedback() {
    console.log('👆 Feedback tactile initialisé');

    document.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        if (touch) {
            createTouchRipple(touch.clientX, touch.clientY);
        }
    });

    const interactiveElements = document.querySelectorAll('button, .btn, a[href]');
    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', () => {
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
        });
    });
}

// Créer un effet de ripple au touch
function createTouchRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.style.position = 'fixed';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.background = 'rgba(0, 122, 255, 0.3)';
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '999998';
    ripple.style.animation = 'touchRipple 0.6s ease-out forwards';

    document.body.appendChild(ripple);

    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// Ajouter l'animation CSS pour le ripple
if (!document.querySelector('#touch-ripple-styles')) {
    const style = document.createElement('style');
    style.id = 'touch-ripple-styles';
    style.textContent = `
        @keyframes touchRipple {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Navigation mobile
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');

    if (hamburger && navMenu && overlay) {
        // Toggle menu avec hamburger
        hamburger.addEventListener('click', () => {
            const isActive = hamburger.classList.contains('active');

            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            overlay.classList.toggle('active');

            // Bloquer le scroll quand le menu est ouvert
            document.body.style.overflow = isActive ? 'auto' : 'hidden';
        });

        // Fermer le menu lors du clic sur l'overlay
        overlay.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        // Fermer le menu lors du clic sur un lien
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        // Fermer le menu avec Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Smooth scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animations au scroll
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    document.querySelectorAll('.card, .timeline-item, .skill-item').forEach(el => {
        observer.observe(el);
    });
}


// Fonction pour copier l'email dans le presse-papiers
function copyEmailToClipboard() {
    const email = cvData.coordonnees.email;

    if (navigator.clipboard && window.isSecureContext) {
        // API moderne
        navigator.clipboard.writeText(email).then(() => {
            showNotification(`Email copié : ${email}`, 'success');
        }).catch(err => {
            console.error('Erreur copie:', err);
            fallbackCopyEmail(email);
        });
    } else {
        // Fallback pour les anciens navigateurs
        fallbackCopyEmail(email);
    }
}

function fallbackCopyEmail(email) {
    const textArea = document.createElement('textarea');
    textArea.value = email;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showNotification(`Email copié : ${email}`, 'success');
        } else {
            showNotification(`Email : ${email}`, 'info');
        }
    } catch (err) {
        console.error('Erreur copie fallback:', err);
        showNotification(`Email : ${email}`, 'info');
    } finally {
        document.body.removeChild(textArea);
    }
}

// Système de messagerie
function initMessaging() {
    // Implémentation basique - peut être étendue
    console.log('💬 Système de messagerie initialisé');
}

// Calendly listeners
function initCalendlyListeners() {
    // Calendly integration - conservé de l'ancien script
    console.log('📅 Calendly listeners initialisés');
}

// Notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#30d158' : '#007aff'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Système d'arrière-plan thématique adaptatif (conservé et adapté)
function initIoTBackground() {
    const canvas = document.getElementById('iot-background');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    let mouse = { x: 0, y: 0 };
    let currentTheme = 'iot';

    // Configurations thématiques par expérience
    const themes = {
        'iot': {
            colors: [
                'rgba(0, 122, 255, ',
                'rgba(88, 86, 214, ',
                'rgba(255, 149, 0, ',
                'rgba(48, 209, 88, '
            ],
            particleCount: 1.2,
            connectionRange: 120,
            hasDataFlow: true,
            particleSpeed: 0.5,
            name: 'IoT/Domotique'
        },
        'solar': {
            colors: [
                'rgba(255, 204, 0, ',
                'rgba(255, 149, 0, ',
                'rgba(255, 59, 48, ',
                'rgba(48, 209, 88, '
            ],
            particleCount: 0.8,
            connectionRange: 100,
            hasDataFlow: false,
            particleSpeed: 0.3,
            hasPulse: true,
            name: 'Énergie Solaire'
        },
        'network': {
            colors: [
                'rgba(0, 122, 255, ',
                'rgba(175, 82, 222, ',
                'rgba(255, 45, 85, ',
                'rgba(52, 199, 89, '
            ],
            particleCount: 1.5,
            connectionRange: 150,
            hasDataFlow: true,
            particleSpeed: 0.8,
            gridPattern: true,
            name: 'Réseaux/electricité'
        },
        'electrical': {
            colors: [
                'rgba(255, 204, 0, ',
                'rgba(0, 122, 255, ',
                'rgba(255, 59, 48, ',
                'rgba(52, 199, 89, '
            ],
            particleCount: 1.0,
            connectionRange: 80,
            hasDataFlow: false,
            particleSpeed: 0.4,
            electricField: true,
            name: 'Électrotechnique'
        }
    };

    // Configuration du canvas
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    // Particule thématique adaptative
    class ThematicParticle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * themes[currentTheme].particleSpeed;
            this.vy = (Math.random() - 0.5) * themes[currentTheme].particleSpeed;
            this.radius = Math.random() * 3 + 2;
            this.opacity = Math.random() * 0.5 + 0.3;
            this.pulseSpeed = Math.random() * 0.02 + 0.01;
            this.pulsePhase = Math.random() * Math.PI * 2;
            this.originalRadius = this.radius;

            const themeColors = themes[currentTheme].colors;
            this.color = themeColors[Math.floor(Math.random() * themeColors.length)];
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

            this.x = Math.max(0, Math.min(canvas.width, this.x));
            this.y = Math.max(0, Math.min(canvas.height, this.y));

            this.pulsePhase += this.pulseSpeed;

            if (themes[currentTheme].hasPulse || currentTheme === 'iot') {
                this.currentOpacity = this.opacity + Math.sin(this.pulsePhase) * 0.3;
            } else if (themes[currentTheme].electricField) {
                this.currentOpacity = this.opacity + Math.sin(this.pulsePhase * 2) * 0.4;
                this.radius = this.originalRadius + Math.sin(this.pulsePhase * 3) * 0.5;
            } else {
                this.currentOpacity = this.opacity + Math.sin(this.pulsePhase * 0.5) * 0.2;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color + this.currentOpacity + ')';
            ctx.fill();

            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius + 2, 0, Math.PI * 2);
            ctx.strokeStyle = this.color + (this.currentOpacity * 0.3) + ')';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }

    // Créer les particules selon le thème et l'appareil
    function createParticles() {
        particles = [];
        let baseCount = Math.floor((canvas.width * canvas.height) / 15000);

        const device = detectDevice();
        if (device.mobile) {
            baseCount = Math.floor(baseCount * 0.3);
        } else if (device.tablet) {
            baseCount = Math.floor(baseCount * 0.6);
        }

        const particleCount = Math.floor(baseCount * themes[currentTheme].particleCount);
        console.log(`🎨 Création de ${particleCount} particules (appareil: ${device.mobile ? 'mobile' : device.tablet ? 'tablette' : 'desktop'})`);

        for (let i = 0; i < particleCount; i++) {
            particles.push(new ThematicParticle());
        }
    }

    // Dessiner les connexions selon le thème
    function drawConnections() {
        const maxDistance = themes[currentTheme].connectionRange;
        const connectionColor = themes[currentTheme].colors[0];

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    const opacity = (1 - distance / maxDistance) * 0.2;

                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = connectionColor + opacity + ')';

                    if (currentTheme === 'network') {
                        ctx.lineWidth = 0.8;
                    } else if (currentTheme === 'electrical') {
                        ctx.lineWidth = 1.2;
                    } else {
                        ctx.lineWidth = 0.5;
                    }

                    ctx.stroke();

                    if (themes[currentTheme].hasDataFlow && distance < 80 && Math.random() < 0.01) {
                        const t = Math.random();
                        const dataX = particles[i].x + dx * t;
                        const dataY = particles[i].y + dy * t;

                        ctx.beginPath();
                        ctx.arc(dataX, dataY, 1, 0, Math.PI * 2);

                        if (currentTheme === 'network') {
                            ctx.fillStyle = `rgba(255, 45, 85, ${opacity * 3})`;
                        } else {
                            ctx.fillStyle = `rgba(255, 149, 0, ${opacity * 3})`;
                        }

                        ctx.fill();
                    }
                }
            }
        }
    }

    // Interaction souris renforcée
    function handleMouseInteraction() {
        particles.forEach(particle => {
            const dx = mouse.x - particle.x;
            const dy = mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            const influenceRadius = 150;

            if (distance < influenceRadius) {
                const force = (influenceRadius - distance) / influenceRadius;

                if (distance > 30) {
                    const attractionForce = force * 0.02;
                    particle.vx += (dx / distance) * attractionForce;
                    particle.vy += (dy / distance) * attractionForce;
                }

                particle.radius = Math.max(2, particle.originalRadius + force * 3);
                particle.currentOpacity = Math.min(1, particle.currentOpacity + force * 0.4);
                particle.pulseSpeed = Math.max(0.01, particle.pulseSpeed + force * 0.03);
            } else {
                particle.radius = Math.max(2, particle.radius - 0.05);
                particle.pulseSpeed = Math.max(0.01, particle.pulseSpeed - 0.001);
                particle.vx *= 0.99;
                particle.vy *= 0.99;
            }
        });
    }

    // Fonction d'influence du curseur
    function updateCursorInfluence(x, y) {
        mouse.x = x;
        mouse.y = y;

        if (Math.random() < 0.1) {
            createTemporaryCursorParticle(x, y);
        }
    }

    // Créer une particule temporaire liée au curseur
    function createTemporaryCursorParticle(x, y) {
        const tempParticle = {
            x: x + (Math.random() - 0.5) * 60,
            y: y + (Math.random() - 0.5) * 60,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            radius: Math.random() * 2 + 1,
            opacity: 0.8,
            life: 1,
            decay: 0.02,
            color: themes[currentTheme].colors[Math.floor(Math.random() * themes[currentTheme].colors.length)],

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.life -= this.decay;
                this.opacity = Math.max(0, this.life * 0.8);

                if (this.life <= 0) {
                    const index = particles.indexOf(this);
                    if (index > -1) {
                        particles.splice(index, 1);
                    }
                }
            },

            draw() {
                if (this.life > 0) {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                    ctx.fillStyle = this.color + this.opacity + ')';
                    ctx.fill();
                }
            }
        };

        particles.push(tempParticle);
    }

    // Boucle d'animation
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        drawConnections();
        handleMouseInteraction();

        animationId = requestAnimationFrame(animate);
    }

    // Gestion de la souris
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    // Gestion du redimensionnement avec debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resizeCanvas();
            createParticles();
            console.log('📱 Canvas redimensionné:', canvas.width + 'x' + canvas.height);
        }, 250);
    });

    // Initialisation
    resizeCanvas();
    createParticles();
    animate();

    // Fonction pour changer de thème
    function changeTheme(newTheme) {
        if (themes[newTheme] && newTheme !== currentTheme) {
            currentTheme = newTheme;
            createParticles();

            if (window.updateCursorTheme) {
                window.updateCursorTheme(newTheme);
            }

            console.log(`Thème changé: ${themes[currentTheme].name}`);
            showNotification(`🎨 Thème: ${themes[currentTheme].name}`, 'info');
        }
    }

    // Exposer les fonctions pour interaction externe
    window.changeBackgroundTheme = changeTheme;
    window.updateCursorInfluence = updateCursorInfluence;
    window.backgroundSystemReady = true;
    console.log('🎨 Système d\'arrière-plan thématique et interactif initialisé');

    // Nettoyage lors de la destruction
    return () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    };
}

// Fonctions de test et debug
window.testTheme = function(theme) {
    console.log(`🧪 Test du thème: ${theme}`);
    if (window.changeBackgroundTheme) {
        window.changeBackgroundTheme(theme);
        console.log(`✅ Thème ${theme} appliqué`);
    } else {
        console.error('❌ Fonction changeBackgroundTheme non disponible');
    }
};

window.showAvailableThemes = function() {
    console.log('🎨 Thèmes disponibles:');
    console.log('- iot (IoT/Domotique)');
    console.log('- solar (Énergie Solaire)');
    console.log('- network (Réseaux/electricité)');
    console.log('- electrical (Électrotechnique)');
    console.log('Usage: testTheme("solar")');
};

window.debugPortfolio = function() {
    console.log('🔍 Debug Portfolio:');
    console.log('- CV Data:', cvData);
    console.log('- Domaines:', DOMAINS);
    console.log('- Domaine actuel:', currentDomain);
    console.log('- Viewport:', {
        width: window.innerWidth,
        height: window.innerHeight
    });
};

// ========================= CONFIGURATION CALENDLY =========================

// Configuration Calendly
const CALENDLY_CONFIG = {
    url: 'https://calendly.com/noukounwouiprince/30min',
    // Options de personnalisation Calendly
    options: {
        hideEventTypeDetails: false,
        hideLandingPageDetails: false,
        primaryColor: '007AFF',
        textColor: '1D1D1F'
    }
};

// Variables de réservation
let selectedSlot = null;
let bookingData = {};
let currentMonth = new Date();

// Règles de disponibilité
const AVAILABILITY_RULES = {
    weekdaysOnly: true, // Pas de weekend
    startHour: 9,       // À partir de 9h
    endHour: 18,        // Jusqu'à 18h
    slotDuration: 30,   // Créneaux de 30 minutes
    excludedDates: [],  // Dates à exclure
    workingDays: [1, 2, 3, 4, 5], // Lun-Ven (0=Dimanche, 1=Lundi, etc.)
    // Plages de disponibilité par défaut
    timeSlots: [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
    ]
};

// Cache pour les événements
const eventsCache = {
    data: null,
    lastFetch: null,
    cacheDuration: 5 * 60 * 1000 // 5 minutes
};

// ========================= FONCTIONS DE CONTACT =========================

// Fonctions de contact
function contactViaLinkedIn() {
    const linkedinUrl = cvData.coordonnees.linkedin;
    const message = encodeURIComponent("Bonjour Prince, je vous contacte suite à la consultation de votre portfolio.");

    // Ouvrir LinkedIn avec un message pré-rempli (si possible)
    window.open(linkedinUrl, '_blank');

    showNotification('Redirection vers LinkedIn pour vous connecter', 'info');
}

function contactViaEmail() {
    const email = cvData.coordonnees.email;
    const subject = encodeURIComponent("Contact depuis votre portfolio");
    const body = encodeURIComponent(`Bonjour Prince,

Je vous contacte suite à la consultation de votre portfolio en ligne.

[Votre message ici]

Cordialement,`);

    const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;

    showNotification('Application mail ouverte', 'success');
}

function contactViaSMS() {
    const telephone = cvData.coordonnees.telephone;
    const message = encodeURIComponent("Bonjour Prince, je vous contacte suite à votre portfolio.");

    // Créer un lien SMS
    const smsUrl = `sms:${telephone}?body=${message}`;
    window.location.href = smsUrl;

    showNotification('Application SMS ouverte', 'success');
}

// Fonction pour WhatsApp (alternative au SMS)
function contactViaWhatsApp() {
    const telephone = cvData.coordonnees.telephone;
    const message = encodeURIComponent("Bonjour Prince, je vous contacte suite à votre portfolio.");

    // Formater le numéro pour WhatsApp (supprimer le 0 initial et ajouter +33)
    const whatsappNumber = `33${telephone.substring(1)}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    window.open(whatsappUrl, '_blank');
    showNotification('Redirection vers WhatsApp', 'info');
}

// Ouvrir le widget Calendly
function openCalendlyWidget() {
    // Vérifier que Calendly est chargé
    if (typeof Calendly !== 'undefined') {
        Calendly.initPopupWidget({
            url: CALENDLY_CONFIG.url,
            ...CALENDLY_CONFIG.options
        });
    } else {
        // Fallback si Calendly n'est pas chargé
        console.error('Calendly widget not loaded');
        showNotification('Erreur de chargement. Redirection vers Calendly...', 'warning');
        window.open(CALENDLY_CONFIG.url, '_blank');
    }
}

// Fonction legacy maintenue pour compatibilité
async function openPhoneBooking() {
    // Rediriger vers Calendly maintenant
    openCalendlyWidget();
}

function closePhoneBooking() {
    const modal = document.getElementById('phone-booking-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function closeCalendly() {
    const modal = document.getElementById('calendly-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function resetBookingForm() {
    selectedSlot = null;
    bookingData = {};

    // Afficher l'étape 1 et masquer les autres
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const step3 = document.getElementById('step-3');
    const step4 = document.getElementById('step-4');

    if (step1) step1.classList.remove('hidden');
    if (step2) step2.classList.add('hidden');
    if (step3) step3.classList.add('hidden');
    if (step4) step4.classList.add('hidden');
}

// Fonction pour s'assurer que toutes les animations sont actives
function ensureAnimationsWork() {
    // Réinitialiser les animations lors du redimensionnement
    window.addEventListener('resize', () => {
        setTimeout(forceVisibleAnimations, 100);
    });

    // Marquer que les animations sont initialisées
    setTimeout(() => {
        if (!window.animationsInitialized) {
            // Initialiser les animations de scroll
            initScrollAnimations();
            forceVisibleAnimations();
            window.animationsInitialized = true;
        }
    }, 500);

    // Vérifier périodiquement si les animations fonctionnent
    setInterval(() => {
        if (typeof forceVisibleAnimations === 'function') {
            const elementsCount = document.querySelectorAll('.skills-grid .skill-item, .projects-grid .project-card, .certifications-grid .certification-item, .education-timeline .education-item, .cards-grid .domain-card').length;
            if (elementsCount > 0) {
                forceVisibleAnimations();
            } else {
                // Si aucun élément n'est trouvé, réessayer d'initialiser les animations
                initScrollAnimations();
            }
        }
    }, 2000);
}

// Fonction de debug pour les animations
function debugAnimations() {
    console.log('🔍 DEBUG ANIMATIONS:');
    console.log('Skills:', document.querySelectorAll('.skills-grid .skill-item').length);
    console.log('Projects:', document.querySelectorAll('.projects-grid .project-card').length);
    console.log('Certifications:', document.querySelectorAll('.certifications-grid .certification-item').length);
    console.log('Education:', document.querySelectorAll('.education-timeline .education-item').length);
    console.log('Domain cards:', document.querySelectorAll('.cards-grid .domain-card').length);

    // Vérifier tous les sélecteurs possibles
    console.log('Tous skill-item:', document.querySelectorAll('.skill-item').length);
    console.log('Tous project-card:', document.querySelectorAll('.project-card').length);
    console.log('Tous certification-item:', document.querySelectorAll('.certification-item').length);
    console.log('Tous education-item:', document.querySelectorAll('.education-item').length);
    console.log('Tous timeline-item:', document.querySelectorAll('.timeline-item').length);
    console.log('Tous domain-card:', document.querySelectorAll('.domain-card').length);

    console.log('Total elements:', document.querySelectorAll('.skills-grid .skill-item, .projects-grid .project-card, .certifications-grid .certification-item, .education-timeline .education-item, .cards-grid .domain-card').length);

    // Lister tous les éléments avec les classes card
    const allCards = document.querySelectorAll('[class*="card"], [class*="item"]');
    console.log('Tous les éléments avec "card" ou "item":', allCards.length);
    allCards.forEach((el, i) => {
        if (i < 20) console.log(`Element ${i}:`, el.className, el.tagName);
    });
}

// Démarrer après chargement complet
window.addEventListener('load', ensureAnimationsWork);

// Debug après chargement
window.addEventListener('load', () => {
    // Gérer les erreurs d'images pour éviter qu'elles interfèrent avec les animations
    handleImageErrors();

    setTimeout(debugAnimations, 1000);
    setTimeout(initUniversalScrollAnimations, 1500);

    // Animation de secours au cas où
    setTimeout(() => {
        if (!window.animationsStarted) {
            console.log('🔄 Démarrage animation de secours...');
            emergencyAnimationFallback();
        }
    }, 3000);
});

// Gérer les erreurs d'images
function handleImageErrors() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.log('⚠️ Image manquante:', this.src);
            // Remplacer par une image placeholder
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xMzUgODBIMTY1VjEyMEgxMzVWODBaIiBmaWxsPSIjRDREREREIi8+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjEwMCIgcj0iMTAiIGZpbGw9IiNBQUFBQUEiLz4KPC9zdmc+';
            this.alt = 'Image placeholder';
        });
    });
}

// Système d'animation universel et robuste
function initUniversalScrollAnimations() {
    console.log('🚀 Initialisation animations universelles...');

    // Sélecteurs multiples pour capturer tous les éléments possibles
    const selectors = [
        '.skill-item',
        '.project-card',
        '.certification-item',
        '.education-item',
        '.timeline-item',
        '.domain-card',
        '.card',
        '.stat-item'
    ];

    let allElements = [];
    selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            if (!allElements.includes(el)) {
                allElements.push(el);
            }
        });
    });

    console.log('🎯 Éléments trouvés pour animation universelle:', allElements.length);

    if (allElements.length === 0) {
        console.log('⚠️ Aucun élément trouvé, réessai dans 1s...');
        setTimeout(initUniversalScrollAnimations, 1000);
        return;
    }

    // Configuration de l'observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const universalObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                console.log('🎬 Animation d\'un élément:', entry.target.className);

                // Marquer comme animé
                entry.target.setAttribute('data-animated', 'true');

                // Appliquer l'animation avec délai
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.transition = 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
                    entry.target.classList.add('animated-in');
                }, index * 100);
            }
        });
    }, observerOptions);

    // Appliquer l'état initial et observer chaque élément
    allElements.forEach((element, index) => {
        // État initial
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';

        // Observer l'élément
        universalObserver.observe(element);
    });

    console.log('✅ Animation universelle initialisée sur', allElements.length, 'éléments');
    window.animationsStarted = true;

    // Forcer l'animation des éléments déjà visibles
    setTimeout(() => {
        forceAnimationForVisibleElements(allElements);
    }, 200);
}

// Forcer l'animation des éléments déjà visibles
function forceAnimationForVisibleElements(elements) {
    elements.forEach((element, index) => {
        if (!element.hasAttribute('data-animated')) {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (isVisible) {
                console.log('🎬 Animation forcée pour élément visible:', element.className);
                element.setAttribute('data-animated', 'true');

                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                    element.classList.add('animated-in');
                }, index * 50);
            }
        }
    });
}

// Fonction de test des animations (à appeler depuis la console)
function testAnimations() {
    console.log('🧪 TEST DES ANIMATIONS');
    initUniversalScrollAnimations();
}

// Fonction pour réinitialiser toutes les animations
function resetAllAnimations() {
    console.log('🔄 RESET ANIMATIONS');
    const allElements = document.querySelectorAll('.skill-item, .project-card, .certification-item, .education-item, .timeline-item, .domain-card, .card');
    allElements.forEach(el => {
        el.removeAttribute('data-animated');
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.classList.remove('animated-in');
    });
    setTimeout(initUniversalScrollAnimations, 100);
}

// Animation de secours simple
function emergencyAnimationFallback() {
    console.log('🆘 ANIMATION DE SECOURS ACTIVÉE');
    const allElements = document.querySelectorAll('.skill-item, .project-card, .certification-item, .education-item, .timeline-item, .domain-card, .card, [class*="item"], [class*="card"]');

    console.log('🔧 Éléments trouvés pour animation de secours:', allElements.length);

    allElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.style.transition = 'all 0.6s ease-out';
            element.setAttribute('data-animated', 'true');
            console.log('🎬 Animation de secours appliquée à:', element.className);
        }, index * 100);
    });

    window.animationsStarted = true;
}

// Rendre les fonctions accessibles globalement pour le debug
window.testAnimations = testAnimations;
window.resetAllAnimations = resetAllAnimations;
window.debugAnimations = debugAnimations;
window.emergencyAnimationFallback = emergencyAnimationFallback;

// Fonction pour confirmer une réservation
function confirmBooking() {
    showNotification('Demande de rendez-vous enregistrée ! Vous recevrez une confirmation par email.', 'success');

    // Simuler l'envoi d'email
    const emailData = {
        to: cvData.coordonnees.email,
        subject: 'Nouvelle demande de rendez-vous',
        body: `Nouvelle demande de rendez-vous pour le ${selectedSlot?.date} à ${selectedSlot?.time}`
    };

    console.log('Email envoyé:', emailData);

    // Afficher l'étape de confirmation
    const step3 = document.getElementById('step-3');
    const step4 = document.getElementById('step-4');
    if (step3) step3.classList.add('hidden');
    if (step4) step4.classList.remove('hidden');
}

// Ajouter l'événement au calendrier
function addToCalendar() {
    if (!selectedSlot) {
        showNotification('Aucun créneau sélectionné', 'error');
        return;
    }

    const startDate = new Date(`${selectedSlot.date} ${selectedSlot.time}`);
    const endDate = new Date(startDate.getTime() + (30 * 60 * 1000)); // 30 minutes plus tard

    const event = {
        title: 'Rendez-vous avec Prince Noukounwoui',
        start: startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
        end: endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
        description: 'Échange téléphonique sur les projets IoT et smart buildings'
    };

    const calendarUrl = `data:text/calendar;charset=utf8,BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${event.start}
DTEND:${event.end}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
END:VEVENT
END:VCALENDAR`;

    const link = document.createElement('a');
    link.href = calendarUrl;
    link.download = 'rendez-vous.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotification('Événement téléchargé ! Ajoutez-le à votre calendrier.', 'success');
}

function openInbox(type) {
    // Fonction placeholder pour l'inbox
    switch(type) {
        case 'linkedin':
            contactViaLinkedIn();
            break;
        case 'chat':
            alert('Chat en direct bientôt disponible. Utilisez l\'email pour le moment.');
            break;
        default:
            contactViaEmail();
    }
}

function downloadCV() {
    // Pour l'instant, on redirige vers un lien de téléchargement
    // Vous pouvez remplacer par l'URL de votre CV PDF
    alert('CV PDF en cours de génération. Contactez-moi pour obtenir la version la plus récente !');
}

// ========================= NAVIGATION AMÉLIORÉE =========================

// Navigation sticky et indicateur de scroll
function initEnhancedNavigation() {
    const navbar = document.querySelector('.navbar');
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    navbar.appendChild(scrollProgress);

    // Variables pour le throttling
    let isScrolling = false;

    function updateNavigation() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / documentHeight) * 100;

        // Navigation sticky
        if (scrollTop > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }

        // Mettre à jour la barre de progression
        scrollProgress.style.width = `${Math.min(scrollPercent, 100)}%`;

        // Navigation active section
        updateActiveSection();
    }

    // Throttled scroll handler
    function handleScroll() {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                updateNavigation();
                isScrolling = false;
            });
            isScrolling = true;
        }
    }

    // Écouter le scroll
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initialiser
    updateNavigation();
}

// Mettre à jour la section active dans le menu
function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';
    const scrollPos = window.pageYOffset + 200; // Offset pour la détection

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    // Mettre à jour les liens actifs
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Smooth scroll amélioré pour les ancres
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Ignorer les clics venant des modales de projet
            if (this.closest('.project-preview-modal, .project-details-modal')) {
                return;
            }

            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Indicateur de scroll vertical (optionnel)
function createScrollIndicator() {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator-vertical';
    scrollIndicator.innerHTML = `
        <div class="scroll-line"></div>
        <div class="scroll-thumb"></div>
    `;
    document.body.appendChild(scrollIndicator);

    function updateScrollIndicator() {
        const scrollTop = window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / documentHeight) * 100;

        const thumb = scrollIndicator.querySelector('.scroll-thumb');
        thumb.style.top = `${Math.min(scrollPercent, 100)}%`;
    }

    window.addEventListener('scroll', updateScrollIndicator, { passive: true });
    updateScrollIndicator();
}

// Exposer les fonctions principales
window.exploreDomain = exploreDomain;
window.closeDomainPanel = closeDomainPanel;
window.openProjectPreview = openProjectPreview;
window.closeProjectPreview = closeProjectPreview;
window.openProjectDetails = openProjectDetails;
window.closeProjectDetails = closeProjectDetails;
window.contactViaEmail = contactViaEmail;
window.contactViaLinkedIn = contactViaLinkedIn;
window.contactViaSMS = contactViaSMS;
window.contactViaWhatsApp = contactViaWhatsApp;
window.openCalendlyWidget = openCalendlyWidget;
window.openPhoneBooking = openPhoneBooking;
window.closePhoneBooking = closePhoneBooking;
window.closeCalendly = closeCalendly;
window.confirmBooking = confirmBooking;
window.addToCalendar = addToCalendar;
window.resetBookingForm = resetBookingForm;
window.openInbox = openInbox;
window.downloadCV = downloadCV;
window.copyEmailToClipboard = copyEmailToClipboard;
window.debugPortfolio = debugPortfolio;