// src/repositories/JenisCutiRepository.js
const { JenisCuti } = require("../models");

class JenisCutiRepository {
  async getAll() {
    return JenisCuti.findAll();
  }

  async getById(id_jenis_cuti) {
    return JenisCuti.findByPk(id_jenis_cuti);
  }

  async create(data) {
    return JenisCuti.create(data);
  }

  async update(id_jenis_cuti, data) {
    const jenisCuti = await JenisCuti.findByPk(id_jenis_cuti);
    if (!jenisCuti) return null;
    return jenisCuti.update(data);
  }

  async delete(id_jenis_cuti) {
    const jenisCuti = await JenisCuti.findByPk(id_jenis_cuti);
    if (!jenisCuti) return null;
    await jenisCuti.destroy();
    return true;
  }
}

module.exports = new JenisCutiRepository();
