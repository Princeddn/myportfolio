// Données CV intégrées directement
const cvData = {
    "nom": "Prince Noukounwoui",
    "localisation": "Rennes, Bretagne, France",
    "titre": "Étudiant en Master 2 Ingénierie Durable des Bâtiments Communicants Intelligents (ISTIC Rennes)",
    "coordonnees": {
        "telephone": "0612719903",
        "email": "noukounwouiprince@gmail.com",
        "linkedin": "https://www.linkedin.com/in/prince-noukounwoui-ba1978217"
    },
    "resume": "Actuellement en alternance chez JEEDOM, je travaille sur l'intégration de solutions Smarthome, Smartbuilding et Smartcity, en mettant l'accent sur les technologies Zigbee et LoRaWAN. Mes tâches incluent le choix et les tests de produits, la création de dashboards énergétiques, ainsi que le support d'installations GTB. Mes expériences précédentes, notamment chez Qotto et Golf Business Company, m'ont permis de développer des compétences solides en maintenance photovoltaïque, analyse de données IoT et optimisation des infrastructures électriques.",
    "competences": [
        "JavaScript",
        "Python",
        "ZigBee",
        "LoRa",
        "LoRaWAN",
        "GTB/GTC",
        "Analyse de données IoT",
        "Maintenance photovoltaïque",
        "Électrotechnique",
        "QGIS / ArcGIS"
    ],
    "certifications": [
        "Certificat Solutions Victron Energy pour les télécoms",
        "LoRa et LoRaWAN pour l'Internet des Objets",
        "Analyse et dépannage à distance par VRM"
    ],
    "experiences": [
        {
            "entreprise": "JEEDOM",
            "poste": "Alternant intégrateur smarthome, smartbuilding et smartcity",
            "periode": "Septembre 2025 - Présent",
            "lieu": "Lyon, France",
            "missions": [
                "Choix et tests des produits (Zigbee & LoRaWAN)",
                "Intégration des décodeurs",
                "Appairage et réalisation de coffrets domotiques",
                "Création de dashboards énergétiques et widgets",
                "Suivi et support d'installations GTB",
                "Prise en main du KNX sur Jeedom"
            ],
            "details": {
                "technologies": ["Zigbee", "LoRaWAN", "KNX", "JavaScript", "PHP", "MySQL", "Docker"],
                "realisations": [
                    "Déployement de plus de 50 capteurs IoT dans différents bâtiments",
                    "Création de dashboards énergétiques permettant une économie de 15% sur la consommation",
                    "Formation de 12 techniciens sur les protocoles Zigbee et LoRaWAN",
                    "Développement de widgets personnalisés pour l'interface Jeedom"
                ],
                "defis": [
                    "Intégration de protocoles différents dans un seul écosystème",
                    "Optimisation des performances des réseaux sans fil en environnement urbain",
                    "Création d'interfaces utilisateur intuitives pour des non-techniciens"
                ],
                "environnement": "Équipe de 8 personnes, méthodologie Agile, environnement Linux",
                "impact": "Amélioration de l'efficacité énergétique de 15% sur les installations déployées"
            }
        },
        {
            "entreprise": "JEEDOM",
            "poste": "Stagiaire en intégration smarthome, smartbuilding et smartcity",
            "periode": "Mai 2025 - Août 2025",
            "lieu": "Lyon, France",
            "missions": [
                "Choix et tests des produits (Zigbee & LoRaWAN)",
                "Intégration des décodeurs",
                "Appairage et réalisation de coffrets domotiques",
                "Création de dashboards énergétiques et widgets",
                "Suivi et support d'installations GTB",
                "Prise en main du KNX sur Jeedom"
            ],
            "details": {
                "technologies": ["Zigbee", "LoRaWAN", "KNX", "JavaScript", "HTML5", "CSS3"],
                "realisations": [
                    "Mise en place d'un réseau LoRaWAN de 25 capteurs sur un campus universitaire",
                    "Développement d'un dashboard temps réel pour le monitoring énergétique",
                    "Documentation technique complète des protocoles d'intégration",
                    "Tests de portée et d'interférences sur 3 protocoles sans fil"
                ],
                "defis": [
                    "Apprentissage rapide des protocoles IoT industriels",
                    "Adaptation aux contraintes techniques des bâtiments existants",
                    "Optimisation de la consommation des capteurs autonomes"
                ],
                "environnement": "Stage en équipe R&D, encadrement par des experts IoT",
                "impact": "Bases techniques solides qui ont permis la conversion en alternance"
            }
        },
        {
            "entreprise": "Qotto",
            "poste": "Stagiaire Analyste Junior – Maintenance et Intervention Photovoltaïque",
            "periode": "Avril 2023 - Août 2023",
            "lieu": "Cotonou, Bénin",
            "missions": [
                "Surveillance à distance des kits solaires via plateforme IoT",
                "Maintenance préventive et curative à distance",
                "Analyse des données de production et de charge",
                "Coordination des interventions terrain via Google Sheets"
            ],
            "details": {
                "technologies": ["Python", "Google Sheets API", "MQTT", "InfluxDB", "Grafana", "ThingSpeak"],
                "realisations": [
                    "Monitoring de 200+ installations solaires en temps réel",
                    "Réduction de 30% du temps de diagnostic grâce à l'analyse automatisée",
                    "Création d'alertes automatiques pour 15 types de pannes",
                    "Développement d'un tableau de bord de performance énergétique"
                ],
                "defis": [
                    "Gestion des connexions intermittentes en zone rurale",
                    "Diagnostic à distance sans accès physique aux installations",
                    "Formation des techniciens locaux aux outils numériques"
                ],
                "environnement": "Start-up, équipe internationale, travail en autonomie",
                "impact": "30% d'amélioration de l'efficacité de maintenance, 200+ foyers alimentés"
            }
        },
        {
            "entreprise": "Golf Business Company",
            "poste": "Chargé d'Études en Infrastructures Électriques",
            "periode": "Juillet 2022 - Mars 2023",
            "lieu": "Cotonou, Bénin",
            "missions": [
                "Cartographie réseaux électriques et traitement de données GPS (QGIS, ArcGIS)",
                "Plans géoréférencés pour optimisation d'infrastructures",
                "Rapports techniques (sécurité, coûts, faisabilité)",
                "Contribution à l'électrification rurale"
            ]
        },
        {
            "entreprise": "ASEMI SA",
            "poste": "Technicien Électrotechnicien – Réseaux Basse Tension",
            "periode": "Avril 2022 - Juin 2022",
            "lieu": "Cotonou, Bénin",
            "missions": [
                "Construction et déploiement de réseaux BT souterrains",
                "Maintenance postes HT/BT",
                "Analyse de performances et supervision"
            ]
        },
        {
            "entreprise": "Songhaï Centre",
            "poste": "Technicien Électrotechnique",
            "periode": "Août 2021 - Septembre 2021",
            "lieu": "Porto-Novo, Bénin",
            "missions": [
                "Rebobinage de moteurs AC triphasés",
                "Installation et entretien d'équipements électrotechniques",
                "Mise en place de procédures de test et diagnostic"
            ]
        }
    ],
    "formation": [
        {
            "ecole": "Université de Rennes 1",
            "diplome": "Master Ingénierie Durable des Bâtiments Communicants Intelligents",
            "periode": "Septembre 2024 - Juin 2026"
        },
        {
            "ecole": "Université de Franche-Comté",
            "diplome": "Licence Ingénierie électrique et énergie",
            "periode": "Septembre 2023 - Juin 2024"
        },
        {
            "ecole": "Esmer (École Supérieure des Métiers des Énergies Renouvelables)",
            "diplome": "Licence professionnelle Génie électrique et énergie renouvelable",
            "periode": "Novembre 2020 - Juin 2022"
        }
    ],
    "projets": [
        {
            "nom": "LoRaWAN Plug and Play",
            "periode": "Novembre 2024 - Aujourd'hui",
            "organisation": "Université de Rennes",
            "description": "Développement d'une bibliothèque Python pour décoder les trames LoRaWAN. Cette bibliothèque permet d'extraire automatiquement les informations des capteurs (fabricant, modèle, données mesurées) et de reconnaître les capteurs grâce à l'analyse des trames. Elle est conçue pour faciliter la gestion et l'intégration des capteurs dans des systèmes IoT.",
            "competences": [
                "Internet of Things (IoT)",
                "Gestion des technologies de l'information",
                "Bases de données",
                "Network server",
                "LoRaWAN",
                "Processus de la qualité",
                "Réseaux de capteurs sans fil",
                "Python (langage de programmation)",
                "Cloud",
                "Linux",
                "Réseaux informatiques",
                "SSH",
                "Gestion d'équipe"
            ],
            "statut": "En cours",
            "type": "Académique"
        },
        {
            "nom": "Création d'une mini station météo avec Arduino",
            "periode": "Janvier 2022 - Aujourd'hui",
            "organisation": "Esmer (École Supérieure des Métiers des Énergies Renouvelables)",
            "description": "Projet de mini station météo avec Arduino, intégrant des capteurs pour mesurer la vitesse du vent (anémomètre) et les précipitations (pluviomètre). Les données collectées sont affichées en temps réel sur un écran LCD, grâce à une programmation optimisée en Arduino. Ce projet visait à concevoir une solution compacte, efficace et accessible pour surveiller les conditions météorologiques locales.",
            "competences": [
                "Internet of Things (IoT)",
                "Capteurs",
                "Arduino",
                "Processus de la qualité",
                "Électronique Embarqué",
                "Électronique",
                "Arduino IDE"
            ],
            "statut": "Fait",
            "type": "Académique"
        },
        {
            "nom": "Conception d'un logiciel de dimensionnement de système photovoltaïque avec Python",
            "periode": "Janvier 2020 - Aujourd'hui",
            "organisation": "Projet personnel",
            "description": "Développement d'un logiciel complet pour le dimensionnement des systèmes photovoltaïques. L'application permet de calculer la taille optimale des installations solaires en fonction des besoins énergétiques, de l'irradiation solaire locale et des contraintes techniques. Interface graphique intuitive développée en Python pour faciliter l'utilisation par les professionnels du secteur.",
            "competences": [
                "Processus de la qualité",
                "Python (langage de programmation)",
                "Conception d'interface graphique",
                "Énergies renouvelables",
                "Dimensionnement photovoltaïque"
            ],
            "statut": "En cours",
            "type": "Personnel"
        }
    ]
};

