# 🚀 Portfolio de Prince Noukounwoui

Portfolio interactif organisé par domaines d'expertise avec chargement dynamique des données depuis `cv.json`.

## 🎯 Domaines d'expertise

- **IoT & Domotique** - JEEDOM (Zigbee, LoRaWAN, KNX)
- **Énergie & Photovoltaïque** - Qotto (Monitoring IoT, VRM)
- **Réseaux & Infrastructure** - Golf Business (QGIS, ArcGIS)
- **Électrotechnique** - ASEMI SA, Songhaï (Réseaux BT/HT)

## 🚀 Démarrage rapide

### Méthode recommandée : Serveur local
```bash
# Démarrer le serveur Python
python server.py

# Le navigateur s'ouvre automatiquement sur http://localhost:8000
```

### Alternative : Serveur Node.js
```bash
# Si vous avez Node.js installé
npx http-server . -p 8000 -c-1

# Puis ouvrir http://localhost:8000
```

### Alternative : Live Server (VS Code)
```bash
# Installer l'extension Live Server dans VS Code
# Clic droit sur index.html > "Open with Live Server"
```

## 📁 Structure du projet

```
myportfolio/
├── index.html          # Page principale
├── script.js           # JavaScript principal (sans données hardcodées)
├── styles.css          # Styles CSS Apple-like
├── cv.json            # Données CV (source unique)
├── server.py          # Serveur de développement
└── README.md          # Ce fichier
```

## 🔧 Fonctionnalités

- ✅ **Chargement JSON dynamique** - Toutes les données viennent de `cv.json`
- ✅ **Organisation par domaines** - Expériences classées par expertise
- ✅ **Interface interactive** - Modals de domaines, curseur personnalisé
- ✅ **Design responsive** - Optimisé mobile/tablette/desktop
- ✅ **Intégration Calendly** - Système de prise de rendez-vous
- ✅ **Arrière-plan thématique** - Particules qui changent par domaine

## 🎨 Personnalisation

Modifiez `cv.json` pour mettre à jour :
- Informations personnelles
- Expériences professionnelles
- Projets et réalisations
- Formation et certifications
- Compétences techniques

Le portfolio se met automatiquement à jour !

## 🛠️ Dépannage

### ❌ Erreur CORS
```
Solution : Utilisez un serveur local
python server.py
```

### ❌ cv.json non trouvé
```
Vérifiez que cv.json est dans le même dossier que index.html
```

### ❌ Modals qui ne s'ouvrent pas
```
Ouvrez la console (F12) pour voir les erreurs JavaScript
```

## 📱 Compatibilité

- ✅ Chrome, Firefox, Safari, Edge (dernières versions)
- ✅ Responsive mobile/tablette/desktop
- ✅ Curseur personnalisé sur desktop uniquement
- ✅ Feedback tactile sur mobile/tablette

## 🔄 Mise à jour

Pour mettre à jour le portfolio :

1. Modifiez `cv.json` avec vos nouvelles données
2. Rechargez la page
3. Les changements sont automatiquement appliqués

---

**💡 Tip** : Utilisez toujours un serveur local pour éviter les problèmes CORS !
