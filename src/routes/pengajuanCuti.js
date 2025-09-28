// src/routes/pengajuanCuti.js
const express = require("express");
const router = express.Router();
const pengajuanCutiController = require("../controllers/pengajuanCutiController");
const auth = require("../middleware/authMiddleware");

// Pengaju bikin pengajuan cuti
router.post("/", auth(["pengaju", "kadiv", "admin"]), pengajuanCutiController.createPengajuan);

// Admin dan kadiv bisa lihat semua pengajuan
router.get("/", auth(["admin", "kadiv"]), pengajuanCutiController.getAllPengajuan);

// Kadiv/Admin approve/reject
router.put("/:id/approve", auth(["kadiv", "admin"]), pengajuanCutiController.approvePengajuan);
router.put("/:id/reject", auth(["kadiv", "admin"]), pengajuanCutiController.rejectPengajuan);

module.exports = router;