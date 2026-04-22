import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
ADMIN_EMAIL = "admin@ladywassa.com"
ADMIN_PASSWORD = "LadyWassa2025!"


@pytest.fixture(scope="module")
def admin_session():
    s = requests.Session()
    r = s.post(f"{BASE_URL}/api/auth/login",
               json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert r.status_code == 200, f"Admin login failed: {r.status_code} {r.text}"
    data = r.json()
    assert data.get("role") == "admin"
    return s


@pytest.fixture(scope="module")
def unique_email():
    return f"pytest_{uuid.uuid4().hex[:8]}@t.com"


class TestAdminAuth:
    def test_admin_login_returns_admin_role(self):
        r = requests.post(f"{BASE_URL}/api/auth/login",
                          json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
        assert r.status_code == 200
        assert r.json()["role"] == "admin"

    def test_unauthenticated_admin_members_401(self):
        r = requests.get(f"{BASE_URL}/api/admin/members")
        assert r.status_code == 401

    def test_non_admin_cannot_access(self):
        # Register a throwaway member
        em = f"nonadm_{uuid.uuid4().hex[:6]}@t.com"
        s = requests.Session()
        r = s.post(f"{BASE_URL}/api/auth/register",
                   json={"name": "NonAdmin", "email": em, "password": "pass123"})
        assert r.status_code == 200
        r2 = s.get(f"{BASE_URL}/api/admin/members")
        assert r2.status_code == 403


class TestAdminCreateMember:
    def test_create_member_success_and_login(self, admin_session, unique_email):
        payload = {"name": "Pytest User", "email": unique_email,
                   "password": "pytest123", "enrolled_formations": ["starter"]}
        r = admin_session.post(f"{BASE_URL}/api/admin/members", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["email"] == unique_email
        assert data["role"] == "member"
        assert "starter" in data["enrolled_formations"]
        assert "_id" in data
        pytest._created_member_id = data["_id"]

        # Verify member appears in list
        lst = admin_session.get(f"{BASE_URL}/api/admin/members").json()
        assert any(m["email"] == unique_email for m in lst)

        # Newly created member can login
        s = requests.Session()
        lr = s.post(f"{BASE_URL}/api/auth/login",
                    json={"email": unique_email, "password": "pytest123"})
        assert lr.status_code == 200, lr.text
        assert lr.json()["role"] == "member"

    def test_duplicate_email_400(self, admin_session, unique_email):
        r = admin_session.post(f"{BASE_URL}/api/admin/members",
                               json={"name": "Dup", "email": unique_email, "password": "abcdef"})
        assert r.status_code == 400

    def test_short_password_400(self, admin_session):
        em = f"short_{uuid.uuid4().hex[:6]}@t.com"
        r = admin_session.post(f"{BASE_URL}/api/admin/members",
                               json={"name": "Short", "email": em, "password": "abc"})
        assert r.status_code == 400


class TestAdminPasswordReset:
    def test_reset_member_password(self, admin_session):
        # create a new member
        em = f"reset_{uuid.uuid4().hex[:6]}@t.com"
        r = admin_session.post(f"{BASE_URL}/api/admin/members",
                               json={"name": "Reset User", "email": em, "password": "oldpass1"})
        assert r.status_code == 200
        uid = r.json()["_id"]

        # reset
        r2 = admin_session.put(f"{BASE_URL}/api/admin/members/{uid}/password",
                               json={"password": "newpass1"})
        assert r2.status_code == 200

        # login with new password
        s = requests.Session()
        lr = s.post(f"{BASE_URL}/api/auth/login",
                    json={"email": em, "password": "newpass1"})
        assert lr.status_code == 200

        # old password fails
        s2 = requests.Session()
        lr2 = s2.post(f"{BASE_URL}/api/auth/login",
                      json={"email": em, "password": "oldpass1"})
        assert lr2.status_code == 401

    def test_reset_short_password_400(self, admin_session):
        em = f"rs_{uuid.uuid4().hex[:6]}@t.com"
        r = admin_session.post(f"{BASE_URL}/api/admin/members",
                               json={"name": "RS", "email": em, "password": "okpass1"})
        uid = r.json()["_id"]
        r2 = admin_session.put(f"{BASE_URL}/api/admin/members/{uid}/password",
                               json={"password": "abc"})
        assert r2.status_code == 400


class TestAdminDeleteMember:
    def test_delete_member(self, admin_session):
        em = f"del_{uuid.uuid4().hex[:6]}@t.com"
        r = admin_session.post(f"{BASE_URL}/api/admin/members",
                               json={"name": "Del", "email": em, "password": "delpass1"})
        uid = r.json()["_id"]
        dr = admin_session.delete(f"{BASE_URL}/api/admin/members/{uid}")
        assert dr.status_code == 200

        # member cannot login anymore
        s = requests.Session()
        lr = s.post(f"{BASE_URL}/api/auth/login",
                    json={"email": em, "password": "delpass1"})
        assert lr.status_code == 401

    def test_delete_invalid_id_400(self, admin_session):
        r = admin_session.delete(f"{BASE_URL}/api/admin/members/not-a-valid-id")
        assert r.status_code == 400


class TestAdminEnroll:
    def test_enroll_and_unenroll(self, admin_session):
        em = f"enr_{uuid.uuid4().hex[:6]}@t.com"
        r = admin_session.post(f"{BASE_URL}/api/admin/members",
                               json={"name": "Enr", "email": em, "password": "enrpass1"})
        uid = r.json()["_id"]
        r2 = admin_session.put(f"{BASE_URL}/api/admin/members/{uid}/enroll",
                               json={"formation_id": "premium"})
        assert r2.status_code == 200
        assert "premium" in r2.json()["enrolled_formations"]

        r3 = admin_session.put(f"{BASE_URL}/api/admin/members/{uid}/unenroll",
                               json={"formation_id": "premium"})
        assert r3.status_code == 200
