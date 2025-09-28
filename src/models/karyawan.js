module.exports = (sequelize, DataTypes) => {
  const Karyawan = sequelize.define("Karyawan", {
    emp_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama: {
      type: DataTypes.STRING,
      field: "nama_lengkap"
    },
    nip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_divisi: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jabatan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanggal_masuk: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  }, {
    tableName: "Karyawan",
    freezeTableName: true,
    timestamps: false,
  });

  // ✅ Relasi
  Karyawan.associate = (models) => {
    Karyawan.belongsTo(models.Divisi, {
      foreignKey: "id_divisi",
      as: "divisi", // alias
    });
    Karyawan.hasMany(models.PengajuanCuti, {
      foreignKey: "emp_id",
      as: "pengajuanCutis",
    });
  };

  return Karyawan;
};
