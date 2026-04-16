const axios = require("axios");

const ML_URL = process.env.ML_API_URL || "http://localhost:8000";

const getPredictions = async (days = 7) => {
  const res = await axios.get(`${ML_URL}/predict/${days}`);
  return res.data;
};

const getMetrics = async () => {
  const res = await axios.get(`${ML_URL}/metrics`);
  return res.data;
};

module.exports = { getPredictions, getMetrics };