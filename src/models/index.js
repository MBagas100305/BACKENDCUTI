// src/models/index.js
const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/db");

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    dialectOptions: dbConfig.dialectOptions,
    logging: dbConfig.logging,
  }
);

// Import models
const Karyawan = require("./karyawan")(sequelize, DataTypes);
const PengajuanCuti = require("./pengajuanCuti")(sequelize, DataTypes);
const Saldo = require("./saldoCuti")(sequelize, DataTypes);
const Divisi = require("./divisi")(sequelize, DataTypes);
const JenisCuti = require("./jenisCuti")(sequelize, DataTypes); // kalau ada

// Relasi
Karyawan.hasMany(PengajuanCuti, { foreignKey: "emp_id", as: "pengajuanCuti" });
PengajuanCuti.belongsTo(Karyawan, { foreignKey: "emp_id", as: "employee" });

Karyawan.hasMany(Saldo, { foreignKey: "emp_id", as: "saldo" });
Saldo.belongsTo(Karyawan, { foreignKey: "emp_id", as: "employee" });

Karyawan.belongsTo(Divisi, { foreignKey: "id_divisi", as: "divisi" });
Divisi.hasMany(Karyawan, { foreignKey: "id_divisi", as: "karyawan" });

PengajuanCuti.belongsTo(JenisCuti, { foreignKey: "id_jenis_cuti", as: "jenisCuti" });
Saldo.belongsTo(JenisCuti, { foreignKey: "id_jenis_cuti", as: "jenisCuti" });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Karyawan = Karyawan;
db.PengajuanCuti = PengajuanCuti;
db.Saldo = Saldo;
db.Divisi = Divisi;
db.JenisCuti = JenisCuti;

module.exports = db;
