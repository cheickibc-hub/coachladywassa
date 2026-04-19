from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")


class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    first_name: str
    email: str
    whatsapp: str = ""
    profile_type: str = ""
    prefer_whatsapp: bool = True
    source: str = "quiz"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class LeadCreate(BaseModel):
    first_name: str
    email: str
    whatsapp: str = ""
    profile_type: str = ""
    prefer_whatsapp: bool = True
    source: str = "quiz"


class WebinarRegistration(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    first_name: str
    email: str
    biggest_challenge: str = ""
    reminder_preference: str = "whatsapp"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class WebinarRegistrationCreate(BaseModel):
    first_name: str
    email: str
    biggest_challenge: str = ""
    reminder_preference: str = "whatsapp"


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactMessageCreate(BaseModel):
    name: str
    email: str
    subject: str
    message: str


class NewsletterCreate(BaseModel):
    email: str


BLOG_ARTICLES = [
    {
        "id": "1",
        "title": "7 techniques neurosciences pour gerer le stress sans medicaments",
        "excerpt": "Decouvrez comment votre cerveau peut naturellement reduire le cortisol grace a des techniques validees scientifiquement.",
        "category": "Gestion Stress",
        "image_url": "https://images.pexels.com/photos/3760607/pexels-photo-3760607.jpeg?auto=compress&cs=tinysrgb&w=600",
        "slug": "gerer-stress-neurosciences",
        "reading_time": "6 min",
        "date": "2025-12-15"
    },
    {
        "id": "2",
        "title": "Comment vaincre la peur de presenter en public",
        "excerpt": "La peur de parler en public touche 75% des gens. Voici comment la neuroscience explique et resout ce blocage.",
        "category": "Performance",
        "image_url": "https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=600",
        "slug": "vaincre-peur-public",
        "reading_time": "8 min",
        "date": "2025-12-08"
    },
    {
        "id": "3",
        "title": "Les 5 peurs que votre cerveau maintient et comment les dissoudre",
        "excerpt": "Votre amygdale est programmee pour vous proteger, mais parfois elle vous limite. Decouvrez les 5 peurs les plus courantes.",
        "category": "Neurosciences",
        "image_url": "https://images.pexels.com/photos/7176325/pexels-photo-7176325.jpeg?auto=compress&cs=tinysrgb&w=600",
        "slug": "5-peurs-cerveau",
        "reading_time": "7 min",
        "date": "2025-12-01"
    },
    {
        "id": "4",
        "title": "Neuroplasticite : Pourquoi vous POUVEZ changer vos peurs",
        "excerpt": "La science prouve que votre cerveau peut se recabler a tout age. Voici comment utiliser la neuroplasticite.",
        "category": "Neuroplasticite",
        "image_url": "https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=600",
        "slug": "neuroplasticite-changer-peurs",
        "reading_time": "5 min",
        "date": "2025-11-24"
    },
    {
        "id": "5",
        "title": "Focus naturel : 5 techniques neurosciences pour la productivite",
        "excerpt": "Optimisez votre concentration et productivite grace a des techniques basees sur le fonctionnement de votre cerveau.",
        "category": "Productivite",
        "image_url": "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=600",
        "slug": "focus-naturel-productivite",
        "reading_time": "6 min",
        "date": "2025-11-17"
    },
    {
        "id": "6",
        "title": "Cortisol eleve ? Comment votre cerveau vous maintient stressee",
        "excerpt": "Comprendre le role du cortisol dans votre stress quotidien et les techniques pour le reguler naturellement.",
        "category": "Gestion Stress",
        "image_url": "https://images.pexels.com/photos/3831136/pexels-photo-3831136.jpeg?auto=compress&cs=tinysrgb&w=600",
        "slug": "cortisol-stress-cerveau",
        "reading_time": "7 min",
        "date": "2025-11-10"
    }
]


@api_router.get("/")
async def root():
    return {"message": "Coach Lady Wassa API"}


@api_router.post("/leads", response_model=Lead)
async def create_lead(input_data: LeadCreate):
    lead = Lead(**input_data.model_dump())
    doc = lead.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.leads.insert_one(doc)
    return lead


@api_router.post("/webinar-registrations", response_model=WebinarRegistration)
async def create_webinar_registration(input_data: WebinarRegistrationCreate):
    reg = WebinarRegistration(**input_data.model_dump())
    doc = reg.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.webinar_registrations.insert_one(doc)
    return reg


@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(input_data: ContactMessageCreate):
    msg = ContactMessage(**input_data.model_dump())
    doc = msg.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contact_messages.insert_one(doc)
    return msg


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


@api_router.get("/stats")
async def get_stats():
    leads_count = await db.leads.count_documents({})
    webinar_count = await db.webinar_registrations.count_documents({})
    return {
        "leads": leads_count + 12000,
        "webinar_registrations": webinar_count + 3000,
        "clients_transformed": 100,
        "satisfaction_rate": 95
    }


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
