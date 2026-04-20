# Héberger www.coachladywassa.com sur OVH - Guide Simplifié

## Ce dont vous avez besoin
- Votre VPS OVH (à commander : https://www.ovhcloud.com/fr/vps/ - 3.50 EUR/mois)
- Votre domaine coachladywassa.com (déjà acheté)

---

## Étape 1 : Commander le VPS OVH
1. Allez sur https://www.ovhcloud.com/fr/vps/
2. Choisissez **VPS Starter** (le moins cher, suffisant)
3. Image : **Ubuntu 22.04**
4. Validez le paiement
5. Vous recevrez un email avec **l'adresse IP** et le **mot de passe**

## Étape 2 : Pointer le domaine vers le VPS
1. Connectez-vous sur https://www.ovh.com/manager/
2. Allez dans **Noms de domaine** > **coachladywassa.com** > **Zone DNS**
3. Modifiez l'enregistrement **A** pour `@` : mettez **l'IP de votre VPS**
4. Ajoutez un enregistrement **A** pour `www` : mettez **la même IP**
5. Attendez ~1h pour la propagation

## Étape 3 : Se connecter au VPS
Ouvrez un terminal (ou Putty sur Windows) :
```
ssh root@IP_DE_VOTRE_VPS
```
Entrez le mot de passe reçu par email.

## Étape 4 : Installer tout automatiquement
Copiez-collez ces commandes une par une :

```bash
# 1. Mettre à jour le système
apt update && apt upgrade -y

# 2. Installer les outils
apt install -y nodejs npm python3 python3-pip python3-venv nginx certbot python3-certbot-nginx
npm install -g yarn pm2 n
n 20

# 3. Installer MongoDB
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list
apt update && apt install -y mongodb-org
systemctl start mongod && systemctl enable mongod

# 4. Créer le dossier du site
mkdir -p /var/www/coachladywassa
```

## Étape 5 : Télécharger le code du site
**Option A - Depuis Emergent (le plus simple) :**
1. Sur Emergent, cliquez "Download Code"
2. Vous obtenez un fichier .zip
3. Depuis votre ordinateur, envoyez-le au VPS :
```bash
scp code.zip root@IP_DE_VOTRE_VPS:/var/www/coachladywassa/
```
4. Sur le VPS :
```bash
cd /var/www/coachladywassa
apt install -y unzip
unzip code.zip
```

**Option B - Copie manuelle :**
Demandez-moi de créer un script d'installation automatique.

## Étape 6 : Configurer le Backend
```bash
cd /var/www/coachladywassa/backend

# Créer environnement Python
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Configurer les variables (IMPORTANT : changez le mot de passe !)
cat > .env << 'EOF'
MONGO_URL="mongodb://localhost:27017"
DB_NAME="coachladywassa_prod"
CORS_ORIGINS="https://coachladywassa.com,https://www.coachladywassa.com"
JWT_SECRET="CHANGEZ_CECI_avec_une_longue_chaine_secrete_1234567890abcdef"
ADMIN_EMAIL="admin@coachladywassa.com"
ADMIN_PASSWORD="VotreMotDePasseAdmin123!"
EOF

# Tester que ça marche
uvicorn server:app --host 0.0.0.0 --port 8001
# Si vous voyez "Application startup complete", c'est bon !
# Tapez Ctrl+C pour arrêter
```

## Étape 7 : Construire le Frontend
```bash
cd /var/www/coachladywassa/frontend

# Configurer l'URL
cat > .env << 'EOF'
REACT_APP_BACKEND_URL=https://www.coachladywassa.com
EOF

# Installer et construire
yarn install
yarn build
```

## Étape 8 : Configurer le serveur web (Nginx)
```bash
cat > /etc/nginx/sites-available/coachladywassa << 'NGINX'
server {
    listen 80;
    server_name coachladywassa.com www.coachladywassa.com;

    # Le site (fichiers statiques)
    location / {
        root /var/www/coachladywassa/frontend/build;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # L'API backend
    location /api {
        proxy_pass http://127.0.0.1:8001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Taille max upload 10MB
    client_max_body_size 10M;
}
NGINX

# Activer le site
ln -sf /etc/nginx/sites-available/coachladywassa /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl restart nginx
```

## Étape 9 : Lancer le backend en permanence
```bash
cd /var/www/coachladywassa/backend

cat > start.sh << 'EOF'
#!/bin/bash
cd /var/www/coachladywassa/backend
source venv/bin/activate
uvicorn server:app --host 0.0.0.0 --port 8001
EOF
chmod +x start.sh

# Lancer avec PM2 (garde le serveur en marche 24/7)
pm2 start start.sh --name coachladywassa
pm2 save
pm2 startup
```

## Étape 10 : Activer HTTPS (certificat SSL gratuit)
```bash
certbot --nginx -d coachladywassa.com -d www.coachladywassa.com
# Suivez les instructions (entrez votre email, acceptez les conditions)
# C'est automatique et gratuit !
```

---

## C'est terminé ! Votre site est en ligne sur www.coachladywassa.com

---

## Commandes utiles au quotidien

| Action | Commande |
|--------|----------|
| Voir si le site tourne | `pm2 status` |
| Voir les logs | `pm2 logs coachladywassa` |
| Redémarrer le backend | `pm2 restart coachladywassa` |
| Redémarrer Nginx | `systemctl restart nginx` |
| Mettre à jour le site | Voir section "Mise à jour" ci-dessous |

## Mettre à jour le site plus tard
```bash
# 1. Envoyez les nouveaux fichiers sur le VPS
# 2. Puis :
cd /var/www/coachladywassa/frontend
yarn install && yarn build

cd /var/www/coachladywassa/backend
source venv/bin/activate
pip install -r requirements.txt
pm2 restart coachladywassa
```

## Sauvegardes automatiques
```bash
# Créer une sauvegarde quotidienne de la base de données
mkdir -p /root/backups
cat > /etc/cron.daily/backup-mongo << 'EOF'
#!/bin/bash
mongodump --db coachladywassa_prod --out /root/backups/$(date +%Y%m%d)
find /root/backups -type d -mtime +30 -exec rm -rf {} +
EOF
chmod +x /etc/cron.daily/backup-mongo
```

## Résumé des coûts
| Service | Coût |
|---------|------|
| VPS OVH Starter | 3.50 EUR/mois |
| Domaine coachladywassa.com | Déjà acheté |
| SSL (HTTPS) | Gratuit |
| MongoDB | Inclus dans le VPS |
| **Total mensuel** | **3.50 EUR/mois** |
