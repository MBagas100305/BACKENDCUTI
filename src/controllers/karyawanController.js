const { Karyawan } = require("../models");

const getAllKaryawan = async (req, res) => {
  try {
    const karyawan = await Karyawan.findAll(); 
    res.json(karyawan);
  } catch (err) {
    console.error("ERROR GET KARYAWAN:", err);
    res.status(500).json({ message: "Error fetching karyawan" });
  }
};

module.exports = { getAllKaryawan };
