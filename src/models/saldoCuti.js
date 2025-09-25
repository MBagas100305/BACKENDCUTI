module.exports = (sequelize, DataTypes) => {
  const Saldo = sequelize.define(
    "Saldo",
    {
      id_saldo: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      emp_id: DataTypes.INTEGER,
      id_jenis_cuti: DataTypes.INTEGER,
      tahun: DataTypes.INTEGER,
      sisa_hari: DataTypes.INTEGER,
    },
    {
      tableName: "SaldoCuti", // harus sesuai nama tabel SQL Server
      timestamps: false,
    }
  );

  // Tambahkan relasi ke Karyawan
  Saldo.associate = (models) => {
    Saldo.belongsTo(models.Karyawan, {
      foreignKey: "emp_id",
      as: "employee", // alias wajib dipakai di include
    });
  };

  return Saldo;
};
