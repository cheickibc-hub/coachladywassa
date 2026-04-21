from dotenv import load_dotenv
from pathlib import Path
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from fastapi import FastAPI, APIRouter, Request, HTTPException, Response
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
import os
import logging
import bcrypt
import jwt
from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
import uuid
from datetime import datetime, timezone, timedelta

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

JWT_ALGORITHM = "HS256"

def get_jwt_secret():
    return os.environ["JWT_SECRET"]

def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")

def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))

def create_access_token(user_id: str, email: str) -> str:
    payload = {"sub": user_id, "email": email, "exp": datetime.now(timezone.utc) + timedelta(minutes=60), "type": "access"}
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)

def create_refresh_token(user_id: str) -> str:
    payload = {"sub": user_id, "exp": datetime.now(timezone.utc) + timedelta(days=7), "type": "refresh"}
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)

async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        user["_id"] = str(user["_id"])
        user.pop("password_hash", None)
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

def set_auth_cookies(response: Response, access_token: str, refresh_token: str):
    response.set_cookie(key="access_token", value=access_token, httponly=True, secure=False, samesite="lax", max_age=3600, path="/")
    response.set_cookie(key="refresh_token", value=refresh_token, httponly=True, secure=False, samesite="lax", max_age=604800, path="/")

async def require_admin(request: Request) -> dict:
    user = await get_current_user(request)
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Acces reserve aux administrateurs")
    return user

app = FastAPI()
api_router = APIRouter(prefix="/api")
auth_router = APIRouter(prefix="/api/auth")
admin_router = APIRouter(prefix="/api/admin")


class LeadCreate(BaseModel):
    first_name: str
    email: str
    whatsapp: str = ""
    profile_type: str = ""
    prefer_whatsapp: bool = True
    source: str = "quiz"

class WebinarRegistrationCreate(BaseModel):
    first_name: str
    email: str
    biggest_challenge: str = ""
    reminder_preference: str = "whatsapp"

class ContactMessageCreate(BaseModel):
    name: str
    email: str
    subject: str
    message: str

class NewsletterCreate(BaseModel):
    email: str

class RegisterInput(BaseModel):
    name: str
    email: str
    password: str

class LoginInput(BaseModel):
    email: str
    password: str

class EnrollInput(BaseModel):
    formation_id: str


