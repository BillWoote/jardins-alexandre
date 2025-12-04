# Les Jardins d'Alexandre - Site Vitrine

Site web professionnel pour l'entreprise de paysagisme **Les Jardins d'Alexandre**, spécialisée dans l'aménagement de terrasses, la création de jardins et l'élagage d'arbres.

## 📋 Fonctionnalités

### Partie Publique
- 🏠 **Page d'accueil** avec hero section, présentation des services et réalisations mises en avant
- 📸 **Portfolio** de réalisations avec filtres par catégorie et galerie photos
- 🛠️ **Page services** détaillant les trois activités principales
- 👤 **Page à propos** présentant l'entreprise et ses valeurs
- 📧 **Formulaire de contact** avec envoi d'email
- ⚖️ **Pages légales** (mentions légales, politique de confidentialité)

### Partie Administration
- 🔐 **Authentification sécurisée** avec NextAuth.js
- 📊 **Tableau de bord** avec statistiques
- ✏️ **Gestion des projets** (CRUD complet)
- 🖼️ **Upload d'images** pour les réalisations
- ⚙️ **Gestion des paramètres** du site
- 📝 **Gestion des contenus** textuels

## 🛠️ Stack Technique

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Langage**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Base de données**: SQLite avec [Prisma ORM](https://www.prisma.io/)
- **Authentification**: [NextAuth.js](https://next-auth.js.org/)
- **Email**: [Nodemailer](https://nodemailer.com/)
- **Validation**: [Zod](https://zod.dev/)
- **Optimisation images**: [Sharp](https://sharp.pixelplumbing.com/)

## 📦 Installation

### Prérequis

- Node.js 20.9.0 ou supérieur
- npm ou pnpm

### Étapes d'installation

1. **Cloner le projet**
```bash
git clone <repository-url>
cd WebSite-JardinsAlex
```

2. **Installer les dépendances**
```bash
npm install --legacy-peer-deps
```

3. **Configurer les variables d'environnement**

Copier le fichier `.env.example` en `.env` :
```bash
cp .env.example .env
```

Puis éditer `.env` et configurer :

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="générer-une-clé-secrète-aléatoire"

# Admin credentials
ADMIN_EMAIL="admin@jardinsalexandre.fr"
ADMIN_PASSWORD="votre-mot-de-passe-securise"

# Email configuration (exemple avec Gmail)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="votre-email@gmail.com"
EMAIL_SERVER_PASSWORD="votre-mot-de-passe-app"
EMAIL_FROM="contact@jardinsalexandre.fr"
CONTACT_EMAIL="contact@jardinsalexandre.fr"
```

**Générer NEXTAUTH_SECRET** :
```bash
openssl rand -base64 32
```

**Configuration Email (Gmail)** :
- Activer l'authentification à deux facteurs sur votre compte Google
- Créer un mot de passe d'application : [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
- Utiliser ce mot de passe dans `EMAIL_SERVER_PASSWORD`

4. **Initialiser la base de données**
```bash
npm run db:push
npm run db:seed
```

5. **Lancer le serveur de développement**
```bash
npm run dev
```

Le site est accessible sur [http://localhost:3000](http://localhost:3000)

## 🚀 Déploiement

### Vercel (Recommandé)

1. **Créer un compte** sur [Vercel](https://vercel.com)

2. **Importer le projet**
   - Connecter votre repository Git
   - Vercel détectera automatiquement Next.js

3. **Configurer les variables d'environnement**
   - Dans les settings du projet, ajouter toutes les variables du fichier `.env`
   - ⚠️ Important : changer `ADMIN_PASSWORD` et `NEXTAUTH_SECRET` en production

4. **Déployer**
   - Vercel déploie automatiquement à chaque push sur la branche principale

### Autres plateformes

Le projet est compatible avec :
- **Netlify**
- **Railway**
- **Render**
- **DigitalOcean App Platform**

Pour ces plateformes, assurez-vous de :
- Configurer la commande de build : `npm run build`
- Configurer la commande de start : `npm run start`
- Ajouter toutes les variables d'environnement

## 📂 Structure du Projet

```
├── app/                      # Pages et routes Next.js (App Router)
│   ├── (public)/            # Pages publiques
│   │   ├── page.tsx         # Page d'accueil
│   │   ├── realisations/    # Portfolio
│   │   ├── services/        # Services
│   │   ├── a-propos/        # À propos
│   │   └── contact/         # Contact
│   ├── admin/               # Interface d'administration
│   │   ├── login/           # Connexion admin
│   │   ├── projects/        # Gestion des projets
│   │   └── settings/        # Paramètres
│   ├── api/                 # Routes API
│   │   ├── auth/            # NextAuth
│   │   └── contact/         # Formulaire de contact
│   ├── layout.tsx           # Layout principal
│   └── globals.css          # Styles globaux
├── components/              # Composants React réutilisables
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ContactForm.tsx
│   └── Lightbox.tsx
├── config/                  # Configuration
│   └── site.ts              # Configuration du site
├── lib/                     # Utilitaires
│   ├── prisma.ts            # Client Prisma
│   ├── email.ts             # Envoi d'emails
│   └── utils.ts             # Fonctions utilitaires
├── prisma/                  # Base de données
│   ├── schema.prisma        # Schéma de la BDD
│   └── seed.ts              # Données initiales
└── public/                  # Assets statiques
    └── uploads/             # Images uploadées
```

## 🔐 Administration

### Accès à l'admin

URL : [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

Identifiants par défaut :
- Email : `admin@jardinsalexandre.fr`
- Mot de passe : `changeme123`

⚠️ **IMPORTANT** : Changez immédiatement ces identifiants en production !

### Fonctionnalités admin

1. **Gestion des projets**
   - Créer, modifier, supprimer des réalisations
   - Uploader plusieurs photos par projet
   - Organiser par catégorie (terrasse, jardin, élagage)
   - Publier/dépublier des projets

2. **Gestion des contenus**
   - Modifier les textes des pages
   - Gérer les témoignages
   - Configurer la zone d'intervention

3. **Paramètres**
   - Informations de contact
   - Liens réseaux sociaux
   - Email de réception du formulaire

## 📧 Configuration Email

### Gmail

1. Activer l'authentification à 2 facteurs
2. Créer un mot de passe d'application
3. Configurer dans `.env` :
```env
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="votre-email@gmail.com"
EMAIL_SERVER_PASSWORD="votre-mot-de-passe-app"
```

### Autres fournisseurs

**SendGrid** :
```env
EMAIL_SERVER_HOST="smtp.sendgrid.net"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="apikey"
EMAIL_SERVER_PASSWORD="votre-api-key"
```

**Mailgun** :
```env
EMAIL_SERVER_HOST="smtp.mailgun.org"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="postmaster@votre-domaine.mailgun.org"
EMAIL_SERVER_PASSWORD="votre-mot-de-passe"
```

## 🎨 Personnalisation

### Couleurs

Modifier dans `tailwind.config.ts` :
```typescript
colors: {
  primary: { ... }, // Couleurs principales (vert)
  wood: { ... },    // Tons bois
  stone: { ... },   // Tons pierre
}
```

### Contenu du site

Modifier dans `config/site.ts` :
```typescript
export const siteConfig = {
  name: "Les Jardins d'Alexandre",
  slogan: "Votre slogan",
  contact: { ... },
  services: [ ... ],
  // ...
}
```

## 🧪 Scripts disponibles

```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run start        # Serveur de production
npm run lint         # Vérification ESLint
npm run db:push      # Synchroniser le schéma Prisma
npm run db:seed      # Peupler la base de données
```

## 📝 TODO / Améliorations futures

- [ ] Upload d'images côté admin
- [ ] Éditeur WYSIWYG pour les contenus
- [ ] Système de cache pour les images
- [ ] Analytics (Google Analytics, Plausible)
- [ ] SEO avancé (sitemap.xml, robots.txt)
- [ ] Mode sombre
- [ ] Multi-langue (FR/EN)
- [ ] Système de newsletter
- [ ] Formulaire de devis plus détaillé

## 🐛 Résolution de problèmes

### Erreur lors de l'installation
```bash
npm install --legacy-peer-deps
```

### Erreur Prisma "Client not generated"
```bash
npx prisma generate
```

### Erreur d'envoi d'email
- Vérifier les identifiants SMTP
- Vérifier que le port 587 n'est pas bloqué
- Tester avec un autre fournisseur SMTP

### Erreur de connexion admin
- Vérifier que la base de données est initialisée (`npm run db:push`)
- Vérifier que le seed a été exécuté (`npm run db:seed`)
- Réinitialiser le mot de passe admin si nécessaire

## 📄 Licence

Ce projet est sous licence MIT.

## 👤 Support

Pour toute question ou assistance :
- Email : contact@jardinsalexandre.fr
- Téléphone : +33 6 12 34 56 78

---

Développé avec ❤️ pour Les Jardins d'Alexandre
