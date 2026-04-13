import { useState, useEffect, useRef } from "react";
import { fetchLivePrice, fetchHistorical, fetchPredictions } from "../services/api";

export const useGoldPrice = () => {
  const [livePrice,    setLivePrice]    = useState(null);
  const [historical,   setHistorical]   = useState([]);
  const [predictions,  setPredictions]  = useState([]);
  const [accuracy,     setAccuracy]     = useState(null);
  const [trend,        setTrend]        = useState("neutral");
  const [loading,      setLoading]      = useState(true);
  const prevPrice = useRef(null);

  const loadLive = async () => {
    try {
      const { data } = await fetchLivePrice();
      if (prevPrice.current !== null) {
        setTrend(data.data.price_per_gram > prevPrice.current ? "up" : "down");
      }
      prevPrice.current = data.data.price_per_gram;
      setLivePrice(data.data);
    } catch (e) { console.error(e); }
  };

  const loadHistorical = async (days = 30) => {
    try {
      const { data } = await fetchHistorical(days);
      setHistorical(data.data || []);
    } catch (e) { console.error(e); }
  };

  const loadPredictions = async () => {
    try {
      const { data } = await fetchPredictions(7);
      setPredictions(data.predictions || []);
      setAccuracy(data.accuracy);
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([loadLive(), loadHistorical(), loadPredictions()]);
      setLoading(false);
    };
    init();
    const interval = setInterval(loadLive, 60000);
    return () => clearInterval(interval);
  }, []);

  return { livePrice, historical, predictions, accuracy, trend, loading, loadHistorical };
};