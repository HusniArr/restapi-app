const blog = require('../models/blogModel.js');

// tangkap semua blog
exports.findAll = (req,res)=>{

	blog.fetchAll((err,data)=>{
		if(err)
			res.status(500).send({
				message:err.message || "server error, ada kesalahan saat mengambil data blog."
			});
		else res.send(data);
	})
	
}

// tangkap blog berdasarkan ID
exports.findByID = (req,res)=>{
	const id_blog = req.params.id;
	blog.fetchByID(id_blog,(err,data)=>{
		if(err)
			res.status(500).send({
				message:err.message || "server error, fatal ID tidak ditemukan."
			});
		else res.send(data);
	})
}

// tambah blog baru
exports.create = (req,res)=>{

	const Blog = {
		title : req.body.title,
		body : req.body.body,
		created_by : req.body.created_by};

	blog.create(Blog,(err,data)=>{
		if (err) {
			res.status(500).send({
				message:err.message || "Gagal ditambahkan."
			});
		}else{
			res.send(data);
		}
	})
}

// update blog 
exports.update = (req,res)=>{
		const id = req.params.id;
		const Blog = {
		title : req.body.title,
		body : req.body.body,
		created_by : req.body.created_by
	};
	blog.update(id,Blog,(err,data)=>{
			if (err) {
			res.status(500).send({
				message:err.message || "Gagal diperbaharui."
			});
		}else{
			res.send(data);
		}
	})
}

// delete blog by ID
exports.delete = (req,res)=>{
	const id = req.params.id;

	blog.delete(id,(err,data)=>{
			if (err) {
			res.status(500).send({
				message:err.message || "Gagal dihapus."
			});
		}else{
			res.send('berhasil dihapus.');
		}
	})
}