BLOG_ARTICLES = [
    {
        "id": "1",
        "title": "7 techniques neurosciences pour gérer le stress sans médicaments",
        "excerpt": "Découvrez comment votre cerveau peut naturellement réduire le cortisol grâce à des techniques validées scientifiquement.",
        "category": "Gestion Stress",
        "image_url": "https://images.pexels.com/photos/37079378/pexels-photo-37079378.jpeg?auto=compress&cs=tinysrgb&w=600",
        "slug": "gerer-stress-neurosciences",
        "reading_time": "6 min",
        "date": "2025-12-15",
        "content": """<h2>Introduction</h2>
<p>Le stress est l'un des plus grands ennemis de notre santé mentale et physique. En Afrique, les pressions professionnelles, familiales et sociales créent un cocktail de stress chronique qui affecte des millions de personnes. Mais saviez-vous que votre cerveau possède des mécanismes naturels pour réguler le stress ?</p>

<h2>1. La respiration carrée (Box Breathing)</h2>
<p>Cette technique militaire est utilisée par les forces spéciales pour gérer le stress en situation extrême. Elle agit directement sur le système nerveux parasympathique.</p>
<p><strong>Comment faire :</strong> Inspirez 4 secondes, retenez 4 secondes, expirez 4 secondes, retenez 4 secondes. Répétez 4 cycles.</p>

<h2>2. La technique du 5-4-3-2-1 (Ancrage sensoriel)</h2>
<p>Quand le stress vous submerge, votre amygdale prend le contrôle. Cette technique réactive votre cortex préfrontal en forçant votre attention sur le présent.</p>
<p><strong>Identifiez :</strong> 5 choses que vous voyez, 4 que vous touchez, 3 que vous entendez, 2 que vous sentez, 1 que vous goûtez.</p>

<h2>3. La marche neurale consciente</h2>
<p>La marche stimule la production de BDNF (Brain-Derived Neurotrophic Factor), une protéine qui protège et régénère les neurones. 20 minutes de marche réduisent le cortisol de 30%.</p>

<h2>4. La technique du journaling émotionnel</h2>
<p>Écrire vos pensées pendant 10 minutes active le cortex préfrontal et désactive l'amygdale. C'est comme un reset cérébral quotidien.</p>

<h2>5. La visualisation positive</h2>
<p>Votre cerveau ne fait pas la différence entre une expérience réelle et une expérience visualisée. Visualiser un état de calme active les mêmes circuits que le calme réel.</p>

<h2>6. La cohérence cardiaque</h2>
<p>5 minutes de respiration à 6 cycles par minute synchronisent votre rythme cardiaque et cérébral, réduisant le cortisol de 25% en moyenne.</p>

<h2>7. Le protocole de gratitude matinal</h2>
<p>Nommer 3 choses pour lesquelles vous êtes reconnaissant chaque matin augmente la sérotonine et réduit le cortisol. Un exercice simple qui recâble littéralement votre cerveau vers le positif.</p>

<h2>Conclusion</h2>
<p>Ces 7 techniques sont validées par la recherche en neurosciences. Elles ne remplacent pas un accompagnement professionnel, mais elles constituent une boîte à outils puissante pour gérer votre stress au quotidien. Pour aller plus loin, découvrez notre programme complet de gestion du stress.</p>"""
    },
    {
        "id": "2",
        "title": "Comment vaincre la peur de présenter en public",
        "excerpt": "La peur de parler en public touche 75% des gens. Voici comment la neuroscience explique et résout ce blocage.",
        "category": "Performance",
        "image_url": "https://images.pexels.com/photos/7793634/pexels-photo-7793634.jpeg?auto=compress&cs=tinysrgb&w=600",
        "slug": "vaincre-peur-public",
        "reading_time": "8 min",
        "date": "2025-12-08",
        "content": """<h2>Pourquoi avons-nous peur de parler en public ?</h2>
<p>La glossophobie (peur de parler en public) est la phobie la plus répandue au monde. Votre amygdale interprète le regard des autres comme une menace potentielle - un héritage de nos ancêtres qui devaient être vigilants face aux prédateurs.</p>

<h2>Le circuit de la peur dans votre cerveau</h2>
<p>Quand vous vous levez pour parler devant un groupe, votre amygdale déclenche une cascade de réactions : libération de cortisol, accélération cardiaque, mains moites, voix tremblante. Ce n'est pas un défaut - c'est votre cerveau qui essaie de vous protéger.</p>

<h2>Technique 1 : La désensibilisation progressive</h2>
<p>Commencez petit. Parlez devant 1 personne, puis 3, puis 10. Chaque succès crée de nouvelles connexions neurales qui associent la prise de parole au plaisir plutôt qu'à la peur.</p>

<h2>Technique 2 : L'ancrage corporel</h2>
<p>Avant de parler, ancrez vos pieds au sol, sentez la terre sous vous. Cette technique active votre système vestibulaire et envoie un signal de sécurité à votre cerveau.</p>

<h2>Technique 3 : La préparation neurale</h2>
<p>Répétez votre présentation en visualisant le succès. Votre cerveau créera des chemins neuraux identiques à ceux d'une vraie présentation réussie. Le jour J, ces chemins seront déjà tracés.</p>

<h2>Le cas de Fatoumata</h2>
<p>Fatoumata, ingénieure logiciel, évitait les promotions par peur de présenter. Après 4 semaines de coaching, elle a présenté un projet critique devant la direction et obtenu sa promotion avec +25% de salaire.</p>

<h2>Conclusion</h2>
<p>La peur de parler en public n'est pas une fatalité. C'est une habitude cérébrale qui peut être reprogrammée. Avec les bonnes techniques de neurosciences, vous pouvez transformer cette peur en pouvoir.</p>"""
    },
    {
        "id": "3",
        "title": "Les 5 peurs que votre cerveau maintient et comment les dissoudre",
        "excerpt": "Votre amygdale est programmée pour vous protéger, mais parfois elle vous limite. Découvrez les 5 peurs les plus courantes.",
        "category": "Neurosciences",
        "image_url": "https://images.pexels.com/photos/7792802/pexels-photo-7792802.jpeg?auto=compress&cs=tinysrgb&w=600",
        "slug": "5-peurs-cerveau",
        "reading_time": "7 min",
        "date": "2025-12-01",
        "content": """<h2>Votre cerveau : protecteur ou saboteur ?</h2>
<p>L'amygdale, cette petite structure en forme d'amande dans votre cerveau, est programmée pour détecter les menaces. Le problème ? Dans le monde moderne, elle confond souvent opportunité et danger.</p>

<h2>Peur n°1 : La peur de l'échec</h2>
<p>Votre cerveau préfère l'inaction (sécurité) à l'action (risque). C'est pourquoi vous procrastinez sur les projets importants. La solution : divisez chaque objectif en micro-tâches de 5 minutes pour contourner la résistance.</p>

<h2>Peur n°2 : La peur du jugement</h2>
<p>Les neurosciences montrent que le rejet social active les mêmes zones cérébrales que la douleur physique. Votre cerveau traite la critique comme une blessure réelle.</p>

<h2>Peur n°3 : La peur du changement</h2>
<p>Le cerveau est câblé pour la prévisibilité. Tout changement est perçu comme une menace potentielle, même quand il est positif. C'est pourquoi les bonnes habitudes sont si difficiles à adopter.</p>

<h2>Peur n°4 : La peur de l'abandon</h2>
<p>Cette peur profonde est liée à notre besoin d'appartenance. Elle peut saboter vos relations en vous poussant à accepter des situations toxiques par peur d'être seul(e).</p>

<h2>Peur n°5 : La peur du succès</h2>
<p>Paradoxalement, votre cerveau peut aussi craindre le succès. Le syndrome de l'imposteur est une manifestation de cette peur : \"Si je réussis, on découvrira que je ne mérite pas.\"</p>

<h2>Comment dissoudre ces peurs</h2>
<p>Chaque peur est une connexion neurale renforcée par la répétition. La neuroplasticité nous enseigne que ces connexions peuvent être affaiblies et remplacées par de nouvelles. C'est exactement ce que nous faisons dans nos programmes de coaching.</p>"""
    },
    {
        "id": "4",
        "title": "Neuroplasticité : pourquoi vous POUVEZ changer vos peurs",
        "excerpt": "La science prouve que votre cerveau peut se recâbler à tout âge. Voici comment utiliser la neuroplasticité.",
        "category": "Neuroplasticité",
        "image_url": "https://images.unsplash.com/photo-1606471059439-2dfc9bbfb150?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzV8MHwxfHNlYXJjaHwyfHxhZnJpY2FuJTIwd29tYW4lMjBwcm9mZXNzaW9uYWwlMjBjb2FjaGluZyUyMG1lZGl0YXRpb24lMjBtaW5kc2V0fGVufDB8fHx8MTc3NjY5MDEyMnww&ixlib=rb-4.1.0&q=85",
        "slug": "neuroplasticite-changer-peurs",
        "reading_time": "5 min",
        "date": "2025-11-24",
        "content": """<h2>Qu'est-ce que la neuroplasticité ?</h2>
<p>Pendant des décennies, les scientifiques pensaient que le cerveau adulte était figé. On sait maintenant que c'est faux. Votre cerveau se recâble en permanence - c'est la neuroplasticité.</p>

<h2>Comment ça fonctionne</h2>
<p>Chaque pensée, chaque action crée ou renforce une connexion neurale. Plus vous répétez un comportement, plus le chemin neural devient \"autoroute\". C'est pourquoi les mauvaises habitudes sont si tenaces... mais aussi pourquoi vous pouvez en créer de nouvelles.</p>

<h2>La règle des 30 jours</h2>
<p>Les recherches montrent qu'il faut en moyenne 30 jours de pratique régulière pour créer un nouveau chemin neural solide. C'est pourquoi nos programmes durent minimum 4 semaines.</p>

<h2>Application pratique : reprogrammer la peur</h2>
<p>Si vous avez peur de parler en public depuis 20 ans, ce chemin neural est une \"autoroute\". Mais en créant consciemment un nouveau chemin (association parole = plaisir), vous pouvez transformer cette peur en 30 jours.</p>

<h2>Conclusion</h2>
<p>Votre cerveau n'est pas votre destin. Il est votre outil. Avec les bonnes techniques et un accompagnement adapté, vous pouvez littéralement recâbler votre cerveau pour le succès.</p>"""
    },
    {
        "id": "5",
        "title": "Focus naturel : 5 techniques neurosciences pour la productivité",
        "excerpt": "Optimisez votre concentration et productivité grâce à des techniques basées sur le fonctionnement de votre cerveau.",
        "category": "Productivité",
        "image_url": "https://images.pexels.com/photos/12912082/pexels-photo-12912082.jpeg?auto=compress&cs=tinysrgb&w=600",
        "slug": "focus-naturel-productivite",
        "reading_time": "6 min",
        "date": "2025-11-17",
        "content": """<h2>Pourquoi vous n'arrivez pas à vous concentrer</h2>
<p>Votre cerveau n'est pas conçu pour le multitâche. Chaque fois que vous passez d'une tâche à l'autre, votre cortex préfrontal utilise de l'énergie pour se \"recalibrer\". Résultat : vous perdez jusqu'à 40% de productivité.</p>

<h2>Technique 1 : Le Deep Work (90 minutes)</h2>
<p>Votre cerveau fonctionne par cycles de 90 minutes (rythme ultradien). Travaillez 90 minutes sans interruption, puis faites une pause de 20 minutes. C'est le rythme naturel de votre cerveau.</p>

<h2>Technique 2 : La dopamine intentionnelle</h2>
<p>La procrastination est un problème de dopamine. Créez des micro-récompenses toutes les 25 minutes pour maintenir votre motivation. Chaque petite victoire libère de la dopamine.</p>

<h2>Technique 3 : L'environnement neural</h2>
<p>Votre cerveau associe chaque lieu à un état mental. Créez un espace dédié au travail profond et ne l'utilisez que pour ça. Votre cerveau passera automatiquement en \"mode focus\" quand vous vous y installerez.</p>

<h2>Technique 4 : La méditation de 5 minutes</h2>
<p>5 minutes de méditation avant le travail augmentent l'épaisseur du cortex préfrontal (zone de la concentration) et réduisent l'activité de l'amygdale (zone du stress).</p>

<h2>Technique 5 : Le protocole du matin</h2>
<p>Les 2 premières heures de la journée sont les plus productives (pic de cortisol naturel). Utilisez-les pour vos tâches les plus importantes, pas pour vos emails.</p>

<h2>Conclusion</h2>
<p>La productivité n'est pas une question de volonté, c'est une question de neurologie. En comprenant comment votre cerveau fonctionne, vous pouvez travailler avec lui plutôt que contre lui.</p>"""
    },
    {
        "id": "6",
        "title": "Cortisol élevé ? Comment votre cerveau vous maintient stressée",
        "excerpt": "Comprendre le rôle du cortisol dans votre stress quotidien et les techniques pour le réguler naturellement.",
        "category": "Gestion Stress",
        "image_url": "https://images.unsplash.com/photo-1688120290962-30b22577b679?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzV8MHwxfHNlYXJjaHw0fHxhZnJpY2FuJTIwYnVzaW5lc3MlMjBwcm9mZXNzaW9uYWwlMjBzdHJlc3MlMjBjb25maWRlbmNlJTIwc3VjY2VzcyUyMGJyYWlufGVufDB8fHx8MTc3NjY5MDEzMHww&ixlib=rb-4.1.0&q=85",
        "slug": "cortisol-stress-cerveau",
        "reading_time": "7 min",
        "date": "2025-11-10",
        "content": """<h2>Qu'est-ce que le cortisol ?</h2>
<p>Le cortisol est votre \"hormone du stress\". En quantité normale, il vous aide à vous réveiller le matin et à réagir face au danger. Mais quand il reste chroniquement élevé, il détruit littéralement vos neurones.</p>

<h2>Les signes d'un cortisol trop élevé</h2>
<p>Fatigue constante malgré le sommeil, prise de poids autour du ventre, difficultés de concentration, irritabilité, insomnie, baisse de la libido. Si vous reconnaissez 3+ de ces signes, votre cortisol est probablement trop élevé.</p>

<h2>Le cercle vicieux du stress chronique</h2>
<p>Stress → cortisol élevé → insomnie → fatigue → irritabilité → plus de stress → encore plus de cortisol. Ce cercle vicieux peut durer des années si rien n'est fait.</p>

<h2>Comment réguler naturellement votre cortisol</h2>
<p><strong>Le matin :</strong> Exposez-vous à la lumière naturelle dans les 30 premières minutes. Cela calibre votre rythme circadien et normalise la production de cortisol.</p>
<p><strong>L'après-midi :</strong> 20 minutes de marche suffisent à réduire le cortisol de 30%. L'exercice physique est le régulateur de cortisol le plus puissant.</p>
<p><strong>Le soir :</strong> Pas d'écran 1h avant le coucher. La lumière bleue maintient le cortisol élevé et perturbe la production de mélatonine.</p>

<h2>La technique du scan corporel</h2>
<p>Allongez-vous, fermez les yeux, et scannez mentalement chaque partie de votre corps pendant 10 minutes. Cette technique active le système nerveux parasympathique et fait chuter le cortisol rapidement.</p>

<h2>Conclusion</h2>
<p>Le cortisol n'est pas votre ennemi - c'est un messager. Apprenez à l'écouter et à le réguler pour une vie plus sereine et productive.</p>"""
    },
]