// Icônes pour les compétences
const skillIcons = {
    'JavaScript': 'fab fa-js-square',
    'Python': 'fab fa-python',
    'ZigBee': 'fas fa-broadcast-tower',
    'LoRa': 'fas fa-wifi',
    'LoRaWAN': 'fas fa-network-wired',
    'GTB/GTC': 'fas fa-building',
    'Analyse de données IoT': 'fas fa-chart-line',
    'Maintenance photovoltaïque': 'fas fa-solar-panel',
    'Électrotechnique': 'fas fa-bolt',
    'QGIS / ArcGIS': 'fas fa-map'
};

// Chargement du DOM
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    populateContent(); // Appel direct à populateContent
    initScrollAnimations();
    initSmoothScrolling();
    initContactForm();
    initMessaging();
    initCalendlyListeners();
});

// Navigation mobile
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fermer le menu mobile lors du clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Effet de navigation au scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Fonction supprimée - les données sont maintenant intégrées directement

// Remplissage du contenu avec les données JSON
function populateContent() {
    // Informations principales
    document.getElementById('nom-titre').textContent = cvData.nom;
    document.getElementById('titre-professionnel').textContent = cvData.titre;
    document.getElementById('localisation').textContent = `📍 ${cvData.localisation}`;
    document.getElementById('resume-text').textContent = cvData.resume;

    // Statistiques
    document.getElementById('nb-experiences').textContent = cvData.experiences.length;
    document.getElementById('nb-competences').textContent = cvData.competences.length;
    document.getElementById('nb-certifications').textContent = cvData.certifications.length;
    document.getElementById('nb-projets').textContent = cvData.projets.length;

    // Contact
    document.getElementById('email-contact').textContent = cvData.coordonnees.email;
    document.getElementById('telephone-contact').textContent = cvData.coordonnees.telephone;
    const linkedinLink = document.getElementById('linkedin-contact');
    linkedinLink.href = cvData.coordonnees.linkedin;
    linkedinLink.textContent = 'LinkedIn';

    // Sections dynamiques
    populateExperiences();
    populateCompetences();
    populateCertifications();
    populateFormation();
    populateProjects();

    // Animer les compteurs
    animateCounters();
}

