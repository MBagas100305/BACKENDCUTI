// src/routes/karyawan.js
const express = require("express");
const router = express.Router();
const karyawanController = require("../controllers/karyawanController");
const auth = require("../middleware/authMiddleware");

// CRUD Karyawan (Admin only untuk create/update/delete)
router.get("/", auth(["admin", "kadiv"]), karyawanController.getAllKaryawan); 
router.post("/", auth(["admin"]), karyawanController.createKaryawan);
router.get("/:emp_id", auth(["admin", "kadiv", "pengaju"]), karyawanController.getKaryawanById);
router.put("/:emp_id", auth(["admin"]), karyawanController.updateKaryawan);
router.delete("/:emp_id", auth(["admin"]), karyawanController.deleteKaryawan);

module.exports = router;