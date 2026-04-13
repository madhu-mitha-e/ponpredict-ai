import pandas as pd
import numpy as np
import yfinance as yf
from sklearn.preprocessing import MinMaxScaler
import pickle, os

def fetch_and_merge_data(start="2015-01-01", end=None):
    print("📥 Fetching Gold (GC=F)...")
    gold = yf.download("GC=F", start=start, end=end, auto_adjust=True, progress=True)

    print("📥 Fetching USD/INR (INR=X)...")
    usd_inr = yf.download("INR=X", start=start, end=end, auto_adjust=True, progress=True)

    print("📥 Fetching Crude Oil (CL=F)...")
    crude = yf.download("CL=F", start=start, end=end, auto_adjust=True, progress=True)

    def get_close(df):
        if isinstance(df.columns, pd.MultiIndex):
            return df["Close"].iloc[:, 0]
        return df["Close"]

    df = pd.DataFrame({
        "gold_usd": get_close(gold),
        "usd_inr":  get_close(usd_inr),
        "crude":    get_close(crude)
    }).dropna()

    df["gold_inr_gram"] = (df["gold_usd"] / 31.1035) * df["usd_inr"]
    df["gold_inr_10g"]  = df["gold_inr_gram"] * 10

    df.index = pd.to_datetime(df.index)
    df = df.sort_index()
    os.makedirs("data", exist_ok=True)
    df.to_csv("data/merged_data.csv")
    print(f"✅ Data saved: {len(df)} rows")
    return df


def create_sequences(data, seq_length=60):
    X, y = [], []
    for i in range(seq_length, len(data)):
        X.append(data[i - seq_length:i])
        y.append(data[i, 0])
    return np.array(X), np.array(y)


def load_and_scale(df=None, seq_length=60):
    if df is None:
        df = pd.read_csv("data/merged_data.csv", index_col=0, parse_dates=True)

    features = ["gold_inr_gram", "usd_inr", "crude"]
    data = df[features].values

    scaler = MinMaxScaler()
    scaled = scaler.fit_transform(data)

    os.makedirs("models", exist_ok=True)
    with open("models/scaler.pkl", "wb") as f:
        pickle.dump(scaler, f)

    X, y = create_sequences(scaled, seq_length)
    split = int(len(X) * 0.85)

    return X[:split], X[split:], y[:split], y[split:], scaler, scaled