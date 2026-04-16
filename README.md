# 🪙 PonPredict AI — 24K Gold Price Prediction System

## Quick Start

### 1. ML Service (Train model first)
```bash
cd ml_service
pip install -r requirements.txt
python train.py           # downloads data + trains LSTM (takes 5–15 min)
uvicorn main:app --reload --port 8000
```

### 2. Backend
```bash
cd backend
npm install
# Edit .env with your MONGO_URI and GOLD_API_KEY
npm run dev               # runs on port 5000
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev               # runs on port 5173
```

## API Keys Needed
- **GoldAPI.io** — free tier at https://www.goldapi.io (500 req/month free)
- **ExchangeRate-API** — free at https://exchangerate-api.com
- **MongoDB** — local or MongoDB Atlas (free tier)

## Architecture
Frontend (5173) → Backend (5000) → ML API (8000) → MongoDB