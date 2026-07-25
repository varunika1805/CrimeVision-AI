from fastapi import APIRouter, Query, HTTPException
from models.schemas import Incident, IncidentCreate
from database.dummy_data import get_initial_incidents
from typing import List, Optional
import uuid
from datetime import datetime

router = APIRouter(prefix="/incidents", tags=["Crime Incidents"])

incidents_db = get_initial_incidents()

@router.get("", response_model=List[Incident])
def list_incidents(
    district: Optional[str] = Query(None, description="Filter by district"),
    severity: Optional[str] = Query(None, description="Filter by severity level"),
    status: Optional[str] = Query(None, description="Filter by incident status"),
    search: Optional[str] = Query(None, description="Search query string")
):
    results = incidents_db
    if district and district != "All":
        results = [inc for inc in results if inc["district"].lower() == district.lower()]
    if severity and severity != "All":
        results = [inc for inc in results if inc["severity"].lower() == severity.lower()]
    if status and status != "All":
        results = [inc for inc in results if inc["status"].lower() == status.lower()]
    if search:
        s = search.lower()
        results = [
            inc for inc in results 
            if s in inc["title"].lower() or s in inc["type"].lower() or s in inc["location"].lower() or s in inc["id"].lower()
        ]
    return results

@router.get("/{incident_id}", response_model=Incident)
def get_incident(incident_id: str):
    for inc in incidents_db:
        if inc["id"] == incident_id:
            return inc
    raise HTTPException(status_code=404, detail="Incident not found")

@router.post("", response_model=Incident, status_code=201)
def create_incident(payload: IncidentCreate):
    new_id = f"INC-2026-{uuid.uuid4().hex[:4].upper()}"
    new_inc = {
        "id": new_id,
        "title": payload.title,
        "type": payload.type,
        "location": payload.location,
        "district": payload.district,
        "latitude": payload.latitude,
        "longitude": payload.longitude,
        "severity": payload.severity,
        "status": payload.status,
        "assigned_unit": payload.assigned_unit,
        "risk_score": payload.risk_score,
        "description": payload.description,
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "time_elapsed": "Just now"
    }
    incidents_db.insert(0, new_inc)
    return new_inc
