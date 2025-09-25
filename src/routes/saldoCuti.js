const express = require("express");
const router = express.Router();
const saldoCutiController = require("../controllers/saldoCutiController");
const auth = require("../middleware/authMiddleware");

// GET semua saldo (admin only)
router.get("/", auth(["admin"]), saldoCutiController.getAllSaldoCuti);

// GET saldo by emp_id / role
router.get("/:emp_id", auth(["admin", "kadiv", "pengaju"]), async (req, res) => {
  try {
    const { emp_id } = req.params;
    const user = req.user;

    let saldo = [];

    // pengaju hanya bisa lihat saldo miliknya sendiri
    if (user.role === "pengaju") {
      if (parseInt(emp_id) !== user.emp_id) {
        return res.status(403).json({ error: "Forbidden: tidak bisa akses saldo orang lain" });
      }
      saldo = await saldoCutiController.getSaldoByEmpId(emp_id);
    }

    // kadiv hanya bisa lihat saldo karyawan di divisinya
    else if (user.role === "kadiv") {
      saldo = await saldoCutiController.getSaldoByDivisi(user.divisi_id);
      // filter untuk emp_id yang diminta
      saldo = saldo.filter(s => s.emp_id === parseInt(emp_id));
      if (saldo.length === 0) {
        return res.status(403).json({ error: "Forbidden: tidak bisa akses saldo di luar divisi" });
      }
    }

    // admin bisa lihat semua
    else if (user.role === "admin") {
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
