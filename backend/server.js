require("dotenv").config();
const express = require("express");
const cors    = require("cors");
const cron    = require("node-cron");
const { connectDB } = require("./config/db");
const goldRoutes       = require("./routes/goldRoutes");
const predictionRoutes = require("./routes/predictionRoutes");
const { getGoldPriceINR } = require("./services/livePrice");
const GoldPrice = require("./models/GoldPrice");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api", goldRoutes);
app.use("/api", predictionRoutes);

app.get("/", (_, res) => res.json({ message: "PonPredict API Running 🪙" }));

cron.schedule("*/5 * * * *", async () => {
  try {
    const data = await getGoldPriceINR();
    await GoldPrice.create({
      date:           new Date(),
      price_per_gram: data.price_per_gram,
      price_per_10g:  data.price_per_10g,
      usd_price:      data.usd_price,
      usd_inr_rate:   data.usd_inr_rate
    });
    console.log(`🔄 Price updated: ₹${data.price_per_gram}/g`);
  } catch (e) {
    console.error(e.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));