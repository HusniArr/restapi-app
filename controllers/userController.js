const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const conn = require('../config/db-config.js');
const randomstring = require('randomstring');

const key = randomstring.generate({
	capitalization:'lowercase',
	charset:'alphanumeric',
	length:50
})
exports.getKey = (req,res)=>{
	res.send({key:key});
};

exports.register = (req,res)=>{
	const username = req.body.username;
	const sql = "SELECT * FROM users WHERE username =?";
	conn.query(sql,username,(err,result)=>{
		if(err) throw err;
		
		if(result.length > 0){
			res.send({message:"username sudah terdaftar."});
			return;
		}else{
			bcrypt.genSalt(10,(err,salt)=>{
				 if (err) {
				    throw err
				  } else {
				    bcrypt.hash(req.body.pass, salt, (err, hash) =>{
				      if (err) {
				        throw err
				      } else {
				        // console.log(hash)
				        const data = {
						username : req.body.username,
						pass : hash,
						level : req.body.level,
						apikey:key
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

exports.getById = (req,res)=>{
	const id = req.query.id;
	sql = "SELECT * FROM users WHERE id_user=?";
	conn.query(sql,id,(err, result)=>{
		if(err) throw err;
		if(result.length > 0){
			res.send({username:result[0].username,apikey:result[0].apikey});
			return;
		}else{
			res.send({message:"Id user salah."});
			return;
		}
	})
}

exports.update = (req,res)=>{
	const id = req.params.id;
	bcrypt.genSalt(10,(err,salt)=>{
		bcrypt.hash(req.body.newpass,salt,(err,hash)=>{
				const data = {
					username:req.body.username,
					pass:hash,
					level:req.body.level
				}
				const sqlEdit = "UPDATE users SET ? WHERE id_user=?";
				conn.query(sqlEdit,[data,id],(error,rows)=>{
					if(error){
						throw error;
						res.send({message:"internal server error."});
						return;
					}else{
						res.send({message:"Berhasil diperbaharui."});
						return;
					}
				})
			})
			
		})

}

exports.delete = (req,res)=>{
	const sql = "DELETE FROM users WHERE id_user="+req.params.id;
	conn.query(sql,(err,results)=>{
		if(err) throw err; 
		res.send({message:"Berhasil dihapus."});
		return;
	})
}
exports.halamanadmin = (req,res)=>{
	return res.send({message:"Selamat datang di halaman admin."});
}





