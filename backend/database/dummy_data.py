from datetime import datetime, timedelta

def get_initial_incidents():
    return [
        {
            "id": "KSP-2026-9041",
            "title": "Armed Robbery at Commercial Vault",
            "type": "Armed Robbery",
            "location": "Commercial Street, Near Kamaraj Road Junction",
            "district": "Bengaluru Central",
            "latitude": 12.9822,
            "longitude": 77.6083,
            "severity": "Critical",
            "status": "Active",
            "assigned_unit": "Hoysala-14 (Cubbon Park PS)",
            "risk_score": 94.2,
            "description": "Suspects armed with weapons inside jewellery vault. Perimeter lockdown requested by Cubbon Park Police.",
            "timestamp": "2026-07-23T18:15:00Z",
            "time_elapsed": "6 mins ago",
            "nearest_ps": [
                {"name": "Cubbon Park Police Station", "distance": "0.8 km", "contact": "080-22942526"},
                {"name": "Commercial Street PS", "distance": "1.1 km", "contact": "080-22942527"},
                {"name": "High Grounds PS", "distance": "2.3 km", "contact": "080-22942528"}
            ],
            "nearest_hospitals": [
                {"name": "Bowring & Lady Curzon Hospital", "distance": "1.1 km", "beds": "14 ICU Emergency"},
                {"name": "Mallya Hospital", "distance": "1.8 km", "beds": "8 Trauma Units"}
            ],
            "diversion_routes": "Divert inbound traffic from Kamaraj Road towards MG Road via Infantry Road. Establish KSP Barricade at Brigade Road junction."
        },
        {
            "id": "KSP-2026-8912",
            "title": "Cyber Extortion & Ransomware on Tech Grid",
            "type": "Cyber Crime",
            "location": "Electronic City Phase 1, Cyber Hub",
            "district": "Bengaluru South",
            "latitude": 12.8452,
            "longitude": 77.6602,
            "severity": "Critical",
            "status": "Investigating",
            "assigned_unit": "KSP CEN Cyber Taskforce-9",
            "risk_score": 91.5,
            "description": "Sophisticated ransomware breach targeting IT park server infrastructure. CEN Cyber Crime PS handling.",
            "timestamp": "2026-07-23T17:42:00Z",
            "time_elapsed": "39 mins ago",
            "nearest_ps": [
                {"name": "Electronic City Police Station", "distance": "1.2 km", "contact": "080-22943200"},
                {"name": "Hebbagodi Police Station", "distance": "2.8 km", "contact": "080-22943201"}
            ],
            "nearest_hospitals": [
                {"name": "Narayana Health City", "distance": "2.5 km", "beds": "22 ICU Units"}
            ],
            "diversion_routes": "N/A - Cyber Incident Isolation Protocol in progress."
        },
        {
            "id": "KSP-2026-8874",
            "title": "Contraband Seizure & Illegal Warehouse Hub",
            "type": "Narcotics",
            "location": "Peenya Industrial Area, Phase 3",
            "district": "Bengaluru West",
            "latitude": 13.0285,
            "longitude": 77.5197,
            "severity": "High",
            "status": "Dispatched",
            "assigned_unit": "CCB Narcotics Wing & Hoysala-22",
            "risk_score": 87.8,
            "description": "AI surveillance flagged unregistered container transfers during late night hours. Peenya PS team en route.",
            "timestamp": "2026-07-23T16:20:00Z",
            "time_elapsed": "2 hrs ago",
            "nearest_ps": [
                {"name": "Peenya Police Station", "distance": "0.6 km", "contact": "080-22942710"},
                {"name": "Rajnagarkatte PS", "distance": "1.9 km", "contact": "080-22942711"}
            ],
            "nearest_hospitals": [
                {"name": "ESIC Hospital Peenya", "distance": "1.4 km", "beds": "10 Emergency Beds"}
            ],
            "diversion_routes": "Divert heavy goods vehicles to Tumakuru Highway Outer Bypass Lane."
        },
        {
            "id": "KSP-2026-8803",
            "title": "Inter-State Vehicle Snatching & High-Speed Pursuit",
            "type": "Vehicle Theft",
            "location": "Outer Ring Road, Hebbal Flyover",
            "district": "Bengaluru East",
            "latitude": 13.0358,
            "longitude": 77.5970,
            "severity": "High",
            "status": "Active",
            "assigned_unit": "KSP Interceptor Squad-2",
            "risk_score": 82.4,
            "description": "Stolen luxury SUV tracked traveling North toward Airport Expressway. ANPR camera hit at Hebbal.",
            "timestamp": "2026-07-23T15:55:00Z",
            "time_elapsed": "2.5 hrs ago",
            "nearest_ps": [
                {"name": "Hebbal Police Station", "distance": "0.9 km", "contact": "080-22942850"},
                {"name": "Yelahanka PS", "distance": "4.2 km", "contact": "080-22942851"}
            ],
            "nearest_hospitals": [
                {"name": "Aster CMI Hospital", "distance": "1.5 km", "beds": "18 Emergency Beds"}
            ],
            "diversion_routes": "Clear Airport Expressway express lane for KSP Interceptor pursuit."
        },
        {
            "id": "KSP-2026-8744",
            "title": "Night Dispute & Firearms Discharge",
            "type": "Gang Activity",
            "location": "Majestic Bus Stand Annex, Gandhinagar",
            "district": "Bengaluru Central",
            "latitude": 12.9767,
            "longitude": 77.5713,
            "severity": "Critical",
            "status": "Dispatched",
            "assigned_unit": "Garuda Counter-Terror & Hoysala-09",
            "risk_score": 96.0,
            "description": "Acoustic sensor array triggered near Majestic railway underpass. Upparpet Police dispatched.",
            "timestamp": "2026-07-23T14:10:00Z",
            "time_elapsed": "4 hrs ago",
            "nearest_ps": [
                {"name": "Upparpet Police Station", "distance": "0.5 km", "contact": "080-22942230"},
                {"name": "City Railway PS", "distance": "0.8 km", "contact": "080-22942231"}
            ],
            "nearest_hospitals": [
                {"name": "Victoria Hospital", "distance": "1.8 km", "beds": "35 Emergency Beds"}
            ],
            "diversion_routes": "Divert Majestic outgoing buses via Subhedar Chatram Road to avoid underpass block."
        },
        {
            "id": "KSP-2026-8690",
            "title": "Heritage Site Security Alert",
            "type": "Burglary",
            "location": "Mysore Palace South Gate, Mysuru",
            "district": "Mysuru City",
            "latitude": 12.3052,
            "longitude": 76.6552,
            "severity": "Medium",
            "status": "Resolved",
            "assigned_unit": "Mysuru Palace Police Beat-4",
            "risk_score": 45.0,
            "description": "Motion sensor breach at perimeter fence. Suspect apprehended by palace guards.",
            "timestamp": "2026-07-23T11:30:00Z",
            "time_elapsed": "7 hrs ago",
            "nearest_ps": [
                {"name": "Devaraja Police Station", "distance": "0.7 km", "contact": "0821-2418300"}
            ],
            "nearest_hospitals": [
                {"name": "KR Hospital Mysuru", "distance": "1.2 km", "beds": "12 Emergency Beds"}
            ],
            "diversion_routes": "N/A - Situation Normal"
        }
    ]

