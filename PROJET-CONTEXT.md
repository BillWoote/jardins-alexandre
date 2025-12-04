# Les Jardins d'Alexandre - Documentation Projet

## 📋 Vue d'ensemble

Site web vitrine pour une entreprise de paysagisme avec système d'administration complet.

**Créé le** : 21 novembre 2025
**Technologies** : Next.js 15, TypeScript, Tailwind CSS, Prisma, SQLite, NextAuth.js

---

## 🏗️ Architecture du Projet

### Stack Technique

- **Framework** : Next.js 15.5.6 (App Router)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS avec palette personnalisée
- **Base de données** : SQLite avec Prisma ORM
- **Authentication** : NextAuth.js v4 avec JWT
- **Email** : Nodemailer (SMTP)
- **Upload** : API Next.js avec système de fichiers

### Palette de Couleurs

```
primary: green (jardinage)
- 50: '#f0fdf4'
- 100: '#dcfce7'
- 500: '#22c55e'
- 600: '#16a34a' (principal)
- 700: '#15803d'
- 900: '#14532d'

wood (tons bois)
- 50: '#fef3e8'
- 600: '#d97706'

stone (tons pierre)
- 50: '#f8fafc'
- 600: '#475569'
```

---

## 📁 Structure des Dossiers

```
/app
  /admin              # Dashboard administration
    /login           # Page de connexion admin
    /projects        # Gestion des projets
      /new           # Créer un nouveau projet
      /[id]          # Éditer un projet existant
    /settings        # Paramètres du site
  /api
    /admin
      /projects      # API CRUD projets
        /[id]
          /images    # API gestion images
      /settings      # API paramètres site
      /upload        # API upload fichiers
    /auth            # NextAuth routes
    /contact         # API formulaire contact
  /realisations      # Page portfolio
    /[slug]          # Détail d'un projet
  /services          # Page services
  /a-propos          # Page à propos
  /contact           # Page contact
  /mentions-legales
  /politique-confidentialite

/components
  - ContactForm.tsx  # Formulaire de contact
  - Footer.tsx       # Pied de page
  - Header.tsx       # Navigation principale
  - Lightbox.tsx     # Visionneuse d'images
  - ProjectsClient.tsx # Composant projets côté client

/config
  - site.ts          # Configuration du site

/lib
  - auth.ts          # Configuration NextAuth
  - email.ts         # Configuration Nodemailer
  - prisma.ts        # Client Prisma singleton
  - utils.ts         # Fonctions utilitaires

/prisma
  - schema.prisma    # Schéma de base de données
  - seed.ts          # Données de test
  - dev.db           # Base de données SQLite

/public
  - logo.avif        # Logo de l'entreprise
  /uploads           # Images uploadées (gitignored)

/types
  - next-auth.d.ts   # Types NextAuth personnalisés
```

---

## 🗄️ Schéma de Base de Données

### Modèle User
```prisma
- id: String (UUID)
- email: String (unique)
- password: String (bcrypt)
- name: String?
- createdAt: DateTime
- updatedAt: DateTime
```

### Modèle Project
```prisma
- id: String (UUID)
- title: String
- slug: String (unique)
- category: String (terrasse, jardin, elagage, autre)
- location: String?
- description: String (text)
- order: Int (default: 0)
- published: Boolean (default: false)
- images: Image[] (relation)
- createdAt: DateTime
- updatedAt: DateTime
```

### Modèle Image
```prisma
- id: String (UUID)
- url: String
- alt: String?
- order: Int (default: 0)
- projectId: String
- project: Project (relation)
- createdAt: DateTime
```

### Modèle Setting
```prisma
- key: String (unique)
- value: String
- createdAt: DateTime
- updatedAt: DateTime
```

### Modèle Testimonial
```prisma
- id: String (UUID)
- author: String
- content: String (text)
- rating: Int (1-5)
- projectId: String?
- project: Project? (relation)
- createdAt: DateTime
```

---

## 🔐 Authentification

### Identifiants par Défaut
- **Email** : `admin@jardinsalexandre.fr`
- **Mot de passe** : `changeme123`

### Configuration NextAuth
- **Provider** : Credentials (email + password)
- **Session** : JWT
- **Secret** : Variable d'environnement `NEXTAUTH_SECRET`

### Protection des Routes
- Pages admin protégées avec `getServerSession`
- Redirection vers `/admin/login` si non authentifié
- Layout admin sans protection globale (évite boucle infinie)

---

## 🎨 Fonctionnalités Principales

### Front-end Public

1. **Page d'accueil** (`/`)
   - Hero section avec CTA
   - Services en vedette
   - Portfolio de projets (6 derniers)
   - Section avantages
   - Statistiques

2. **Réalisations** (`/realisations`)
   - Grille de projets avec filtres (catégorie)
   - Recherche par mot-clé
   - Détail de projet avec galerie d'images
   - Lightbox pour visionner images

3. **Services** (`/services`)
   - Liste des services proposés
   - Processus de travail
   - Engagement qualité

4. **À propos** (`/a-propos`)
   - Histoire de l'entreprise
   - Valeurs
   - Équipe

5. **Contact** (`/contact`)
   - Formulaire de contact
   - Informations de contact
   - Envoi d'email via API

### Back-office Admin

1. **Dashboard** (`/admin`)
   - Statistiques (total projets, publiés, brouillons)
   - Actions rapides
   - Liste des projets récents

2. **Gestion des Projets** (`/admin/projects`)
   - Liste tous les projets avec miniatures
   - Créer un nouveau projet
   - Éditer projet existant
   - Supprimer un projet
   - Gestion des images (drag & drop)
   - Statut publication (publié/brouillon)

