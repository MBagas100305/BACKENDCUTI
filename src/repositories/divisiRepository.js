const { Divisi } = require("../models");

class DivisiRepository {
  async getAll() {
    return await Divisi.findAll();
  }

  async getById(id) {
    return await Divisi.findByPk(id);
  }

  async create(data) {
    return await Divisi.create(data);
  }

  async update(id, data) {
    const divisi = await Divisi.findByPk(id);
    if (!divisi) return null;
    return await divisi.update(data);
  }

  async delete(id) {
    const divisi = await Divisi.findByPk(id);
    if (!divisi) return null;
    await divisi.destroy();
    return true;
  }
}

module.exports = new DivisiRepository();
