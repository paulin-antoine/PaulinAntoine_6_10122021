const mysql = require('mysql2');
require("dotenv").config();

const databasePass = process.env.DATABASE_PASS
const database = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    database: 'crud',
    password: `${databasePass}`
    
  });
    
  module.exports = database.promise(console.log("Connexion DB"))
  