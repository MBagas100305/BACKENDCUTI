const { PengajuanCuti, Karyawan, Divisi } = require('../models');
const { Sequelize } = require('sequelize');

module.exports = {
  async getCutiPerDivisi(req, res) {
    try {
      const data = await Karyawan.findAll({
        attributes: [
          [Sequelize.col('divisi.nama_divisi'), 'nama_divisi'],
          [Sequelize.fn('COUNT', Sequelize.col('pengajuanCutis.id')), 'total']
        ],
        include: [
          {
            model: Divisi,
            as: 'divisi',
            attributes: []
          },
          {
            model: PengajuanCuti,
            attributes: []
          }
        ],
        group: ['divisi.id_divisi', 'divisi.nama_divisi']
      });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getDetailCutiPerDivisi(req, res) {
    try {
      const { divisiId } = req.params;
      const data = await Karyawan.findAll({
        where: { id_divisi: divisiId }, // pakai id_divisi, bukan "divisi"
        attributes: [
          'nama',
          [Sequelize.fn('COUNT', Sequelize.col('pengajuanCutis.id')), 'total']
        ],
        include: [
          {
            model: PengajuanCuti,
            attributes: []
          },
          {
            model: Divisi,
            as: 'divisi',
            attributes: []
          }
        ],
        group: ['Karyawan.emp_id', 'Karyawan.nama']
      });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
