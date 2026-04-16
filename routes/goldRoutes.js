const router = require("express").Router();
const { getLivePrice, getHistoricalData } = require("../controllers/goldController");

router.get("/live-price",      getLivePrice);
router.get("/historical-data", getHistoricalData);

module.exports = router;