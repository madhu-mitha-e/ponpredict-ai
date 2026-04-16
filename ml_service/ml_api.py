
from fastapi import FastAPI
import numpy as np

app = FastAPI()

@app.get("/")
def home():
    return {"message": "ML API running"}

@app.get("/predict")
def predict():
    price = float(7500 + np.random.randint(-50, 50))
    return {"predicted_price": price}

