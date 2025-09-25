const express = require("express");
const router = express.Router();
const pengajuanCutiController = require("../controllers/pengajuanCutiController");
const auth = require("../middleware/authMiddleware");

// Pengaju bikin pengajuan cuti
//router.post("/", auth("pengaju"), pengajuanCutiController.createPengajuan);
router.post("/", pengajuanCutiController.createPengajuan);

// Kadiv approve/reject
router.put("/:id/approve", auth("kadiv"), pengajuanCutiController.approvePengajuan);
router.put("/:id/reject", auth("kadiv"), pengajuanCutiController.rejectPengajuan);

// Admin dan kadiv bisa lihat semua pengajuan
//router.get("/", auth(["admin", "kadiv"]), pengajuanCutiController.getAllPengajuan);
router.get("/", pengajuanCutiController.getAllPengajuan);

module.exports = router;