def get_stat_summary():
    return {
        "total_crimes": 1428,
        "crimes_change_pct": -4.2,
        "active_cases": 87,
        "active_cases_change_pct": +12.5,
        "hotspots_count": 14,
        "hotspots_change_pct": -2.0,
        "ai_alerts_count": 9,
        "ai_alerts_change_pct": +28.5,
        "threat_level": "ELEVATED",
        "defcon_status": "KSP DEFCON 3",
        "women_safety_index_avg": 76.4,
        "active_hoysala_units": 142
    }

def get_hotspot_markers():
    return [
        {
            "id": "HS-01",
            "name": "Commercial Street & MG Road Junction",
            "district": "Bengaluru Central",
            "latitude": 12.9750,
            "longitude": 77.6090,
            "intensity": 0.95,
            "crime_count": 342,
            "risk_level": "CRITICAL",
            "primary_threat": "Commercial Robbery & Crowded Theft",
            "recommended_officers": 12,
            "recommended_vehicles": "3 Hoysala Patrols + 1 Pink Hoysala",
            "allocation_reasoning": "High commercial footfall + 4 recent snatching reports during late shopping hours."
        },
        {
            "id": "HS-02",
            "name": "Majestic Bus Stand & Railway Station Corridor",
            "district": "Bengaluru Central",
            "latitude": 12.9767,
            "longitude": 77.5713,
            "intensity": 0.92,
            "crime_count": 298,
            "risk_level": "CRITICAL",
            "primary_threat": "Transit Assaults, Pickpocketing & Night Gang Disputes",
            "recommended_officers": 16,
            "recommended_vehicles": "4 Hoysala Patrols + 2 Mobile Surveillance Vans",
            "allocation_reasoning": "Major transit hub with high midnight passenger density and low perimeter CCTV coverage."
        },
        {
            "id": "HS-03",
            "name": "Peenya Industrial Area Sector 3",
            "district": "Bengaluru West",
            "latitude": 13.0285,
            "longitude": 77.5197,
            "intensity": 0.88,
            "crime_count": 215,
            "risk_level": "HIGH",
            "primary_threat": "Contraband Warehouse Depots & Cargo Snatching",
            "recommended_officers": 10,
            "recommended_vehicles": "2 Hoysala Patrols + 1 Interceptor",
            "allocation_reasoning": "Late factory shift change + dark industrial corridors + low street lighting."
        },
        {
            "id": "HS-04",
            "name": "Electronic City Phase 1 IT Corridor",
            "district": "Bengaluru South",
            "latitude": 12.8452,
            "longitude": 77.6602,
            "intensity": 0.82,
            "crime_count": 189,
            "risk_level": "HIGH",
            "primary_threat": "Cyber Extortion & Tech Campus Perimeter Snatching",
            "recommended_officers": 8,
            "recommended_vehicles": "2 Hoysala Patrols + 1 Pink Hoysala",
            "allocation_reasoning": "High late-night tech worker commute + sparse bus stop lighting."
        },
        {
            "id": "HS-05",
            "name": "Mysore Palace Circle & Subbarayanakere",
            "district": "Mysuru City",
            "latitude": 12.3052,
            "longitude": 76.6552,
            "intensity": 0.65,
            "crime_count": 140,
            "risk_level": "MEDIUM",
            "primary_threat": "Tourist Fraud & Heritage Site Petty Theft",
            "recommended_officers": 6,
            "recommended_vehicles": "2 Tourist Police Patrols",
            "allocation_reasoning": "Evening illumination crowd + tourist footfall surge."
        }
    ]

