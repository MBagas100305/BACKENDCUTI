const express = require("express");
const router = express.Router();
const { getDivisionLeaveData } = require("../controllers/cutiController");

// API endpoint summary cuti per divisi
router.get("/division-leave", getDivisionLeaveData);

module.exports = router;
