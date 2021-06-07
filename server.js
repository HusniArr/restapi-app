const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 2021;

app.use(bodyParser.json());

app.get('/',(req,res)=>{
	res.send('hello world');
})

app.listen(port,(req,res)=>{
	console.log('server running on port'+port);
})