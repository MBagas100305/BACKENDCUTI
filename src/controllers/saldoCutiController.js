const saldoRepo = require('../repositories/SaldoCutiRepository');

const getAllSaldoCuti = async (req, res) => {
  try {
    const saldo = await saldoRepo.getAll();
    res.json(saldo);
  } catch (err) {
    res.status(500).json({ message: "Error fetching saldo cuti" });
  }
};

const createSaldoCuti = async (req, res) => {
  try {
    const { emp_id, id_jenis_cuti, tahun, sisa_hari } = req.body;
    if (!emp_id || !id_jenis_cuti || !tahun || sisa_hari === undefined) {
      return res.status(400).json({ message: "Data saldo cuti tidak lengkap" });
    }

    const saldo = await saldoRepo.create({ emp_id, id_jenis_cuti, tahun, sisa_hari });
    res.status(201).json({ message: "Saldo cuti berhasil dibuat", data: saldo });
  } catch (err) {
    res.status(500).json({ message: "Error creating saldo cuti" });
  }
};

const updateSaldoCuti = async (req, res) => {
  try {
    const { id_saldo } = req.params; // ← pakai id_saldo
    const data = req.body;

    const updated = await saldoRepo.update(id_saldo, data);
    if (!updated) return res.status(404).json({ message: "Saldo cuti tidak ditemukan" });

    res.json({ message: "Saldo cuti berhasil diperbarui", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Error updating saldo cuti" });
  }
};

const deleteSaldoCuti = async (req, res) => {
  try {
    const { id_saldo } = req.params; // ← pakai id_saldo
    const deleted = await saldoRepo.delete(id_saldo);
    if (!deleted) return res.status(404).json({ message: "Saldo cuti tidak ditemukan" });

    res.json({ message: "Saldo cuti berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting saldo cuti" });
  }
};

// helper untuk route by emp_id
const getSaldoByEmpId = async (emp_id) => saldoRepo.getByEmpId(emp_id);

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
      if (statusCount.hasOwnProperty(statusKey)) statusCount[statusKey] += 1;
    });

    res.json({ totalByJenis, statusCount });
  } catch (err) {
    res.status(500).json({ message: "Error fetching cuti stats" });
  }
};

module.exports = {
  getAllSaldoCuti,
  createSaldoCuti,
  updateSaldoCuti,
  deleteSaldoCuti,
  getSaldoByEmpId,
  getCutiStats,
};
