const mysql = require('mysql');
const dbConfig = require('../config/db.config');

const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

connection.connect(error => {
  if (error) throw error;
  console.log('Conectado a la BD');
});

module.exports = connection;
