from fastapi import APIRouter
from models.schemas import StatSummary, AlertItem
from database.dummy_data import get_stat_summary, get_active_alerts
from typing import List

router = APIRouter(prefix="/stats", tags=["Statistics & Alerts"])

@router.get("", response_model=StatSummary)
def get_stats():
    return get_stat_summary()

@router.get("/alerts", response_model=List[AlertItem])
def get_alerts():
    return get_active_alerts()
