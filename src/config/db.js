require('dotenv').config();

module.exports = {
  dialect: "mssql",
  host: process.env.DB_SERVER,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,   
  database: process.env.DB_DATABASE,   
  port: parseInt(process.env.DB_PORT, 10) || 1433,
  dialectOptions: {
    options: {
      encrypt: false,
      trustServerCertificate: true
    }
  },
  logging: console.log,
};
