const { Saldo, Karyawan, JenisCuti } = require("../models");

class StatistikRepository {
  async getSaldoCutiWithEmployee() {
    return Saldo.findAll({
      include: [
        { model: Karyawan, as: "employee", attributes: ["emp_id", "nama", "nip", "jabatan", "id_divisi"] },
        { model: JenisCuti, as: "jenisCuti", attributes: ["nama_cuti"] },
      ],
      raw: false,
    });
  }
}

module.exports = new StatistikRepository();
