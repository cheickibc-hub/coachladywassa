import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Backend API tests for Coach Lady Wassa site

class TestHealthAndBlog:
    def test_api_root(self):
        r = requests.get(f"{BASE_URL}/api/")
        assert r.status_code == 200

    def test_blog_articles_returns_6(self):
        r = requests.get(f"{BASE_URL}/api/blog/articles")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) == 6
        assert "title" in data[0]
        assert "category" in data[0]

    def test_stats_endpoint(self):
        r = requests.get(f"{BASE_URL}/api/stats")
        assert r.status_code == 200
        data = r.json()
        assert "leads" in data


class TestLeads:
    def test_create_lead(self):
        payload = {
            "first_name": "TEST_Jean",
            "email": "TEST_jean@example.com",
            "whatsapp": "+22600000001",
            "profile_type": "Ambitieux",
            "prefer_whatsapp": True,
            "source": "quiz"
        }
        r = requests.post(f"{BASE_URL}/api/leads", json=payload)
        assert r.status_code == 200
        data = r.json()
        assert data["first_name"] == "TEST_Jean"
        assert data["email"] == "TEST_jean@example.com"
        assert "id" in data

    def test_create_lead_missing_fields(self):
        r = requests.post(f"{BASE_URL}/api/leads", json={"first_name": "Test"})
        assert r.status_code == 422


class TestWebinarRegistrations:
    def test_create_webinar_registration(self):
        payload = {
            "first_name": "TEST_Marie",
            "email": "TEST_marie@example.com",
            "biggest_challenge": "stress au travail",
            "reminder_preference": "whatsapp"
        }
        r = requests.post(f"{BASE_URL}/api/webinar-registrations", json=payload)
        assert r.status_code == 200
        data = r.json()
        assert data["first_name"] == "TEST_Marie"
        assert "id" in data

    def test_create_webinar_missing_fields(self):
        r = requests.post(f"{BASE_URL}/api/webinar-registrations", json={"first_name": "Test"})
        assert r.status_code == 422


class TestContact:
    def test_create_contact_message(self):
        payload = {
            "name": "TEST_Kouame",
            "email": "TEST_kouame@example.com",
            "subject": "Question sur les formations",
            "message": "Bonjour, je voudrais en savoir plus."
        }
        r = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 200
        data = r.json()
        assert data["name"] == "TEST_Kouame"
        assert "id" in data

    def test_create_contact_missing_fields(self):
        r = requests.post(f"{BASE_URL}/api/contact", json={"name": "Test"})
        assert r.status_code == 422


class TestNewsletter:
    def test_subscribe_newsletter(self):
        payload = {"email": "TEST_newsletter@example.com"}
        r = requests.post(f"{BASE_URL}/api/newsletter", json=payload)
        assert r.status_code == 200
        data = r.json()
        assert "id" in data or "message" in data

    def test_subscribe_newsletter_missing_email(self):
        r = requests.post(f"{BASE_URL}/api/newsletter", json={})
        assert r.status_code == 422
