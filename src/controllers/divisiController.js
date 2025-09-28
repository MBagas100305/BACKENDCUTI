const DivisiRepository = require("../repositories/divisiRepository");

exports.getAllDivisi = async (req, res) => {
  try {
    const divisi = await DivisiRepository.getAll();
    res.json(divisi);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getDivisiById = async (req, res) => {
  try {
    const divisi = await DivisiRepository.getById(req.params.id);
    if (!divisi) return res.status(404).json({ message: "Divisi not found" });
    res.json(divisi);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createDivisi = async (req, res) => {
  try {
    const divisi = await DivisiRepository.create(req.body);
    res.status(201).json(divisi);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateDivisi = async (req, res) => {
  try {
    const divisi = await DivisiRepository.update(req.params.id, req.body);
    if (!divisi) return res.status(404).json({ message: "Divisi not found" });
    res.json(divisi);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteDivisi = async (req, res) => {
  try {
    const success = await DivisiRepository.delete(req.params.id);
    if (!success) return res.status(404).json({ message: "Divisi not found" });
    res.json({ message: "Divisi deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
