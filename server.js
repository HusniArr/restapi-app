const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const conn = require('./config');
const app = express();
const port = process.env.PORT || 2021;

app.use(bodyParser.json());

app.get('/',(req,res)=>{
	res.send('hello world');
})

conn.connect((err)=>{
	if(err) throw err;
	console.log('db mysql berhasil terkoneksi.');
	conn.query("CREATE TABLE users (id_user int auto_increment primary key, username varchar(20) not null , pass varchar(8) not null, level varchar(20) not null)",(err,res)=>{
		if(err) throw err;
		console.log('tabel berhasil dibuat.')
	})
})

app.listen(port,(req,res)=>{
	console.log('server running on port'+port);
})