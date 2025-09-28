const jenisCutiRepo = require("../repositories/JenisCutiRepository");

const getAllJenisCuti = async (req, res) => {
  try {
    const jenisCuti = await jenisCutiRepo.getAll();
    res.json(jenisCuti);
  } catch (err) {
    res.status(500).json({ message: "Error fetching jenis cuti" });
  }
};

const getJenisCutiById = async (req, res) => {
  try {
    const { id_jenis_cuti } = req.params;
    const jenisCuti = await jenisCutiRepo.getById(id_jenis_cuti);
    if (!jenisCuti) return res.status(404).json({ message: "Jenis cuti tidak ditemukan" });

    res.json(jenisCuti);
  } catch (err) {
    res.status(500).json({ message: "Error fetching jenis cuti" });
  }
};

const createJenisCuti = async (req, res) => {
  try {
    const { nama_cuti, deskripsi, durasi_maks } = req.body;
    if (!nama_cuti || !durasi_maks) {
      return res.status(400).json({ message: "Data jenis cuti tidak lengkap" });
    }

    const jenisCuti = await jenisCutiRepo.create({ nama_cuti, deskripsi, durasi_maks });
    res.status(201).json({ message: "Jenis cuti berhasil dibuat", data: jenisCuti });
  } catch (err) {
    res.status(500).json({ message: "Error creating jenis cuti" });
  }
};

const updateJenisCuti = async (req, res) => {
  try {
    const { id_jenis_cuti } = req.params;
    const data = req.body;

    const updated = await jenisCutiRepo.update(id_jenis_cuti, data);
    if (!updated) return res.status(404).json({ message: "Jenis cuti tidak ditemukan" });

    res.json({ message: "Jenis cuti berhasil diperbarui", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Error updating jenis cuti" });
  }
};

const deleteJenisCuti = async (req, res) => {
  try {
    const { id_jenis_cuti } = req.params;
    const deleted = await jenisCutiRepo.delete(id_jenis_cuti);
    if (!deleted) return res.status(404).json({ message: "Jenis cuti tidak ditemukan" });

    res.json({ message: "Jenis cuti berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting jenis cuti" });
  }
};

module.exports = {
  getAllJenisCuti,
  getJenisCutiById,
  createJenisCuti,
  updateJenisCuti,
  deleteJenisCuti,
};
