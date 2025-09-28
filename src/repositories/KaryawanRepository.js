// src/repositories/KaryawanRepo.js
const { Karyawan, Divisi } = require("../models");
const { Sequelize } = require("sequelize");

class KaryawanRepository {
  async getAll() {
    return Karyawan.findAll({
      include: [{ model: Divisi, as: "divisi", attributes: ["nama_divisi"] }],
    });
  }

  async getById(emp_id) {
    return Karyawan.findByPk(emp_id, {
      include: [{ model: Divisi, as: "divisi", attributes: ["nama_divisi"] }],
    });
  }

  async create(data) {
    return Karyawan.create(data);
  }

  async update(emp_id, data) {
    const [updated] = await Karyawan.update(data, {
      where: { emp_id },
    });
    return updated > 0;
  }

  async delete(emp_id) {
    const deleted = await Karyawan.destroy({
      where: { emp_id },
    });
    return deleted > 0;
  }

  async findByNip(nip) {
    if (!nip) return null;
    const trimmedNip = nip.toString().trim();

    return Karyawan.findOne({
      where: Sequelize.where(
        Sequelize.fn("RTRIM", Sequelize.fn("LTRIM", Sequelize.col("nip"))),
        trimmedNip
      ),
      include: [
        {
          model: Divisi,
          as: "divisi",
          attributes: ["id_divisi", "nama_divisi"],
        },
      ],
    });
  }
}

module.exports = new KaryawanRepository();
