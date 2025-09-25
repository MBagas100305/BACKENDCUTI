// src/repositories/StatistikRepo.js
const { Karyawan, Divisi, PengajuanCuti, Sequelize } = require('../models');

class StatistikRepository {
  async getCutiPerDivisi() {
    return Karyawan.findAll({
      attributes: [
        [Sequelize.col('divisi.nama_divisi'), 'nama_divisi'],
        [Sequelize.fn('COUNT', Sequelize.col('pengajuanCutis.id_pengajuan')), 'total'] 
      ],
      include: [
        { model: Divisi, as: 'divisi', attributes: [] },
        { model: PengajuanCuti, as: 'pengajuanCutis', attributes: [], required: false }
      ],
      group: ['divisi.id_divisi', 'divisi.nama_divisi'],
      raw: true,
    });
  }

  async getDetailCutiPerDivisi(divisiId) {
    return Karyawan.findAll({
      where: { id_divisi: divisiId },
      attributes: [
        'nama',
        [Sequelize.fn('COUNT', Sequelize.col('pengajuanCutis.id_pengajuan')), 'total']
      ],
      include: [
        { model: PengajuanCuti, as: 'pengajuanCutis', attributes: [], required: false },
      ],
      group: ['Karyawan.emp_id', 'Karyawan.nama'],
      raw: true,
    });
  }
  
  async getDivisionLeaveData() {
    return Divisi.findAll({
      attributes: [
        'id_divisi',
        'nama_divisi',
        [Sequelize.fn('COUNT', Sequelize.col('Karyawans->pengajuanCutis.id_pengajuan')), 'jumlah'],
      ],
      include: [
        {
          model: Karyawan,
          as: 'Karyawans', 
          attributes: [],
          include: [
            {
              model: PengajuanCuti,
              as: 'pengajuanCutis', 
              attributes: [],
            },
          ],
          required: false,
        },
      ],
      group: ['Divisi.id_divisi', 'Divisi.nama_divisi'],
      raw: true,
    });
  }
}

module.exports = new StatistikRepository();