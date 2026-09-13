# Brief de production — refonte du portfolio

Document de référence : architecture de la page, répartition des tâches,
et liste exhaustive des médias à fournir.

---

## 1. Architecture de la page

Onze scènes, dans cet ordre. Une idée par scène.

| # | Scène | Rôle |
|---|---|---|
| 01 | Hero | Qui tu es, en une phrase |
| 02 | Savoir-faire — ouverture | Annonce : ce que tu sais faire |
| 03 | Savoir-faire — chaîne LoRaWAN | Scène épinglée, 5 étapes du capteur au dashboard |
| 04 | Le chiffre | 71 équipements intégrés, les agrégats |
| 05 | Sélection d'équipements | 10 fiches choisies pour leur diversité d'usage |
| 06 | Catalogue complet | Les 71, filtrables, derrière un lien |
| 07 | Autres savoir-faire | Zigbee, KNX/GTB, photovoltaïque, réseaux électriques |
| 08 | Expériences | Les 6 postes, format chapitre |
| 09 | Projets | Les 6 projets académiques |
| 10 | Formation et certifications | Sobre, logos existants |
| 11 | Contact | Clôture |

---

## 2. Qui produit quoi

C'est le point le plus important du document.

**Ce que je code — tu n'as rien à fournir.**
Tous les schémas techniques animés : propagation radio, trajet d'une trame,
architecture réseau, décodage de payload, compteurs, transitions, diagrammes
d'architecture GTB. En SVG ou canvas animé au scroll. C'est plus net qu'une
vidéo, ça pèse 500 fois moins, et ça suit le thème clair/sombre.

**Ce que tu fournis.**
Tout ce qui montre le réel : photos de matériel et de chantier, captures
d'écran de logiciels et de dashboards, enregistrements d'écran, visuels produit.

**Ce que l'IA produit.**
Uniquement de l'image-to-video à partir de **tes propres photos** : le matériel
reste réel, seul le mouvement de caméra est généré. Ne génère jamais un
équipement entier par IA — les incohérences de bornes, LED et étiquettes sont
immédiatement visibles par un professionnel du domaine.

---

## 3. Les savoir-faire à valider

Proposition de taxonomie, à corriger ou compléter de ton côté.
Chaque entrée doit être formulée en « je sais faire », pas en mot-clé.

### Chaîne LoRaWAN — le cœur de la page

1. **Qualifier et choisir un capteur** — lecture de datasheet, autonomie,
   portée, classe LoRaWAN, adéquation à l'usage.
2. **Configurer un device** — provisioning OTAA/ABP, DevEUI, AppKey, période
   d'émission, mode de confirmation, downlink de configuration.
3. **Configurer et exploiter un LNS** — ChirpStack : profils de device,
   déclaration de gateway, gestion des sessions, lecture des métriques radio.
4. **Écrire et intégrer un décodeur de payload** — 71 équipements, 16
   constructeurs, décodeurs JavaScript et Python.
5. **Piloter en downlink** — 488 commandes action créées, 53 équipements
   pilotables à distance.
6. **Superviser** — dashboards énergétiques, widgets, alertes.

### Bâtiment et domotique

7. **Zigbee** — appairage, réalisation de coffrets domotiques.
8. **KNX** — mise en œuvre sur Jeedom.
9. **GTB/GTC** — suivi et support d'installations.
10. **Automate programmable industriel** — étude d'intégration de protocoles
    domotiques.

### Énergie et électricité

11. **Photovoltaïque** — dimensionnement, monitoring, maintenance à distance
    via VRM.
12. **Réseaux électriques BT/HT** — études, dimensionnement, cartographie SIG.

### Outils

13. **Développement** — Python, JavaScript, VBA.
14. **Calcul et modélisation** — MATLAB, PVsyst, Comsol, QGIS/ArcGIS.

---

## 4. Médias à fournir

### Priorité 1 — sans eux la page ne peut pas sortir

- [ ] **HERO-01** — Portrait. Buste, fond uni, lumière de fenêtre, regard
      caméra. Carré 2400 px. *Celui du site actuel est trop petit.*
- [ ] **VID-01** — Enregistrement d'écran : un dashboard énergétique Jeedom
      avec ses widgets, données qui se rafraîchissent. 12 à 15 s.
      **Scène 03, plan de clôture de la chaîne LoRaWAN.**
- [ ] **VID-02** — Enregistrement d'écran : ChirpStack. Navigation lente dans
      un device profile, puis la vue des trames reçues qui défilent. 12 à 15 s.
      **Scène 03, étape LNS.**
- [ ] **VID-03** — Enregistrement d'écran : l'éditeur de décodeur côté plugin,
      avec une trame brute qui devient des valeurs lisibles. 10 à 12 s.
      **Scène 03, étape décodage.**
- [ ] **IMG-01** — Un coffret domotique monté par toi, ouvert, câblage visible.
      16:9, 2400 px.
- [ ] **IMG-02** — Une gateway LoRaWAN installée sur site. 16:9.
- [ ] **CAT-01** — Les 70 visuels produit du dépôt du plugin, exportés en
      vignettes carrées 400 px. *Scènes 04, 05 et 06.*

### Priorité 2 — les savoir-faire hors LoRaWAN

- [ ] **IMG-03** — Appairage Zigbee en cours : appareils sur l'établi, écran
      de l'interface visible. 16:9.
- [ ] **IMG-04** — Matériel KNX : coupleur, alimentation, bus. 16:9.
- [ ] **IMG-05** — Installation GTB : armoire, régulateur, ou synoptique. 16:9.
- [ ] **IMG-06** — Automate programmable industriel utilisé pour l'étude. 16:9.
- [ ] **CAP-01** — Capture VRM Victron : supervision d'un parc de kits solaires,
      identifiants et noms de sites masqués. 2560 px.