// Remplissage des expériences
function populateExperiences() {
    const timeline = document.getElementById('timeline-experiences');
    timeline.innerHTML = '';

    cvData.experiences.forEach((exp, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item fade-in';
        timelineItem.style.animationDelay = `${index * 0.2}s`;

        const missionsHTML = exp.missions.map(mission =>
            `<li>${mission}</li>`
        ).join('');

        timelineItem.innerHTML = `
            <div class="timeline-content">
                <h3>${exp.entreprise}</h3>
                <h4>${exp.poste}</h4>
                <div class="timeline-period">${exp.periode}</div>
                <div class="timeline-location">${exp.lieu}</div>
                <ul class="timeline-missions">
                    ${missionsHTML}
                </ul>
                <button class="btn-details" onclick="openExperienceDetails(${index})">
                    <i class="fas fa-eye"></i>
                    Voir les détails
                </button>
            </div>
        `;

        timeline.appendChild(timelineItem);
    });
}

// Remplissage des compétences
function populateCompetences() {
    const competencesGrid = document.getElementById('competences-grid');
    competencesGrid.innerHTML = '';

    cvData.competences.forEach((competence, index) => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item fade-in';
        skillItem.style.animationDelay = `${index * 0.1}s`;

        const icon = skillIcons[competence] || 'fas fa-code';

        skillItem.innerHTML = `
            <i class="${icon}"></i>
            <div class="skill-name">${competence}</div>
        `;

        competencesGrid.appendChild(skillItem);
    });
}

// Remplissage des certifications
function populateCertifications() {
    const certificationsGrid = document.getElementById('certifications-grid');
    certificationsGrid.innerHTML = '';

    cvData.certifications.forEach((certification, index) => {
        const certificationItem = document.createElement('div');
        certificationItem.className = 'certification-item fade-in';
        certificationItem.style.animationDelay = `${index * 0.2}s`;

        certificationItem.innerHTML = `
            <h3>${certification}</h3>
            <i class="fas fa-certificate" style="color: var(--accent-color); font-size: 1.5rem;"></i>
        `;

        certificationsGrid.appendChild(certificationItem);
    });
}

// Remplissage de la formation
function populateFormation() {
    const formationTimeline = document.getElementById('formation-timeline');
    formationTimeline.innerHTML = '';

    cvData.formation.forEach((formation, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item fade-in';
        timelineItem.style.animationDelay = `${index * 0.2}s`;

        timelineItem.innerHTML = `
            <div class="timeline-content">
                <h3>${formation.ecole}</h3>
                <h4>${formation.diplome}</h4>
                <div class="timeline-period">${formation.periode}</div>
            </div>
        `;

        formationTimeline.appendChild(timelineItem);
    });
}

