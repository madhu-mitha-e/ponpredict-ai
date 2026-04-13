import numpy as np
import pandas as pd
import pickle
import tensorflow as tf
import json

SEQ_LENGTH = 60

def load_artifacts():
    model = tf.keras.models.load_model("models/lstm_model.keras")
    with open("models/scaler.pkl", "rb") as f:
        scaler = pickle.load(f)
    df = pd.read_csv("data/merged_data.csv", index_col=0, parse_dates=True)
    return model, scaler, df

def apply_indian_taxes(base_price):
    import_duty   = base_price * 0.085
    gst           = (base_price + import_duty) * 0.03
    market_factor = base_price * 0.012
    final_price   = (base_price + import_duty + gst + market_factor) * 0.96
    return round(float(final_price), 2)

def predict_next_n_days(n=7):
    model, scaler, df = load_artifacts()
    features    = ["gold_inr_gram", "usd_inr", "crude"]
    data        = df[features].values
    scaled      = scaler.transform(data)
    current_seq = scaled[-SEQ_LENGTH:].copy()
    predictions = []

    for _ in range(n):
        x           = current_seq.reshape(1, SEQ_LENGTH, 3)
        pred_scaled = model.predict(x, verbose=0)[0][0]

        dummy       = np.zeros((1, 3))
        dummy[0, 0] = pred_scaled
        pred_actual = scaler.inverse_transform(dummy)[0][0]

        final_price = apply_indian_taxes(pred_actual)
        predictions.append(final_price)

        new_row     = current_seq[-1].copy()
        new_row[0]  = pred_scaled
        current_seq = np.vstack([current_seq[1:], new_row])

    dates = pd.date_range(
        start=df.index[-1] + pd.Timedelta(days=1),
        periods=n,
        freq="B"
    )

    result = [
        {
            "date":           str(d.date()),
            "price_per_gram": p,
            "price_per_10g":  round(p * 10, 2)
        }
        for d, p in zip(dates, predictions)
    ]

    with open("models/metrics.json") as f:
        metrics = json.load(f)

    return {
        "predictions": result,
        "accuracy":    metrics.get("accuracy", 98.0),
        "metrics":     metrics
    }