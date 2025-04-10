# main.py

from fastapi import FastAPI
from app.api.v1.api_router import router as api_router

app = FastAPI(title="AI Job Matching API")

# Include versioned API routes
app.include_router(api_router, prefix="/api/v1")

# Root endpoint for sanity check
@app.get("/")
def read_root():
    return {"message": "Welcome to the AI Job Matching API"}


# app/api/v1/endpoints/jobs.py

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


# app/api/v1/endpoints/resume.py

from fastapi import APIRouter, File, UploadFile
from fastapi.responses import JSONResponse

router = APIRouter()

@router.post("/upload", summary="Upload a resume file")
async def upload_resume(file: UploadFile = File(...)):
    content = await file.read()
    if not content:
        return JSONResponse(status_code=400, content={"error": "Empty file uploaded."})

    # Simulate resume processing (placeholder for actual AI logic)
    resume_text = content.decode("utf-8", errors="ignore")
    extracted_skills = ["Python", "Machine Learning"] if "Python" in resume_text else []

    return {
        "filename": file.filename,
        "extracted_skills": extracted_skills
    }