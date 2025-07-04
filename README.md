
# Budgee

Application web de gestion de budget personnel avec utilisateurs, comptes, transactions, catégories, statistiques, et traductions.

Développé par Antoine RICHARD

## Les Fonctionnalités

- Thème clair/sombre
- Internationalisation (français / anglais)
- Responsive design (mobile / desktop)
- Statistiques mensuelles (graphiques)
- Affichage des transactions récentes (tableau + cartes responsive)
- Page de profil (modification des infos, avatar, suppression)
- Formulaires sécurisés pour inscription, connexion, mise à jour

## Bonus

- Responsive design (mobile / desktop)

## Lien externe

Figma : https://www.figma.com/design/iHhUT56KhHDlVPIMZrzq64/DEV-WEB?node-id=28-311&t=YV4AYmS3wX8gDGhK-1

---

## Stack technique

### Frontend

- **Vite + React**
- **Axios**
- **Chart.js**
- **i18next** (traduction)

---

## Installation

### Prérequis

- [Node.js ≥ 18](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community) (local ou [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Cloner le projet

```bash
git clone https://github.com/zkerkeb-classfront-projet-final-anto95240.git
```

Démarrer le frontend :

```bash
npm install
```

Créer un fichier .env.local :
```bash
VITE_API_URL=http://localhost:5000
```

Lancer l'application (après s'etre assurer que le backend est lancé : [voir ici](https://github.com/zkerkeb-class/projet-final-back-anto95240/tree/main)) :
```bash
npm run dev
```

# Licence
Projet personnel open-source. Utilisation libre pour apprentissage et développement personnel.
