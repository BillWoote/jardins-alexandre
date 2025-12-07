# 🚀 Guide de déploiement sur Vercel

## ✅ Prérequis completés
- [x] Git initialisé
- [x] Premier commit effectué
- [ ] Repository GitHub créé
- [ ] Base de données PostgreSQL Vercel créée
- [ ] Variables d'environnement configurées

## 📋 Étapes de déploiement

### 1. Créer le repository GitHub

1. Allez sur https://github.com/new
2. Nom du repo : `jardins-alexandre`
3. Description : `Site web professionnel pour Les Jardins d'Alexandre - Paysagiste`
4. **IMPORTANT** : Ne cochez AUCUNE option (pas de README, .gitignore, ou LICENSE)
5. Cliquez sur **Create repository**

### 2. Pousser le code sur GitHub

Copiez et exécutez ces commandes dans le terminal :

```bash
cd ~/Dev/WebSite-JardinsAlex
git branch -M main
git remote add origin https://github.com/VOTRE-USERNAME/jardins-alexandre.git
git push -u origin main
```

Remplacez `VOTRE-USERNAME` par votre nom d'utilisateur GitHub.

### 3. Créer une base de données PostgreSQL sur Vercel

1. Allez sur https://vercel.com/dashboard
2. Connectez-vous avec votre compte GitHub
3. Cliquez sur **Storage** dans le menu
4. Cliquez sur **Create Database**
5. Sélectionnez **Postgres**
6. Configuration :
   - **Name** : `jardins-alexandre-db`
   - **Region** : Europe (Frankfurt ou Paris)
7. Cliquez sur **Create**
8. **IMPORTANT** : Notez la `DATABASE_URL` affichée (format : `postgresql://...`)

### 4. Déployer le projet sur Vercel

1. Sur le dashboard Vercel, cliquez sur **Add New...** → **Project**
2. Sélectionnez votre repository `jardins-alexandre`
3. **Configure Project** :
   - **Framework Preset** : Next.js (détecté automatiquement)
   - **Root Directory** : `./`
   - **Build Command** : `npx prisma generate && npm run build`
   - **Output Directory** : `.next` (automatique)

4. **Environment Variables** - Ajoutez TOUTES ces variables :

```env
# Base de données (copiez depuis Vercel Postgres)
DATABASE_URL=postgresql://username:password@host/database

# NextAuth
NEXTAUTH_URL=https://votre-site.vercel.app
NEXTAUTH_SECRET=changez-ce-secret-en-production-utilisez-openssl-rand-base64-32

# Email (formulaire de contact)
EMAIL_FROM=noreply@jardinsdalexandre.com
EMAIL_TO=contact@jardinsdalexandre.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre-email@gmail.com
SMTP_PASSWORD=votre-mot-de-passe-application
```

5. Cliquez sur **Deploy**

### 5. Initialiser la base de données en production

Une fois le déploiement terminé :

**Option A - Via l'interface Vercel :**
1. Allez dans votre projet → **Settings** → **Environment Variables**
2. Créez un script `scripts/init-prod-db.ts` (déjà créé)
3. Dans le terminal Vercel (Project → CLI), exécutez :
```bash
npx prisma db push
npx prisma db seed
```

**Option B - En local avec la DATABASE_URL de production :**
```bash
DATABASE_URL="postgresql://..." npx prisma db push
DATABASE_URL="postgresql://..." npx prisma db seed
```

### 6. Vérifier le déploiement

1. Accédez à votre site : `https://votre-site.vercel.app`
2. Testez l'accès admin : `https://votre-site.vercel.app/admin/login`
   - Email : `admin@jardinsalexandre.fr`
   - Mot de passe : `changeme123`
3. **🔒 IMPORTANT** : Changez le mot de passe admin immédiatement !

### 7. Configurer un domaine personnalisé (optionnel)

1. Dans Vercel → Votre projet → **Settings** → **Domains**
2. Cliquez sur **Add Domain**
3. Entrez : `jardinsdalexandre.fr`
4. Suivez les instructions pour configurer vos DNS :
   - Type A : pointe vers l'IP de Vercel
   - CNAME www : pointe vers `cname.vercel-dns.com`

### 8. Post-déploiement

**Sécurité :**
- [ ] Changer le mot de passe admin
- [ ] Générer un nouveau `NEXTAUTH_SECRET` (avec `openssl rand -base64 32`)
- [ ] Configurer le SMTP avec un vrai serveur email

**Configuration :**
- [ ] Ajouter les vraies images via l'admin
- [ ] Personnaliser les contenus
- [ ] Tester le formulaire de contact

**Performance :**
- [ ] Vérifier que les images AVIF se chargent correctement
- [ ] Tester sur mobile
- [ ] Vérifier le SEO

## 🔧 Commandes utiles

### Générer un secret NextAuth
```bash
openssl rand -base64 32
```

### Se connecter à la DB de production en local
```bash
DATABASE_URL="postgresql://..." npx prisma studio
```

### Déployer une nouvelle version
```bash
git add .
git commit -m "Description des changements"
git push origin main
```
Vercel déploiera automatiquement !

## 🆘 Dépannage

### Erreur de build Prisma
Si vous avez une erreur avec Prisma lors du build :
1. Vérifiez que `DATABASE_URL` est bien configurée
2. Ajoutez `postinstall` script dans package.json : `"postinstall": "prisma generate"`

### Les images ne s'affichent pas
Les images uploadées en local ne seront pas sur Vercel. Solutions :
1. Utiliser Vercel Blob Storage (recommandé)
2. Réuploader les images via l'admin en production
3. Utiliser un CDN externe (Cloudinary, etc.)

### Le formulaire de contact ne fonctionne pas
1. Vérifiez les variables SMTP_*
2. Pour Gmail, créez un "mot de passe d'application" (pas votre mot de passe normal)
3. Testez avec un service comme Resend ou SendGrid

## 📱 Contact

En cas de problème, consultez :
- Documentation Vercel : https://vercel.com/docs
- Documentation Prisma : https://www.prisma.io/docs
- Documentation Next.js : https://nextjs.org/docs
