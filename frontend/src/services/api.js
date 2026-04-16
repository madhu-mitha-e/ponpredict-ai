import axios from "axios";

// ❗ TEMP LOCAL (for now)
const BASE_URL = "http://localhost:5000/api";

export const fetchLivePrice = () => axios.get(`${BASE_URL}/live-price`);
export const fetchHistorical = (days = 30) => axios.get(`${BASE_URL}/historical-data?days=${days}`);
export const fetchPredictions = () => axios.get(`${BASE_URL}/predict`);