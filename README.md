# CrimeVision AI 🚔 - Police Intelligence & Predictive Analytics Platform

CrimeVision AI is a full-stack, tactical police command center platform designed for real-time crime visualization, spatial hotspot analysis, automated acoustic sensor telemetry, and AI Copilot predictive dispatch recommendations.

---

## 🌟 Key Features

- **Tactical Command Dashboard**:
  - Real-time KPI Cards: Total Crimes, Active Cases, High-Risk Hotspots, AI Critical Alerts.
  - DEFCON & Threat Level Live Monitor (`DEFCON 3 / ELEVATED THREAT`).
  - UTC Command Clock & Precinct Comms status tracking.

- **Interactive Tactical Spatial Crime Map**:
  - Dark-mode GIS tile layer built with Leaflet & React-Leaflet.
  - Animated pulsating custom markers for Critical, High, and Medium severity incidents.
  - Hotspot heat density circles with risk level highlights.
  - Click-to-view popup modals & center-on-location functionality.

- **Crime Telemetry & Recharts Analytics**:
  - Monthly Crime Trend (Area Chart with gradient fills).
  - Incident Category Distribution (Bar Chart by Crime Type).
  - 24-Hour Temporal Crime Density & Peak Risk Index Curve.

- **CrimeVision AI Copilot Panel**:
  - Natural Language query assistant for police commanders & dispatchers.
  - Tactical Preset Queries: "Predict Next Hotspot", "Optimize Patrol Routes", "SCADA Cyber Threat", "Gang Dispute Risk".
  - Structured AI Intelligence Reports: Key Findings, Recommended Tactical Actions, Predictive Risk Scores, Unit Dispatch lists.
  - AI Recommendation Cards with priority tags (`CRITICAL`, `HIGH`, `MEDIUM`).

- **Incident Dispatch & Emergency Alert Feed**:
  - Live incident log table with multi-criteria filtering (District, Severity, Status) and search.
  - Interactive Modal to log new dispatch entries.
  - Audio emergency alert beacon simulator with quick acknowledgment controls.

- **Executive Report Exporter**:
  - Generates cryptographic Executive Crime Analytics summaries ready for print or PDF export.

---

## 🏗️ Architecture & Folder Structure

```
CrimeVision-AI/
├── backend/
│   ├── app.py                   # Main FastAPI entry point & CORS configuration
│   ├── requirements.txt         # FastAPI, Uvicorn, Pydantic
│   ├── models/
│   │   └── schemas.py           # Pydantic data schemas
│   ├── database/
│   │   └── dummy_data.py        # Police intelligence dataset provider
│   ├── ai/
│   │   └── copilot_engine.py    # AI recommendation & pattern analysis engine
│   └── routes/
│       ├── stats.py             # /api/v1/stats & /api/v1/stats/alerts
│       ├── incidents.py         # /api/v1/incidents (List & Create)
│       ├── analytics.py         # /api/v1/analytics/trends & /hotspots
│       └── copilot.py           # /api/v1/copilot/query & /recommendations
└── frontend/
    ├── package.json             # React, Vite, Tailwind CSS, Lucide, Recharts, Leaflet, Axios
    ├── vite.config.js           # Vite configuration with Tailwind plugin
    ├── index.html               # Main HTML with Leaflet CSS & Google Fonts (Inter + JetBrains Mono)
    └── src/
        ├── index.css            # Tailwind directives, custom glassmorphic panels & map styles
        ├── App.jsx              # Main layout & state management
        ├── services/
        │   └── api.js           # Axios API client with automatic offline fallback
        └── components/
            ├── Navbar.jsx               # Top command header
            ├── Sidebar.jsx              # Responsive module menu
            ├── StatCards.jsx            # 4 KPI cards
            ├── CrimeMap.jsx             # Leaflet interactive GIS map
            ├── AnalyticsSection.jsx     # Recharts trend visualizer
            ├── AICopilotPanel.jsx       # AI Copilot prompt & recommendations
            ├── IncidentList.jsx         # Dispatch feed table & filters
            ├── EmergencyAlerts.jsx      # High priority warning list
            ├── NewIncidentModal.jsx     # Dispatch log creation form
            ├── IncidentDetailModal.jsx  # Detailed log view & status override
            └── ReportGeneratorModal.jsx # Executive PDF/Print report generator
```

---

## 🚀 How to Run locally

### 1. Run FastAPI Backend
```bash
cd backend
py -m pip install -r requirements.txt
py -m uvicorn app:app --host 127.0.0.1 --port 8000 --reload
```
API Documentation will be accessible at: `http://127.0.0.1:8000/docs`

### 2. Run React Frontend
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.
