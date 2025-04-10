# app/api/v1/endpoints/health.py

from fastapi import APIRouter
from fastapi.responses import JSONResponse

router = APIRouter()

@router.get("/", summary="Health Check", response_description="API is healthy")
async def health_check():
    return JSONResponse(content={"status": "ok", "message": "API is healthy"})
