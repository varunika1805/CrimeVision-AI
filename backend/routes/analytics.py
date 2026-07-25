from fastapi import APIRouter
from models.schemas import TrendPoint, HeatmapMarker
from database.dummy_data import get_trend_analytics, get_hotspot_markers
from typing import List

router = APIRouter(prefix="/analytics", tags=["Analytics & Spatial Hotspots"])

@router.get("/trends", response_model=List[TrendPoint])
def get_trends():
    return get_trend_analytics()

@router.get("/hotspots", response_model=List[HeatmapMarker])
def get_hotspots():
    return get_hotspot_markers()
