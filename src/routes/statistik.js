const express = require('express');
const router = express.Router();
const statistikController = require('../controllers/statistikController');
const auth = require("../middleware/authMiddleware"); 

// Statistik (Admin & Kadiv)
router.get('/divisi', auth(["admin", "kadiv"]), statistikController.getCutiPerDivisi);
router.get('/divisi/:divisiId', auth(["admin", "kadiv"]), statistikController.getDetailCutiPerDivisi);

module.exports = router;