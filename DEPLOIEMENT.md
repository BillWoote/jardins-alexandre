# 🚀 Guide de Déploiement sur Vercel

## Prérequis
- Compte GitHub (avec le code poussé)
- Compte Vercel (gratuit) : https://vercel.com
- Base de données PostgreSQL

---

## 📦 Étape 1 : Créer une base de données PostgreSQL

### Option A : Vercel Postgres (Recommandé - Gratuit)
1. Connectez-vous sur Vercel
2. Allez dans l'onglet "Storage"
3. Cliquez sur "Create Database" → "Postgres"
4. Nommez votre base (ex: `jardins-alexandre-db`)
5. Copiez la `DATABASE_URL` fournie

### Option B : Supabase (Gratuit)
1. Créez un compte sur https://supabase.com
2. Créez un nouveau projet
3. Allez dans Settings → Database
4. Copiez la "Connection string" (mode "Session")

### Option C : Neon (Gratuit)
1. Créez un compte sur https://neon.tech
2. Créez un nouveau projet
3. Copiez la connection string PostgreSQL

---

## 🔧 Étape 2 : Configurer le projet localement

### 1. Installer les dépendances PostgreSQL
```bash
npm install pg
```

### 2. Mettre à jour votre fichier .env local
```bash
# Remplacez par votre URL PostgreSQL
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"
```

### 3. Générer un secret NextAuth sécurisé
```bash
openssl rand -base64 32
```

### 4. Créer les tables dans PostgreSQL
```bash
# Générer la migration initiale
npx prisma migrate dev --name init

# Peupler la base avec les données de base (admin, etc.)
npx prisma db seed
```

### 5. Tester en local
```bash
npm run dev
```
Vérifiez que tout fonctionne sur http://localhost:3000

---

## ☁️ Étape 3 : Déployer sur Vercel

### 1. Pousser le code sur GitHub
```bash
git add .
git commit -m "Préparation pour déploiement Vercel avec PostgreSQL"
git push origin main
```

### 2. Importer le projet sur Vercel
1. Allez sur https://vercel.com
2. Cliquez sur "New Project"
3. Importez votre repository GitHub
4. Vercel détecte automatiquement Next.js ✓

### 3. Configurer les variables d'environnement
Dans Vercel, ajoutez ces variables :

**Variables obligatoires :**
```
DATABASE_URL=postgresql://... (votre connexion PostgreSQL)
NEXTAUTH_SECRET=... (généré avec openssl rand -base64 32)
NEXTAUTH_URL=https://votre-site.vercel.app
ADMIN_EMAIL=admin@jardinsalexandre.fr
ADMIN_PASSWORD=VotreMotDePasseSecurise123!
```

**Variables optionnelles (email) :**
```
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=votre-email@gmail.com
EMAIL_SERVER_PASSWORD=votre-mot-de-passe-app
EMAIL_FROM=noreply@jardinsalexandre.fr
CONTACT_EMAIL=contact@jardinsalexandre.fr
```

### 4. Déployer !
Cliquez sur "Deploy" - Vercel fait tout automatiquement !

---

## 🗄️ Étape 4 : Initialiser la base de données en production

Après le premier déploiement :

### Option A : Via Vercel CLI
```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Lancer les migrations
vercel env pull .env.production
npx prisma migrate deploy
npx prisma db seed
```

### Option B : Via le terminal Vercel (dans le dashboard)
1. Allez dans votre projet Vercel
2. Onglet "Settings" → "Functions"
3. Ouvrez un terminal
4. Exécutez :
```bash
npx prisma migrate deploy
npx prisma db seed
```

---

## ✅ Étape 5 : Vérifications post-déploiement

### 1. Tester le site
- Visitez https://votre-site.vercel.app
- Vérifiez que la page d'accueil s'affiche

### 2. Tester l'admin
- Allez sur https://votre-site.vercel.app/admin/login
- Connectez-vous avec les identifiants configurés
- Vérifiez que vous pouvez créer/modifier des projets

### 3. Tester le formulaire de contact
- Remplissez le formulaire sur /contact
- Vérifiez la réception de l'email

---

## 🔒 Sécurité - Actions importantes

### ⚠️ À FAIRE IMMÉDIATEMENT :
1. **Changer le mot de passe admin** dans les variables d'environnement Vercel
2. **Régénérer NEXTAUTH_SECRET** pour la production
3. **Configurer un domaine personnalisé** (optionnel mais recommandé)
4. **Activer HTTPS** (automatique avec Vercel)

### 📧 Configuration Email Gmail
Si vous utilisez Gmail pour le formulaire de contact :
1. Activez la validation en 2 étapes
2. Créez un "Mot de passe d'application" dans votre compte Google
3. Utilisez ce mot de passe dans `EMAIL_SERVER_PASSWORD`

---

## 🔄 Déploiement automatique

Vercel redéploie automatiquement à chaque push sur GitHub :
```bash
git add .
git commit -m "Mise à jour du contenu"
git push origin main
```

Le site sera mis à jour en ~2 minutes ! ⚡

---

## 🆘 Résolution de problèmes

### Erreur : "Can't reach database server"
- Vérifiez que `DATABASE_URL` est correcte dans Vercel
- Vérifiez que la base de données est accessible publiquement

### Erreur : "Missing environment variable"
- Vérifiez que toutes les variables obligatoires sont dans Vercel
- Redéployez après avoir ajouté des variables

### L'admin ne fonctionne pas
- Vérifiez `ADMIN_EMAIL` et `ADMIN_PASSWORD` dans Vercel
- Relancez `npx prisma db seed` en production

### Le formulaire de contact ne marche pas
- Vérifiez les variables `EMAIL_*` dans Vercel
- Testez la connexion SMTP localement d'abord

---

## 📊 Monitoring

### Logs Vercel
- Allez dans votre projet → "Deployments"
- Cliquez sur un déploiement → "View Function Logs"
- Vérifiez les erreurs

### Base de données
- Connectez-vous à votre dashboard PostgreSQL (Vercel/Supabase/Neon)
- Vérifiez que les tables sont créées
- Vérifiez que les données sont présentes

---

## 🎉 C'est terminé !

Votre site est maintenant en ligne et automatiquement déployé à chaque modification !

**URL de production :** https://votre-site.vercel.app

### Prochaines étapes (optionnel) :
- [ ] Configurer un domaine personnalisé (ex: www.jardinsalexandre.fr)
- [ ] Ajouter Google Analytics
- [ ] Configurer les emails de contact
- [ ] Ajouter du contenu via l'admin
- [ ] Optimiser les images pour la performance

---

## 📚 Ressources

- Documentation Vercel : https://vercel.com/docs
- Documentation Prisma : https://www.prisma.io/docs
- Documentation Next.js : https://nextjs.org/docs
- Support Vercel : https://vercel.com/support
