// src/controllers/pengajuanCutiController.js
const pengajuanRepo = require('../repositories/PengajuanCutiRepository');

const getAllPengajuan = async (req, res) => {
  try {
    const pengajuan = await pengajuanRepo.getAll();
    res.json(pengajuan);
  } catch (err) {
    console.error("Error fetching pengajuan:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createPengajuan = async (req, res) => {
  try {
    const { emp_id, id_jenis_cuti, tanggal_mulai, tanggal_selesai, alasan } = req.body;
    if (!emp_id || !id_jenis_cuti || !tanggal_mulai || !tanggal_selesai) {
      return res.status(400).json({ message: "Data tidak lengkap" });
    }

    const pengajuan = await pengajuanRepo.create({
      emp_id,
      id_jenis_cuti,
      tanggal_mulai,
      tanggal_selesai,
      alasan,
      status: "Pending", 
    });
    res.status(201).json({ message: "Pengajuan cuti berhasil dibuat", data: pengajuan });
  } catch (err) {
    console.error("Error creating pengajuan:", err);
    res.status(500).json({ message: err.message });
  }
};

const approvePengajuan = async (req, res) => {
  try {
    const { id } = req.params;
    // Menggunakan Transaction dari Repository
    const result = await pengajuanRepo.approveWithTransaction(id); 

    if (!result.success) {
      if (result.message.includes("tidak ditemukan")) return res.status(404).json(result);
      if (result.message.includes("sudah di-approve") || result.message.includes("tidak cukup")) return res.status(400).json(result);
    }
    
    res.json(result);
  } catch (err) {
    console.error("Error approving pengajuan:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const rejectPengajuan = async (req, res) => {
  try {
    const { id } = req.params;
    const { alasan_penolakan } = req.body;

    const pengajuan = await pengajuanRepo.getById(id);
    if (!pengajuan) return res.status(404).json({ message: "Pengajuan tidak ditemukan" });

    if (pengajuan.status === "Rejected") return res.status(400).json({ message: "Pengajuan sudah di-reject sebelumnya" });

    const updatedPengajuan = await pengajuanRepo.updateStatusAndAlasan(id, "Rejected", alasan_penolakan);
    
    res.json({ message: "Pengajuan berhasil di-reject", data: updatedPengajuan });
  } catch (err) {
    console.error("Error rejecting pengajuan:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllPengajuan,
  createPengajuan,
  approvePengajuan,
  rejectPengajuan,
};