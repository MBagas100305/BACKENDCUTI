// src/repositories/PengajuanCutiRepo.js
const { PengajuanCuti, Karyawan, JenisCuti, Saldo, Divisi, sequelize } = require('../models');

class PengajuanCutiRepository {
  async getAll() {
    return PengajuanCuti.findAll({
      include: [
        {
          model: Karyawan,
          as: "employee",
          attributes: ["emp_id", "nama", "id_divisi"],
          include: [{ model: Divisi, as: "divisi", attributes: ["nama_divisi"] }],
        },
        { model: JenisCuti, as: "jenisCuti", attributes: ["nama_cuti", "durasi_maks"] },
      ],
      order: [["id_pengajuan", "DESC"]],
    });
  }

  async getById(id) {
    return PengajuanCuti.findByPk(id);
  }

  async create(data) {
    return PengajuanCuti.create(data);
  }

  async getSaldo(emp_id, id_jenis_cuti) {
    return Saldo.findOne({
      where: { emp_id, id_jenis_cuti },
    });
  }
  
  // Metode kritis yang menggunakan Transaction
  async approveWithTransaction(id) {
    return sequelize.transaction(async (t) => {
      const pengajuan = await PengajuanCuti.findByPk(id, { transaction: t });
      if (!pengajuan) {
        return { success: false, message: "Pengajuan tidak ditemukan" };
      }
      if (pengajuan.status === "Approved") {
        return { success: false, message: "Pengajuan sudah di-approve sebelumnya" };
      }

      // Hitung jumlah hari cuti
      const tanggalMulai = new Date(pengajuan.tanggal_mulai);
      const tanggalSelesai = new Date(pengajuan.tanggal_selesai);
      const diffTime = Math.abs(tanggalSelesai - tanggalMulai);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

      const saldo = await Saldo.findOne({
        where: { emp_id: pengajuan.emp_id, id_jenis_cuti: pengajuan.id_jenis_cuti },
        transaction: t
      });

      if (!saldo) {
        return { success: false, message: "Saldo cuti tidak ditemukan" };
      }
      if (saldo.sisa_hari < diffDays) {
        return { success: false, message: "Saldo cuti tidak cukup" };
      }

      // Kurangi saldo
      saldo.sisa_hari -= diffDays;
      await saldo.save({ transaction: t });

      // Update status pengajuan
      pengajuan.status = "Approved";
      await pengajuan.save({ transaction: t });

      return {
        success: true,
        message: "Pengajuan berhasil di-approve dan saldo diperbarui",
        data: pengajuan,
        saldo_terbaru: saldo,
      };
    });
  }
  
  async updateStatusAndAlasan(id, status, alasan_penolakan = null) {
    const updateData = { status };
    if (alasan_penolakan !== null) {
      updateData.alasan_penolakan = alasan_penolakan;
    }
    await PengajuanCuti.update(updateData, { where: { id_pengajuan: id } });
    return PengajuanCuti.findByPk(id); // Kembalikan data yang sudah diupdate
  }
}

module.exports = new PengajuanCutiRepository();