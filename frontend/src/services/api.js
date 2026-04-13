import axios from "axios";

const API = axios.create({ baseURL: "/api" });

export const fetchLivePrice     = ()          => API.get("/live-price");
export const fetchHistorical    = (days = 30) => API.get(`/historical-data?days=${days}`);
export const fetchPredictions   = (days = 7)  => API.post("/predict", { days });
export const fetchSavedPredicts = ()          => API.get("/predictions");