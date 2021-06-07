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
	conn.query("CREATE DATABASE db_restapi",(err,res)=>{
		if(err) throw err;
		console.log('Database berhasil dibuat.')
	})
})

app.listen(port,(req,res)=>{
	console.log('server running on port'+port);
})