# Guide de Déploiement sur OVH - Site Coach Lady Wassa

## Prérequis
- Un compte OVH (www.ovh.com)
- Un nom de domaine (ex: ladywassa.com)
- Connaissance basique de la ligne de commande

---

## Option 1 : VPS OVH (Recommandée - à partir de 3.50 EUR/mois)

### Étape 1 : Commander un VPS
1. Allez sur https://www.ovhcloud.com/fr/vps/
2. Choisissez **VPS Starter** ou **VPS Value** (2 Go RAM minimum)
3. Système d'exploitation : **Ubuntu 22.04 LTS**
4. Région : **Europe** (France ou Allemagne)
5. Validez et payez

### Étape 2 : Se connecter au VPS
```bash
ssh root@VOTRE_IP_VPS
```
Le mot de passe est envoyé par email après la commande.

### Étape 3 : Installer les outils nécessaires
```bash
# Mise à jour du système
apt update && apt upgrade -y

# Installer Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Installer Python 3 et pip
apt install -y python3 python3-pip python3-venv

# Installer MongoDB
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list
apt update
apt install -y mongodb-org
systemctl start mongod
systemctl enable mongod

# Installer Nginx (serveur web)
apt install -y nginx

# Installer Yarn
npm install -g yarn

# Installer PM2 (gestionnaire de processus)
npm install -g pm2
```

### Étape 4 : Transférer les fichiers du site
Depuis votre ordinateur local :
```bash
# Compresser le projet
cd /chemin/vers/le/projet
tar -czf ladywassa-site.tar.gz backend/ frontend/

# Envoyer sur le VPS
scp ladywassa-site.tar.gz root@VOTRE_IP_VPS:/root/
```

Sur le VPS :
```bash
# Extraire les fichiers
cd /root
tar -xzf ladywassa-site.tar.gz
mv backend /var/www/ladywassa-backend
mv frontend /var/www/ladywassa-frontend
```

### Étape 5 : Configurer le Backend
```bash
cd /var/www/ladywassa-backend

# Créer l'environnement Python
python3 -m venv venv
source venv/bin/activate

# Installer les dépendances
pip install -r requirements.txt

# Configurer les variables d'environnement
cat > .env << 'EOF'
MONGO_URL="mongodb://localhost:27017"
DB_NAME="ladywassa_production"
CORS_ORIGINS="https://coachladywassa.com,https://www.coachladywassa.com"
JWT_SECRET="GENEREZ_UNE_CLE_SECRETE_ICI"
ADMIN_EMAIL="admin@ladywassa.com"
ADMIN_PASSWORD="VotreMotDePasseSecurise123!"
EOF

# Tester le backend
uvicorn server:app --host 0.0.0.0 --port 8001
# Si ça fonctionne, Ctrl+C pour arrêter
```

Générer une clé secrète :
```bash
python3 -c "import secrets; print(secrets.token_hex(32))"
```

### Étape 6 : Configurer le Frontend
```bash
cd /var/www/ladywassa-frontend

# Configurer les variables d'environnement
cat > .env << 'EOF'
REACT_APP_BACKEND_URL=https://www.coachladywassa.com
EOF

# Installer les dépendances
yarn install

# Construire le site
yarn build
```

### Étape 7 : Configurer Nginx
```bash
cat > /etc/nginx/sites-available/ladywassa << 'EOF'
server {
    listen 80;
    server_name coachladywassa.com www.coachladywassa.com;

    # Frontend (fichiers statiques)
    location / {
        root /var/www/ladywassa-frontend/build;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://127.0.0.1:8001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

# Activer le site
ln -s /etc/nginx/sites-available/ladywassa /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx
```

### Étape 8 : Lancer le Backend avec PM2
```bash
cd /var/www/ladywassa-backend
source venv/bin/activate

# Créer le script de lancement
cat > start.sh << 'EOF'
#!/bin/bash
cd /var/www/ladywassa-backend
source venv/bin/activate
uvicorn server:app --host 0.0.0.0 --port 8001
EOF
chmod +x start.sh

# Lancer avec PM2
pm2 start start.sh --name ladywassa-backend
pm2 save
pm2 startup
```

### Étape 9 : Configurer le nom de domaine
1. Dans votre espace client OVH, allez dans **Noms de domaine**
2. Cliquez sur **coachladywassa.com** > **Zone DNS**
3. Ajoutez/modifiez les enregistrements :
   - **A** : `@` → `VOTRE_IP_VPS`
   - **A** : `www` → `VOTRE_IP_VPS`
   - **CNAME** : `www` → `coachladywassa.com.` (si préféré)
4. Attendez 24h pour la propagation DNS

### Étape 10 : Installer le certificat SSL (HTTPS gratuit)
```bash
# Installer Certbot
apt install -y certbot python3-certbot-nginx

# Obtenir le certificat SSL
certbot --nginx -d coachladywassa.com -d www.coachladywassa.com

# Le renouvellement est automatique
certbot renew --dry-run
```

---

## Option 2 : Hébergement Web OVH (Plus simple, mais limité)

Si vous préférez un hébergement mutualisé OVH :

1. **Commandez** un hébergement Web Pro (à partir de 5.99 EUR/mois)
2. **Limitation** : Pas de support Python natif
3. **Solution** : Déployer seulement le frontend en statique + backend sur un service externe
4. Cette option est **moins recommandée** car le backend nécessite Python

---

## Maintenance

### Mettre à jour le site
```bash
# Sur le VPS
cd /var/www/ladywassa-frontend
# Transférez les nouveaux fichiers
yarn build

cd /var/www/ladywassa-backend
pm2 restart ladywassa-backend
```

### Sauvegardes MongoDB
```bash
# Sauvegarde quotidienne automatique
cat > /etc/cron.daily/backup-mongo << 'EOF'
#!/bin/bash
mongodump --db ladywassa_production --out /root/backups/$(date +%Y%m%d)
# Garder seulement les 30 derniers jours
find /root/backups -type d -mtime +30 -exec rm -rf {} +
EOF
chmod +x /etc/cron.daily/backup-mongo
```

### Surveiller le site
```bash
pm2 status                    # État du backend
pm2 logs ladywassa-backend    # Logs en temps réel
systemctl status nginx        # État de Nginx
systemctl status mongod       # État de MongoDB
```

---

## Coûts estimés mensuels
| Service | Coût |
|---------|------|
| VPS OVH Starter | 3.50 EUR/mois |
| Nom de domaine coachladywassa.com | Déjà acheté |
| Certificat SSL | Gratuit (Let's Encrypt) |
| **Total** | **~3.50 EUR/mois** |

---

## Checklist avant mise en ligne
- [ ] Changer le numéro WhatsApp si besoin
- [ ] Modifier ADMIN_PASSWORD avec un mot de passe fort
- [ ] Générer un nouveau JWT_SECRET
- [ ] Configurer CORS_ORIGINS avec votre vrai domaine
- [ ] Tester tous les formulaires
- [ ] Tester le quiz complet
- [ ] Tester l'espace membre
- [ ] Tester l'admin panel
- [ ] Configurer les sauvegardes MongoDB
- [ ] Tester sur mobile
