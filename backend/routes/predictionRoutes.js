const router = require("express").Router();
const { predict, getPredictions } = require("../controllers/predictionController");

router.get("/predict", predict);       // ✅ important
router.get("/predictions", getPredictions);

module.exports = router;