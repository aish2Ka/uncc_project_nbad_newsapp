const express = require("express");
const {
  seedData,
  getSummaryChartData,
  getReportsChartData,
} = require("../controllers/chartController");

const router = express.Router();

router.post("/seed", seedData);

router.get("/summary-chart-data", getSummaryChartData);
router.get("/reports-chart-data", getReportsChartData);


module.exports = router;
