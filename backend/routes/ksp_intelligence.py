from fastapi import APIRouter
from models.schemas import (
    PatrolRoute, FestivalEventRisk, WomenSafetyArea,
    ExplainableAIFactors, ActionTimelineItem, ExecutiveBrief
)
from database.dummy_data import (
    get_patrol_routes, get_festival_risks, get_women_safety_index,
    get_explainable_ai_factors, get_officer_action_timeline, get_executive_brief
)
from typing import List

router = APIRouter(prefix="/ksp", tags=["Karnataka State Police Intelligence"])

@router.get("/patrol-routes", response_model=List[PatrolRoute])
def get_routes():
    return get_patrol_routes()

@router.get("/event-risks", response_model=List[FestivalEventRisk])
def get_events():
    return get_festival_risks()

@router.get("/women-safety-index", response_model=List[WomenSafetyArea])
def get_women_safety():
    return get_women_safety_index()

@router.get("/explainable-ai", response_model=ExplainableAIFactors)
def get_explainable_ai():
    return get_explainable_ai_factors()

@router.get("/action-timeline", response_model=List[ActionTimelineItem])
def get_action_timeline():
    return get_officer_action_timeline()

@router.get("/executive-brief", response_model=ExecutiveBrief)
def get_brief():
    return get_executive_brief()