// Remplissage des projets
function populateProjects() {
    const projectsGrid = document.getElementById('projets-grid');
    projectsGrid.innerHTML = '';

    cvData.projets.forEach((projet, index) => {
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item fade-in';
        projectItem.style.animationDelay = `${index * 0.2}s`;

        // Générer les badges de compétences
        const competencesHTML = projet.competences.map(competence =>
            `<span class="skill-tag">${competence}</span>`
        ).join('');

        // Déterminer l'icône selon le type
        let projectIcon = 'fas fa-code';
        if (projet.type === 'Académique') {
            projectIcon = 'fas fa-university';
        } else if (projet.type === 'Personnel') {
            projectIcon = 'fas fa-user';
        }

        // Déterminer la couleur du statut
        let statusClass = 'status-ongoing';
        if (projet.statut === 'Terminé') {
            statusClass = 'status-completed';
        } else if (projet.statut === 'En pause') {
            statusClass = 'status-paused';
        }

        projectItem.innerHTML = `
            <div class="project-header">
                <div class="project-icon">
                    <i class="${projectIcon}"></i>
                </div>
                <div class="project-meta">
                    <div class="project-type">${projet.type}</div>
                    <div class="project-status ${statusClass}">${projet.statut}</div>
                </div>
            </div>
            <h3 class="project-title">${projet.nom}</h3>
            <div class="project-period">${projet.periode}</div>
            <div class="project-organization">${projet.organisation}</div>
            <p class="project-description">${projet.description}</p>
            <div class="project-skills">
                ${competencesHTML}
            </div>
        `;

        projectsGrid.appendChild(projectItem);
    });
}

// Animation des compteurs
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    const animateCounter = (counter) => {
        const target = parseInt(counter.textContent);
        const duration = 2000;
        const start = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);

            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOutCubic * target);

            counter.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                counter.textContent = target;
            }
        };

        requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Animations au scroll
function initScrollAnimations() {
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

    // Observer tous les éléments avec la classe fade-in
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Défilement fluide
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Hauteur de la navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Boutons hero
    const heroButtons = document.querySelectorAll('.hero-buttons a');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;

                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Formulaire de contact
function initContactForm() {
    const form = document.querySelector('.form');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Animation du bouton
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;

        // Simuler l'envoi (remplacer par une vraie logique d'envoi)
        setTimeout(() => {
            submitBtn.textContent = 'Message envoyé!';
            submitBtn.style.background = '#10b981';

            // Réinitialiser le formulaire
            form.reset();

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        }, 2000);
    });
}

