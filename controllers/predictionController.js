const axios = require("axios");
const Prediction = require("../models/Prediction");

const predict = async (req, res) => {
  try {
    // ✅ CALL YOUR DEPLOYED ML API
    const response = await axios.get("https://ml-api-bo9r.onrender.com/predict");

    const predictedPrice = response.data.predicted_price;

    const doc = {
      date: new Date(),
      predicted_price: predictedPrice,
      price_per_10g: predictedPrice * 10,
      type: "7day",
      accuracy: 95
    };

    await Prediction.create(doc);

    res.json({
      success: true,
      prediction: doc
    });

  } catch (err) {
    console.error("Prediction Error:", err.message);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

const getPredictions = async (req, res) => {
  try {
    const data = await Prediction.findAll({
      order: [["date", "ASC"]],
      limit: 10
    });

    res.json({ success: true, data });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { predict, getPredictions };