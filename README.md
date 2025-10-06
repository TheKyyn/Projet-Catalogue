# Projet Catalogue

Application NestJS/Angular pour rechercher et afficher des données provenant des bases Oracle MyETV et Nota via l'API Simply.

## 📁 Structure du Projet

```
projet-catalogue/
├── backend/          # API NestJS
│   ├── src/
│   │   ├── catalogue/    # Module pour la recherche de catalogue launch
│   │   ├── broadcast/    # Module pour la recherche broadcast MyETV
│   │   └── main.ts
│   └── package.json
├── frontend/         # Application Angular
│   ├── src/
│   └── package.json
└── README.md
```

## 🎯 Fonctionnalités

### Backend (NestJS)
- **Module Catalogue** : Recherche de launches par titre original
- **Module Broadcast** : Recherche de diffusions MyETV via idLaunch (table nota_local_description)
- Connexion à 2 bases de données Oracle :
  - MyETV
  - Nota

### Frontend (Angular)
- Interface de recherche de Catalogue Launch
- Affichage des diffusions MyETV liées
- Affichage des données Simply (via external_ids)

## 🚀 Installation

### Prérequis
- Node.js v20+ (recommandé : v20.19+)
- npm v9+
- Oracle Instant Client (pour la connexion aux bases Oracle)
- Accès aux bases de données MyETV et Nota

### Installation Backend

```bash
cd backend
npm install
```

### Installation Frontend

```bash
cd frontend
npm install
```

## ⚙️ Configuration

### Variables d'environnement (Backend)

Créer un fichier `.env` dans le dossier `backend/` :

```env
# Base de données MyETV
MYETV_HOST=localhost
MYETV_PORT=1521
MYETV_USERNAME=votre_user
MYETV_PASSWORD=votre_password
MYETV_SERVICE_NAME=myetv

# Base de données Nota
NOTA_HOST=localhost
NOTA_PORT=1521
NOTA_USERNAME=votre_user
NOTA_PASSWORD=votre_password
NOTA_SERVICE_NAME=nota

# API Simply
SIMPLY_API_URL=http://localhost:xxxx

# Application
PORT=3000
```

## 🏃 Démarrage

### Backend
```bash
cd backend
npm run start:dev
```
Le serveur démarre sur http://localhost:3000

### Frontend
```bash
cd frontend
npm start
```
L'application démarre sur http://localhost:4200

## 📡 Endpoints API

### Catalogue
- `GET /catalogue/search?title={originalTitle}` - Rechercher un launch par titre original

### Broadcast
- `GET /broadcast/search?idLaunch={id}` - Rechercher les diffusions MyETV par idLaunch

## 🗄️ Base de données

### Tables principales
- **Nota** : `nota_local_description` (contient les external_ids)
- **MyETV** : Schéma `ETLMYETV` (contient les données Simply)

## 📚 Technologies

### Backend
- NestJS 11
- TypeORM
- Oracle Database (oracledb)
- RxJS

### Frontend
- Angular 18
- TypeScript
- RxJS

## 📖 Prochaines étapes

1. Configurer les connexions aux bases de données Oracle
2. Implémenter les services de recherche
3. Créer les DTOs pour les requêtes/réponses
4. Développer l'interface utilisateur Angular
5. Connecter le frontend au backend

## 👨‍💻 Développement

Ce projet suit une approche d'apprentissage progressive. Chaque module est documenté pour faciliter la compréhension.

---

**Note** : Ce projet est configuré pour fonctionner en local uniquement.

# Projet-Catalogue