// Effet de parallaxe léger sur le hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    if (hero && heroContent) {
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translateY(${rate}px)`;
    }
});

// Gestion du redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    // Réajuster les animations si nécessaire
    const timeline = document.querySelector('.timeline');
    if (timeline && window.innerWidth <= 768) {
        // Réajustements pour mobile
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            item.style.left = '0';
            item.style.width = '100%';
        });
    }
});

// Effet de typing sur le titre
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialiser l'effet de typing une fois les données chargées
function initTypingEffect() {
    const titleElement = document.getElementById('nom-titre');
    if (titleElement && cvData) {
        setTimeout(() => {
            typeWriter(titleElement, cvData.nom, 150);
        }, 1000);
    }
}

// Thème sombre (optionnel)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('darkTheme', document.body.classList.contains('dark-theme'));
}

// Charger le thème sauvegardé
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('darkTheme');
    if (savedTheme === 'true') {
        document.body.classList.add('dark-theme');
    }
}

// Performance: Lazy loading des images (si ajoutées plus tard)
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => imageObserver.observe(img));
    }
}

// Fonction utilitaire pour débugger
function debugPortfolio() {
    console.log('CV Data:', cvData);
    console.log('Viewport:', {
        width: window.innerWidth,
        height: window.innerHeight
    });
}

// Gestion des modals et inbox
function openInbox(type = 'chat') {
    const modal = document.getElementById('inbox-modal');
    const title = document.getElementById('inbox-title');

    // Personnaliser selon le type
    switch(type) {
        case 'linkedin':
            title.textContent = 'Message LinkedIn';
            break;
        case 'chat':
            title.textContent = 'Chat en direct';
            break;
        case 'direct':
            title.textContent = 'Message direct';
            break;
        default:
            title.textContent = 'Messagerie';
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus sur l'input de message
    setTimeout(() => {
        document.getElementById('message-input').focus();
    }, 300);
}

function closeInbox() {
    const modal = document.getElementById('inbox-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Initialisation des événements Calendly
function initCalendlyListeners() {
    console.log('Initialisation des listeners Calendly');

    // Écouter les événements Calendly
    window.addEventListener('message', function(e) {
        if (e.data.event && e.data.event.indexOf('calendly') === 0) {
            console.log('Calendly event:', e.data.event);

            // Quand un événement est planifié
            if (e.data.event === 'calendly.event_scheduled') {
                showNotification('Rendez-vous confirmé ! Vous recevrez un email de confirmation.', 'success');

                // Optionnel: tracker l'événement
                console.log('Event scheduled:', e.data.event_details);
            }
        }
    });
}

function openCalendly() {
    // Rediriger vers la nouvelle fonction Calendly
    openCalendlyWidget();
}

function closeCalendly() {
    // Plus besoin de modal, Calendly gère lui-même
    console.log('Calendly popup closed');
}

// Système de messagerie
function sendMessage() {
    console.log('sendMessage() appelée');

    const input = document.getElementById('message-input');
    const messagesContainer = document.getElementById('messages-container');

    if (!input) {
        console.error('Élément message-input non trouvé');
        return;
    }

    if (!messagesContainer) {
        console.error('Élément messages-container non trouvé');
        return;
    }

    const message = input.value.trim();
    console.log('Message à envoyer:', message);

    if (!message) {
        console.log('Message vide, arrêt');
        return;
    }

    // Ajouter le message de l'utilisateur
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'message-item user-message';
    userMessageDiv.innerHTML = `
        <div class="avatar">
            <i class="fas fa-user"></i>
        </div>
        <div class="message-content">
            <p>${message}</p>
            <span class="message-time">${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
    `;

    messagesContainer.appendChild(userMessageDiv);

    // Effacer l'input
    input.value = '';

    // Scroll vers le bas
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Simuler une réponse automatique après un délai
    setTimeout(() => {
        addAutoReply(message);
    }, 1500);
}

function addAutoReply(userMessage) {
    const messagesContainer = document.getElementById('messages-container');

    // Réponse automatique principale
    let reply = "Merci pour votre message ! Pour une réponse plus rapide et personnalisée, je vous invite à me contacter directement via l'un de ces moyens :";

    // Réponses spécifiques selon le contenu du message
    if (userMessage.toLowerCase().includes('rendez-vous') || userMessage.toLowerCase().includes('rencontrer')) {
        reply = "Je serais ravi de vous rencontrer ! Pour planifier un rendez-vous, vous pouvez :";
    } else if (userMessage.toLowerCase().includes('projet') || userMessage.toLowerCase().includes('collaboration')) {
        reply = "Excellent ! J'aimerais discuter de votre projet en détail. Contactez-moi directement via :";
    } else if (userMessage.toLowerCase().includes('stage') || userMessage.toLowerCase().includes('alternance')) {
        reply = "Je suis toujours ouvert aux opportunités intéressantes ! Pour discuter de cette opportunité :";
    } else if (userMessage.toLowerCase().includes('iot') || userMessage.toLowerCase().includes('domotique')) {
        reply = "Passionnant ! L'IoT et la domotique sont mes domaines de prédilection. Parlons-en plus en détail :";
    }

    const replyDiv = document.createElement('div');
    replyDiv.className = 'message-item';
    replyDiv.innerHTML = `
        <div class="avatar">
            <i class="fas fa-user-tie"></i>
        </div>
        <div class="message-content">
            <p><strong>Prince Noukounwoui</strong></p>
            <p>${reply}</p>
            <div class="contact-buttons">
                <button class="contact-btn linkedin-btn" onclick="contactViaLinkedIn()">
                    <i class="fab fa-linkedin"></i>
                    LinkedIn
                </button>
                <button class="contact-btn email-btn" onclick="contactViaEmail()">
                    <i class="fas fa-envelope"></i>
                    Email
                </button>
                <button class="contact-btn sms-btn" onclick="contactViaSMS()">
                    <i class="fas fa-sms"></i>
                    SMS
                </button>
                <button class="contact-btn appointment-btn" onclick="openCalendlyWidget()">
                    <i class="fas fa-calendar-alt"></i>
                    Rendez-vous
                </button>
            </div>
            <span class="message-time">${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
    `;

    messagesContainer.appendChild(replyDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Initialisation de la messagerie
function initMessaging() {
    console.log('Initialisation de la messagerie');

    const messageInput = document.getElementById('message-input');
    if (messageInput) {
        console.log('message-input trouvé, ajout event listener');
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                console.log('Touche Entrée pressée');
                sendMessage();
            }
        });
    } else {
        console.warn('message-input non trouvé lors de l\'initialisation');
    }
}

// Fermer les modals en cliquant en dehors
document.addEventListener('click', function(e) {
    const inboxModal = document.getElementById('inbox-modal');
    const calendlyModal = document.getElementById('calendly-modal');
    const experienceModal = document.getElementById('experience-details-modal');

    if (e.target === inboxModal) {
        closeInbox();
    }

    if (e.target === calendlyModal) {
        closeCalendly();
    }

    if (e.target === experienceModal) {
        closeExperienceDetails();
    }
});

// Fermer les modals avec Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeInbox();
        closeCalendly();
        closePhoneBooking();
        closeExperienceDetails();
    }
});

// Fermer le modal de booking en cliquant en dehors
document.addEventListener('click', function(e) {
    const phoneBookingModal = document.getElementById('phone-booking-modal');
    if (e.target === phoneBookingModal) {
        closePhoneBooking();
    }
});

// Système de réservation d'appels téléphoniques
let selectedSlot = null;
let bookingData = {};
let currentMonth = new Date();

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

// Règles de disponibilité
const AVAILABILITY_RULES = {
    weekdaysOnly: true, // Pas de weekend
    startHour: 9,       // À partir de 9h
    endHour: 18,        // Jusqu'à 18h
    slotDuration: 30,   // Créneaux de 30 minutes
    excludedDates: [],  // Dates à exclure
    workingDays: [1, 2, 3, 4, 5], // Lun-Ven (0=Dimanche, 1=Lundi, etc.)
    // Plages de disponibilité par défaut (peut être personnalisé)
    timeSlots: [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
    ]
};

// Cache pour les événements
let eventsCache = {
    data: null,
    lastFetch: null,
    cacheDuration: 5 * 60 * 1000 // 5 minutes
};

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
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function resetBookingForm() {
    selectedSlot = null;
    bookingData = {};

    // Afficher l'étape 1 et masquer les autres
    document.getElementById('step-1').classList.remove('hidden');
    document.getElementById('step-2').classList.add('hidden');
    document.getElementById('step-3').classList.add('hidden');
    document.getElementById('step-4').classList.add('hidden');
}

// Chargement des événements depuis iCal
async function loadCalendarEvents() {
    const now = Date.now();

    // Vérifier le cache
    if (eventsCache.data && eventsCache.lastFetch &&
        (now - eventsCache.lastFetch) < eventsCache.cacheDuration) {
        console.log('Utilisation du cache des événements');
        return eventsCache.data;
    }

    try {
        console.log('Chargement des événements depuis iCal...');

        // Utiliser un proxy CORS pour contourner les restrictions
        const icalUrl = CALENDAR_CONFIG.usePublicUrl ?
            CALENDAR_CONFIG.icalPublicUrl :
            CALENDAR_CONFIG.icalPrivateUrl;

        // Note: En production, vous devriez utiliser votre propre proxy CORS
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(icalUrl)}`;

        const response = await fetch(proxyUrl);
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const icalData = await response.text();
        const events = parseICalData(icalData);

        // Mettre à jour le cache
        eventsCache.data = events;
        eventsCache.lastFetch = now;

        console.log(`${events.length} événements chargés`);
        return events;

    } catch (error) {
        console.error('Erreur lors du chargement des événements:', error);

        // En cas d'erreur, retourner une liste vide (mode dégradé)
        showNotification('Impossible de charger les événements. Mode dégradé activé.', 'warning');
        return [];
    }
}

