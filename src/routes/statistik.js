const router = require("express").Router();
const StatistikController = require("../controllers/statistikController");

// Jangan pakai () setelah exportCsv
router.get("/export-csv", StatistikController.exportCsv);

module.exports = router;
