from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.orm import Session
from app.database import get_db, engine, Base
from app.routers import auth
from app.routers import studies
from app.routers import integration

# Create all tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AIIA CTMS API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth.router)
app.include_router(studies.router)
app.include_router(integration.router)

@app.get("/")
def root():
    return {"status": "ok", "service": "AIIA CTMS"}


@app.get("/db-check")
def db_check(db: Session = Depends(get_db)):
    result = db.execute(text("SELECT COUNT(*) FROM users"))
    count = result.scalar()
    return {"connected": True, "users_table_row_count": count}