def get_trend_analytics():
    return [
        {"period": "Jan", "robbery": 42, "cyber": 68, "narcotics": 55, "assault": 80, "vehicle_theft": 30, "total": 275},
        {"period": "Feb", "robbery": 38, "cyber": 74, "narcotics": 60, "assault": 75, "vehicle_theft": 35, "total": 282},
        {"period": "Mar", "robbery": 45, "cyber": 85, "narcotics": 52, "assault": 88, "vehicle_theft": 40, "total": 310},
        {"period": "Apr", "robbery": 50, "cyber": 92, "narcotics": 48, "assault": 95, "vehicle_theft": 42, "total": 327},
        {"period": "May", "robbery": 48, "cyber": 110, "narcotics": 64, "assault": 82, "vehicle_theft": 45, "total": 349},
        {"period": "Jun", "robbery": 55, "cyber": 125, "narcotics": 70, "assault": 90, "vehicle_theft": 52, "total": 392},
        {"period": "Jul", "robbery": 62, "cyber": 140, "narcotics": 78, "assault": 105, "vehicle_theft": 58, "total": 443}
    ]

def get_active_alerts():
    return [
        {
            "id": "ALT-9901",
            "title": "Acoustic Sensor Audio Spike Detected",
            "category": "FIREARMS DETECTED",
            "severity": "CRITICAL",
            "location": "Majestic Bus Stand Annex, Bengaluru",
            "timestamp": "2 mins ago",
            "message": "ShotSpotter sensor #KA-402 detected rapid acoustic discharge. Hoysala-09 dispatched.",
            "is_active": True
        },
        {
            "id": "ALT-9902",
            "title": "Predictive Hotspot Surge Warning",
            "category": "PREDICTIVE ANOMALY",
            "severity": "HIGH",
            "location": "Commercial Street & MG Road Corridor",
            "timestamp": "12 mins ago",
            "message": "AI model detects 88% surge probability of chain snatching between 19:00 - 22:00 IST.",
            "is_active": True
        },
        {
            "id": "ALT-9903",
            "title": "Women Safety Index Alert - Peenya",
            "category": "WOMEN SAFETY SPIKE",
            "severity": "WARNING",
            "location": "Peenya Sector 3 Dark Corridor",
            "timestamp": "28 mins ago",
            "message": "Namma 112 emergency calls increased by 40%. Streetlight failure reported. Pink Hoysala rerouted.",
            "is_active": True
        }
    ]

