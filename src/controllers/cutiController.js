// src/controllers/cutiController.js
const statistikRepo = require('../repositories/StatistikRepository');

const getDivisionLeaveData = async (req, res) => {
  try {
    const rows = await statistikRepo.getDivisionLeaveData();
    res.json(rows);
  } catch (err) {
    console.error('Error fetching division leave (Sequelize):', err.message);
    res.status(500).json({ error: 'Failed to fetch division leave data' });
  }
};

module.exports = { getDivisionLeaveData };