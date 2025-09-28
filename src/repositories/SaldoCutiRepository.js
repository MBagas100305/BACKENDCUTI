// src/repositories/SaldoCutiRepository.js
const { Saldo, Karyawan, JenisCuti, PengajuanCuti } = require('../models');

class SaldoCutiRepository {
  async getAll() {
    return Saldo.findAll({
      include: [
        { model: Karyawan, as: "employee", attributes: ["emp_id", "nama", "nip", "jabatan", "id_divisi"] },
        { model: JenisCuti, as: "jenisCuti", attributes: ["nama_cuti"] }
      ],
    });
  }

  async getByEmpId(emp_id) {
    return Saldo.findAll({
      where: { emp_id },
      include: [
        { model: Karyawan, as: "employee", attributes: ["emp_id", "nama", "nip", "jabatan", "id_divisi"] },
        { model: JenisCuti, as: "jenisCuti", attributes: ["nama_cuti"] }
      ],
    });
  }

  async getById(id_saldo) {
    return Saldo.findByPk(id_saldo, {
      include: [
        { model: Karyawan, as: "employee", attributes: ["emp_id", "nama"] },
        { model: JenisCuti, as: "jenisCuti", attributes: ["nama_cuti"] }
      ],
    });
  }

  async create(data) {
    return Saldo.create(data);
  }

  async update(id_saldo, data) {
    const saldo = await Saldo.findByPk(id_saldo);
    if (!saldo) return null;
    return saldo.update(data);
  }

  async delete(id_saldo) {
    const saldo = await Saldo.findByPk(id_saldo);
    if (!saldo) return null;
    await saldo.destroy();
    return true;
  }

  async getCutiStats() {
    const allSaldo = await Saldo.findAll({
      include: [
        { model: Karyawan, as: "employee", attributes: ["emp_id", "nama"] },
        { model: JenisCuti, as: "jenisCuti", attributes: ["nama_cuti"] }
      ]
    });

    const pengajuan = await PengajuanCuti.findAll();
    return { allSaldo, pengajuan };
  }
}

module.exports = new SaldoCutiRepository();
