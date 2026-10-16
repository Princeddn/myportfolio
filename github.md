repo: Princeddn/myportfolio
branch: main

## Last sync

date: 2026-09-13T18:00:00Z

### Updated in this project

- Recreated the current portfolio homepage as a reference (`Portfolio actuel (référence).dc.html`).
- Built a refreshed multi-page portfolio (`Portfolio v2.dc.html`) with bazil.fr-style transitions.
- Imported profile photo, project image and 16 technology/school logos from `assets/`.
- Ajout du projet « Déploiement de Docker sur automate GTB » (ChirpStack/WAGO CC100, poster ISTIC #1977, dépôt Docker_automate) sous le Master Rennes ; compteur projets porté à 7.
- Contenu synchronisé avec Profile.pdf (LinkedIn) : missions alternance Jeedom (Z-Wave, plugin KNXSecure, R&D), Master Rennes prolongé à sept. 2026, Z-Wave ajouté aux technos, profil autodidacte dev/IA dans le résumé. Rendu repaletté sur la branche principale (bleu Apple, cartes blanches, SF Pro) ; page Rendez-vous refaite façon branche principale.
- Vue Projets refondue : filtres par domaine, grille de cartes visuelles (emplacements image à remplir), page dédiée par projet avec rattachement au diplôme et nav précédent/suivant.
- Page Formation fusionnée dans Parcours (le menu Formation filtre la frise) ; Compétences reliées aux postes/projets ; scroll+curseur respectent prefers-reduced-motion ; lien Calendly repris de script.js ; chiffres LoRa (70+ capteurs, 16 constructeurs) sur les fiches Jeedom.
- Page Expériences refondue en frise chronologique (gantt + récit) avec page de détail par poste ; années d'expérience calculées depuis les dates réelles.
- Content driven by `cv.json` (experiences, projects, formation, certifications, domains, skills).

## Screen map

| Screen | Built from |
| --- | --- |
| Portfolio actuel (référence).dc.html | index.html, styles.css, skillsphere.css, cv.json |
| Portfolio v2.dc.html — Accueil | index.html (hero, stats, canvas IoT), cv.json |
| Portfolio v2.dc.html — Projets | cv.json (projets), styles.css (project cards) |
| Portfolio v2.dc.html — Parcours (frise) | cv.json (experiences, formation, certifications, domains) |
| Portfolio v2.dc.html — Détail d'un poste | cv.json (experiences), assets/logos/* |
| Portfolio v2.dc.html — Projets + détail projet | cv.json (projets), assets/images/projects/* |
| Portfolio v2.dc.html — Compétences | cv.json (competences, skill_logos), script.js (CALENDLY_CONFIG) |
| Portfolio v2.dc.html — À propos | cv.json (resume, competences, skill_logos), assets/images/profile.jpg |
