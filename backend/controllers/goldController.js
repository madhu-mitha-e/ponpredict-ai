const { getGoldPriceINR } = require("../services/livePrice");
const GoldPrice = require("../models/GoldPrice");
const { Op } = require("sequelize");

exports.getLivePrice = async (req, res) => {
  try {
    const data = await getGoldPriceINR();

    await GoldPrice.create({
      date:              new Date(),
      price_per_gram:    data.price_per_gram,
      price_per_10g:     data.price_per_10g,
      usd_price:         data.usd_price,
      usd_inr_rate:      data.usd_inr_rate,
      avg_7_days:        data.avg_7_days,
      correction_factor: 1.0
    });

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getHistoricalData = async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const since = new Date();
    since.setDate(since.getDate() - parseInt(days));

    const data = await GoldPrice.findAll({
      where:      { date: { [Op.gte]: since } },
      order:      [["date", "ASC"]],
      attributes: ["date", "price_per_gram", "price_per_10g", "avg_7_days"]
    });

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};