def get_copilot_recommendations():
    return [
        {
            "id": "REC-101",
            "category": "PATROL OPTIMIZATION",
            "priority": "HIGH",
            "title": "Reroute Hoysala Units 14 & 22 to MG Road - Commercial St",
            "action_plan": "Shift 3 Hoysala cruisers from East Sector to Commercial St shopping corridor during peak evening footfall.",
            "impact_assessment": "Estimated 38% reduction in snatching & robbery incidents.",
            "affected_district": "Bengaluru Central",
            "timestamp": "Just now"
        },
        {
            "id": "REC-102",
            "category": "WOMEN SAFETY DISPATCH",
            "priority": "CRITICAL",
            "title": "Deploy Pink Hoysala Patrols at Majestic & Peenya Stops",
            "action_plan": "Station dedicated Pink Hoysala vehicles with female officers near industrial bus stops between 21:00 and 02:00.",
            "impact_assessment": "Increases Women Safety Heat Score from 34/100 to 78/100.",
            "affected_district": "Bengaluru West",
            "timestamp": "15 mins ago"
        },
        {
            "id": "REC-103",
            "category": "FESTIVAL RISK DEPLOYMENT",
            "priority": "HIGH",
            "title": "Pre-Position Crowd Control & Drones at Mysuru Dasara",
            "action_plan": "Deploy 45 KSP Officers + 2 Drone Surveillance Squads near Mysuru Palace Circle prior to procession.",
            "impact_assessment": "Mitigates stampede bottleneck risk and pickpocketing surges by 62%.",
            "affected_district": "Mysuru City",
            "timestamp": "45 mins ago"
        }
    ]

# --- NEW KARNATAKA STATE POLICE FEATURE DATA PROVIDERS ---

