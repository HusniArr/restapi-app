const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 2021;

// parse request of content-type : application/json
app.use(bodyParser.json());

// parse request of content-type : application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

require('./routes/blog.route.js')(app);

app.listen(port,(req,res)=>{
	console.log('server running on port'+port);
})
