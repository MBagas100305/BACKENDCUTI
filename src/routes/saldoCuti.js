const express = require("express");
const router = express.Router();
const saldoCutiController = require("../controllers/saldoCutiController");
const KaryawanRepo = require('../repositories/KaryawanRepository');
const auth = require("../middleware/authMiddleware");

// GET semua saldo, POST buat saldo baru (Admin only)
router.get("/", auth(["admin"]), saldoCutiController.getAllSaldoCuti);
router.post("/", auth(["admin"]), saldoCutiController.createSaldoCuti); 

// UPDATE saldo (Admin only)
router.put("/:id_saldo", auth(["admin"]), saldoCutiController.updateSaldoCuti);

// DELETE saldo (Admin only)
router.delete("/:id_saldo", auth(["admin"]), saldoCutiController.deleteSaldoCuti);

// GET statistik cuti (Admin only)
router.get("/stats", auth(["admin"]), saldoCutiController.getCutiStats);

// GET saldo by emp_id / role
router.get("/:emp_id", auth(["admin", "kadiv", "pengaju"]), async (req, res) => {
  try {
    const emp_id = parseInt(req.params.emp_id, 10);
    const user = req.user;
    let saldo = [];

    if (user.role === "pengaju") {
      if (emp_id !== user.emp_id) {
        return res.status(403).json({ error: "Forbidden: tidak bisa akses saldo orang lain" });
      }
      saldo = await saldoCutiController.getSaldoByEmpId(emp_id);
    } else if (user.role === "kadiv") {
      const karyawanDiDivisi = await KaryawanRepo.getById(emp_id);
      if (!karyawanDiDivisi || karyawanDiDivisi.id_divisi !== user.divisi_id) {
        return res.status(403).json({ error: "Forbidden: tidak bisa akses saldo di luar divisi" });
      }
      saldo = await saldoCutiController.getSaldoByEmpId(emp_id);
    } else if (user.role === "admin") {
      saldo = await saldoCutiController.getSaldoByEmpId(emp_id);
    }

    if (!saldo || saldo.length === 0) {
      return res.status(404).json({ message: "Saldo cuti tidak ditemukan" });
    }
    res.json(saldo);
  } catch (err) {
    console.error("ERROR GET BY EMP_ID:", err);
    res.status(500).json({ message: "Error fetching saldo cuti" });
  }
});

module.exports = router;