- [ ] **CAP-02** — Capture PVsyst : un dimensionnement complet à l'écran.
- [ ] **CAP-03** — Capture QGIS ou ArcGIS : un réseau électrique cartographié,
      noms de lieux masqués.

### Priorité 3 — un visuel par expérience

- [ ] **EXP-01** — JEEDOM, alternance. Plan de travail en cours d'intégration.
- [ ] **EXP-02** — JEEDOM, stage. Capture d'un dashboard et de ses widgets.
- [ ] **EXP-03** — Qotto. Kit solaire installé, ou capture de la plateforme.
- [ ] **EXP-04** — Golf Business Company. Capture d'une cartographie réseau.
- [ ] **EXP-05** — ASEMI SA. Chantier réseau BT souterrain ou poste HT/BT.
- [ ] **EXP-06** — Songhaï Centre. Atelier de rebobinage moteur.

Pour EXP-04 à EXP-06, tu n'as peut-être aucune archive. Dis-le-moi : je
remplacerai par un schéma vectoriel animé. **Pas de photo de stock** — une
image générique qui n'est pas la tienne dévalue toute la page.

### Priorité 4 — un visuel par projet

- [ ] **PRJ-01** — LoRaWAN Plug and Play. Terminal décodant une trame, capteur
      physique à côté.
- [ ] **PRJ-02** — Pendule inversé. Graphe de stabilisation MATLAB, et si tu
      l'as, une vidéo de la simulation.
- [ ] **PRJ-03** — Station météo Arduino. Montage complet : anémomètre,
      pluviomètre, LCD.
- [ ] **PRJ-04** — Logiciel de dimensionnement PV. Interface avec un cas
      renseigné.
- [ ] **PRJ-05** — Progiciel réseau BT. Interface VBA Excel.
- [ ] **PRJ-06** — Biodigesteur. Rendu Comsol ou plan coté.

### Optionnel — animation par IA

- [ ] **MOT-01** — Portrait animé depuis HERO-01. 6 à 8 s, caméra très lente.
- [ ] **MOT-02** — Gateway ou capteur en rotation lente, depuis IMG-02.

---

## 5. Specs des vidéos de scrub

Les vidéos VID-01 à VID-03 seront jouées **image par image au rythme du
scroll**. Cela impose des contraintes différentes d'une vidéo normale :

- **Un seul plan continu, aucune coupe.** Un montage avec des cuts est
  illisible en scrub.
- **Mouvement lent et régulier.** Pas de zoom brusque, pas d'à-coup de souris.
- **Cadrage fixe** pour les captures d'écran ; trépied obligatoire en photo.
- **Pas de fondu** au début ni à la fin.
- **Aucun son** — la piste audio sera supprimée.
- **1920 × 1080 minimum**, 24 ou 30 images par seconde.
- **12 à 15 secondes.** Au-delà, la section devient trop longue à parcourir.
- **Curseur visible et déplacement délibéré** sur les captures d'écran : le
  lecteur doit suivre l'intention.

Livre les fichiers bruts, je m'occupe de la conversion.

---

## 6. Specs des images

| Usage | Dimensions | Format | Poids cible |
|---|---|---|---|
| Portrait hero | 2400 × 2400 | WebP + JPEG | < 250 Ko |
| Plan de section | 2400 × 1350 (16:9) | WebP + JPEG | < 300 Ko |
| Vignette équipement | 400 × 400 | WebP | < 25 Ko |
| Capture d'écran | 2560 px de large | WebP | < 300 Ko |
| Certificat | 1600 × 1200 | WebP | < 200 Ko |

Arborescence :

```
assets/media/
  hero/        portrait
  hardware/    photos de matériel et de chantier
  catalog/     les 70 vignettes produit
  captures/    captures de logiciels et dashboards
  experience/  un visuel par poste
  projects/    un visuel par projet
  video/       fichiers bruts VID-01 à VID-03
```

---

## 7. Avant de publier

- [ ] Accord de JEEDOM pour les captures d'écran, photos de matériel et
      visuels produit du dépôt du plugin
- [ ] Accord de Qotto pour les captures de la plateforme de supervision
- [ ] Floutage : noms de clients, adresses, adresses IP, DevEUI, AppKey,
      numéros de série, coordonnées GPS précises, identifiants de compte
- [ ] Vérifier qu'aucune clé de session LoRaWAN n'apparaît en clair dans les
      captures ChirpStack

---

## 8. Méthode de prise de vue

1. Feuille blanche ou grise près d'une fenêtre, sans soleil direct.
2. Téléphone sur support, même hauteur et même distance pour toute la série.
3. Angle de trois quarts ou de face, mais le même partout.
4. Pas de flash. Une seconde feuille blanche à l'opposé débouche les ombres.
5. Deux prises par objet : de face et de trois quarts.

## 9. Conversion

Vidéo vers séquence d'images pour le scrub :

```bash
ffmpeg -i source.mp4 -vf "fps=24,scale=1600:-2" -q:v 6 frame-%03d.jpg
```

Vidéo réencodée pour un seek fluide sur iOS :

```bash
ffmpeg -i source.mp4 -an -vf "scale=1600:-2" -c:v libx264 -crf 23 -g 1 -pix_fmt yuv420p scrub.mp4
```

Image vers vignette carrée WebP :

```bash
ffmpeg -i photo.jpg -vf "scale=400:400:force_original_aspect_ratio=increase,crop=400:400" -q:v 80 vignette.webp
```
