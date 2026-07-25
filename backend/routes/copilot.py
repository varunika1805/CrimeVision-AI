from fastapi import APIRouter
from models.schemas import CopilotQueryRequest, CopilotQueryResponse, CopilotRecommendation
from ai.copilot_engine import copilot_engine
from database.dummy_data import get_copilot_recommendations
from typing import List

router = APIRouter(prefix="/copilot", tags=["AI Intelligence Copilot"])

@router.post("/query", response_model=CopilotQueryResponse)
def query_copilot(payload: CopilotQueryRequest):
    return copilot_engine.process_query(payload.prompt, payload.context_district or "All Districts")

@router.get("/recommendations", response_model=List[CopilotRecommendation])
def get_recommendations():
    return get_copilot_recommendations()
