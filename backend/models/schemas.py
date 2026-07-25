from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class IncidentBase(BaseModel):
    title: str
    type: str  # e.g., "Armed Robbery", "Cyber Crime", "Vehicle Theft", "Narcotics", "Assault", "Gang Activity"
    location: str
    district: str
    latitude: float
    longitude: float
    severity: str  # "Critical", "High", "Medium", "Low"
    status: str  # "Active", "Investigating", "Dispatched", "Resolved"
    assigned_unit: str
    risk_score: float
    description: str

class IncidentCreate(IncidentBase):
    pass

class PoliceStation(BaseModel):
    name: str
    distance: str
    contact: str

class HospitalInfo(BaseModel):
    name: str
    distance: str
    beds: str

class Incident(IncidentBase):
    id: str
    timestamp: str
    time_elapsed: str
    nearest_ps: Optional[List[PoliceStation]] = None
    nearest_hospitals: Optional[List[HospitalInfo]] = None
    diversion_routes: Optional[str] = None

class StatSummary(BaseModel):
    total_crimes: int
    crimes_change_pct: float
    active_cases: int
    active_cases_change_pct: float
    hotspots_count: int
    hotspots_change_pct: float
    ai_alerts_count: int
    ai_alerts_change_pct: float
    threat_level: str
    defcon_status: str
    women_safety_index_avg: float
    active_hoysala_units: int

class HeatmapMarker(BaseModel):
    id: str
    name: str
    district: str
    latitude: float
    longitude: float
    intensity: float  # 0.0 to 1.0
    crime_count: int
    risk_level: str
    primary_threat: str
    recommended_officers: int
    recommended_vehicles: str
    allocation_reasoning: str

class TrendPoint(BaseModel):
    period: str
    robbery: int
    cyber: int
    narcotics: int
    assault: int
    vehicle_theft: int
    total: int

class CopilotQueryRequest(BaseModel):
    prompt: str
    context_district: Optional[str] = "All Districts"
    urgency: Optional[str] = "Normal"

class CopilotRecommendation(BaseModel):
    id: str
    category: str
    priority: str  # "HIGH", "CRITICAL", "MEDIUM"
    title: str
    action_plan: str
    impact_assessment: str
    affected_district: str
    timestamp: str

class CopilotQueryResponse(BaseModel):
    query: str
    ai_analysis: str
    key_findings: List[str]
    suggested_actions: List[str]
    predictive_risk_score: float
    recommended_units: List[str]

class AlertItem(BaseModel):
    id: str
    title: str
    category: str
    severity: str  # "CRITICAL", "HIGH", "WARNING"
    location: str
    timestamp: str
    message: str
    is_active: bool

# --- NEW KARNATAKA STATE POLICE DECISION-SUPPORT SCHEMAS ---

class PatrolRoute(BaseModel):
    id: str
    unit_id: str
    route_name: str
    district: str
    waypoints: List[str]
    predicted_hotspots: List[str]
    traffic_condition: str
    total_distance: str
    est_duration: str
    coverage_risk_reduction: str
    assigned_officers: int
    status: str
    safety_impact: str

class EventDeployment(BaseModel):
    officers: int
    hoysala_vehicles: int
    cctv_mobile_units: int
    drone_squads: int
    pink_hoysalas: int

class FestivalEventRisk(BaseModel):
    id: str
    event_name: str
    location: str
    district: str
    event_date: str
    expected_crowd: str
    threat_level: str
    risk_score: float
    risk_factors: List[str]
    recommended_deployment: EventDeployment
    action_status: str

class WomenSafetyArea(BaseModel):
    id: str
    area_name: str
    district: str
    safety_score: int
    risk_status: str
    lighting_cctv_pct: int
    namma_112_calls_24h: int
    patrol_freq_mins: str
    pink_hoysala_status: str
    key_threat: str
    coords: List[float]

class ExplainableAIFactor(BaseModel):
    factor: str
    weight: int
    color: str

class ExplainableAIFactors(BaseModel):
    engine_version: str
    overall_confidence: str
    contributing_factors: List[ExplainableAIFactor]
    historical_baseline_comparison: str
    model_justification: str

class ActionTimelineItem(BaseModel):
    time: str
    priority: str
    action: str
    assigned_to: str
    status: str
    impact: str

class ExecutiveBrief(BaseModel):
    generated_at: str
    dgp_summary: str
    kpi_snapshot: Dict[str, Any]
    critical_hotspots: List[Dict[str, Any]]
    event_warnings: List[Dict[str, Any]]
    women_safety_index_avg: float
    key_directives: List[str]
