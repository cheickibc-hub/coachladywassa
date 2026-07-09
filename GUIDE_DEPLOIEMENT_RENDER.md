# 🚀 Déploiement du backend sur Render — Guide pas à pas

Ce guide déploie votre backend FastAPI (auth, admin, livre en ligne) sur **Render** (gratuit, 750 h/mois) et connecte votre site OVH avec.

---

## 📋 Prérequis (vous avez déjà tout ça)

- ✅ Un compte GitHub avec le repo `cheickibc-hub/coachladywassa`
- ✅ Une base MongoDB Atlas (vous l'avez déjà créée)
- ✅ Le nouveau `build.sh` prêt (déjà dans `/app/backend/build.sh`)
- ✅ Le `render.yaml` prêt à la racine du projet

---

## 🎯 Étape 1 — Pousser le code sur GitHub

Dans **Emergent**, cliquez sur **"Save to GitHub"** (bouton en bas de la zone message). Attendez 30 s.
Vérifiez sur GitHub que le fichier `render.yaml` est bien à la racine.

---

## 🎯 Étape 2 — Créer un compte Render (gratuit)

1. Allez sur **https://render.com**
2. Cliquez sur **"Get Started for Free"**
3. Choisissez **"Sign in with GitHub"** (le plus simple)
4. Autorisez Render à accéder à votre compte GitHub

---

## 🎯 Étape 3 — Créer le Web Service

1. Sur le dashboard Render, cliquez **"+ New"** en haut à droite → **"Web Service"**
2. Cliquez **"Connect account"** ou choisissez directement le repo **`cheickibc-hub/coachladywassa`**
3. Cliquez **"Connect"**

Render va détecter automatiquement le `render.yaml`. Vous verrez :
- Name: `coachladywassa-backend`
- Runtime: `Python`
- Region: `Frankfurt (EU)`
- Build Command: `bash build.sh`
- Start Command: `uvicorn server:app --host 0.0.0.0 --port $PORT`

Ne changez rien, continuez.

---

## 🎯 Étape 4 — Ajouter les variables d'environnement (⚠️ TRÈS IMPORTANT)

Toujours sur la page de création du service, section **"Environment Variables"** :
Cliquez **"Add Environment Variable"** pour chacune de ces variables :

| Clé | Valeur |
|---|---|
| `MONGO_URL` | Votre chaîne de connexion Mongo Atlas — commence par `mongodb+srv://cheickibc_db_user:...@cluster...` |
| `DB_NAME` | `coachladywassa_prod` |
| `JWT_SECRET` | `b6fd7cddcd8201e9f9eb8607dd233a8d28c755badd978058797f4e3a706233cf` (copiez tel quel ou générez-en un nouveau sur https://randomkeygen.com) |
| `ADMIN_EMAIL` | `admin@ladywassa.com` |
| `ADMIN_PASSWORD` | `LadyWassa2025!` |
| `COOKIE_SECURE` | `true` |
| `CORS_ORIGINS` | `https://www.coachladywassa.com,https://coachladywassa.com` |
| `EMERGENT_LLM_KEY` | `sk-emergent-dFc0d6bB925E436CeB` (optionnel) |
| `PYTHON_VERSION` | `3.11.9` |

⚠️ Pour `MONGO_URL`, si vous ne la retrouvez pas :
1. Allez sur **https://cloud.mongodb.com**
2. Cluster → bouton **"Connect"** → **"Drivers"**
3. Copiez la chaîne (elle commence par `mongodb+srv://`)
4. Remplacez `<password>` par le mot de passe de votre user Mongo

---

## 🎯 Étape 5 — Autoriser Render dans MongoDB Atlas

MongoDB Atlas bloque toutes les IP par défaut. Il faut autoriser Render :

1. Sur **https://cloud.mongodb.com** → votre projet → **Network Access** (menu gauche)
2. Cliquez **"+ Add IP Address"**
3. Cliquez **"Allow access from anywhere"** (0.0.0.0/0)
4. Confirmez

*(Alternative plus sécurisée : ajouter les IPs de Render, mais elles changent souvent sur le plan gratuit. 0.0.0.0/0 est OK vu que la connexion reste protégée par mot de passe + TLS.)*

---

## 🎯 Étape 6 — Lancer le déploiement

Cliquez sur **"Create Web Service"** en bas de la page Render.

Le déploiement démarre. Vous verrez les logs en direct :
- `==> Installing Python dependencies…` (~2 min)
- `==> Pre-rendering book pages from PDF…` (~1 min pour 148 pages)
- `==> Build complete.`
- `Application startup complete.`

**Total : 3-5 minutes.**

Une fois OK, l'URL de votre backend s'affiche en haut :
`https://coachladywassa-backend.onrender.com` (ou similaire)

**COPIEZ cette URL, on en a besoin à l'étape suivante.**

---

## 🎯 Étape 7 — Mettre à jour l'URL backend dans le frontend

Dans Emergent, il faut modifier `/app/frontend/.env` :

Remplacez la ligne :
```
REACT_APP_BACKEND_URL=https://brain-mastery.preview.emergentagent.com
```

par :
```
REACT_APP_BACKEND_URL=https://coachladywassa-backend.onrender.com
```
*(en remplaçant par votre vraie URL Render)*

**Dites-moi juste votre URL Render exacte** et je fais le changement + le rebuild + le nouveau zip OVH pour vous.

---

## 🎯 Étape 8 — Ré-uploader le zip OVH

- **Save to GitHub** dans Emergent (pour recompiler avec la nouvelle URL)
- Téléchargez le nouveau `ovh-deploy/` depuis GitHub
- Uploadez le tout via FileZilla dans `www/`
- Attendez 5 min

---

## ✅ Test final

1. Ouvrez `https://www.coachladywassa.com/connexion`
2. Connectez-vous avec `admin@ladywassa.com` / `LadyWassa2025!`
3. Vous êtes redirigée vers `/admin`
4. Cliquez sur **"📖 Voir le livre"** en haut à droite
5. Vous voyez la liseuse fonctionnelle ! 🎉

---

## ⚠️ Attention — Plan gratuit Render

Le plan gratuit "s'endort" après 15 min d'inactivité. Le premier appel après ce délai prend **~30 secondes** pour "réveiller" le serveur, puis c'est instantané.

**Solutions :**
- **Solution simple** : dire à vos clients "patientez 30 s au 1er clic" (acceptable pour une base gratuite)
- **Solution robuste** : passer sur le plan payant **$7/mois** (always-on, 512 Mo RAM) — recommandé quand vous aurez plus de clients

---

## 🆘 En cas de problème pendant le déploiement

Envoyez-moi une capture des logs Render (onglet "Logs" du service) et je débloque immédiatement.

Bon déploiement Coach Lady Wassa ! 🚀
