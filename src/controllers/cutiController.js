const { PengajuanCuti, Karyawan, Divisi, Sequelize } = require('../models');

const getDivisionLeaveData = async (req, res) => {
  try {
    const rows = await Divisi.findAll({
      attributes: [
        'id_divisi',
        'nama_divisi',
        [Sequelize.fn('COUNT', Sequelize.col('Karyawans->PengajuanCuti.id_pengajuan')), 'jumlah'],
      ],
      include: [
        {
          model: Karyawan,
          as: 'Karyawans', // ini harus sesuai dengan alias default / relasi
          attributes: [],
          include: [
            {
              model: PengajuanCuti,
              as: 'PengajuanCuti', // harus sama dengan alias di index.js
              attributes: [],
            },
          ],
          required: false,
        },
      ],
      group: ['Divisi.id_divisi', 'Divisi.nama_divisi'],
      raw: true,
    });

    res.json(rows);
  } catch (err) {
    console.error('Error fetching division leave (Sequelize):', err.message);
    res.status(500).json({ error: 'Failed to fetch division leave data' });
  }
};

module.exports = { getDivisionLeaveData };
