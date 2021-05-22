# Groupomania P7

## Réseau social d'entreprise

NodeJs, Mysql, React, Redux, Express, Material UI

## Features
- Création de profil utilisateur
- Login avec gestion de session JWT
- Publication de Post
- Ajout d'images dans les Posts
- Commentaires dans les Posts
- Like ou Unlike d'un Post
- Comptage des likes et commentaires par Post
- Edition du profil
- Consultation des profils utilisateurs
- Suivie des autres utilisateurs
- Gestion des droits avec 3 roles (Admin, Modérateur, User)

## Installation
Installer le backend
```sh
cd backend
npm install ou yarn install
```

Installer le frontend
```sh
cd frontend
npm install ou yarn install
```

Ensuite importez le fichier `groupomaniaSql.sql` dans votre base de donnée Mysql pour créer les tables. Un utilisateur `admin@groupomania.com`est crée automatiquement avec les priviléges élevé. Le mot de passe par défaut est `000000`

Vous pouvez également importer le fichier `groupomaniaSqlDemo.sql` qui contient des données de démonstration. Tous les utilisateur ont le mot de passe `000000`

> Configurer les accès à votre base de donnée en modifiant le fichier `backend/app/config/db.config.js`

> Configurer la clé secrete pour JWT en modifiant le fichier `backend/app/config/db.config.js`

> Créer un fichier `.env` dans le dossier `fronted/` et indiquez le port. Par defaut la configuration est `PORT=8081`. Vous pouvez renommer le fichier env.exemple en .env

Selon votre configuration vous devez parametrer le fichier url.constant.js dans le dossier ```frontend/constants/``` en indiquant l'url de l'API.
