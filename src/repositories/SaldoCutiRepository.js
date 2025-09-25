// src/repositories/SaldoCutiRepo.js
const { Saldo, Karyawan, JenisCuti, PengajuanCuti } = require('../models');

class SaldoCutiRepository {
  async getAll() {
    return Saldo.findAll({
      include: [
        {
          model: Karyawan,
          as: "employee", 
          attributes: ["emp_id", "nama", "nip", "jabatan", "id_divisi"],
        },
        { model: JenisCuti, as: "jenisCuti", attributes: ["nama_cuti"] }
      ],
    });
  }

  async getByEmpId(emp_id) {
    return Saldo.findAll({
      where: { emp_id },
      include: [
        {
          model: Karyawan,
          as: "employee", 
          attributes: ["emp_id", "nama", "nip", "jabatan", "id_divisi"],
        },
        { model: JenisCuti, as: "jenisCuti", attributes: ["nama_cuti"] }
      ],
    });
  }
  
  async create(data) {
    return Saldo.create(data);
  }
  
  async getCutiStats() {
    const allSaldo = await Saldo.findAll({
      include: [{ model: Karyawan, as: "employee", attributes: ["emp_id", "nama"] }, { model: JenisCuti, as: "jenisCuti", attributes: ["nama_cuti"] }]
    });

    const pengajuan = await PengajuanCuti.findAll();
    
    return { allSaldo, pengajuan };
  }
}

module.exports = new SaldoCutiRepository();