// Parser les données iCal
function parseICalData(icalString) {
    const events = [];
    const lines = icalString.split('\n');
    let currentEvent = null;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (line === 'BEGIN:VEVENT') {
            currentEvent = {};
        } else if (line === 'END:VEVENT' && currentEvent) {
            if (currentEvent.dtstart && currentEvent.dtend) {
                events.push({
                    start: parseICalDate(currentEvent.dtstart),
                    end: parseICalDate(currentEvent.dtend),
                    summary: currentEvent.summary || 'Événement',
                    uid: currentEvent.uid
                });
            }
            currentEvent = null;
        } else if (currentEvent && line.includes(':')) {
            const [key, ...valueParts] = line.split(':');
            const value = valueParts.join(':');

            switch (key) {
                case 'DTSTART':
                case 'DTSTART;VALUE=DATE':
                    currentEvent.dtstart = value;
                    break;
                case 'DTEND':
                case 'DTEND;VALUE=DATE':
                    currentEvent.dtend = value;
                    break;
                case 'SUMMARY':
                    currentEvent.summary = value;
                    break;
                case 'UID':
                    currentEvent.uid = value;
                    break;
            }
        }
    }

    // Filtrer les événements futurs et dans les prochains 3 mois
    const now = new Date();
    const threeMonthsLater = new Date();
    threeMonthsLater.setMonth(now.getMonth() + 3);

    return events.filter(event => {
        const eventStart = new Date(event.start);
        return eventStart >= now && eventStart <= threeMonthsLater;
    });
}

// Parser une date iCal
function parseICalDate(dateString) {
    // Format: YYYYMMDDTHHMMSSZ ou YYYYMMDD
    if (dateString.length === 8) {
        // Date seulement (YYYYMMDD)
        const year = parseInt(dateString.substr(0, 4));
        const month = parseInt(dateString.substr(4, 2)) - 1; // Mois 0-indexé
        const day = parseInt(dateString.substr(6, 2));
        return new Date(year, month, day);
    } else if (dateString.length >= 15) {
        // Date et heure (YYYYMMDDTHHMMSSZ)
        const year = parseInt(dateString.substr(0, 4));
        const month = parseInt(dateString.substr(4, 2)) - 1;
        const day = parseInt(dateString.substr(6, 2));
        const hour = parseInt(dateString.substr(9, 2));
        const minute = parseInt(dateString.substr(11, 2));
        const second = parseInt(dateString.substr(13, 2));

        if (dateString.endsWith('Z')) {
            // UTC
            return new Date(Date.UTC(year, month, day, hour, minute, second));
        } else {
            // Heure locale
            return new Date(year, month, day, hour, minute, second);
        }
    }

    // Fallback
    return new Date(dateString);
}

// Vérifier si un créneau est occupé
function isSlotBusy(slotStart, slotEnd, events) {
    return events.some(event => {
        const eventStart = new Date(event.start);
        const eventEnd = new Date(event.end);

        // Vérifier les chevauchements
        return (slotStart < eventEnd && slotEnd > eventStart);
    });
}

// Navigation entre les mois (mise à jour)
async function navigateMonth(direction) {
    currentMonth.setMonth(currentMonth.getMonth() + direction);

    // Recharger les événements si nécessaire
    await loadCalendarEvents();
    generateCalendar();
}

