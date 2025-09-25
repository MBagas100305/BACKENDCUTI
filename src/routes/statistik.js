const express = require('express');
const router = express.Router();
const statistikController = require('../controllers/statistikController');

// total cuti per divisi
router.get('/divisi', statistikController.getCutiPerDivisi);

// detail cuti dalam divisi tertentu
router.get('/divisi/:divisiId', statistikController.getDetailCutiPerDivisi);

module.exports = router;
