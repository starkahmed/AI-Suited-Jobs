# api_router.py

from fastapi import APIRouter
from app.api.v1.endpoints import resume, jobs

router = APIRouter()

# Resume-related endpoints
router.include_router(resume.router, prefix="/resume", tags=["Resume"])

# Job-related endpoints
router.include_router(jobs.router, prefix="/jobs", tags=["Jobs"])
