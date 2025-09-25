const express = require("express");
const router = express.Router();
const { Karyawan } = require("../models");

// GET all karyawan
router.get("/", async (req, res) => {
  try {
    const karyawan = await Karyawan.findAll();
    res.json(karyawan);
  } catch (err) {
    console.error("DETAIL ERROR:", err);
    res.status(500).json({ message: "Error fetching karyawan" });
  }
});

// GET karyawan by ID
router.get("/:emp_id", async (req, res) => {
  try {
    const karyawan = await Karyawan.findByPk(req.params.emp_id);
    if (!karyawan) {
      return res.status(404).json({ message: "Karyawan not found" });
    }
    res.json(karyawan);
  } catch (err) {
    console.error("DETAIL ERROR:", err);
    res.status(500).json({ message: "Error fetching karyawan" });
  }
});

// PUT update karyawan
router.put("/:emp_id", async (req, res) => {
  try {
    const [updated] = await Karyawan.update(req.body, {
      where: { emp_id: req.params.emp_id }
    });
    if (updated === 0) return res.status(404).json({ message: "Karyawan not found" });
    res.json({ message: "Karyawan updated" });
  } catch (err) {
    console.error("DETAIL ERROR:", err);
    res.status(500).json({ message: "Error updating karyawan" });
  }
});

// DELETE karyawan
router.delete("/:emp_id", async (req, res) => {
  try {
    const deleted = await Karyawan.destroy({ where: { emp_id: req.params.emp_id } });
    if (deleted === 0) return res.status(404).json({ message: "Karyawan not found" });
    res.json({ message: "Karyawan deleted" });
  } catch (err) {
    console.error("DETAIL ERROR:", err);
    res.status(500).json({ message: "Error deleting karyawan" });
  }
});


module.exports = router;