FORMATIONS_CONTENT = [
    {
        "id": "starter",
        "name": "Peur 101 Starter",
        "tier": "STARTER",
        "duration": "2 semaines",
        "modules": [
            {"title": "Module 1 : Explorer Nos Automatismes", "video_url": "https://www.loom.com/embed/55be99c409224cb6937ab8689ed0e66f", "duration": "34 min"},
            {"title": "Module 2 : Oser être soi-même", "video_url": "https://www.loom.com/embed/14bdae734ec54978a9f674e68f8a4d5c", "duration": "16 min"},
        ]
    },
    {
        "id": "standard",
        "name": "Transformation Cérébrale",
        "tier": "STANDARD",
        "duration": "4 semaines",
        "modules": [
            {"title": "Module 1 : Explorer Nos Automatismes", "video_url": "https://www.loom.com/embed/55be99c409224cb6937ab8689ed0e66f", "duration": "34 min"},
            {"title": "Module 2 : Oser être soi-même", "video_url": "https://www.loom.com/embed/14bdae734ec54978a9f674e68f8a4d5c", "duration": "16 min"},
        ]
    },
    {
        "id": "premium",
        "name": "Maître De Ton Cerveau",
        "tier": "PREMIUM",
        "duration": "8 semaines",
        "modules": [
            {"title": "Module 1 : Explorer Nos Automatismes", "video_url": "https://www.loom.com/embed/55be99c409224cb6937ab8689ed0e66f", "duration": "34 min"},
            {"title": "Module 2 : Oser être soi-même", "video_url": "https://www.loom.com/embed/14bdae734ec54978a9f674e68f8a4d5c", "duration": "16 min"},
        ]
    },
    {
        "id": "vip",
        "name": "Transformation Annuelle",
        "tier": "VIP",
        "duration": "12 mois",
        "modules": [
            {"title": "Module 1 : Explorer Nos Automatismes", "video_url": "https://www.loom.com/embed/55be99c409224cb6937ab8689ed0e66f", "duration": "34 min"},
            {"title": "Module 2 : Oser être soi-même", "video_url": "https://www.loom.com/embed/14bdae734ec54978a9f674e68f8a4d5c", "duration": "16 min"},
        ]
    },
]


