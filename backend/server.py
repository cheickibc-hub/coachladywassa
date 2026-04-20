from dotenv import load_dotenv
from pathlib import Path
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from fastapi import FastAPI, APIRouter, Request, HTTPException, Response, Depends
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
import os
import logging
import bcrypt
import jwt
import secrets
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

app = FastAPI()
api_router = APIRouter(prefix="/api")
auth_router = APIRouter(prefix="/api/auth")


# ---- Models ----
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


# ---- Blog articles ----
BLOG_ARTICLES = [
    {"id": "1", "title": "7 techniques neurosciences pour gerer le stress sans medicaments", "excerpt": "Decouvrez comment votre cerveau peut naturellement reduire le cortisol.", "category": "Gestion Stress", "image_url": "https://images.pexels.com/photos/3760607/pexels-photo-3760607.jpeg?auto=compress&cs=tinysrgb&w=600", "slug": "gerer-stress-neurosciences", "reading_time": "6 min", "date": "2025-12-15"},
    {"id": "2", "title": "Comment vaincre la peur de presenter en public", "excerpt": "La peur de parler en public touche 75% des gens. Voici comment la neuroscience resout ce blocage.", "category": "Performance", "image_url": "https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=600", "slug": "vaincre-peur-public", "reading_time": "8 min", "date": "2025-12-08"},
    {"id": "3", "title": "Les 5 peurs que votre cerveau maintient et comment les dissoudre", "excerpt": "Votre amygdale est programmee pour vous proteger, mais parfois elle vous limite.", "category": "Neurosciences", "image_url": "https://images.pexels.com/photos/7176325/pexels-photo-7176325.jpeg?auto=compress&cs=tinysrgb&w=600", "slug": "5-peurs-cerveau", "reading_time": "7 min", "date": "2025-12-01"},
    {"id": "4", "title": "Neuroplasticite : Pourquoi vous POUVEZ changer vos peurs", "excerpt": "La science prouve que votre cerveau peut se recabler a tout age.", "category": "Neuroplasticite", "image_url": "https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=600", "slug": "neuroplasticite-changer-peurs", "reading_time": "5 min", "date": "2025-11-24"},
    {"id": "5", "title": "Focus naturel : 5 techniques neurosciences pour la productivite", "excerpt": "Optimisez votre concentration grace au fonctionnement de votre cerveau.", "category": "Productivite", "image_url": "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=600", "slug": "focus-naturel-productivite", "reading_time": "6 min", "date": "2025-11-17"},
    {"id": "6", "title": "Cortisol eleve ? Comment votre cerveau vous maintient stressee", "excerpt": "Comprendre le role du cortisol et les techniques pour le reguler naturellement.", "category": "Gestion Stress", "image_url": "https://images.pexels.com/photos/3831136/pexels-photo-3831136.jpeg?auto=compress&cs=tinysrgb&w=600", "slug": "cortisol-stress-cerveau", "reading_time": "7 min", "date": "2025-11-10"},
]

