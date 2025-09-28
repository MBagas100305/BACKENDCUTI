const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const PengajuanCuti = sequelize.define(
    "PengajuanCuti",
    {
      id_pengajuan: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      emp_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_jenis_cuti: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tanggal_mulai: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      tanggal_selesai: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      alasan: {
        type: DataTypes.STRING(510),
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: "Pending",
      },
      tanggal_pengajuan: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('GETDATE()'), // ✅ cross-DB safe
      },
    },
    {
      tableName: "Pengajuan_Cuti",
      freezeTableName: true,
      timestamps: false,
    }
  );

  // Relasi
  PengajuanCuti.associate = (models) => {
    PengajuanCuti.belongsTo(models.Karyawan, {
      foreignKey: "emp_id",
      as: "employee",
    });

    PengajuanCuti.belongsTo(models.JenisCuti, {
      foreignKey: "id_jenis_cuti",
      as: "jenisCuti",
    });
  };

  return PengajuanCuti;
};