# ---- Auth endpoints ----
@auth_router.post("/register")
async def register(input_data: RegisterInput, response: Response):
    email = input_data.email.lower().strip()
    existing = await db.users.find_one({"email": email})
    if existing:
        raise HTTPException(status_code=400, detail="Cet email est deja utilise")
    hashed = hash_password(input_data.password)
    user_doc = {"email": email, "password_hash": hashed, "name": input_data.name, "role": "member", "enrolled_formations": [], "created_at": datetime.now(timezone.utc).isoformat()}
    result = await db.users.insert_one(user_doc)
    user_id = str(result.inserted_id)
    await db.notifications.insert_one({"type": "new_member", "message": f"Nouveau membre inscrit : {input_data.name} ({email})", "user_name": input_data.name, "user_email": email, "whatsapp_url": f"https://wa.me/22657575701?text=Bienvenue {input_data.name} ! Merci de vous etre inscrit(e) sur notre plateforme Cabinet Mindset Coaching.", "read": False, "created_at": datetime.now(timezone.utc).isoformat()})
    access_token = create_access_token(user_id, email)
    refresh_token = create_refresh_token(user_id)
    set_auth_cookies(response, access_token, refresh_token)
    return {"id": user_id, "email": email, "name": input_data.name, "role": "member", "enrolled_formations": []}