FORMATIONS_CONTENT = [
    {
        "id": "starter",
        "name": "Peur 101 Starter",
        "tier": "STARTER",
        "duration": "2 semaines",
        "modules": [
            {"title": "Module 1 : Explorer Nos Automatismes", "video_url": "https://www.loom.com/embed/55be99c409224cb6937ab8689ed0e66f", "duration": "34 min"},
            {"title": "Module 2 : Oser etre soi-meme", "video_url": "https://www.loom.com/embed/14bdae734ec54978a9f674e68f8a4d5c", "duration": "16 min"},
        ]
    },
    {
        "id": "standard",
        "name": "Transformation Cerebrale",
        "tier": "STANDARD",
        "duration": "4 semaines",
        "modules": [
            {"title": "Module 1 : Explorer Nos Automatismes", "video_url": "https://www.loom.com/embed/55be99c409224cb6937ab8689ed0e66f", "duration": "34 min"},
            {"title": "Module 2 : Oser etre soi-meme", "video_url": "https://www.loom.com/embed/14bdae734ec54978a9f674e68f8a4d5c", "duration": "16 min"},
        ]
    },
    {
        "id": "premium",
        "name": "Maitre Ton Cerveau",
        "tier": "PREMIUM",
        "duration": "8 semaines",
        "modules": [
            {"title": "Module 1 : Explorer Nos Automatismes", "video_url": "https://www.loom.com/embed/55be99c409224cb6937ab8689ed0e66f", "duration": "34 min"},
            {"title": "Module 2 : Oser etre soi-meme", "video_url": "https://www.loom.com/embed/14bdae734ec54978a9f674e68f8a4d5c", "duration": "16 min"},
        ]
    },
    {
        "id": "vip",
        "name": "Transformation Annuelle",
        "tier": "VIP",
        "duration": "12 mois",
        "modules": [
            {"title": "Module 1 : Explorer Nos Automatismes", "video_url": "https://www.loom.com/embed/55be99c409224cb6937ab8689ed0e66f", "duration": "34 min"},
            {"title": "Module 2 : Oser etre soi-meme", "video_url": "https://www.loom.com/embed/14bdae734ec54978a9f674e68f8a4d5c", "duration": "16 min"},
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
    user_doc = {
        "email": email,
        "password_hash": hashed,
        "name": input_data.name,
        "role": "member",
        "enrolled_formations": [],
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    result = await db.users.insert_one(user_doc)
    user_id = str(result.inserted_id)
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
        await db.login_attempts.update_one(
            {"identifier": identifier},
            {"$inc": {"count": 1}, "$set": {"last_attempt": datetime.now(timezone.utc).isoformat()}},
            upsert=True
        )
        raise HTTPException(status_code=401, detail="Email ou mot de passe incorrect")
    await db.login_attempts.delete_one({"identifier": identifier})
    user_id = str(user["_id"])
    access_token = create_access_token(user_id, email)
    refresh_token = create_refresh_token(user_id)
    set_auth_cookies(response, access_token, refresh_token)
    return {
        "id": user_id, "email": email, "name": user.get("name", ""),
        "role": user.get("role", "member"),
        "enrolled_formations": user.get("enrolled_formations", [])
    }

@auth_router.post("/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("refresh_token", path="/")
    return {"message": "Deconnexion reussie"}

@auth_router.get("/me")
async def get_me(request: Request):
    user = await get_current_user(request)
    return {
        "id": user["_id"], "email": user["email"], "name": user.get("name", ""),
        "role": user.get("role", "member"),
        "enrolled_formations": user.get("enrolled_formations", [])
    }

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
    doc = {
        "id": str(uuid.uuid4()),
        **input_data.model_dump(),
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.leads.insert_one(doc)
    doc.pop("_id", None)
    return doc

@api_router.post("/webinar-registrations")
async def create_webinar_registration(input_data: WebinarRegistrationCreate):
    doc = {
        "id": str(uuid.uuid4()),
        **input_data.model_dump(),
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.webinar_registrations.insert_one(doc)
    doc.pop("_id", None)
    return doc

@api_router.post("/contact")
async def create_contact_message(input_data: ContactMessageCreate):
    doc = {
        "id": str(uuid.uuid4()),
        **input_data.model_dump(),
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.contact_messages.insert_one(doc)
    doc.pop("_id", None)
    return doc

@api_router.post("/newsletter")
async def subscribe_newsletter(input_data: NewsletterCreate):
    doc = {
        "id": str(uuid.uuid4()),
        "email": input_data.email,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.newsletter_subscriptions.insert_one(doc)
    return {"message": "Inscription reussie", "id": doc["id"]}

@api_router.get("/blog/articles")
async def get_blog_articles():
    return BLOG_ARTICLES

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


app.include_router(auth_router)
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

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
        hashed = hash_password(admin_password)
        await db.users.insert_one({
            "email": admin_email, "password_hash": hashed,
            "name": "Admin Lady Wassa", "role": "admin",
            "enrolled_formations": ["starter", "standard", "premium", "vip"],
            "created_at": datetime.now(timezone.utc).isoformat()
        })
        logger.info(f"Admin seeded: {admin_email}")
    elif not verify_password(admin_password, existing["password_hash"]):
        await db.users.update_one({"email": admin_email}, {"$set": {"password_hash": hash_password(admin_password)}})
        logger.info("Admin password updated")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
