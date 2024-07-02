### Test Technique pour Développeurs Frontend (Angular/React/React Native) avec Backend Node.js Mock

#### Objectif
Créer une application front-end en Angular, React ou React Native qui interagit avec un backend Node.js mock. L'objectif est d'évaluer la compétence du candidat en termes de modularisation des composants, de structuration de l'application, et de déploiement avec Docker.

#### Durée estimée
3 heures

### Instructions

#### Partie 1: Backend Mock en Node.js
1. **Créer un serveur mock en Node.js avec Express.**
   - Le serveur doit avoir deux endpoints :
     - `GET /api/items`: Retourne une liste d'items.
     - `POST /api/items`: Ajoute un item à la liste.
   - Les données peuvent être stockées en mémoire (pas besoin de base de données).

#### Partie 2: Application Frontend
1. **Choisir une des technologies suivantes : Angular, React ou React Native.**
2. **Créer une application front-end qui consomme le backend mock.**

#### Fonctionnalités de l'application front-end
1. **Affichage de la liste des items :**
   - Une page ou une vue qui affiche la liste des items récupérés du serveur via l'endpoint `GET /api/items`.
2. **Ajout d'un nouvel item :**
   - Un formulaire ou une interface qui permet d'ajouter un nouvel item via l'endpoint `POST /api/items`.
3. **Modularisation :**
   - Utiliser une architecture modulaire avec des composants bien définis.
   - Chaque composant doit avoir sa propre logique et style (si applicable).
4. **Gestion de l'état (State Management) :**
   - Utiliser une solution de gestion de l'état appropriée (par exemple, NgRx pour Angular, Redux ou Context API pour React).
5. **Tests :**
   - Inclure des tests unitaires pour les composants principaux et les services.

#### Partie 3: Conteneurisation avec Docker
1. **Créer un Dockerfile pour le backend Node.js.**
2. **Créer un Dockerfile pour l'application front-end.**
3. **Créer un fichier `docker-compose.yml` pour orchestrer les services :**
   - Un service pour le backend.
   - Un service pour le front-end.
4. **Démarrer les services avec Docker Compose et vérifier que l'application fonctionne correctement.**

### Détails Techniques

#### Backend (Node.js + Express)
```javascript
// server.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

let items = [];

app.get('/api/items', (req, res) => {
  res.json(items);
});

app.post('/api/items', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json(newItem);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

#### Dockerfile pour le backend
```dockerfile
# Dockerfile
FROM node:14

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

#### Dockerfile pour le frontend
Angular:
```dockerfile
# Dockerfile
FROM node:14 as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/<nom-du-projet> /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

React:
```dockerfile
# Dockerfile
FROM node:14 as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### docker-compose.yml
```yaml
version: '3'

services:
  backend:
    build: ./backend
    ports:
      - "3000:3000"
  frontend:
    build: ./frontend
    ports:
      - "80:80"
```

### Livrables attendus
1. **Code source de l'application front-end et back-end.**
2. **Fichiers Docker et docker-compose fonctionnels.**
3. **Instructions pour lancer l'application avec Docker.**

### Critères d'évaluation
1. **Fonctionnalité :** L'application fonctionne comme attendu et interagit correctement avec le backend.
2. **Modularisation :** Les composants sont bien structurés et modulaires.
3. **Code propre :** Le code est bien organisé, lisible et commenté si nécessaire.
4. **Conteneurisation :** L'application est correctement conteneurisée et peut être lancée avec Docker Compose.
5. **Tests :** Présence et qualité des tests unitaires.

Bonne chance !