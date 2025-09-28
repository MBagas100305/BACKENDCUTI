// src/models/divisi.js
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
      timestamps: false,   
    }
  );

  return Divisi;
};
