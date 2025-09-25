// src/routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { Karyawan, Divisi } = require('../models');
require('dotenv').config();

// POST /api/login
router.post('/login', async (req, res) => {
    const { nip, password } = req.body; 
    // sementara password bisa pake nip dulu kalau belum ada field password

    try {
        if (!nip || !password) {
            return res.status(400).json({ error: 'NIP & password required' });
        }

        // cari karyawan berdasarkan nip
       // cari karyawan berdasarkan nip
const karyawan = await Karyawan.findOne({
  where: { nip },
  include: [{
    model: Divisi,
    as: "divisi", // ✅ harus sama dengan alias di relasi
    attributes: ["id_divisi", "nama_divisi"]
  }]
});

if (!karyawan) {
  return res.status(401).json({ error: "Karyawan not found" });
}

// cek password
if (password !== nip) {
  return res.status(401).json({ error: "Invalid credentials" });
}

// tentukan role
let role = "pengaju";
if (karyawan.jabatan.toLowerCase() === "kadiv") {
  role = "kadiv";
}
if (karyawan.id_divisi === 6) {
  role = "admin";
}

// ✅ karena aliasnya "divisi"
const token = jwt.sign(
  {
    emp_id: karyawan.emp_id,
    nama: karyawan.nama,
    divisi: karyawan.divisi.nama_divisi,
    role
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
    divisi: karyawan.divisi.nama_divisi
  }
});

    } catch (err) {
        console.error('LOGIN ERROR:', err);
        res.status(500).json({ error: 'Login failed' });
    }
});

module.exports = router;
