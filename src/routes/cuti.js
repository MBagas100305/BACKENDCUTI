const express = require("express");
const router = express.Router();
const cutiController = require("../controllers/cutiController");
const auth = require("../middleware/authMiddleware");

// API endpoint summary cuti per divisi
router.get("/division-leave", auth(["admin", "kadiv"]), cutiController.getDivisionLeaveData);

module.exports = router;