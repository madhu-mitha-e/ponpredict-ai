const { getPredictions } = require("../services/mlService");
const Prediction = require("../models/Prediction");

exports.predict = async (req, res) => {
  try {
    const { days = 7 } = req.body;
    const result = await getPredictions(days);

    const docs = result.predictions.map(p => ({
      date:            new Date(p.date),
      predicted_price: p.price_per_gram,
      price_per_10g:   p.price_per_10g,
      type:            days === 1 ? "tomorrow" : "7day",
      accuracy:        result.accuracy
    }));

    await Prediction.bulkCreate(docs, { ignoreDuplicates: true });

    res.json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getPredictions = async (req, res) => {
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