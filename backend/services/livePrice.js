const axios     = require("axios");
const GoldPrice = require("../models/GoldPrice");
const { Op }    = require("sequelize");

const calculateINRPrice = (basePrice, correctionFactor = 0.96) => {
  const importDuty   = basePrice * 0.085;
  const gst          = (basePrice + importDuty) * 0.03;
  const marketFactor = basePrice * 0.012;
  return (basePrice + importDuty + gst + marketFactor) * correctionFactor;
};

const getDynamicCorrection = async () => {
  try {
    const { sequelize } = require("../config/db");
    const result = await sequelize.query(`
      SELECT AVG(correction_factor) as avg_correction
      FROM gold_prices
      WHERE correction_factor IS NOT NULL
      AND correction_factor != 1.0
      AND date >= DATE_SUB(NOW(), INTERVAL 7 DAY)
    `, { type: sequelize.QueryTypes.SELECT });

    const avg = result[0]?.avg_correction;
    return avg && avg > 0.90 && avg < 1.10 ? avg : 0.96;
  } catch {
    return 0.96;
  }
};

const getGoldPriceINR = async () => {
  try {
    const fxRes   = await axios.get("https://api.exchangerate-api.com/v4/latest/USD");
    const usdInr  = fxRes.data.rates.INR;
    const goldRes = await axios.get("https://api.gold-api.com/price/XAU");
    const goldUSD = goldRes.data.price;

    const basePrice        = (goldUSD / 31.1035) * usdInr;
    const correctionFactor = await getDynamicCorrection();

    // 7-day moving average
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recent = await GoldPrice.findAll({
      where:      { date: { [Op.gte]: sevenDaysAgo } },
      attributes: ["price_per_gram"],
      order:      [["date", "DESC"]],
      limit:      7
    });

    let finalPrice = calculateINRPrice(basePrice, correctionFactor);

    if (recent.length >= 3) {
      const avg7days = recent.reduce((s, r) => s + r.price_per_gram, 0) / recent.length;
      finalPrice = (finalPrice * 0.7) + (avg7days * 0.3);
    }

    const pricePerGram    = Math.round(finalPrice);
    const pricePerTenGram = Math.round(pricePerGram * 10);

    return {
      price_per_gram:    pricePerGram,
      price_per_10g:     pricePerTenGram,
      usd_price:         goldUSD,
      usd_inr_rate:      usdInr,
      base_price:        Math.round(basePrice),
      correction_factor: correctionFactor,
      timestamp:         new Date().toISOString()
    };
  } catch (err) {
    console.error("Live price error:", err.message);
    return {
      price_per_gram: 7500,
      price_per_10g:  75000,
      usd_price:      2050,
      usd_inr_rate:   83.2,
      timestamp:      new Date().toISOString(),
      isMock:         true
    };
  }
};

module.exports = { getGoldPriceINR, calculateINRPrice };