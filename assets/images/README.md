# 📸 Images du portfolio

Ce dossier contient les images utilisées dans le portfolio.

## 🖼️ Photo de profil

### Fichier attendu
- **Nom** : `profile.jpg` ou `profile.png`
- **Taille recommandée** : 400x400px minimum
- **Format** : JPG ou PNG
- **Qualité** : Photo professionnelle haute résolution

### Comment ajouter votre photo

1. **Ajoutez votre photo** dans ce dossier avec le nom `profile.jpg`
2. **Modifiez le chemin** dans `script.js` si nécessaire :
   ```javascript
   "photo": "./assets/images/profile.jpg"
   ```
3. **Rechargez** la page - votre photo apparaîtra automatiquement

### Fallback

Si la photo n'est pas trouvée, une icône utilisateur (👤) s'affichera à la place.

## 🎨 Style automatique

La photo sera automatiquement :
- **Redimensionnée** en cercle
- **Centrée** dans le hero
- **Responsive** sur tous les appareils

## 📱 Formats supportés

- `.jpg` / `.jpeg`
- `.png`
- `.webp`