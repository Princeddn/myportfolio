/**
 * SkillSphere — Interactive 3D Skills Constellation
 * Powered by Three.js · Vanilla JS
 */
(function () {
    'use strict';

    // ── Configuration ──────────────────────────────────────────────
    const CFG = {
        radius: 5,
        cameraDist: 13,
        fov: 45,
        autoSpeed: 0.0015,
        damping: 0.94,
        pointBase: 0.7,
        pointLevelScale: 0.18,
        lineAlpha: 0.28,
        lineHoverAlpha: 0.65,
        pulseHz: 1.5,
        pulseAmp: 0.15,
        zoomMin: 9,
        zoomMax: 18,
        zoomStep: 0.4,
        dragThreshold: 5,
        returnDelay: 3000,
    };

    // ── Skill Data ─────────────────────────────────────────────────
    const SKILLS = [
        // Smart Building (3)
        { id: 'zigbee', label: 'ZigBee', domain: 'smartbuilding', level: 3,
          tags: ['Protocole', 'Domotique', 'Mesh'],
          subSkills: ['Coordinator', 'End Device', 'Routeur Mesh', 'Profils ZCL', 'Zigbee2MQTT'],
          project: 'JEEDOM', proofUrl: null },
        { id: 'knx', label: 'KNX', domain: 'smartbuilding', level: 2,
          tags: ['Bus', 'Domotique', 'TP/IP'],
          subSkills: ['ETS5', 'Bus TP', 'Passerelle IP', 'Actionneurs', 'Programmation'],
          project: 'JEEDOM', proofUrl: null },
        { id: 'gtb', label: 'GTB / GTC', domain: 'smartbuilding', level: 3,
          tags: ['Supervision', 'Bâtiment intelligent'],
          subSkills: ['SCADA', 'Automates', 'BACnet', 'Régulation CVC', 'Alarmes'],
          project: 'JEEDOM', proofUrl: null },

        // IoT / LoRaWAN (3)
        { id: 'lora', label: 'LoRa', domain: 'iot', level: 2,
          tags: ['Radio', 'LPWAN', 'Sub-GHz'],
          subSkills: ['Modulation CSS', 'Sub-GHz', 'Antennes', 'Bilan de liaison', 'Portée / SF'],
          project: 'LoRaWAN Plug & Play', proofUrl: 'https://princeddn.github.io/chirp-api/' },
        { id: 'lorawan', label: 'LoRaWAN', domain: 'iot', level: 3,
          tags: ['Réseau', 'ChirpStack', 'Capteurs'],
          subSkills: ['ChirpStack', 'Gateway', 'Codec Payload', 'MQTT', 'Classes A/B/C', 'Downlink'],
          project: 'LoRaWAN Plug & Play', proofUrl: 'https://princeddn.github.io/chirp-api/' },
        { id: 'iot-data', label: 'Analyse IoT', domain: 'iot', level: 2,
          tags: ['Data', 'Monitoring', 'VRM'],
          subSkills: ['Grafana', 'InfluxDB', 'Node-RED', 'VRM Victron', 'API REST'],
          project: 'Qotto', proofUrl: null },

        // Énergie & Électrotechnique (3)
        { id: 'pv', label: 'Maintenance PV', domain: 'energy', level: 2,
          tags: ['Solaire', 'Photovoltaïque'],
          subSkills: ['Thermographie IR', 'Courbe I-V', 'Onduleurs', 'Test String', 'Monitoring'],
          project: 'Qotto', proofUrl: null },
        { id: 'elec', label: 'Électrotechnique', domain: 'energy', level: 2,
          tags: ['Réseau BT/HT', 'Moteurs'],
          subSkills: ['Transformateurs', 'Disjoncteurs', 'Protection', 'Schémas unifilaires', 'Mise à la terre'],
          project: 'ASEMI SA', proofUrl: null },
        { id: 'pvsyst', label: 'PVSYST', domain: 'energy', level: 1,
          tags: ['Simulation', 'Dimensionnement'],
          subSkills: ['Masques ombrage', 'Données météo', 'Pertes système', 'Layout toiture', 'Rapport'],
          project: 'Logiciel PV', proofUrl: 'https://github.com/prince-noukounwoui/pv-dimensioning-tool' },

        // Dev & Simulation (5)
        { id: 'js', label: 'JavaScript', domain: 'dev', level: 3,
          tags: ['Web', 'Frontend', 'Node.js'],
          subSkills: ['DOM / Events', 'Async / Promises', 'Three.js', 'Fetch API', 'ES6+', 'Node.js'],
          project: 'Portfolio', proofUrl: null },
        { id: 'python', label: 'Python', domain: 'dev', level: 3,
          tags: ['Backend', 'Scripting', 'IoT'],
          subSkills: ['Flask', 'Pandas', 'Paho MQTT', 'Scripts CLI', 'API REST', 'Jinja2'],
          project: 'LoRaWAN Plug & Play', proofUrl: 'https://princeddn.github.io/chirp-api/' },
        { id: 'vba', label: 'VBA Excel', domain: 'dev', level: 2,
          tags: ['Automation', 'Calcul'],
          subSkills: ['Macros', 'UserForms', 'Plages', 'Graphiques', 'Automatisation'],
          project: 'Progiciel réseau BT', proofUrl: null },
        { id: 'matlab', label: 'MatLab', domain: 'dev', level: 2,
          tags: ['Simulink', 'Contrôle'],
          subSkills: ['Simulink', 'Control Toolbox', 'Tracés', 'Calcul matriciel', 'Bode / Nyquist'],
          project: 'Pendule inversé', proofUrl: null },
        { id: 'comsol', label: 'Comsol', domain: 'dev', level: 1,
          tags: ['FEM', 'Modélisation'],
          subSkills: ['Maillage FEM', 'Physique couplée', 'Post-traitement', 'Géométrie 3D', 'Solveur'],
          project: 'Biodigesteur', proofUrl: null },

        // CAO & SIG (4)
        { id: 'qgis', label: 'QGIS / ArcGIS', domain: 'geo', level: 2,
          tags: ['Cartographie', 'SIG', 'GPS'],
          subSkills: ['Couches vecteur', 'Géoréférencement', 'Analyse spatiale', 'Symbologie', 'Plugin GPS'],
          project: 'Golf Business Co.', proofUrl: null },
        { id: 'autocad', label: 'Autocad', domain: 'geo', level: 1,
          tags: ['CAO', 'Dessin technique'],
          subSkills: ['Dessin 2D', 'Cotation', 'Calques', 'Blocs', 'Impression'],
          project: null, proofUrl: null },
        { id: 'archicad', label: 'ArchiCAD', domain: 'geo', level: 1,
          tags: ['BIM', 'Architecture'],
          subSkills: ['Modèle BIM', 'Coupes', 'Plans étage', 'Nomenclatures', 'Export IFC'],
          project: null, proofUrl: null },
        { id: 'globalmapper', label: 'GlobalMapper', domain: 'geo', level: 1,
          tags: ['SIG', 'Terrain 3D'],
          subSkills: ['MNT / MNS', 'Données LiDAR', 'Courbes de niveau', 'Projections', 'Profil terrain'],
          project: 'Golf Business Co.', proofUrl: null },
    ];

    const DOMAINS = {
        smartbuilding: { name: 'Smart Building',  color: '#007AFF', rgb: [0, 122, 255] },
        iot:           { name: 'IoT / LoRaWAN',   color: '#34C759', rgb: [52, 199, 89] },
        energy:        { name: 'Énergie',          color: '#FF9F0A', rgb: [255, 159, 10] },
        dev:           { name: 'Dev & Simulation', color: '#BF5AF2', rgb: [191, 90, 242] },
        geo:           { name: 'CAO & SIG',        color: '#FF453A', rgb: [255, 69, 58] },
    };

        const SKILL_LOGOS = {
        zigbee: './assets/logos/zigbee.png',
        knx: null,
        gtb: null,
        lora: './assets/logos/lora.png',
        lorawan: './assets/logos/LoRaWAN.png',
        'iot-data': null,
        pv: './assets/logos/PVsyst.png',
        elec: null,
        pvsyst: './assets/logos/PVsyst.png',
        js: 'https://cdn.simpleicons.org/javascript',
        python: 'https://cdn.simpleicons.org/python',
        vba: 'https://cdn.simpleicons.org/microsoftexcel',
        matlab: null,
        comsol: null,
        qgis: 'https://cdn.simpleicons.org/qgis',
        autocad: './assets/logos/Autocad.png',
        archicad: './assets/logos/archicad.png',
        globalmapper: null,
    };


    const SKILL_LABELS = {
        knx: 'KNX',
        gtb: 'GTB',
        'iot-data': 'IoT',
        elec: 'ELEC',
        globalmapper: 'GM',
    };


    const DOMAIN_ICONS = {
        smartbuilding: '\uf1ad',  // fa-building
        iot:           '\uf1eb',  // fa-wifi
        energy:        '\uf0e7',  // fa-bolt
        dev:           '\uf121',  // fa-code
        geo:           '\uf279',  // fa-map
    };

    const DOMAIN_LABELS = {
        smartbuilding: 'Smart',
        iot: 'IoT',
        energy: 'Energie',
        dev: 'Dev',
        geo: 'SIG',
    };

    // ── State ──────────────────────────────────────────────────────
    var wrapperEl, containerEl, tooltipEl, detailEl, legendEl, mobileEl;
    var renderer, scene, camera, clock;
    var group;
    var sprites = [];
    var hubSprites = {};
    var linesByDomain = {};
    var subSprites = [];
    var subLines = [];
    var interactiveSprites = [];
    var skillLabels = [];
    var raycaster, pointerNDC;

    var autoRotate = true;
    var dragging = false;
    var dragOrigin = null;
    var dragMoved = false;
    var vel = { x: 0, y: 0 };
    var autoResumeTimer = null;

    var hoveredSprite = null;
    var hoveredDomain = null;
    var selectedSkill = null;

    var visible = true;
    var reducedMotion = false;
    var rafId = null;

    // ── Init ───────────────────────────────────────────────────────
    function init() {
        try {
            wrapperEl   = document.getElementById('skillsphere-wrapper');
            containerEl = document.getElementById('skillsphere-container');
            tooltipEl   = document.getElementById('skillsphere-tooltip');
            detailEl    = document.getElementById('skillsphere-detail');
            legendEl    = document.getElementById('skillsphere-legend');
            mobileEl    = document.getElementById('skillsphere-mobile');

            if (!wrapperEl || !containerEl) return false;

            reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            var isMobile = window.innerWidth <= 768;

            if (isMobile || !window.THREE || !supportsWebGL()) {
                wrapperEl.classList.add('sphere-mobile-mode');
                buildMobileFallback();
                return true;
            }

            setupScene();
            buildPoints();
            buildLines();
            buildSubSkills();
            buildSkillLabels();
            interactiveSprites = sprites.concat(subSprites);
            buildAmbientParticles();
            buildLegend();
            setupEvents();
            setupVisibility();
            animate();
            return true;
        } catch (error) {
            console.error('SkillSphere init error:', error);
            return false;
        }
    }

    function supportsWebGL() {
        try {
            var c = document.createElement('canvas');
            return !!(c.getContext('webgl') || c.getContext('experimental-webgl'));
        } catch (e) { return false; }
    }

    // ── Scene ──────────────────────────────────────────────────────
    function setupScene() {
        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(
            CFG.fov,
            containerEl.clientWidth / containerEl.clientHeight,
            0.1, 100
        );
        camera.position.z = CFG.cameraDist;

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(containerEl.clientWidth, containerEl.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerEl.appendChild(renderer.domElement);

        renderer.domElement.style.display = 'block';

        raycaster = new THREE.Raycaster();
        if (raycaster.params.Sprite) {
            raycaster.params.Sprite.threshold = 0.4;
        }
        pointerNDC = new THREE.Vector2(-999, -999);

        clock = new THREE.Clock();

        group = new THREE.Group();
        scene.add(group);

        window.addEventListener('resize', onResize);
    }

    function onResize() {
        if (!renderer || !containerEl) return;
        var w = containerEl.clientWidth;
        var h = containerEl.clientHeight;
        if (w === 0 || h === 0) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    }

    // ── Textures ───────────────────────────────────────────────────
    var textureCache = {};
    var logoTextureCache = {};
    var badgeTextureCache = {};
    var labelTextureCache = {};
    var textureLoader = null;

    function glowTexture(rgb) {
        var key = rgb.join(',');
        if (textureCache[key]) return textureCache[key];

        var size = 128;
        var c = document.createElement('canvas');
        c.width = c.height = size;
        var ctx = c.getContext('2d');
        var cx = size / 2;

        // Soft colored dot with glow (for light backgrounds)
        var r = rgb[0], g = rgb[1], b = rgb[2];
        var g1 = ctx.createRadialGradient(cx, cx, 0, cx, cx, cx);
        g1.addColorStop(0,    'rgba(' + r + ',' + g + ',' + b + ',0.95)');
        g1.addColorStop(0.25, 'rgba(' + r + ',' + g + ',' + b + ',0.7)');
        g1.addColorStop(0.5,  'rgba(' + r + ',' + g + ',' + b + ',0.2)');
        g1.addColorStop(0.75, 'rgba(' + r + ',' + g + ',' + b + ',0.05)');
        g1.addColorStop(1,    'rgba(' + r + ',' + g + ',' + b + ',0)');
        ctx.fillStyle = g1;
        ctx.fillRect(0, 0, size, size);

        // White highlight at center
        var g2 = ctx.createRadialGradient(cx, cx, 0, cx, cx, size * 0.12);
        g2.addColorStop(0, 'rgba(255,255,255,0.55)');
        g2.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = g2;
        ctx.fillRect(0, 0, size, size);

        var tex = new THREE.CanvasTexture(c);
        textureCache[key] = tex;
        return tex;
    }

    
    function badgeTexture(colorHex) {
        var key = colorHex || 'default';
        if (badgeTextureCache[key]) return badgeTextureCache[key];

        var size = 128;
        var c = document.createElement('canvas');
        c.width = c.height = size;
        var ctx = c.getContext('2d');
        var cx = size / 2;

        // soft outer glow
        var g = ctx.createRadialGradient(cx, cx, 0, cx, cx, cx);
        g.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        g.addColorStop(0.65, 'rgba(255, 255, 255, 0.92)');
        g.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, size, size);

        // subtle ring
        ctx.beginPath();
        ctx.arc(cx, cx, size * 0.32, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.06)';
        ctx.lineWidth = 4;
        ctx.stroke();

        // faint colored accent
        if (colorHex) {
            ctx.beginPath();
            ctx.arc(cx, cx, size * 0.36, 0, Math.PI * 2);
            ctx.strokeStyle = colorHex + '33';
            ctx.lineWidth = 3;
            ctx.stroke();
        }

        var tex = new THREE.CanvasTexture(c);
        badgeTextureCache[key] = tex;
        return tex;
    }

    function labelTexture(text) {
        var key = text || 'label';
        if (labelTextureCache[key]) return labelTextureCache[key];

        var size = 256;
        var c = document.createElement('canvas');
        c.width = c.height = size;
        var ctx = c.getContext('2d');
        ctx.clearRect(0, 0, size, size);

        // soft rounded pill background
        ctx.fillStyle = 'rgba(255, 255, 255, 0.94)';
        ctx.beginPath();
        var r = 48;
        var w = size - 20;
        var h = 100;
        var x = 10;
        var y = (size - h) / 2;
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
        ctx.font = '700 58px \"SF Pro Display\", \"Segoe UI\", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, size / 2, size / 2 + 2);

        var tex = new THREE.CanvasTexture(c);
        labelTextureCache[key] = tex;
        return tex;
    }

    function skillNameTexture(text) {
        var key = 'sn_' + text;
        if (labelTextureCache[key]) return labelTextureCache[key];

        var cw = 360;
        var ch = 100;
        var c = document.createElement('canvas');
        c.width = cw;
        c.height = ch;
        var ctx = c.getContext('2d');

        // Measure text
        ctx.font = '600 40px "SF Pro Display", "Segoe UI", sans-serif';
        var tw = ctx.measureText(text).width;
        var pillW = Math.min(tw + 30, cw - 8);
        var pillH = 54;
        var px = (cw - pillW) / 2;
        var py = (ch - pillH) / 2;
        var r = 14;

        // Pill background
        ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
        ctx.beginPath();
        ctx.moveTo(px + r, py);
        ctx.arcTo(px + pillW, py, px + pillW, py + pillH, r);
        ctx.arcTo(px + pillW, py + pillH, px, py + pillH, r);
        ctx.arcTo(px, py + pillH, px, py, r);
        ctx.arcTo(px, py, px + pillW, py, r);
        ctx.closePath();
        ctx.fill();

        // Subtle border
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Text
        ctx.fillStyle = 'rgba(29, 29, 31, 0.92)';
        ctx.font = '600 40px "SF Pro Display", "Segoe UI", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, cw / 2, ch / 2);

        var tex = new THREE.CanvasTexture(c);
        labelTextureCache[key] = tex;
        return tex;
    }

    function domainIconTexture(iconChar, colorHex) {
        var key = 'dicon_' + iconChar + colorHex;
        if (logoTextureCache[key]) return logoTextureCache[key];

        var size = 256;
        var c = document.createElement('canvas');
        c.width = c.height = size;
        var ctx = c.getContext('2d');
        var cx = size / 2;

        ctx.fillStyle = colorHex;
        ctx.font = '900 90px "Font Awesome 6 Free"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(iconChar, cx, cx);

        var tex = new THREE.CanvasTexture(c);
        logoTextureCache[key] = tex;
        return tex;
    }

    function logoTexture(url, onLoad) {
        if (!url) return null;
        if (logoTextureCache[url]) {
            if (onLoad) onLoad(logoTextureCache[url]);
            return logoTextureCache[url];
        }
        if (!textureLoader) {
            textureLoader = new THREE.TextureLoader();
            textureLoader.crossOrigin = 'anonymous';
        }
        var tex = textureLoader.load(url, function (loaded) {
            if (loaded && typeof THREE.SRGBColorSpace !== 'undefined' && loaded.colorSpace !== undefined) {
                loaded.colorSpace = THREE.SRGBColorSpace;
            }
            if (onLoad) onLoad(loaded || tex);
        });
        logoTextureCache[url] = tex;
        return tex;
    }

    // ── Points ─────────────────────────────────────────────────────
    function buildPoints() {
        var domainIds = Object.keys(DOMAINS);
        var N = domainIds.length;

        // Fibonacci sphere for evenly-spaced domain centers
        var centers = {};
        domainIds.forEach(function (id, i) {
            var theta = Math.acos(1 - 2 * (i + 0.5) / N);
            var phi = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
            centers[id] = { theta: theta, phi: phi };
        });

        SKILLS.forEach(function (skill) {
            var domain = DOMAINS[skill.domain];
            var center = centers[skill.domain];
            var siblings = SKILLS.filter(function (s) { return s.domain === skill.domain; });
            var idx = siblings.indexOf(skill);
            var count = siblings.length;

            var theta = center.theta;
            var phi = center.phi;

            if (count > 1) {
                var a = (2 * Math.PI * idx) / count;
                var spread = 0.3 + 0.08 * count;
                var sinT = Math.max(Math.sin(center.theta), 0.3);
                theta += Math.cos(a) * spread;
                phi += Math.sin(a) * spread / sinT;
            }

            theta = Math.max(0.15, Math.min(Math.PI - 0.15, theta));

            var R = CFG.radius;
            var x = R * Math.sin(theta) * Math.cos(phi);
            var y = R * Math.cos(theta);
            var z = R * Math.sin(theta) * Math.sin(phi);

            var tex = glowTexture(domain.rgb);
            var mat = new THREE.SpriteMaterial({
                map: tex,
                transparent: true,
                opacity: 0.9,
                depthWrite: false,
                blending: THREE.NormalBlending,
            });

            var sprite = new THREE.Sprite(mat);
            sprite.position.set(x, y, z);

            var baseScale = CFG.pointBase + (skill.level - 1) * CFG.pointLevelScale;
            sprite.scale.set(baseScale, baseScale, 1);

            sprite.userData = {
                id: skill.id,
                label: skill.label,
                domain: skill.domain,
                level: skill.level,
                tags: skill.tags,
                project: skill.project,
                proofUrl: skill.proofUrl,
                subSkills: skill.subSkills || [],
                baseScale: baseScale,
            };

            // Skill logo badge
            var badgeTex = badgeTexture(domain.color);
            var badgeMat = new THREE.SpriteMaterial({
                map: badgeTex,
                transparent: true,
                opacity: 0.92,
                depthWrite: false,
                depthTest: false,
                blending: THREE.NormalBlending,
            });
            var badge = new THREE.Sprite(badgeMat);
            var badgeScale = baseScale * 1.15;
            badge.scale.set(badgeScale, badgeScale, 1);
            badge.position.set(0, 0, 0);
            badge.userData = { isSkillBadge: true, baseScale: badgeScale };
            badge.renderOrder = 3;
            sprite.add(badge);

            var labelText = SKILL_LABELS[skill.id] || skill.label;
            var labelTex = labelTexture(labelText);
            var labelMat = new THREE.SpriteMaterial({
                map: labelTex,
                transparent: true,
                opacity: 0.9,
                depthWrite: false,
                depthTest: false,
                blending: THREE.NormalBlending,
            });
            var label = new THREE.Sprite(labelMat);
            var labelScale = baseScale * 0.9;
            label.scale.set(labelScale, labelScale, 1);
            label.position.set(0, 0, 0);
            label.userData = { isSkillLabel: true, baseScale: labelScale };
            label.renderOrder = 4;
            sprite.add(label);

            var logoUrl = SKILL_LOGOS[skill.id];
            if (logoUrl) {
                var logoMat = new THREE.SpriteMaterial({
                    map: null,
                    transparent: true,
                    opacity: 0.98,
                    depthWrite: false,
                    depthTest: false,
                    blending: THREE.NormalBlending,
                });
                var logo = new THREE.Sprite(logoMat);
                var logoScale = baseScale * 0.85;
                logo.scale.set(logoScale, logoScale, 1);
                logo.position.set(0, 0, 0);
                logo.userData = { isSkillLogo: true, baseScale: logoScale };
                logo.renderOrder = 5;
                logo.visible = false;
                sprite.add(logo);

                logoTexture(logoUrl, function (tex) {
                    if (tex) {
                        logo.material.map = tex;
                        logo.visible = true;
                        label.visible = false;
                    }
                });

                sprite.userData.logo = logo;
            }

            sprite.userData.badge = badge;
            sprite.userData.label = label;

            group.add(sprite);
            sprites.push(sprite);
        });

        // Create hub sprites at domain centers (star structure)
        domainIds.forEach(function (id) {
            var domain = DOMAINS[id];
            var center = centers[id];
            var theta = center.theta;
            var phi = center.phi;
            var R = CFG.radius;
            var x = R * Math.sin(theta) * Math.cos(phi);
            var y = R * Math.cos(theta);
            var z = R * Math.sin(theta) * Math.sin(phi);

            var tex = glowTexture(domain.rgb);
            var mat = new THREE.SpriteMaterial({
                map: tex,
                transparent: true,
                opacity: 0.55,
                depthWrite: false,
                depthTest: false,
                blending: THREE.NormalBlending,
            });

            var hub = new THREE.Sprite(mat);
            hub.position.set(x, y, z);
            var hubScale = 0.55;
            hub.scale.set(hubScale, hubScale, 1);
            hub.userData = { domain: id, isHub: true, baseScale: hubScale };
            hub.renderOrder = 1;

            var badgeTex = badgeTexture(domain.color);
            var badgeMat = new THREE.SpriteMaterial({
                map: badgeTex,
                transparent: true,
                opacity: 0.95,
                depthWrite: false,
                depthTest: false,
                blending: THREE.NormalBlending,
            });
            var badge = new THREE.Sprite(badgeMat);
            var badgeScale = 1.6;
            badge.scale.set(badgeScale, badgeScale, 1);
            badge.position.set(0, 0, 0);
            badge.userData = { isHubBadge: true, baseScale: badgeScale, domain: id };
            badge.renderOrder = 2;
            hub.add(badge);
            hub.userData.badge = badge;

            var labelText = DOMAIN_LABELS[id] || domain.name;
            var labelTex = labelTexture(labelText);
            var labelMat = new THREE.SpriteMaterial({
                map: labelTex,
                transparent: true,
                opacity: 0.92,
                depthWrite: false,
                depthTest: false,
                blending: THREE.NormalBlending,
            });
            var label = new THREE.Sprite(labelMat);
            var labelScale = 2.0;
            label.scale.set(labelScale, labelScale, 1);
            label.position.set(0, 0, 0);
            label.userData = { isHubLabel: true, baseScale: labelScale, domain: id };
            label.renderOrder = 3;
            hub.add(label);
            hub.userData.label = label;

            var iconChar = DOMAIN_ICONS[id];
            if (iconChar) {
                var logoMat = new THREE.SpriteMaterial({
                    map: null,
                    transparent: true,
                    opacity: 0.98,
                    depthWrite: false,
                    depthTest: false,
                    blending: THREE.NormalBlending,
                });
                var logo = new THREE.Sprite(logoMat);
                var logoScale = 1.8;
                logo.scale.set(logoScale, logoScale, 1);
                logo.position.set(0, 0, 0);
                logo.userData = { isHubLogo: true, baseScale: logoScale, domain: id };
                logo.renderOrder = 4;
                logo.visible = false;
                hub.add(logo);
                hub.userData.logo = logo;

                // Render FA icon when webfont is ready
                (function(logoSprite, labelSprite, ic, col) {
                    if (document.fonts && document.fonts.ready) {
                        document.fonts.ready.then(function() {
                            var tex = domainIconTexture(ic, col);
                            logoSprite.material.map = tex;
                            logoSprite.material.needsUpdate = true;
                            logoSprite.visible = true;
                            if (labelSprite) labelSprite.visible = false;
                        });
                    }
                })(logo, label, iconChar, domain.color);
            }

            group.add(hub);
            hubSprites[id] = hub;
        });
    }

    // ── Lines ──────────────────────────────────────────────────────
    function buildLines() {
        // Star / hub-spoke pattern: each skill connects to its domain hub
        Object.keys(DOMAINS).forEach(function (domainId) {
            var domain = DOMAINS[domainId];
            var hub = hubSprites[domainId];
            if (!hub) return;

            var domSprites = sprites.filter(function (s) { return s.userData.domain === domainId; });
            var edges = [];

            domSprites.forEach(function (sprite) {
                var geo = new THREE.BufferGeometry().setFromPoints([
                    hub.position, sprite.position
                ]);
                var mat = new THREE.LineBasicMaterial({
                    color: new THREE.Color(domain.color),
                    transparent: true,
                    opacity: CFG.lineAlpha,
                });
                var line = new THREE.Line(geo, mat);
                line.userData = { domain: domainId };
                group.add(line);
                edges.push(line);
            });

            linesByDomain[domainId] = edges;
        });
    }

    // ── Sub-Skills ───────────────────────────────────────────────────
    function buildSubSkills() {
        var subRadius = 0.65;
        var subScale = 0.25;

        SKILLS.forEach(function (skill) {
            if (!skill.subSkills || skill.subSkills.length === 0) return;

            // Find parent sprite
            var parent = null;
            for (var i = 0; i < sprites.length; i++) {
                if (sprites[i].userData.id === skill.id) {
                    parent = sprites[i];
                    break;
                }
            }
            if (!parent) return;

            var pos = parent.position;
            var domain = DOMAINS[skill.domain];

            // Compute tangent plane at parent position on sphere
            var normal = new THREE.Vector3().copy(pos).normalize();
            var ref = Math.abs(normal.y) > 0.9
                ? new THREE.Vector3(1, 0, 0)
                : new THREE.Vector3(0, 1, 0);
            var t1 = new THREE.Vector3().crossVectors(normal, ref).normalize();
            var t2 = new THREE.Vector3().crossVectors(normal, t1).normalize();

            var count = skill.subSkills.length;

            skill.subSkills.forEach(function (subLabel, idx) {
                var angle = (2 * Math.PI * idx) / count;
                var subPos = new THREE.Vector3()
                    .copy(pos)
                    .addScaledVector(t1, Math.cos(angle) * subRadius)
                    .addScaledVector(t2, Math.sin(angle) * subRadius);

                var tex = glowTexture(domain.rgb);
                var mat = new THREE.SpriteMaterial({
                    map: tex,
                    transparent: true,
                    opacity: 0.7,
                    depthWrite: false,
                    blending: THREE.NormalBlending,
                });

                var sprite = new THREE.Sprite(mat);
                sprite.position.copy(subPos);
                sprite.scale.set(subScale, subScale, 1);

                sprite.userData = {
                    isSubSkill: true,
                    label: subLabel,
                    parentId: skill.id,
                    parentLabel: skill.label,
                    domain: skill.domain,
                    baseScale: subScale,
                    baseOpacity: 0.7,
                };

                group.add(sprite);
                subSprites.push(sprite);

                // Line from parent to sub-skill
                var lineGeo = new THREE.BufferGeometry().setFromPoints([pos, subPos]);
                var lineMat = new THREE.LineBasicMaterial({
                    color: new THREE.Color(domain.color),
                    transparent: true,
                    opacity: CFG.lineAlpha * 0.55,
                });
                var line = new THREE.Line(lineGeo, lineMat);
                line.userData = { domain: skill.domain, isSubLine: true, baseOpacity: CFG.lineAlpha * 0.55 };
                group.add(line);
                subLines.push(line);
            });
        });
    }

    // ── Skill Name Labels ────────────────────────────────────────────
    function buildSkillLabels() {
        sprites.forEach(function (sprite) {
            var skill = sprite.userData;
            var tex = skillNameTexture(skill.label);
            var mat = new THREE.SpriteMaterial({
                map: tex,
                transparent: true,
                opacity: 0.85,
                depthWrite: false,
                depthTest: false,
                blending: THREE.NormalBlending,
            });

            var label = new THREE.Sprite(mat);

            // Position outward from sphere surface
            var normal = new THREE.Vector3().copy(sprite.position).normalize();
            label.position.copy(sprite.position).addScaledVector(normal, 0.5);

            // 360x100 canvas → aspect 3.6:1
            var s = 0.75;
            label.scale.set(s * 3.6, s, 1);
            label.renderOrder = 10;

            label.userData = {
                isSkillLabel: true,
                domain: skill.domain,
                parentId: skill.id,
                baseOpacity: 0.85,
            };

            group.add(label);
            skillLabels.push(label);
        });
    }

    // ── Ambient Particles ──────────────────────────────────────────
    function buildAmbientParticles() {
        var count = 120;
        var positions = new Float32Array(count * 3);
        var golden = (1 + Math.sqrt(5)) / 2;

        for (var i = 0; i < count; i++) {
            var theta = Math.acos(1 - 2 * (i + 0.5) / count);
            var phi = 2 * Math.PI * i / golden;
            // Slight radius jitter so they don't sit exactly on the sphere
            var R = CFG.radius * (0.92 + Math.random() * 0.16);

            positions[i * 3]     = R * Math.sin(theta) * Math.cos(phi);
            positions[i * 3 + 1] = R * Math.cos(theta);
            positions[i * 3 + 2] = R * Math.sin(theta) * Math.sin(phi);
        }

        var geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        var tex = ambientDotTexture();
        var mat = new THREE.PointsMaterial({
            map: tex,
            size: 6,
            transparent: true,
            opacity: 0.25,
            depthWrite: false,
            blending: THREE.NormalBlending,
            sizeAttenuation: true,
        });

        var points = new THREE.Points(geo, mat);
        group.add(points);
    }

    function ambientDotTexture() {
        var size = 32;
        var c = document.createElement('canvas');
        c.width = c.height = size;
        var ctx = c.getContext('2d');
        var cx = size / 2;

        var g = ctx.createRadialGradient(cx, cx, 0, cx, cx, cx);
        g.addColorStop(0,   'rgba(130, 135, 155, 0.9)');
        g.addColorStop(0.4, 'rgba(130, 135, 155, 0.3)');
        g.addColorStop(1,   'rgba(130, 135, 155, 0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, size, size);

        return new THREE.CanvasTexture(c);
    }

    // ── Events ─────────────────────────────────────────────────────
    function setupEvents() {
        var el = renderer.domElement;

        el.addEventListener('pointerdown', onPointerDown);
        el.addEventListener('pointermove', onPointerMove);
        el.addEventListener('pointerup', onPointerUp);
        el.addEventListener('pointerleave', onPointerLeave);
        el.addEventListener('wheel', onWheel, { passive: false });
        el.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    }

    function onPointerDown(e) {
        dragging = true;
        dragMoved = false;
        dragOrigin = { x: e.clientX, y: e.clientY };

        autoRotate = false;
        clearTimeout(autoResumeTimer);
    }

    function onPointerMove(e) {
        // Update NDC for raycasting
        var rect = containerEl.getBoundingClientRect();
        pointerNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointerNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        if (!dragging) return;

        var dx = e.clientX - dragOrigin.x;
        var dy = e.clientY - dragOrigin.y;

        if (Math.abs(dx) > CFG.dragThreshold || Math.abs(dy) > CFG.dragThreshold) {
            dragMoved = true;
        }

        if (dragMoved) {
            vel.y = (e.clientX - dragOrigin.x) * 0.004;
            vel.x = (e.clientY - dragOrigin.y) * 0.004;
            group.rotation.y += vel.y;
            group.rotation.x += vel.x;
            group.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, group.rotation.x));
            dragOrigin = { x: e.clientX, y: e.clientY };
        }
    }

    function onPointerUp() {
        dragging = false;

        if (!dragMoved) {
            handleClick();
        }

        if (!reducedMotion) {
            autoResumeTimer = setTimeout(function () { autoRotate = true; }, CFG.returnDelay);
        }
    }

    function onPointerLeave() {
        dragging = false;
        pointerNDC.set(-999, -999);
        setHover(null);
        hideTooltip();

        if (!reducedMotion) {
            clearTimeout(autoResumeTimer);
            autoResumeTimer = setTimeout(function () { autoRotate = true; }, CFG.returnDelay);
        }
    }

    function onWheel(e) {
        e.preventDefault();
        camera.position.z = Math.max(
            CFG.zoomMin,
            Math.min(CFG.zoomMax, camera.position.z + Math.sign(e.deltaY) * CFG.zoomStep)
        );
    }

    function findSkillById(id) {
        for (var i = 0; i < sprites.length; i++) {
            if (sprites[i].userData.id === id) return sprites[i].userData;
        }
        return null;
    }

    function handleClick() {
        raycaster.setFromCamera(pointerNDC, camera);
        var hits = raycaster.intersectObjects(interactiveSprites);

        if (hits.length > 0) {
            var hitData = hits[0].object.userData;
            var skill = hitData.isSubSkill ? findSkillById(hitData.parentId) : hitData;
            if (!skill) return;

            if (selectedSkill && selectedSkill.id === skill.id) {
                selectedSkill = null;
                hideDetail();
            } else {
                selectedSkill = skill;
                showDetail(skill);
            }
        } else {
            selectedSkill = null;
            hideDetail();
        }
    }

    function updateRaycast() {
        if (dragging) return;

        raycaster.setFromCamera(pointerNDC, camera);
        var hits = raycaster.intersectObjects(interactiveSprites);

        if (hits.length > 0) {
            var sprite = hits[0].object;
            if (hoveredSprite !== sprite) {
                setHover(sprite);
            }
            var pos = toScreen(sprite);
            showTooltip(sprite.userData, pos);
        } else {
            if (hoveredSprite) {
                setHover(null);
                hideTooltip();
            }
        }
    }

    function setHover(sprite) {
        hoveredSprite = sprite;
        hoveredDomain = sprite ? sprite.userData.domain : null;
        if (renderer && renderer.domElement) {
            renderer.domElement.style.cursor = sprite ? 'pointer' : 'grab';
        }
    }

    // ── Tooltip ────────────────────────────────────────────────────
    function showTooltip(skill, pos) {
        if (!tooltipEl) return;
        var domain = DOMAINS[skill.domain];
        var isSub = skill.isSubSkill;
        var levelHtml = isSub ? '' : '<div class="tooltip-level">' + levelDots(skill.level) + '</div>';
        var subHtml = isSub
            ? '<div class="tooltip-sub">Sous-comp\u00e9tence de ' + skill.parentLabel + '</div>'
            : '';

        tooltipEl.innerHTML =
            '<div class="tooltip-header">' +
                '<span class="tooltip-dot" style="background:' + domain.color + '"></span>' +
                '<strong>' + skill.label + '</strong>' +
            '</div>' +
            '<div class="tooltip-domain">' + domain.name + '</div>' +
            subHtml +
            levelHtml;
        tooltipEl.style.left = pos.x + 'px';
        tooltipEl.style.top = pos.y + 'px';
        tooltipEl.classList.add('visible');
    }

    function hideTooltip() {
        if (tooltipEl) tooltipEl.classList.remove('visible');
    }

    function levelDots(n) {
        var html = '';
        for (var i = 0; i < 3; i++) {
            html += '<span class="level-dot ' + (i < n ? 'filled' : '') + '"></span>';
        }
        return html;
    }

    // ── Detail Panel ───────────────────────────────────────────────
    function showDetail(skill) {
        if (!detailEl) return;
        var domain = DOMAINS[skill.domain];

        var proofHtml = '';
        if (skill.proofUrl) {
            proofHtml = '<a class="detail-proof-link" href="' + skill.proofUrl +
                '" target="_blank" rel="noopener">' +
                '<i class="fas fa-external-link-alt"></i> Voir le projet</a>';
        }

        var tagsHtml = skill.tags.map(function (t) {
            return '<span class="detail-tag">' + t + '</span>';
        }).join('');

        var subHtml = '';
        if (skill.subSkills && skill.subSkills.length) {
            var subTags = skill.subSkills.map(function (s) {
                return '<span class="detail-subskill">' + s + '</span>';
            }).join('');
            subHtml =
                '<div class="detail-subskills">' +
                    '<span class="detail-subskills-title">Sous-comp\u00e9tences</span>' +
                    '<div class="detail-subskills-list">' + subTags + '</div>' +
                '</div>';
        }

        var levelText = ['Débutant', 'Intermédiaire', 'Avancé'][skill.level - 1];
        var levelPct = (skill.level / 3) * 100;

        detailEl.innerHTML =
            '<button class="detail-close" id="sphere-detail-close">' +
                '<i class="fas fa-times"></i>' +
            '</button>' +
            '<div class="detail-badge" style="background:' + domain.color + '20;color:' +
                domain.color + ';border:1px solid ' + domain.color + '40">' +
                domain.name +
            '</div>' +
            '<h3 class="detail-title">' + skill.label + '</h3>' +
            '<div class="detail-level">' +
                '<span class="detail-level-label">Niveau</span>' +
                '<div class="detail-level-bar">' +
                    '<div class="detail-level-fill" style="width:' + levelPct +
                        '%;background:' + domain.color + '"></div>' +
                '</div>' +
                '<span class="detail-level-text">' + levelText + '</span>' +
            '</div>' +
            '<div class="detail-tags">' + tagsHtml + '</div>' +
            subHtml +
            (skill.project ?
                '<div class="detail-project">' +
                    '<span class="detail-project-label">Projet associé</span>' +
                    '<span class="detail-project-name">' + skill.project + '</span>' +
                    proofHtml +
                '</div>' : '');

        detailEl.classList.add('active');

        document.getElementById('sphere-detail-close').addEventListener('click', function () {
            selectedSkill = null;
            hideDetail();
        });
    }

    function hideDetail() {
        if (detailEl) detailEl.classList.remove('active');
    }

    // ── Legend ──────────────────────────────────────────────────────
    function buildLegend() {
        if (!legendEl) return;
        var html = '';
        Object.keys(DOMAINS).forEach(function (id) {
            var d = DOMAINS[id];
            html += '<div class="legend-item" data-domain="' + id + '">' +
                '<span class="legend-dot" style="background:' + d.color + '"></span>' +
                '<span class="legend-label">' + d.name + '</span>' +
            '</div>';
        });
        legendEl.innerHTML = html;

        legendEl.querySelectorAll('.legend-item').forEach(function (item) {
            item.addEventListener('mouseenter', function () {
                hoveredDomain = item.dataset.domain;
            });
            item.addEventListener('mouseleave', function () {
                hoveredDomain = hoveredSprite ? hoveredSprite.userData.domain : null;
            });
        });
    }

    // ── Animation ──────────────────────────────────────────────────
    function animate() {
        rafId = requestAnimationFrame(animate);
        if (!visible) return;

        var t = clock.getElapsedTime();

        // ─ Rotation ─
        if (!dragging) {
            vel.x *= CFG.damping;
            vel.y *= CFG.damping;
            group.rotation.y += vel.y;
            group.rotation.x += vel.x;
            group.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, group.rotation.x));

            if (autoRotate && !reducedMotion) {
                group.rotation.y += CFG.autoSpeed;
            }
        }

        // ─ Sprite effects ─
        for (var i = 0; i < sprites.length; i++) {
            var sprite = sprites[i];
            var isHovDomain = hoveredDomain && sprite.userData.domain === hoveredDomain;
            var isHovered = sprite === hoveredSprite ||
                (hoveredSprite && hoveredSprite.userData.isSubSkill && hoveredSprite.userData.parentId === sprite.userData.id);

            // Opacity: highlight hovered domain, dim others
            var tgtOp = 0.9;
            if (hoveredDomain) {
                tgtOp = isHovDomain ? 1.0 : 0.25;
            }
            sprite.material.opacity += (tgtOp - sprite.material.opacity) * 0.12;

            var badge = sprite.userData.badge;
            var label = sprite.userData.label;
            var logo = sprite.userData.logo;
            if (badge && badge.material) {
                badge.material.opacity += ((tgtOp * 0.95) - badge.material.opacity) * 0.12;
            }
            if (label && label.material) {
                label.material.opacity += ((tgtOp * 0.85) - label.material.opacity) * 0.12;
            }
            if (logo && logo.material) {
                logo.material.opacity += ((tgtOp * 0.98) - logo.material.opacity) * 0.12;
            }

            // Pulse hovered sprite
            if (isHovered && !reducedMotion) {
                var pulse = 1 + Math.sin(t * CFG.pulseHz * Math.PI * 2) * CFG.pulseAmp;
                sprite.scale.setScalar(sprite.userData.baseScale * pulse);
            } else {
                var cs = sprite.scale.x;
                var bs = sprite.userData.baseScale;
                if (Math.abs(cs - bs) > 0.001) {
                    sprite.scale.setScalar(cs + (bs - cs) * 0.1);
                }
            }
        }

        // ─ Hub effects ─
        Object.keys(hubSprites).forEach(function (domId) {
            var hub = hubSprites[domId];
            var isHov = hoveredDomain && domId === hoveredDomain;
            var tgtHubOp = 0.55;
            if (hoveredDomain) {
                tgtHubOp = isHov ? 0.85 : 0.15;
            }
            hub.material.opacity += (tgtHubOp - hub.material.opacity) * 0.12;

            var logo = hub.userData && hub.userData.logo;
            var badge = hub.userData && hub.userData.badge;
            var label = hub.userData && hub.userData.label;
            if (badge && badge.material) {
                var tgtBadgeOp = hoveredDomain ? (isHov ? 1.0 : 0.2) : 0.95;
                badge.material.opacity += (tgtBadgeOp - badge.material.opacity) * 0.12;
            }
            if (label && label.material) {
                if (logo && logo.visible) {
                    label.visible = false;
                } else {
                    label.visible = true;
                }
                var tgtLabelOp = hoveredDomain ? (isHov ? 1.0 : 0.2) : 0.92;
                label.material.opacity += (tgtLabelOp - label.material.opacity) * 0.12;
                if (isHov && !reducedMotion) {
                    var lbPulse = 1 + Math.sin(t * CFG.pulseHz * Math.PI * 2) * (CFG.pulseAmp * 0.3);
                    label.scale.setScalar(label.userData.baseScale * lbPulse);
                } else {
                    var lsc = label.scale.x;
                    var lbs = label.userData.baseScale;
                    if (Math.abs(lsc - lbs) > 0.001) {
                        label.scale.setScalar(lsc + (lbs - lsc) * 0.1);
                    }
                }
            }
            if (logo && logo.material) {
                var tgtLogoOp = hoveredDomain ? (isHov ? 1.0 : 0.2) : 0.98;
                logo.material.opacity += (tgtLogoOp - logo.material.opacity) * 0.12;
                if (isHov && !reducedMotion) {
                    var lPulse = 1 + Math.sin(t * CFG.pulseHz * Math.PI * 2) * (CFG.pulseAmp * 0.4);
                    logo.scale.setScalar(logo.userData.baseScale * lPulse);
                } else {
                    var ls = logo.scale.x;
                    var lbs = logo.userData.baseScale;
                    if (Math.abs(ls - lbs) > 0.001) {
                        logo.scale.setScalar(ls + (lbs - ls) * 0.1);
                    }
                }
            }
        });

        // ─ Line effects ─
        Object.keys(linesByDomain).forEach(function (domId) {
            var isHov = domId === hoveredDomain;
            var tgt = isHov ? CFG.lineHoverAlpha : CFG.lineAlpha;
            var lines = linesByDomain[domId];
            for (var j = 0; j < lines.length; j++) {
                lines[j].material.opacity += (tgt - lines[j].material.opacity) * 0.12;
            }
        });

        // â”€ Sub-skill effects â”€
        for (var k = 0; k < subSprites.length; k++) {
            var sub = subSprites[k];
            var baseOp = sub.userData.baseOpacity || 0.6;
            var isSubHovered = hoveredSprite === sub;
            var isParentHovered = hoveredSprite &&
                !hoveredSprite.userData.isSubSkill &&
                hoveredSprite.userData.id === sub.userData.parentId;
            var isSubDomain = hoveredDomain && sub.userData.domain === hoveredDomain;

            var tgtSubOp = baseOp;
            if (hoveredDomain) {
                tgtSubOp = isSubDomain ? Math.max(baseOp, 0.75) : 0.12;
            }
            if (isParentHovered) tgtSubOp = 0.95;
            if (isSubHovered) tgtSubOp = 1.0;

            sub.material.opacity += (tgtSubOp - sub.material.opacity) * 0.12;

            if ((isSubHovered || isParentHovered) && !reducedMotion) {
                var subPulse = 1 + Math.sin(t * CFG.pulseHz * Math.PI * 2) * (CFG.pulseAmp * 0.6);
                sub.scale.setScalar(sub.userData.baseScale * subPulse);
            } else {
                var sc = sub.scale.x;
                var bs = sub.userData.baseScale;
                if (Math.abs(sc - bs) > 0.001) {
                    sub.scale.setScalar(sc + (bs - sc) * 0.1);
                }
            }
        }

        // â”€ Sub-line effects â”€
        for (var l = 0; l < subLines.length; l++) {
            var lineObj = subLines[l];
            var isHovSub = lineObj.userData.domain === hoveredDomain;
            var baseLineOp = lineObj.userData.baseOpacity || (CFG.lineAlpha * 0.55);
            var tgtSubLine = hoveredDomain ? (isHovSub ? baseLineOp * 1.6 : baseLineOp * 0.35) : baseLineOp;
            lineObj.material.opacity += (tgtSubLine - lineObj.material.opacity) * 0.12;
        }

        // ─ Skill label effects ─
        for (var m = 0; m < skillLabels.length; m++) {
            var lbl = skillLabels[m];
            var lblDomain = lbl.userData.domain;
            var isLblDomain = hoveredDomain && lblDomain === hoveredDomain;
            var isLblParentHov = hoveredSprite &&
                !hoveredSprite.userData.isSubSkill &&
                hoveredSprite.userData.id === lbl.userData.parentId;

            var tgtLblOp = lbl.userData.baseOpacity;
            if (hoveredDomain) {
                tgtLblOp = isLblDomain ? 1.0 : 0.15;
            }
            if (isLblParentHov) tgtLblOp = 1.0;

            lbl.material.opacity += (tgtLblOp - lbl.material.opacity) * 0.12;
        }

        // ─ Raycast ─
        updateRaycast();

        // ─ Render ─
        renderer.render(scene, camera);
    }

    // ── Visibility ─────────────────────────────────────────────────
    function setupVisibility() {
        if (!('IntersectionObserver' in window)) return;

        var obs = new IntersectionObserver(function (entries) {
            visible = entries[0].isIntersecting;
        }, { threshold: 0.1 });

        obs.observe(wrapperEl);
    }

    // ── Screen projection ──────────────────────────────────────────
    function toScreen(obj) {
        var v = new THREE.Vector3();
        obj.getWorldPosition(v);
        v.project(camera);

        var w = containerEl.clientWidth;
        var h = containerEl.clientHeight;

        return {
            x: (v.x * 0.5 + 0.5) * w,
            y: (-v.y * 0.5 + 0.5) * h,
        };
    }

    // ── Mobile Fallback ────────────────────────────────────────────
    function buildMobileFallback() {
        if (!mobileEl) return;

        var html = '';
        Object.keys(DOMAINS).forEach(function (domId) {
            var domain = DOMAINS[domId];
            var domSkills = SKILLS.filter(function (s) { return s.domain === domId; });

            var skillsHtml = domSkills.map(function (skill) {
                var tagsHtml = skill.tags.map(function (t) {
                    return '<span class="mobile-tag">' + t + '</span>';
                }).join('');

                var subHtml = '';
                if (skill.subSkills && skill.subSkills.length) {
                    var subItems = skill.subSkills.map(function (s) {
                        return '<span class="mobile-subskill">' + s + '</span>';
                    }).join('');
                    subHtml = '<div class="mobile-subskills">' + subItems + '</div>';
                }

                var projectHtml = '';
                if (skill.project) {
                    var linkHtml = skill.proofUrl
                        ? ' <a href="' + skill.proofUrl + '" target="_blank" rel="noopener"><i class="fas fa-external-link-alt"></i></a>'
                        : '';
                    projectHtml = '<div class="mobile-skill-project">' +
                        '<i class="fas fa-folder-open"></i> ' + skill.project + linkHtml +
                    '</div>';
                }

                return '<div class="mobile-skill-item">' +
                    '<div class="mobile-skill-header">' +
                        '<span class="mobile-skill-name">' + skill.label + '</span>' +
                        '<span class="mobile-skill-level">' + levelDots(skill.level) + '</span>' +
                    '</div>' +
                    '<div class="mobile-skill-tags">' + tagsHtml + '</div>' +
                    subHtml +
                    projectHtml +
                '</div>';
            }).join('');

            html += '<div class="sphere-domain-group" data-domain="' + domId + '">' +
                '<button class="sphere-domain-header" aria-expanded="false">' +
                    '<span class="domain-dot" style="background:' + domain.color + '"></span>' +
                    '<span class="domain-name">' + domain.name + '</span>' +
                    '<span class="domain-count">' + domSkills.length + '</span>' +
                    '<i class="fas fa-chevron-down domain-chevron"></i>' +
                '</button>' +
                '<div class="sphere-domain-skills">' +
                    '<div class="sphere-domain-skills-inner">' + skillsHtml + '</div>' +
                '</div>' +
            '</div>';
        });

        mobileEl.innerHTML = html;

        // Accordion behavior
        mobileEl.querySelectorAll('.sphere-domain-header').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var grp = btn.closest('.sphere-domain-group');
                var isOpen = grp.classList.contains('open');

                mobileEl.querySelectorAll('.sphere-domain-group').forEach(function (g) {
                    g.classList.remove('open');
                    g.querySelector('.sphere-domain-header').setAttribute('aria-expanded', 'false');
                });

                if (!isOpen) {
                    grp.classList.add('open');
                    btn.setAttribute('aria-expanded', 'true');
                }
            });
        });

        // Open first domain by default
        var first = mobileEl.querySelector('.sphere-domain-group');
        if (first) {
            first.classList.add('open');
            first.querySelector('.sphere-domain-header').setAttribute('aria-expanded', 'true');
        }
    }

    // ── Dispose ────────────────────────────────────────────────────
    function dispose() {
        cancelAnimationFrame(rafId);
        window.removeEventListener('resize', onResize);
        if (renderer) {
            renderer.dispose();
            if (renderer.domElement && renderer.domElement.parentNode) {
                renderer.domElement.parentNode.removeChild(renderer.domElement);
            }
        }
        sprites = [];
        hubSprites = {};
        linesByDomain = {};
        subSprites = [];
        subLines = [];
        skillLabels = [];
        interactiveSprites = [];
    }

    // ── Expose ─────────────────────────────────────────────────────
    window.SkillSphere = { init: init, dispose: dispose };

})();
