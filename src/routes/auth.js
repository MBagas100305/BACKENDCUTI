// src/routes/auth.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const karyawanRepo = require("../repositories/KaryawanRepository");
require("dotenv").config();

router.post("/login", async (req, res) => {
  try {
    const { nip, password } = req.body;

    if (!nip || !password) {
      return res.status(400).json({ error: "NIP & password required" });
    }

    // Cari karyawan pakai repo
    const karyawan = await karyawanRepo.findByNip(nip);

    if (!karyawan) {
      return res.status(401).json({ error: "Karyawan not found" });
    }

    // Sementara password = nip
    if (password.toString().trim() !== karyawan.nip.toString().trim()) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Tentukan role
    let role = "pengaju";
    if (karyawan.jabatan?.toLowerCase() === "kadiv") {
      role = "kadiv";
    }
    if (karyawan.id_divisi === 6) {
      role = "admin";
    }

    // Generate token
    const token = jwt.sign(
      {
        emp_id: karyawan.emp_id,
        nama: karyawan.nama,
        divisi: karyawan.divisi?.nama_divisi,
        role,
      },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: process.env.JWT_EXPIRE || "24h" }
    );

    res.json({
      token,
      role,
      user: {
        emp_id: karyawan.emp_id,
        nama: karyawan.nama,
        nip: karyawan.nip,
        jabatan: karyawan.jabatan,
        divisi: karyawan.divisi?.nama_divisi,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
