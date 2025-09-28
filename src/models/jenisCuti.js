module.exports = (sequelize, DataTypes) => {
  const JenisCuti = sequelize.define("JenisCuti", {
    id_jenis_cuti: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama_cuti: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    deskripsi: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    durasi_maks: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: "Jenis_Cuti",
    freezeTableName: true,
    timestamps: false,
  });

  return JenisCuti;
};
