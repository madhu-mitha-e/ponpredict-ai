from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from predict import predict_next_n_days
import json

app = FastAPI(title="PonPredict ML API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "PonPredict ML API running"}

@app.get("/predict/{days}")
def get_predictions(days: int = 7):
    return predict_next_n_days(days)

@app.get("/metrics")
def get_metrics():
    with open("models/metrics.json") as f:
        return json.load(f)