@auth_router.post("/login")
async def login(input_data: LoginInput, request: Request, response: Response):
    email = input_data.email.lower().strip()
    ip = request.client.host if request.client else "unknown"
    identifier = f"{ip}:{email}"
    attempt = await db.login_attempts.find_one({"identifier": identifier})
    if attempt and attempt.get("count", 0) >= 5:
        lockout_time = attempt.get("last_attempt")
        if lockout_time:
            if isinstance(lockout_time, str):
                lockout_time = datetime.fromisoformat(lockout_time)
            if datetime.now(timezone.utc) - lockout_time < timedelta(minutes=15):
                raise HTTPException(status_code=429, detail="Trop de tentatives. Reessayez dans 15 minutes.")
            else:
                await db.login_attempts.delete_one({"identifier": identifier})
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(input_data.password, user["password_hash"]):
        await db.login_attempts.update_one({"identifier": identifier}, {"$inc": {"count": 1}, "$set": {"last_attempt": datetime.now(timezone.utc).isoformat()}}, upsert=True)
        raise HTTPException(status_code=401, detail="Email ou mot de passe incorrect")
    await db.login_attempts.delete_one({"identifier": identifier})
    user_id = str(user["_id"])
    access_token = create_access_token(user_id, email)
    refresh_token = create_refresh_token(user_id)
    set_auth_cookies(response, access_token, refresh_token)
    return {"id": user_id, "email": email, "name": user.get("name", ""), "role": user.get("role", "member"), "enrolled_formations": user.get("enrolled_formations", [])}