def get_patrol_routes():
    return [
        {
            "id": "ROUTE-01",
            "unit_id": "Hoysala-14",
            "route_name": "Central Commercial Loop",
            "district": "Bengaluru Central",
            "waypoints": ["Majestic Stand", "KR Market", "Town Hall", "MG Road", "Commercial St"],
            "predicted_hotspots": ["Commercial Street Junction", "Majestic Station"],
            "traffic_condition": "Moderate Traffic (+4 min delay)",
            "total_distance": "12.4 km",
            "est_duration": "32 mins",
            "coverage_risk_reduction": "44% Crime Risk Reduction",
            "assigned_officers": 4,
            "status": "OPTIMIZED",
            "safety_impact": "HIGH"
        },
        {
            "id": "ROUTE-02",
            "unit_id": "Pink Hoysala-04",
            "route_name": "Tech Worker Safe Corridor",
            "district": "Bengaluru East",
            "waypoints": ["Indiranagar 100ft Rd", "Domlur Flyover", "Koramangala 80ft Rd", "Sony Signal"],
            "predicted_hotspots": ["Koramangala 5th Block Bus Stop"],
            "traffic_condition": "Smooth Traffic (Low delay)",
            "total_distance": "9.8 km",
            "est_duration": "24 mins",
            "coverage_risk_reduction": "52% Women Safety Boost",
            "assigned_officers": 3,
            "status": "ACTIVE SWEEP",
            "safety_impact": "CRITICAL"
        },
        {
            "id": "ROUTE-03",
            "unit_id": "Hoysala-22",
            "route_name": "Peenya Industrial Night Patrol",
            "district": "Bengaluru West",
            "waypoints": ["Peenya Metro Station", "Sector 3 Warehouse Zone", "TVS Cross", "Goraguntepalya"],
            "predicted_hotspots": ["Peenya Industrial Sector 3"],
            "traffic_condition": "Heavy Trucks Congestion (+8 min delay)",
            "total_distance": "14.1 km",
            "est_duration": "40 mins",
            "coverage_risk_reduction": "36% Cargo Snatching Mitigation",
            "assigned_officers": 4,
            "status": "RECOMMENDED",
            "safety_impact": "HIGH"
        }
    ]

def get_festival_risks():
    return [
        {
            "id": "EVT-101",
            "event_name": "Mysuru Dasara Grand Procession",
            "location": "Mysore Palace Circle to Bannimantap, Mysuru",
            "district": "Mysuru City",
            "event_date": "2026-10-12",
            "expected_crowd": "250,000 People",
            "threat_level": "CRITICAL",
            "risk_score": 94.5,
            "risk_factors": [
                "Massive crowd bottleneck at Palace South Gate",
                "High risk of pickpocketing & missing children",
                "VIP & Royal Procession security protocol requirement",
                "Traffic choke points along Sayyaji Rao Road"
            ],
            "recommended_deployment": {
                "officers": 120,
                "hoysala_vehicles": 12,
                "cctv_mobile_units": 4,
                "drone_squads": 3,
                "pink_hoysalas": 4
            },
            "action_status": "DEPLOYMENT READY"
        },
        {
            "id": "EVT-102",
            "event_name": "IPL T20 High-Profile Match",
            "location": "M. Chinnaswamy Stadium, Cubbon Park",
            "district": "Bengaluru Central",
            "event_date": "2026-08-04",
            "expected_crowd": "35,000 Spectators",
            "threat_level": "HIGH",
            "risk_score": 86.2,
            "risk_factors": [
                "Surge traffic along MG Road and Kasturba Road",
                "Scalping and counterfeit ticket fraud",
                "Late night spectator dispersal crowd surge at Metro station"
            ],
            "recommended_deployment": {
                "officers": 55,
                "hoysala_vehicles": 6,
                "cctv_mobile_units": 2,
                "drone_squads": 1,
                "pink_hoysalas": 2
            },
            "action_status": "SCHEDULED"
        },
        {
            "id": "EVT-103",
            "event_name": "Namma Kambala & Karaga Procession",
            "location": "Palace Grounds & Commercial Street Corridor",
            "district": "Bengaluru Central",
            "event_date": "2026-09-18",
            "expected_crowd": "85,000 Visitors",
            "threat_level": "HIGH",
            "risk_score": 82.0,
            "risk_factors": [
                "Traditional midnight procession through narrow lanes",
                "Alcohol-fueled localized skirmishes",
                "Emergency ambulance access blockage"
            ],
            "recommended_deployment": {
                "officers": 70,
                "hoysala_vehicles": 8,
                "cctv_mobile_units": 2,
                "drone_squads": 2,
                "pink_hoysalas": 3
            },
            "action_status": "PROPOSED"
        }
    ]

