const express = require('express');
const cors = require('cors');
require('dotenv').config(); // load .env

const db = require('./src/models'); 
const sequelize = db.sequelize;
const app = express();
const port = process.env.PORT || 5000;

// ✅ Test koneksi DB
sequelize.authenticate()
  .then(() => console.log("✅ Connected to DB:", sequelize.config.database))
  .catch(err => console.error("❌ DB Connection Error:", err));

// Import routes
const karyawanRoutes = require('./src/routes/karyawan');
const pengajuanCutiRoutes = require('./src/routes/pengajuanCuti');
const saldoCutiRoutes = require('./src/routes/saldoCuti');  
const authRoutes = require('./src/routes/auth');
const statistikRoutes = require('./src/routes/statistik'); 
const cutiRoutes = require('./src/routes/cuti');

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes); 
app.use('/api/cuti', cutiRoutes);
app.use('/api/statistik', statistikRoutes);

// Route lainnya
app.use('/api/karyawan', karyawanRoutes);
app.use('/api/pengajuan', pengajuanCutiRoutes);
app.use('/api/saldo', saldoCutiRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.send('Backend Cuti Karyawan API Running');
});

// Start server
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
