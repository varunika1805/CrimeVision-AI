from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.stats import router as stats_router
from routes.incidents import router as incidents_router
from routes.analytics import router as analytics_router
from routes.copilot import router as copilot_router
from routes.ksp_intelligence import router as ksp_router

app = FastAPI(
    title="Karnataka State Police Decision-Support Platform API",
    description="Police Intelligence, Crime Analytics, AI Patrol Optimization & Emergency Command Platform API",
    version="2.0.0"
)

# Configure CORS for seamless frontend interaction
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Router endpoints under /api/v1
api_prefix = "/api/v1"
app.include_router(stats_router, prefix=api_prefix)
app.include_router(incidents_router, prefix=api_prefix)
app.include_router(analytics_router, prefix=api_prefix)
app.include_router(copilot_router, prefix=api_prefix)
app.include_router(ksp_router, prefix=api_prefix)

@app.get("/")
def root():
    return {
        "status": "online",
        "system": "Karnataka State Police Command Engine 🚔",
        "version": "2.0.0",
        "docs_url": "/docs",
        "api_v1_endpoints": [
            f"{api_prefix}/stats",
            f"{api_prefix}/stats/alerts",
            f"{api_prefix}/incidents",
            f"{api_prefix}/analytics/trends",
            f"{api_prefix}/analytics/hotspots",
            f"{api_prefix}/copilot/query",
            f"{api_prefix}/copilot/recommendations",
            f"{api_prefix}/ksp/patrol-routes",
            f"{api_prefix}/ksp/event-risks",
            f"{api_prefix}/ksp/women-safety-index",
            f"{api_prefix}/ksp/explainable-ai",
            f"{api_prefix}/ksp/action-timeline",
            f"{api_prefix}/ksp/executive-brief"
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)