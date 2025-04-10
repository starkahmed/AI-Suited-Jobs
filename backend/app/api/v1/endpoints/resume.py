# resume.py

from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import Dict
import uuid

router = APIRouter()

@router.post("/upload", summary="Upload a resume file")
async def upload_resume(file: UploadFile = File(...)) -> Dict[str, str]:
    if not file.filename.endswith((".pdf", ".docx")):
        raise HTTPException(status_code=400, detail="Only PDF and DOCX files are supported.")
    
    # Simulate file saving
    resume_id = str(uuid.uuid4())
    
    # TODO: Save the file to disk or cloud and parse the resume content.
    return {"message": "Resume uploaded successfully", "resume_id": resume_id}
