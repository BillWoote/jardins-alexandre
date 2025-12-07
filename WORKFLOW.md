# 🚀 Workflow de Développement - Les Jardins d'Alexandre

## 📍 Emplacement du projet
**Travaillez toujours ici** : `~/Dev/WebSite-JardinsAlex`

## 🔄 Workflow quotidien

### 1️⃣ Démarrer le serveur local
```bash
cd ~/Dev/WebSite-JardinsAlex
npm run dev
```
Ouvrir : http://localhost:3000

### 2️⃣ Modifier votre site
- Éditez les fichiers dans VS Code
- Les changements apparaissent automatiquement (Hot Reload)
- Testez tout en local avant de déployer

### 3️⃣ Accéder à l'admin local
URL : http://localhost:3000/admin/login
- Email : `admin@jardinsalexandre.fr`
- Mot de passe : `changeme123`

### 4️⃣ Sauvegarder vos changements (Git)
```bash
cd ~/Dev/WebSite-JardinsAlex

# Voir ce qui a changé
git status

# Ajouter vos modifications
git add .

# Sauvegarder avec un message
git commit -m "Description de vos changements"
```

**💡 Astuce** : Faites des commits régulièrement, même si vous ne pushez pas !

### 5️⃣ Déployer en production (quand c'est prêt)
```bash
cd ~/Dev/WebSite-JardinsAlex
git push origin main
```
⏱️ Vercel déploie automatiquement en 2-3 minutes

---

## 💾 Backup vers OneDrive (optionnel)

Pour sauvegarder votre travail sur OneDrive :
```bash
rsync -av --delete ~/Dev/WebSite-JardinsAlex/ "/Users/billwoote/Library/CloudStorage/OneDrive-STREAMMANAGEMENT/Documents/Stream Management/SOFTWARE/WebSite-JardinsAlex/"
```

**Quand faire un backup ?**
- Avant une grosse modification
- À la fin de la journée
- Avant de tester quelque chose de risqué

---

## 📂 Structure des bases de données

### Base LOCAL (PostgreSQL sur votre Mac)
- Pour le développement et les tests
- Connexion : `postgresql://...@localhost:5432/jardinsalexandre`
- Modifier via : http://localhost:3000/admin

### Base PRODUCTION (Prisma Postgres sur Vercel)
- Pour le site en ligne
- Connexion : Automatique via Vercel
- Modifier via : https://votre-site.vercel.app/admin

**⚠️ Important** : Les deux bases sont SÉPARÉES !

---

## 🔄 Transférer des données Local → Production

Si vous avez ajouté beaucoup de contenu en local et voulez le mettre en prod :

```bash
cd ~/Dev/WebSite-JardinsAlex

# 1. Exporter depuis local
npx tsx prisma/export-data.ts

# 2. Importer vers production
DATABASE_URL="votre-url-vercel" npx tsx prisma/import-data.ts
```

---

## 🛠️ Commandes utiles

### Démarrer le serveur
```bash
npm run dev
```

### Arrêter le serveur
Appuyez sur `Ctrl+C` dans le terminal

### Voir les logs de la base de données
```bash
npx prisma studio
```
Ouvre une interface web pour voir/modifier la base

### Réinitialiser la base locale
```bash
npx prisma db push
npx prisma db seed
```

### Voir l'état Git
```bash
git status
git log --oneline -10  # Les 10 derniers commits
```

---

## 📝 Bonnes pratiques

1. **Testez TOUJOURS en local** avant de pusher
2. **Faites des petits commits** avec des messages clairs
3. **Ne pushez que quand tout fonctionne**
4. **Sauvegardez régulièrement** (commits Git)
5. **Backupez sur OneDrive** de temps en temps

---

## 🆘 En cas de problème

### Le serveur ne démarre pas
```bash
cd ~/Dev/WebSite-JardinsAlex
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run dev
```

### J'ai cassé quelque chose
```bash
# Revenir au dernier commit
git status
git restore <fichier>  # Pour un fichier spécifique
# OU
git reset --hard HEAD  # ATTENTION: Annule TOUS les changements non commités
```

### Je veux annuler le dernier commit
```bash
git reset --soft HEAD~1  # Annule le commit mais garde les modifications
```

### La base de données est cassée
```bash
npx prisma db push  # Recréer les tables
npx prisma db seed  # Rajouter les données de départ
```

---

## 🌐 URLs importantes

- **Local** : http://localhost:3000
- **Admin local** : http://localhost:3000/admin/login
- **Production** : https://votre-site.vercel.app
- **Dashboard Vercel** : https://vercel.com/dashboard
- **GitHub** : https://github.com/BillWoote/jardins-alexandre

---

## 📞 Aide-mémoire Git

```bash
# Voir les changements
git status

# Ajouter tous les fichiers
git add .

# Ajouter un fichier spécifique
git add chemin/vers/fichier.tsx

# Commit
git commit -m "Message descriptif"

# Pousser vers GitHub (= déploiement)
git push origin main

# Voir l'historique
git log --oneline

# Annuler les changements non commités
git restore <fichier>
```

---

**🎉 Vous êtes prêt à développer !**

Pour démarrer maintenant :
```bash
cd ~/Dev/WebSite-JardinsAlex
npm run dev
```
