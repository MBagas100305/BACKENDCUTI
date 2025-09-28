const express = require("express");
const router = express.Router();
const jenisCutiController = require("../controllers/jenisCutiController");
const auth = require("../middleware/authMiddleware");

// GET semua jenis cuti
router.get("/", auth(["admin", "kadiv", "pengaju"]), jenisCutiController.getAllJenisCuti);

// GET jenis cuti by ID
router.get("/:id_jenis_cuti", auth(["admin", "kadiv", "pengaju"]), jenisCutiController.getJenisCutiById);

// CREATE jenis cuti (Admin only)
router.post("/", auth(["admin"]), jenisCutiController.createJenisCuti);

// UPDATE jenis cuti (Admin only)
router.put("/:id_jenis_cuti", auth(["admin"]), jenisCutiController.updateJenisCuti);

// DELETE jenis cuti (Admin only)
router.delete("/:id_jenis_cuti", auth(["admin"]), jenisCutiController.deleteJenisCuti);

module.exports = router;
