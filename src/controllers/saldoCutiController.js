const { Saldo, Karyawan } = require("../models");

// ambil semua saldo cuti
const getAllSaldoCuti = async (req, res) => {
  try {
    const saldo = await Saldo.findAll({
      include: {
        model: Karyawan,
        as: "employee", // wajib sama dengan alias di model
        attributes: ["emp_id", "nama", "nip", "jabatan", "id_divisi"],
      },
    });
    res.json(saldo);
  } catch (err) {
    console.error("ERROR GET SALDO:", err);
    res.status(500).json({ message: "Error fetching saldo cuti" });
  }
};

// get saldo cuti by emp_id
const getSaldoByEmpId = async (emp_id) => {
  return await Saldo.findAll({
    where: { emp_id },
    include: {
      model: Karyawan,
      as: "employee", // alias harus sama
      attributes: ["emp_id", "nama", "nip", "jabatan", "id_divisi"],
    },
  });
};

// bikin saldo cuti baru
const createSaldoCuti = async (req, res) => {
  try {
    const { emp_id, id_jenis_cuti, tahun, sisa_hari } = req.body;

    if (!emp_id || !id_jenis_cuti || !tahun || sisa_hari === undefined) {
      return res.status(400).json({ message: "Data saldo cuti tidak lengkap" });
    }

    const saldo = await Saldo.create({
      emp_id,
      id_jenis_cuti,
      tahun,
      sisa_hari,
    });

    res.status(201).json({
      message: "Saldo cuti berhasil dibuat",
      data: saldo,
    });
  } catch (err) {
    console.error("ERROR CREATE SALDO:", err);
    res.status(500).json({ message: "Error creating saldo cuti" });
  }
};

// get saldo cuti by divisi
const getSaldoByDivisi = async (divisi_id) => {
  return await Saldo.findAll({
    include: {
      model: Karyawan,
      as: "employee", // alias sesuai relasi
      where: { id_divisi: divisi_id },
      attributes: ["emp_id", "nama", "nip", "jabatan", "id_divisi", "tanggal_masuk"],
    },
  });
};

// Statistik cuti untuk admin
const getCutiStats = async (req, res) => {
  try {
    // Ambil semua saldo cuti
    const allSaldo = await Saldo.findAll({
      include: { model: Karyawan, as: "employee", attributes: ["emp_id","nama"] }
    });

    // Hitung total saldo per jenis cuti
    const totalByJenis = {};
    allSaldo.forEach(s => {
      const key = s.id_jenis_cuti;
      totalByJenis[key] = (totalByJenis[key] || 0) + s.sisa_hari;
    });

    // Ambil data cuti (misal dari table PengajuanCuti)
    // Asumsikan model PengajuanCuti ada dan punya status: pending, approved, rejected
    const pengajuan = await PengajuanCuti.findAll();
    const statusCount = { pending:0, approved:0, rejected:0 };
    pengajuan.forEach(p => { statusCount[p.status] += 1; });

    res.json({ totalByJenis, statusCount });
  } catch(err) {
    console.error("ERROR GET CUTI STATS:", err);
    res.status(500).json({ message: "Error fetching cuti stats" });
  }
};


module.exports = {
  getAllSaldoCuti,
  createSaldoCuti,
  getSaldoByEmpId,
  getSaldoByDivisi, // jangan lupa export
};