@auth_router.post("/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("refresh_token", path="/")
    return {"message": "Deconnexion reussie"}

@auth_router.get("/me")
async def get_me(request: Request):
    user = await get_current_user(request)
    return {"id": user["_id"], "email": user["email"], "name": user.get("name", ""), "role": user.get("role", "member"), "enrolled_formations": user.get("enrolled_formations", [])}

@auth_router.post("/refresh")
async def refresh_token(request: Request, response: Response):
    token = request.cookies.get("refresh_token")
    if not token:
        raise HTTPException(status_code=401, detail="No refresh token")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        user_id = str(user["_id"])
        access_token = create_access_token(user_id, user["email"])
        response.set_cookie(key="access_token", value=access_token, httponly=True, secure=False, samesite="lax", max_age=3600, path="/")
        return {"message": "Token refreshed"}
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid refresh token")


# ---- API endpoints ----
@api_router.get("/")
async def root():
    return {"message": "Coach Lady Wassa API"}

@api_router.post("/leads")
async def create_lead(input_data: LeadCreate):
    doc = {"id": str(uuid.uuid4()), **input_data.model_dump(), "created_at": datetime.now(timezone.utc).isoformat()}
    await db.leads.insert_one(doc)
    doc.pop("_id", None)
    return doc

@api_router.post("/webinar-registrations")
async def create_webinar_registration(input_data: WebinarRegistrationCreate):
    doc = {"id": str(uuid.uuid4()), **input_data.model_dump(), "created_at": datetime.now(timezone.utc).isoformat()}
    await db.webinar_registrations.insert_one(doc)
    doc.pop("_id", None)
    return doc

@api_router.post("/contact")
async def create_contact_message(input_data: ContactMessageCreate):
    doc = {"id": str(uuid.uuid4()), **input_data.model_dump(), "created_at": datetime.now(timezone.utc).isoformat()}
    await db.contact_messages.insert_one(doc)
    doc.pop("_id", None)
    return doc

@api_router.post("/newsletter")
async def subscribe_newsletter(input_data: NewsletterCreate):
    doc = {"id": str(uuid.uuid4()), "email": input_data.email, "created_at": datetime.now(timezone.utc).isoformat()}
    await db.newsletter_subscriptions.insert_one(doc)
    return {"message": "Inscription reussie", "id": doc["id"]}

@api_router.get("/blog/articles")
async def get_blog_articles():
    return [{k: v for k, v in a.items() if k != "content"} for a in BLOG_ARTICLES]

@api_router.get("/blog/articles/{slug}")
async def get_blog_article(slug: str):
    for a in BLOG_ARTICLES:
        if a["slug"] == slug:
            return a
    raise HTTPException(status_code=404, detail="Article non trouve")

@api_router.get("/formations")
async def get_formations():
    return FORMATIONS_CONTENT

@api_router.get("/member/formations")
async def get_member_formations(request: Request):
    user = await get_current_user(request)
    enrolled = user.get("enrolled_formations", [])
    result = []
    for f in FORMATIONS_CONTENT:
        is_enrolled = f["id"] in enrolled
        formation = {**f}
        if not is_enrolled:
            formation["modules"] = [{"title": m["title"], "duration": m["duration"], "locked": True} for m in f["modules"]]
        else:
            formation["modules"] = [{**m, "locked": False} for m in f["modules"]]
        formation["enrolled"] = is_enrolled
        result.append(formation)
    return result


# ---- Admin endpoints ----
@admin_router.get("/stats")
async def admin_stats(request: Request):
    await require_admin(request)
    return {"members": await db.users.count_documents({"role": "member"}), "leads": await db.leads.count_documents({}), "webinar_registrations": await db.webinar_registrations.count_documents({}), "contact_messages": await db.contact_messages.count_documents({}), "newsletters": await db.newsletter_subscriptions.count_documents({}), "unread_notifications": await db.notifications.count_documents({"read": False})}

@admin_router.get("/members")
async def admin_list_members(request: Request):
    await require_admin(request)
    cursor = db.users.find({"role": "member"}, {"password_hash": 0}).sort("created_at", -1)
    members = []
    async for user in cursor:
        user["_id"] = str(user["_id"])
        members.append(user)
    return members

@admin_router.put("/members/{user_id}/enroll")
async def admin_enroll_member(user_id: str, input_data: EnrollInput, request: Request):
    await require_admin(request)
    result = await db.users.update_one({"_id": ObjectId(user_id)}, {"$addToSet": {"enrolled_formations": input_data.formation_id}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Membre non trouve")
    user = await db.users.find_one({"_id": ObjectId(user_id)}, {"password_hash": 0})
    await db.notifications.insert_one({"type": "enrollment", "message": f"{user.get('name', '')} inscrit(e) a la formation {input_data.formation_id}", "user_name": user.get("name", ""), "user_email": user.get("email", ""), "whatsapp_url": f"https://wa.me/22657575701?text=Bonjour {user.get('name', '')} ! Votre inscription a la formation {input_data.formation_id} est confirmee.", "read": False, "created_at": datetime.now(timezone.utc).isoformat()})
    return {"message": "Membre inscrit", "enrolled_formations": user.get("enrolled_formations", [])}

@admin_router.put("/members/{user_id}/unenroll")
async def admin_unenroll_member(user_id: str, input_data: EnrollInput, request: Request):
    await require_admin(request)
    result = await db.users.update_one({"_id": ObjectId(user_id)}, {"$pull": {"enrolled_formations": input_data.formation_id}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Membre non trouve")
    return {"message": "Membre desinscrit"}

@admin_router.get("/leads")
async def admin_list_leads(request: Request):
    await require_admin(request)
    cursor = db.leads.find({}, {"_id": 0}).sort("created_at", -1)
    return [lead async for lead in cursor]

@admin_router.get("/webinar-registrations")
async def admin_list_webinar_regs(request: Request):
    await require_admin(request)
    cursor = db.webinar_registrations.find({}, {"_id": 0}).sort("created_at", -1)
    return [reg async for reg in cursor]

@admin_router.get("/contacts")
async def admin_list_contacts(request: Request):
    await require_admin(request)
    cursor = db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1)
    return [msg async for msg in cursor]

@admin_router.get("/notifications")
async def admin_list_notifications(request: Request):
    await require_admin(request)
    cursor = db.notifications.find({}, {"_id": 0}).sort("created_at", -1).limit(50)
    return [n async for n in cursor]

@admin_router.put("/notifications/read-all")
async def admin_mark_notifications_read(request: Request):
    await require_admin(request)
    await db.notifications.update_many({"read": False}, {"$set": {"read": True}})
    return {"message": "Toutes les notifications marquees comme lues"}


app.include_router(auth_router)
app.include_router(admin_router)
app.include_router(api_router)

app.add_middleware(CORSMiddleware, allow_credentials=True, allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','), allow_methods=["*"], allow_headers=["*"])

# Serve frontend static files in production (Render deployment)
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

STATIC_DIR = ROOT_DIR / "static_build"
if STATIC_DIR.exists():
    app.mount("/static", StaticFiles(directory=str(STATIC_DIR / "static")), name="static")

    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        file_path = STATIC_DIR / full_path
        if file_path.is_file():
            return FileResponse(str(file_path))
        return FileResponse(str(STATIC_DIR / "index.html"))

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup():
    await db.users.create_index("email", unique=True)
    await db.login_attempts.create_index("identifier")
    admin_email = os.environ.get("ADMIN_EMAIL", "admin@ladywassa.com")
    admin_password = os.environ.get("ADMIN_PASSWORD", "LadyWassa2025!")
    existing = await db.users.find_one({"email": admin_email})
    if existing is None:
        await db.users.insert_one({"email": admin_email, "password_hash": hash_password(admin_password), "name": "Admin Lady Wassa", "role": "admin", "enrolled_formations": ["starter", "standard", "premium", "vip"], "created_at": datetime.now(timezone.utc).isoformat()})
        logger.info(f"Admin seeded: {admin_email}")
    elif not verify_password(admin_password, existing["password_hash"]):
        await db.users.update_one({"email": admin_email}, {"$set": {"password_hash": hash_password(admin_password)}})

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
