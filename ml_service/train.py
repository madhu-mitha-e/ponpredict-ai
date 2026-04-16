import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint
from sklearn.metrics import mean_squared_error, mean_absolute_error
from preprocess import fetch_and_merge_data, load_and_scale
import json, os

SEQ_LENGTH = 60

def build_model(input_shape):
    model = Sequential([
        LSTM(128, return_sequences=True, input_shape=input_shape),
        Dropout(0.2),
        LSTM(64, return_sequences=False),
        Dropout(0.2),
        Dense(32, activation="relu"),
        Dense(1)
    ])
    model.compile(optimizer="adam", loss="mse")
    return model

def train():
    print("🔄 Fetching & preprocessing data...")
    df = fetch_and_merge_data(start="2015-01-01")
    X_train, X_test, y_train, y_test, scaler, scaled = load_and_scale(df, SEQ_LENGTH)

    print(f"📊 Train: {X_train.shape}, Test: {X_test.shape}")

    model = build_model((SEQ_LENGTH, X_train.shape[2]))
    model.summary()

    os.makedirs("models", exist_ok=True)

    callbacks = [
        EarlyStopping(patience=10, restore_best_weights=True),
        ModelCheckpoint("models/lstm_model.keras", save_best_only=True)
    ]

    model.fit(
        X_train, y_train,
        epochs=100,
        batch_size=32,
        validation_data=(X_test, y_test),
        callbacks=callbacks,
        verbose=1
    )

    pred_scaled = model.predict(X_test)

    def inverse_gold(vals, scaler):
        dummy = np.zeros((len(vals), 3))
        dummy[:, 0] = vals.flatten()
        return scaler.inverse_transform(dummy)[:, 0]

    pred_actual = inverse_gold(pred_scaled, scaler)
    true_actual = inverse_gold(y_test.reshape(-1, 1), scaler)

    rmse     = np.sqrt(mean_squared_error(true_actual, pred_actual))
    mae      = mean_absolute_error(true_actual, pred_actual)
    accuracy = max(0, 100 - (mae / true_actual.mean() * 100))

    metrics = {"RMSE": round(rmse, 2), "MAE": round(mae, 2), "accuracy": round(accuracy, 2)}
    with open("models/metrics.json", "w") as f:
        json.dump(metrics, f)

    print(f"\n✅ Training Complete!")
    print(f"   RMSE     : ₹{rmse:.2f}")
    print(f"   MAE      : ₹{mae:.2f}")
    print(f"   Accuracy : {accuracy:.2f}%")

if __name__ == "__main__":
    train()