3. **Upload d'Images**
   - Drag & drop d'images
   - Sélection de fichier classique
   - Validation : JPG, PNG, WEBP, AVIF (max 5MB)
   - Stockage dans `/public/uploads/`
   - URLs automatiques

4. **Paramètres** (`/admin/settings`)
   - Nom du site
   - Slogan
   - Description
   - Téléphone
   - Email
   - Adresse

---

## 🔌 API Routes

### Projets
- `GET /api/admin/projects` - Liste tous les projets
- `POST /api/admin/projects` - Créer un projet
- `GET /api/admin/projects/[id]` - Détail d'un projet
- `PUT /api/admin/projects/[id]` - Modifier un projet
- `DELETE /api/admin/projects/[id]` - Supprimer un projet

### Images
- `POST /api/admin/projects/[id]/images` - Ajouter une image
- `DELETE /api/admin/projects/[id]/images/[imageId]` - Supprimer une image
- `PUT /api/admin/projects/[id]/images/[imageId]` - Modifier une image

### Upload
- `POST /api/admin/upload` - Upload un fichier image

### Paramètres
- `GET /api/admin/settings` - Récupérer les paramètres
- `PUT /api/admin/settings` - Modifier les paramètres

### Contact
- `POST /api/contact` - Envoyer un message de contact

### Auth
- `POST /api/auth/signin` - Connexion
- `POST /api/auth/signout` - Déconnexion
- `GET /api/auth/session` - Session actuelle

---

## ⚙️ Variables d'Environnement

Fichier `.env` :

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-change-this-in-production"

# Admin credentials (change these!)
ADMIN_EMAIL="admin@jardinsalexandre.fr"
ADMIN_PASSWORD="changeme123"

# Email configuration (SMTP)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="contact@jardinsalexandre.fr"
CONTACT_EMAIL="contact@jardinsalexandre.fr"
```

---

## 🚀 Installation et Démarrage

### Installation

```bash
npm install --legacy-peer-deps
```

### Configuration Base de Données

```bash
# Créer/synchroniser la base de données
npx prisma db push

# Générer le client Prisma
npx prisma generate

# Peupler avec des données de test
npm run db:seed
```

### Développement

```bash
npm run dev
# Serveur disponible sur http://localhost:3000
```

### Production

```bash
# Build
npm run build

# Démarrer
npm start
```

---

## 📝 Scripts NPM

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "db:push": "prisma db push",
  "db:seed": "tsx prisma/seed.ts",
  "postinstall": "prisma generate"
}
```

---

## 🐛 Problèmes Connus et Solutions

### 1. Fichier package.json vide (OneDrive)
**Problème** : OneDrive peut corrompre le fichier `package.json`
**Solution** : Recréer le fichier ou déplacer le projet hors de OneDrive

### 2. Boucle de redirection `/admin/login`
**Problème** : Layout admin protégeait toutes les routes y compris login
**Solution** : Protection au niveau des pages individuelles, pas du layout

### 3. Prisma Client undefined
**Problème** : Client Prisma non généré après réinstallation
**Solution** : Exécuter `npx prisma generate` manuellement

### 4. Erreur cache Next.js
**Problème** : Cache `.next` corrompu
**Solution** : `rm -rf .next` puis redémarrer

---

## 📦 Dépendances Principales

```json
{
  "dependencies": {
    "next": "^15.5.6",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@prisma/client": "^6.19.0",
    "next-auth": "^4.24.11",
    "bcryptjs": "^2.4.3",
    "nodemailer": "^6.9.0"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@types/bcryptjs": "^2.4.6",
    "@types/nodemailer": "^6.4.16",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "eslint": "^9",
    "eslint-config-next": "^15.5.6",
    "prisma": "^6.19.0",
    "tsx": "^4.19.2"
  }
}
```

---

## 🎯 Fonctionnalités Implémentées

✅ **Pages publiques**
- Accueil avec hero et sections
- Portfolio filtrable
- Détail projet avec lightbox
- Services
- À propos
- Contact avec formulaire
- Mentions légales
- Politique de confidentialité

✅ **Administration**
- Authentification sécurisée
- Dashboard avec statistiques
- CRUD complet des projets
- Upload d'images (drag & drop)
- Gestion des paramètres du site
- Gestion brouillons/publications

✅ **Fonctionnalités techniques**
- SEO optimisé (metadata)
- Responsive design
- Favicon personnalisé
- Images optimisées
- Navigation avec active states
- Formulaires validés
- Messages d'erreur clairs

---

## 🔮 Améliorations Futures Possibles

- [ ] Upload multiple d'images simultané
- [ ] Réorganisation des images par drag & drop
- [ ] Compression automatique des images
- [ ] Gestion des témoignages clients
- [ ] Statistiques de visites
- [ ] Blog/actualités
- [ ] Multilingue (FR/EN)
- [ ] Mode sombre
- [ ] PWA (Progressive Web App)
- [ ] Calendrier de rendez-vous
- [ ] Devis en ligne
- [ ] Galerie Instagram
- [ ] Google Maps intégration
- [ ] Optimisation SEO avancée

---

## 📞 Support & Maintenance

### Commandes Utiles

```bash
# Voir les logs Prisma
npx prisma studio

# Reset la base de données
rm prisma/dev.db
npx prisma db push
npm run db:seed

# Vérifier les erreurs
npm run lint

# Nettoyer le cache
rm -rf .next node_modules
npm install --legacy-peer-deps
```

### URLs Importantes

- **Site public** : http://localhost:3000
- **Admin** : http://localhost:3000/admin
- **Login** : http://localhost:3000/admin/login
- **API Docs** : Voir section API Routes ci-dessus

---

## 📄 Licence

Projet privé - Tous droits réservés

---

**Dernière mise à jour** : 21 novembre 2025
**Version** : 1.0.0
