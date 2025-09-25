const { PengajuanCuti, Saldo, Karyawan, JenisCuti, Divisi } = require("../models");

const getAllPengajuan = async (req, res) => {
  try {
    const pengajuan = await PengajuanCuti.findAll({
      include: [
        {
          model: Karyawan,
          as: "employee",
          attributes: ["emp_id", "nama", "id_divisi"],
          include: [
            {
              model: Divisi,
              as: "divisi",
              attributes: ["id_divisi", "nama_divisi"], 
            },
          ],
        },
        {
          model: JenisCuti,
          as: "jenisCuti",
          attributes: ["id_jenis_cuti", "nama_cuti", "durasi_maks"],
        },
      ],
      order: [["id_pengajuan", "DESC"]],
    });

    res.json(pengajuan);
  } catch (err) {
    console.error("Error fetching pengajuan:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
/**
 * POST buat pengajuan cuti baru
 */
const createPengajuan = async (req, res) => {
  try {
    const { emp_id, id_jenis_cuti, tanggal_mulai, tanggal_selesai, alasan } = req.body;

    if (!emp_id || !id_jenis_cuti || !tanggal_mulai || !tanggal_selesai) {
      return res.status(400).json({ message: "Data tidak lengkap" });
    }

    const pengajuan = await PengajuanCuti.create({
      emp_id,
      id_jenis_cuti,
      tanggal_mulai,
      tanggal_selesai,
      alasan,
      status: "Pending", // default
    });

    res.status(201).json({
      message: "Pengajuan cuti berhasil dibuat",
      data: pengajuan,
    });
  } catch (err) {
    console.error("Error creating pengajuan:", err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * PUT approve pengajuan cuti
 */
const approvePengajuan = async (req, res) => {
  try {
    const { id } = req.params;

    const pengajuan = await PengajuanCuti.findByPk(id);
    if (!pengajuan) {
      return res.status(404).json({ message: "Pengajuan tidak ditemukan" });
    }

    if (pengajuan.status === "Approved") {
      return res.status(400).json({ message: "Pengajuan sudah di-approve sebelumnya" });
    }

    // Hitung jumlah hari cuti
    const tanggalMulai = new Date(pengajuan.tanggal_mulai);
    const tanggalSelesai = new Date(pengajuan.tanggal_selesai);
    const diffTime = Math.abs(tanggalSelesai - tanggalMulai);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // inklusif

    // Ambil saldo cuti karyawan
    const saldo = await Saldo.findOne({
      where: {
        emp_id: pengajuan.emp_id,
        id_jenis_cuti: pengajuan.id_jenis_cuti,
      },
    });

    if (!saldo) {
      return res.status(404).json({ message: "Saldo cuti tidak ditemukan" });
    }

    if (saldo.sisa_hari < diffDays) {
      return res.status(400).json({ message: "Saldo cuti tidak cukup" });
    }

    // Kurangi saldo
    saldo.sisa_hari -= diffDays;
    await saldo.save();

    // Update status pengajuan
    pengajuan.status = "Approved";
    await pengajuan.save();

    res.json({
      message: "Pengajuan berhasil di-approve dan saldo diperbarui",
      data: pengajuan,
      saldo_terbaru: saldo,
    });
  } catch (err) {
    console.error("Error approving pengajuan:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * PUT reject pengajuan cuti
 */
const rejectPengajuan = async (req, res) => {
  try {
    const { id } = req.params;
    const { alasan_penolakan } = req.body;

    const pengajuan = await PengajuanCuti.findByPk(id);
    if (!pengajuan) {
      return res.status(404).json({ message: "Pengajuan tidak ditemukan" });
    }

    if (pengajuan.status === "Rejected") {
      return res.status(400).json({ message: "Pengajuan sudah di-reject sebelumnya" });
    }

    pengajuan.status = "Rejected";
    if (alasan_penolakan) pengajuan.alasan_penolakan = alasan_penolakan;
    await pengajuan.save();

    res.json({
      message: "Pengajuan berhasil di-reject",
      data: pengajuan,
    });
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