// Génération du calendrier mensuel avec créneaux
function generateCalendar() {
    const calendarGrid = document.getElementById('calendar-grid');
    const calendarTitle = document.getElementById('calendar-title');

    // Mettre à jour le titre
    calendarTitle.textContent = currentMonth.toLocaleDateString('fr-FR', {
        month: 'long',
        year: 'numeric'
    });

    // Vider le calendrier
    calendarGrid.innerHTML = '';

    // Ajouter les en-têtes des jours
    const dayHeaders = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    dayHeaders.forEach(day => {
        const headerElement = document.createElement('div');
        headerElement.className = 'calendar-day-header';
        headerElement.textContent = day;
        calendarGrid.appendChild(headerElement);
    });

    // Calculer le premier jour du mois et le nombre de jours
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const startDate = new Date(firstDay);

    // Ajuster au lundi (jour 1 = lundi, jour 0 = dimanche)
    const dayOffset = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    startDate.setDate(startDate.getDate() - dayOffset);

    // Générer 42 cellules (6 semaines)
    for (let i = 0; i < 42; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);

        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';

        // Marquer les jours hors du mois actuel
        if (currentDate.getMonth() !== currentMonth.getMonth()) {
            dayElement.classList.add('other-month');
        }

        // Marquer les jours passés
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (currentDate < today) {
            dayElement.classList.add('past-day');
        }

        // Vérifier si c'est un jour ouvrable
        const isWorkingDay = AVAILABILITY_RULES.workingDays.includes(currentDate.getDay());
        const isCurrentMonth = currentDate.getMonth() === currentMonth.getMonth();
        const isFuture = currentDate >= today;

        if (isWorkingDay && isCurrentMonth && isFuture) {
            // Générer les créneaux pour ce jour
            const slots = generateSlotsForDay(currentDate);

            dayElement.innerHTML = `
                <div class="day-number">${currentDate.getDate()}</div>
                <div class="day-slots">
                    ${slots.map(slot => {
                        let className = 'time-slot-mini ';
                        let tooltip = '';
                        let onclick = '';

                        if (slot.available) {
                            className += 'available';
                            tooltip = `${slot.time} - Disponible`;
                            onclick = `onclick="selectSlot('${slot.datetime}')"`;
                        } else if (slot.busy) {
                            className += 'busy';
                            tooltip = `${slot.time} - Occupé`;
                        } else {
                            className += 'unavailable';
                            tooltip = `${slot.time} - Passé`;
                        }

                        return `
                            <div class="${className}"
                                 ${onclick}
                                 title="${tooltip}">
                                ${slot.time}
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        } else {
            dayElement.innerHTML = `<div class="day-number">${currentDate.getDate()}</div>`;
            if (!isWorkingDay) {
                dayElement.classList.add('weekend');
            }
        }

        calendarGrid.appendChild(dayElement);
    }
}

// Générer les créneaux pour un jour donné (avec vérification des événements réels)
function generateSlotsForDay(date) {
    const slots = [];
    const events = eventsCache.data || [];

    AVAILABILITY_RULES.timeSlots.forEach(timeStr => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        const slotStart = new Date(date);
        slotStart.setHours(hours, minutes, 0, 0);

        const slotEnd = new Date(slotStart);
        slotEnd.setMinutes(slotEnd.getMinutes() + AVAILABILITY_RULES.slotDuration);

        // Vérifier si le créneau n'est pas dans le passé
        const isNotPast = slotStart > new Date();

        // Vérifier si le créneau n'est pas occupé par un événement existant
        const isBusy = isSlotBusy(slotStart, slotEnd, events);

        // Le créneau est disponible s'il n'est pas dans le passé ET pas occupé
        const isAvailable = isNotPast && !isBusy;

        slots.push({
            time: timeStr,
            datetime: slotStart.toISOString(),
            available: isAvailable,
            busy: isBusy,
            date: date
        });
    });

    return slots;
}