def get_women_safety_index():
    return [
        {
            "id": "WSI-01",
            "area_name": "Indiranagar 100ft Road & Toit Corridor",
            "district": "Bengaluru East",
            "safety_score": 88,
            "risk_status": "SAFE",
            "lighting_cctv_pct": 94,
            "namma_112_calls_24h": 3,
            "patrol_freq_mins": "Every 10 Mins",
            "pink_hoysala_status": "ACTIVE PATROL",
            "key_threat": "Minor parking disputes",
            "coords": [12.9784, 77.6408]
        },
        {
            "id": "WSI-02",
            "area_name": "Koramangala 5th Block Restaurant Hub",
            "district": "Bengaluru South",
            "safety_score": 84,
            "risk_status": "SAFE",
            "lighting_cctv_pct": 89,
            "namma_112_calls_24h": 5,
            "patrol_freq_mins": "Every 12 Mins",
            "pink_hoysala_status": "ACTIVE PATROL",
            "key_threat": "Late night cabaret crowd noise",
            "coords": [12.9352, 77.6245]
        },
        {
            "id": "WSI-03",
            "area_name": "Electronic City Bus Stop & Express Corridor",
            "district": "Bengaluru South",
            "safety_score": 52,
            "risk_status": "MODERATE RISK",
            "lighting_cctv_pct": 61,
            "namma_112_calls_24h": 14,
            "patrol_freq_mins": "Every 25 Mins",
            "pink_hoysala_status": "DISPATCH RECOMMENDED",
            "key_threat": "Dark pedestrian underpass & sparse night transport",
            "coords": [12.8452, 77.6602]
        },
        {
            "id": "WSI-04",
            "area_name": "Peenya Industrial Area Sector 3 Dark Corridors",
            "district": "Bengaluru West",
            "safety_score": 38,
            "risk_status": "HIGH RISK",
            "lighting_cctv_pct": 35,
            "namma_112_calls_24h": 22,
            "patrol_freq_mins": "Every 45 Mins",
            "pink_hoysala_status": "HIGH PRIORITY REALLOCATION",
            "key_threat": "Broken streetlights & unmonitored factory exits",
            "coords": [13.0285, 77.5197]
        },
        {
            "id": "WSI-05",
            "area_name": "Majestic Bus Stand Underpass (Midnight Shift)",
            "district": "Bengaluru Central",
            "safety_score": 34,
            "risk_status": "HIGH RISK",
            "lighting_cctv_pct": 42,
            "namma_112_calls_24h": 31,
            "patrol_freq_mins": "Every 30 Mins",
            "pink_hoysala_status": "STATIONARY BEAT ACTIVE",
            "key_threat": "Harassment by unregistered loiterers",
            "coords": [12.9767, 77.5713]
        }
    ]

def get_explainable_ai_factors():
    return {
        "engine_version": "KSP Neural Phoenix-v4.2 (Explainable AI)",
        "overall_confidence": "94.8%",
        "contributing_factors": [
            {"factor": "Recent Incident Recency & Density (7-Day Surge)", "weight": 38, "color": "from-rose-500 to-red-600"},
            {"factor": "Temporal Risk Window (21:00 - 02:00 IST Shift)", "weight": 27, "color": "from-amber-500 to-orange-600"},
            {"factor": "Crowd & Festival Event Proximity", "weight": 20, "color": "from-cyan-500 to-blue-600"},
            {"factor": "Infrastructure Blindspots (Low CCTV / Streetlight Failure)", "weight": 15, "color": "from-purple-500 to-indigo-600"}
        ],
        "historical_baseline_comparison": "Crime likelihood in Commercial Street is +24% higher than last year's July baseline due to weekend shopping surge.",
        "model_justification": "Model identified 3 clusters of snatching incidents within 400m radius over the past 48 hours combined with 35% street lighting deficiency."
    }

