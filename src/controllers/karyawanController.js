// src/controllers/karyawanController.js
const karyawanRepo = require('../repositories/KaryawanRepository');

const getAllKaryawan = async (req, res) => {
  try {
    const karyawan = await karyawanRepo.getAll();
    res.json(karyawan);
  } catch (err) {
    console.error("ERROR GET KARYAWAN:", err);
    res.status(500).json({ message: "Error fetching karyawan" });
  }
};

const getKaryawanById = async (req, res) => {
  try {
    const karyawan = await karyawanRepo.getById(req.params.emp_id);
    if (!karyawan) return res.status(404).json({ message: "Karyawan not found" });
    res.json(karyawan);
  } catch (err) {
    console.error("DETAIL ERROR:", err);
    res.status(500).json({ message: "Error fetching karyawan" });
  }
};

const createKaryawan = async (req, res) => {
  try {
    // Perlu validasi data
    const karyawan = await karyawanRepo.create(req.body);
    res.status(201).json({ message: "Karyawan created", data: karyawan });
  } catch (err) {
    console.error("ERROR CREATE KARYAWAN:", err);
    res.status(500).json({ message: err.message });
  }
};

const updateKaryawan = async (req, res) => {
  try {
    const success = await karyawanRepo.update(req.params.emp_id, req.body);
    if (!success) return res.status(404).json({ message: "Karyawan not found" });
    res.json({ message: "Karyawan updated" });
  } catch (err) {
    console.error("ERROR UPDATE KARYAWAN:", err);
    res.status(500).json({ message: "Error updating karyawan" });
  }
};

const deleteKaryawan = async (req, res) => {
  try {
    const success = await karyawanRepo.delete(req.params.emp_id);
    if (!success) return res.status(404).json({ message: "Karyawan not found" });
    res.json({ message: "Karyawan deleted" });
  } catch (err) {
    console.error("ERROR DELETE KARYAWAN:", err);
    res.status(500).json({ message: "Error deleting karyawan" });
  }
};

module.exports = { 
  getAllKaryawan, 
  getKaryawanById, 
  createKaryawan, 
  updateKaryawan, 
  deleteKaryawan 
};