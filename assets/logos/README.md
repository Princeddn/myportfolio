# 📁 Logos des entreprises

Ce dossier contient les logos des entreprises pour l'affichage dans les expériences.

## 🖼️ Format des fichiers

- **Format** : PNG avec fond transparent recommandé
- **Taille** : 64x64px à 128x128px optimal
- **Noms de fichiers** : Basés sur le nom de l'entreprise

## 📋 Noms de fichiers attendus

Pour les expériences actuelles :

- `jeedom.png` - Logo JEEDOM
- `qotto.png` - Logo Qotto
- `golf-business-company.png` - Logo Golf Business Company
- `asemi-sa.png` - Logo ASEMI SA
- `songhai-centre.png` - Logo Songhaï Centre

## 🔄 Fonctionnement

- Si le logo existe : affichage de l'image
- Si le logo n'existe pas : affichage d'une icône par défaut (🏢)

## ➕ Ajouter un nouveau logo

1. Placez le fichier PNG dans ce dossier
2. Nommez-le selon le pattern : nom d'entreprise en minuscules, espaces remplacés par des tirets, caractères spéciaux supprimés
3. Le logo apparaîtra automatiquement

## 🎨 Style CSS

Les logos sont stylés automatiquement :
- Bordure arrondie
- Taille fixe (40x40px dans les modals)
- Fallback vers icône si échec de chargement