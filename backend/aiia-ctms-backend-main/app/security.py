"""
Password hashing and JWT helpers for the AIIA CTMS backend.

Drop in as app/security.py. Reads JWT_SECRET_KEY from .env (add it —
it is NOT in your existing .env yet, only DATABASE_URL is). Generate
one with: python -c "import secrets; print(secrets.token_hex(32))"
"""

import os
from datetime import datetime, timedelta, timezone

import bcrypt
from dotenv import load_dotenv
from jose import jwt, JWTError

load_dotenv()

SECRET_KEY = os.getenv("JWT_SECRET_KEY")
if not SECRET_KEY:
    raise RuntimeError(
        "JWT_SECRET_KEY is not set. Add it to your .env file "
        '(e.g. JWT_SECRET_KEY=<output of `python -c "import secrets; print(secrets.token_hex(32))"`).'
    )

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 8  # 8 hours — long enough for a demo day

def hash_password(plain_password: str) -> str:
    password = plain_password.encode("utf-8")
    if len(password) > 72:
        raise ValueError("Password must be 72 bytes or fewer")
    return bcrypt.hashpw(password, bcrypt.gensalt()).decode("utf-8")


def verify_password(plain_password: str, password_hash: str) -> bool:
    password = plain_password.encode("utf-8")
    if len(password) > 72:
        return False
    return bcrypt.checkpw(password, password_hash.encode("utf-8"))


def create_access_token(user_id: str, role: str) -> str:
    """
    Encodes user_id (sub) and role into the JWT payload, per Section 2's
    auth requirement: "Role embedded in token payload; server-side
    validation on every route."
    """
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {"sub": str(user_id), "role": role, "exp": expire}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def decode_access_token(token: str) -> dict:
    """Raises jose.JWTError if the token is invalid or expired."""
    return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])