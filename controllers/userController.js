const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const conn = require('../config/db-config.js');

exports.register = async(req,res)=>{
	const username = req.body.username;
	const sql = "SELECT * FROM users WHERE username =?";
	conn.query(sql,username,async(err,result)=>{
		if(err) throw err;
		
		if(result.length > 0){
			res.send({message:"username sudah terdaftar."});
			return;
		}else{
			bcrypt.genSalt(10,(err,salt)=>{
				 if (err) {
				    throw err
				  } else {
				    bcrypt.hash(req.body.pass, salt, function(err, hash) {
				      if (err) {
				        throw err
				      } else {
				        // console.log(hash)
				        const data = {
						username : req.body.username,
						pass : hash,
						level : req.body.level
						}
					const sql = "INSERT INTO users SET ?"
					conn.query(sql,data,(err,result)=>{
						if(err) throw err;
						res.status(201).send({message:"Berhasil ditambahkan."});
						return;
					})
				      }
				  })
				}
		
			})
		}
	})

}


exports.halamanadmin = (req,res)=>{
	return res.send({message:"halaman ini hanya untuk role admin."});
}