def get_officer_action_timeline():
    return [
        {
            "time": "19:00 IST",
            "priority": "HIGH",
            "action": "Pre-position 4 Hoysala Units at Commercial Street & MG Road for peak evening footfall.",
            "assigned_to": "ACP Central Division",
            "status": "EXECUTING",
            "impact": "Snatching Prevention"
        },
        {
            "time": "21:00 IST",
            "priority": "CRITICAL",
            "action": "Deploy KSP CEN Cyber Taskforce to monitor ransomware probes near IT Corridor.",
            "assigned_to": "SP Cybercrime Division",
            "status": "SCHEDULED",
            "impact": "Grid Cyber Security"
        },
        {
            "time": "23:00 IST",
            "priority": "CRITICAL",
            "action": "Activate Pink Hoysala intensive night sweeps around Peenya & Electronic City bus stops.",
            "assigned_to": "Hoysala Command Control",
            "status": "PENDING",
            "impact": "Women Safety Boost"
        },
        {
            "time": "01:00 IST",
            "priority": "HIGH",
            "action": "Establish KSP Drunk & Drive checkpoints at Silk Board, Hebbal Flyover & Airport Expressway.",
            "assigned_to": "Joint Commissioner Traffic",
            "status": "PENDING",
            "impact": "Traffic & Highway Safety"
        },
        {
            "time": "03:00 IST",
            "priority": "MEDIUM",
            "action": "Conduct high-visibility cruiser sweeps across Mysuru & Belagavi industrial warehouse belts.",
            "assigned_to": "District SP Mysuru & Belagavi",
            "status": "PENDING",
            "impact": "Property & Cargo Protection"
        },
        {
            "time": "05:00 IST",
            "priority": "LOW",
            "action": "Morning Control Room Briefing & Handover to Shift B Command Officer.",
            "assigned_to": "Control Room In-Charge",
            "status": "PENDING",
            "impact": "Operational Continuity"
        }
    ]

def get_executive_brief():
    return {
        "generated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S IST"),
        "dgp_summary": "Karnataka State Police Operational Briefing for Senior Command: Overall threat level is MAINTAINED at KSP DEFCON 3 (ELEVATED). Predictive neural models flag Commercial Street & Majestic Bus Stand as critical priority sectors for night-shift deployment.",
        "kpi_snapshot": {
            "total_crimes": 1428,
            "crimes_change": "-4.2%",
            "active_cases": 87,
            "hotspots": 14,
            "active_hoysalas": 142,
            "women_safety_index": 76.4
        },
        "critical_hotspots": [
            {"name": "Commercial Street & MG Road Junction", "risk": "CRITICAL (0.95)", "assigned_units": "Hoysala 14, 09, Pink Hoysala 04"},
            {"name": "Majestic Bus Stand Annex", "risk": "CRITICAL (0.92)", "assigned_units": "Hoysala 08, Garuda Squad"}
        ],
        "event_warnings": [
            {"event": "Mysuru Dasara Grand Procession", "threat": "CRITICAL (94.5)", "date": "2026-10-12", "rec_officers": 120},
            {"event": "IPL Match at Chinnaswamy Stadium", "threat": "HIGH (86.2)", "date": "2026-08-04", "rec_officers": 55}
        ],
        "women_safety_index_avg": 76.4,
        "key_directives": [
            "Mandate Pink Hoysala patrols at Peenya Sector 3 dark corridor between 21:00 - 02:00 IST.",
            "Maintain ANPR camera surveillance across Hebbal Flyover and Outer Ring Road intersections.",
            "Issue high alert advisory to CEN Cyber Crime units regarding ransomware probes against IT sector infrastructure."
        ]
    }
