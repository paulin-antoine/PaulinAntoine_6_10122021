const mysql = require('mysql2');
require("dotenv").config();

const database = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    database: 'crud',
    password: process.env.DATABASE_PASS
    
  });
  
   
  module.exports = database.promise(console.log("Connexion DB")) ; 
  