const mysql = require('mysql');

const conn = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"",
	database:"db_restapi"
})

module.exports = conn;
