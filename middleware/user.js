const secretkey = ('../config/secret');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const conn = require('../config/db-config');


exports.validation = async(req,res,next)=>{
		// username min 3 karakter
		if(!req.body.username || req.body.username.length < 3){
			return res.send({
				message:"username minimal 3 karakter"
			})
		}
		// password min 8 karakter
		if(!req.body.pass || req.body.pass.length < 8){
			return res.send({
				message:"password minimal 8 karakter"
			})
		}

		// konfirmasi password
		if(!req.body.passconf || req.body.pass != req.body.passconf){
			return res.send({
				message:"Maaf, kedua password harus sama."
			})
		}

		// konfirmasi level
		if(req.body.level == ''){
			return res.send({
				message:"Masukkan user anda sebagai admin atau member."
			})
		}
		if(req.body.level == 'admin' || req.body.level == 'member'){
			
		}else{

			return res.send({
				message:"Pilihan user hanya sebagai admin atau member."
			})
		}
		
		next();
}

exports.login = (req,res)=>{
	const username = req.body.username;
	const sql = "SELECT * FROM users WHERE username =?";
	conn.query(sql,username,(err,result,field)=>{
		if(err){
			throw err;
			return res.send({
				message:err
			});
		}
		if(result.length == 0){
			return res.send({message:"username atau password salah!."});
		}
		bcrypt.compare(req.body.pass,result[0].pass,(error,isMatch)=>{
				if(!isMatch){
					res.send({
					message:"password salah!.",
					token:null,
					user:null
					});
					return;
				}
				const token = jwt.sign({id_user:result.id_user},secretkey,{expiresIn:'1d'});
				res.send({
					message:"Token berhasil digenerate.",
					token:token,
					user:result[0]
				});
				return;
		
		})
		
		});

}

exports.validationEdit = async(req,res,next)=>{
		// username min 3 karakter
		if(!req.body.username || req.body.username.length < 3){
			return res.send({
				message:"username minimal 3 karakter"
			})
		}
		// password lama wajib diisi
		if(!req.body.pass || req.body.pass.length < 8){
			return res.send({
				message:"password minimal 8 karakter"
			})
		}

		if(req.body.pass == '' || req.body.pass == null){
			return res.send({
				message:"password lama wajib diisi."
			})
		}

		// password baru 
		if(!req.body.newpass || req.body.newpass.length < 8){
			return res.send({
				message:"password baru minimal 8 karakter"
			})
		}
		// konfirmasi password
		if(!req.body.passconf || req.body.newpass != req.body.passconf){
			return res.send({
				message:"Maaf, kedua password harus sama."
			})
		}

		// konfirmasi level
		if(req.body.level == ''){
			return res.send({
				message:"Masukkan user anda sebagai admin atau member."
			})
		}
		if(req.body.level == 'admin' || req.body.level == 'member'){
			
		}else{

			return res.send({
				message:"Pilihan user hanya sebagai admin atau member."
			})
		}
		
		const sql = "SELECT * FROM users WHERE id_user ="+req.params.id;
		conn.query(sql,(err,results)=>{
			if(err) throw err;
			bcrypt.compare(req.body.pass,results[0].pass,(err,isMatch)=>{
				if(isMatch){
					next();
				}else{
					res.send({message:"password lama tidak sesuai."});
				}
				});
				
		})
		
}
exports.verify = (req,res,next)=>{
			const bearerHeader = req.headers['authorization'];
			const level = req.body.level;
			if(bearerHeader){
				const token = bearerHeader.split(' ')[1];
				jwt.verify(token,secretkey,(err,decoded)=>{
					if(err){
					 return	res.send({auth:false,message:"Token tidak ditemukan."});
					}else{
						if(level == 'admin'){
							req.auth = decoded;
							next();

						}else{
							return	res.send({auth:false,message:"Gagal otorisasi role anda."});
						}
					}
				});

			}else{
				return res.send({auth:false,message:"Token tidak tersedia."});
			}
}