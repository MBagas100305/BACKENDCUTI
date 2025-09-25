require('dotenv').config();

module.exports = {
  dialect: "mssql",
  host: process.env.DB_SERVER,      
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT, 10) || 1433,  
  dialectOptions: {
    options: {
      encrypt: false,   
      trustServerCertificate: true
    }
  },
  logging: console.log, 
};
