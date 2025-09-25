module.exports = (sequelize, DataTypes) => {
  const Divisi = sequelize.define(
    "Divisi",
    {
      id_divisi: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nama_divisi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "Divisi",
      freezeTableName: true,
      timestamps: false,
    }
  );

  // ✅ Relasi balik
  Divisi.associate = (models) => {
    Divisi.hasMany(models.Karyawan, {
      foreignKey: "id_divisi",
      as: "karyawans",
    });
  };

  return Divisi;
};