// Sélection d'un créneau
function selectSlot(datetimeISO) {
    const slotDate = new Date(datetimeISO);
    selectedSlot = {
        date: slotDate,
        time: slotDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        datetime: datetimeISO
    };

    // Marquer visuellement le créneau sélectionné
    document.querySelectorAll('.time-slot-mini').forEach(el => {
        el.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');

    // Mettre à jour l'affichage du créneau sélectionné
    document.getElementById('selected-slot-date').textContent =
        slotDate.toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

    document.getElementById('selected-slot-time').textContent = selectedSlot.time;

    // Mettre à jour l'affichage final pour l'étape 3
    document.getElementById('final-date-display').textContent =
        slotDate.toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

    document.getElementById('final-time-display').textContent = selectedSlot.time;

    // Passer à l'étape 2 après un court délai
    setTimeout(() => {
        document.getElementById('step-1').classList.add('hidden');
        document.getElementById('step-2').classList.remove('hidden');
    }, 300);
}

// Navigation dans le processus de réservation
function goBackToCalendar() {
    document.getElementById('step-2').classList.add('hidden');
    document.getElementById('step-3').classList.add('hidden');
    document.getElementById('step-1').classList.remove('hidden');
}

function proceedToBookingForm() {
    if (!selectedSlot) {
        showNotification('Veuillez sélectionner un créneau', 'error');
        return;
    }

    document.getElementById('step-2').classList.add('hidden');
    document.getElementById('step-3').classList.remove('hidden');
}

function confirmBooking() {
    // Récupérer les données du formulaire
    const name = document.getElementById('booking-name').value.trim();
    const phone = document.getElementById('booking-phone').value.trim();
    const email = document.getElementById('booking-email').value.trim();
    const subject = document.getElementById('booking-subject').value.trim();

    // Validation
    if (!name || !phone || !email) {
        showNotification('Veuillez remplir tous les champs obligatoires', 'error');
        return;
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Veuillez entrer une adresse email valide', 'error');
        return;
    }

    // Sauvegarder les données
    bookingData = {
        name,
        phone,
        email,
        subject,
        date: selectedSlot.date,
        time: selectedSlot.time,
        datetime: selectedSlot.datetime,
        type: 'phone',
        duration: 30
    };

    // Simuler l'envoi (remplacer par vraie logique backend)
    setTimeout(() => {
        // Afficher l'étape de confirmation
        document.getElementById('step-3').classList.add('hidden');
        document.getElementById('step-4').classList.remove('hidden');

        // Envoyer une notification
        showNotification('Demande de rendez-vous envoyée avec succès !', 'success');

        // Logger pour debug (remplacer par envoi email/API)
        console.log('Nouveau rendez-vous:', bookingData);

        // Envoyer un email de confirmation (simulation)
        sendBookingConfirmation(bookingData);

    }, 1000);
}

function sendBookingConfirmation(data) {
    // Simulation d'envoi d'email de confirmation
    // Dans un vrai projet, ceci ferait appel à votre backend/API

    const emailContent = `
Nouvelle demande de rendez-vous téléphonique :

👤 Nom: ${data.name}
📞 Téléphone: ${data.phone}
📧 Email: ${data.email}
📅 Date: ${data.date.toLocaleDateString('fr-FR')}
🕐 Heure: ${data.time.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
⏱️ Durée: ${data.duration} minutes
📝 Sujet: ${data.subject || 'Non spécifié'}

Rendez-vous programmé automatiquement via le portfolio.
    `;

    console.log('Email à envoyer:', emailContent);

    // Ici vous pourriez utiliser:
    // - EmailJS pour envoyer des emails côté client
    // - Votre API backend
    // - Un service comme Formspree, Netlify Forms, etc.
}

function addToCalendar() {
    if (!bookingData.date || !bookingData.time) return;

    const startTime = new Date(bookingData.time);
    const endTime = new Date(startTime.getTime() + (bookingData.duration * 60000));

    // Format pour Google Calendar
    const formatDate = (date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const startFormatted = formatDate(startTime);
    const endFormatted = formatDate(endTime);

    const title = `Appel téléphonique avec ${bookingData.name}`;
    const details = `Appel téléphonique prévu avec ${bookingData.name}\\n\\nTéléphone: ${bookingData.phone}\\nEmail: ${bookingData.email}\\nSujet: ${bookingData.subject || 'Non spécifié'}`;

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startFormatted}/${endFormatted}&details=${encodeURIComponent(details)}`;

    window.open(googleCalendarUrl, '_blank');
}

// Intégration Google Calendar (améliorée)
function initGoogleCalendar() {
    console.log('Google Calendar integration ready');

    // Écouter les changements de dates dans l'iframe (si possible)
    // Note: L'accès au contenu de l'iframe Google Calendar est limité par CORS
    // Cette fonction pourrait être étendue avec l'API Google Calendar
}

// Notification système (optionnel)
function showNotification(message, type = 'info') {
    // Créer une notification toast style Apple
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    let iconClass = 'info-circle';
    if (type === 'success') iconClass = 'check-circle';
    else if (type === 'error') iconClass = 'exclamation-circle';
    else if (type === 'warning') iconClass = 'exclamation-triangle';

    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${iconClass}"></i>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    // Animation d'entrée
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Auto-suppression
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Fonctions de contact direct
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

// Gestion des détails d'expérience
function openExperienceDetails(experienceIndex) {
    const experience = cvData.experiences[experienceIndex];
    if (!experience) {
        console.error('Expérience non trouvée:', experienceIndex);
        return;
    }

    console.log('Ouverture des détails pour:', experience.entreprise);

    // Remplir les informations de base
    document.getElementById('detail-company').textContent = experience.entreprise;
    document.getElementById('detail-position').textContent = experience.poste;
    document.getElementById('detail-period').textContent = experience.periode;
    document.getElementById('detail-location').textContent = experience.lieu;

    // Remplir les missions
    const missionsContainer = document.getElementById('detail-missions');
    missionsContainer.innerHTML = '';
    experience.missions.forEach(mission => {
        const li = document.createElement('li');
        li.textContent = mission;
        missionsContainer.appendChild(li);
    });

    // Si l'expérience a des détails étendus
    if (experience.details) {
        // Technologies
        const techContainer = document.getElementById('detail-technologies');
        techContainer.innerHTML = '';
        experience.details.technologies.forEach(tech => {
            const badge = document.createElement('span');
            badge.className = 'tech-badge';
            badge.textContent = tech;
            techContainer.appendChild(badge);
        });

        // Réalisations
        const realisationsContainer = document.getElementById('detail-realisations');
        realisationsContainer.innerHTML = '';
        experience.details.realisations.forEach(realisation => {
            const li = document.createElement('li');
            li.textContent = realisation;
            realisationsContainer.appendChild(li);
        });

        // Défis
        const defisContainer = document.getElementById('detail-defis');
        defisContainer.innerHTML = '';
        experience.details.defis.forEach(defi => {
            const li = document.createElement('li');
            li.textContent = defi;
            defisContainer.appendChild(li);
        });

        // Environnement
        document.getElementById('detail-environnement').textContent = experience.details.environnement;

        // Impact
        document.getElementById('detail-impact').textContent = experience.details.impact;
    } else {
        // Si pas de détails étendus, masquer ou remplir avec des valeurs par défaut
        document.getElementById('detail-technologies').innerHTML = '<span class="tech-badge">Informations à venir</span>';
        document.getElementById('detail-realisations').innerHTML = '<li>Détails complets disponibles sur demande</li>';
        document.getElementById('detail-defis').innerHTML = '<li>Expérience enrichissante avec de nombreux apprentissages</li>';
        document.getElementById('detail-environnement').textContent = 'Environnement professionnel dynamique';
        document.getElementById('detail-impact').textContent = 'Contribution significative aux objectifs de l\'entreprise';
    }

    // Ouvrir le modal
    const modal = document.getElementById('experience-details-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeExperienceDetails() {
    const modal = document.getElementById('experience-details-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Exportation pour utilisation en mode debug
window.debugPortfolio = debugPortfolio;