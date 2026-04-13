const router = require("express").Router();
const { predict, getPredictions } = require("../controllers/predictionController");

router.post("/predict",    predict);
router.get("/predictions", getPredictions);

module.exports = router;