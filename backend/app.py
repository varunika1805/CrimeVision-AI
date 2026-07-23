from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "CrimeVision AI Backend Running 🚔"}