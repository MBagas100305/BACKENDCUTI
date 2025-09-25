

// src/controllers/statistikController.js
const statistikRepo = require('../repositories/StatistikRepository');

const getCutiPerDivisi = async (req, res) => {
    try {
      const data = await statistikRepo.getCutiPerDivisi();
      res.json(data);
    } catch (err) {
      console.error("ERROR GET CUTI PER DIVISI:", err.message);
      res.status(500).json({ error: err.message });
    }
};

const getDetailCutiPerDivisi = async (req, res) => {
    try {
      const { divisiId } = req.params;
      const data = await statistikRepo.getDetailCutiPerDivisi(divisiId);
      res.json(data);
    } catch (err) {
      console.error("ERROR GET DETAIL CUTI PER DIVISI:", err.message);
      res.status(500).json({ error: err.message });
    }
};

module.exports = { 
    getCutiPerDivisi, 
    getDetailCutiPerDivisi 
};