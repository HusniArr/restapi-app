const conn = require('../config.js');

conn.connect((err)=>{
	if(err) throw err;
	console.log('db mysql berhasil terkoneksi.');
	conn.query("CREATE TABLE users (id_user int auto_increment primary key, username varchar(20) not null , pass varchar(8) not null, level varchar(20) not null)",(err,res)=>{
		if(err) throw err;
		console.log('tabel berhasil dibuat.')
	})
})