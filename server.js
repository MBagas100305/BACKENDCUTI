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

const routes = {
  karyawan: require('./src/routes/karyawan'),
  pengajuan: require('./src/routes/pengajuanCuti'),
  saldo: require('./src/routes/saldoCuti'),
  auth: require('./src/routes/auth'),
  statistik: require('./src/routes/statistik'),
  cuti: require('./src/routes/cuti'),
  divisi: require("./src/routes/divisi"),
  jenisCutiRoutes: require("./src/routes/jenisCuti"),
};

// Middleware
app.use(cors());
app.use(express.json());

// Register routes
app.use('/api', routes.auth); 
app.use('/api/cuti', routes.cuti);
app.use('/api/statistik', routes.statistik);
app.use('/api/karyawan', routes.karyawan);
app.use('/api/pengajuan', routes.pengajuan);
app.use('/api/saldo', routes.saldo);
app.use('/api/divisi', routes.divisi);
app.use("/api/jenis-cuti", routes.jenisCutiRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.send('Backend Cuti Karyawan API Running');
});

// Start server
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
