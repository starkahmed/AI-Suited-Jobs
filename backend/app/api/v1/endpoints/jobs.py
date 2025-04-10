# jobs.py

from fastapi import APIRouter
from typing import List, Dict

router = APIRouter()

# Dummy job listings for demonstration
dummy_jobs = [
    {"id": 1, "title": "Software Engineer", "location": "Remote", "experience": "2+ years"},
    {"id": 2, "title": "Data Scientist", "location": "Bangalore", "experience": "3+ years"},
    {"id": 3, "title": "Frontend Developer", "location": "Pune", "experience": "1+ years"}
]

@router.get("/", summary="Fetch all available jobs")
async def get_all_jobs() -> List[Dict]:
    return dummy_jobs
