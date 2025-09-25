// src/controllers/saldoCutiController.js
const saldoRepo = require('../repositories/SaldoCutiRepository');

const getAllSaldoCuti = async (req, res) => {
  try {
    const saldo = await saldoRepo.getAll();
    res.json(saldo);
  } catch (err) {
    console.error("ERROR GET SALDO:", err);
    res.status(500).json({ message: "Error fetching saldo cuti" });
  }
};

const createSaldoCuti = async (req, res) => {
  try {
    const { emp_id, id_jenis_cuti, tahun, sisa_hari } = req.body;
    if (!emp_id || !id_jenis_cuti || !tahun || sisa_hari === undefined) {
      return res.status(400).json({ message: "Data saldo cuti tidak lengkap" });
    }

    const saldo = await saldoRepo.create({
      emp_id, id_jenis_cuti, tahun, sisa_hari,
    });
    res.status(201).json({ message: "Saldo cuti berhasil dibuat", data: saldo });
  } catch (err) {
    console.error("ERROR CREATE SALDO:", err);
    res.status(500).json({ message: "Error creating saldo cuti" });
  }
};

// Fungsi helper yang dipanggil dari route Saldo
const getSaldoByEmpId = async (emp_id) => {
  return saldoRepo.getByEmpId(emp_id);
};

const getCutiStats = async (req, res) => {
  try {
    const { allSaldo, pengajuan } = await saldoRepo.getCutiStats();

    const totalByJenis = {};
    allSaldo.forEach(s => {
      const key = s.jenisCuti ? s.jenisCuti.nama_cuti : `ID ${s.id_jenis_cuti}`;
      totalByJenis[key] = (totalByJenis[key] || 0) + s.sisa_hari;
    });

    const statusCount = { pending: 0, approved: 0, rejected: 0 };
    pengajuan.forEach(p => { 
        const statusKey = p.status.toLowerCase();
        if(statusCount.hasOwnProperty(statusKey)) statusCount[statusKey] += 1;
    });

    res.json({ totalByJenis, statusCount });
  } catch(err) {
    console.error("ERROR GET CUTI STATS:", err);
    res.status(500).json({ message: "Error fetching cuti stats" });
  }
};

module.exports = {
  getAllSaldoCuti,
  createSaldoCuti,
  getSaldoByEmpId, // diexport untuk dipakai di route Saldo
  getCutiStats,
};