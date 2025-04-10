# app/api/v1/endpoints/match.py

from fastapi import APIRouter, Body
from typing import List, Dict

router = APIRouter()

# Dummy job listings (shared logic; ideally fetched from DB or service)
dummy_jobs = [
    {"id": 1, "title": "Software Engineer", "skills_required": ["Python", "FastAPI"]},
    {"id": 2, "title": "Data Scientist", "skills_required": ["Python", "ML", "Pandas"]},
    {"id": 3, "title": "Frontend Developer", "skills_required": ["React", "Tailwind", "JS"]},
]

@router.post("/", summary="Match resume skills with job requirements")
async def match_jobs(skills: List[str] = Body(..., embed=True)) -> List[Dict]:
    matched = []
    for job in dummy_jobs:
        # Check if at least one skill matches
        if any(skill in job["skills_required"] for skill in skills):
            matched.append(job)

    return matched

