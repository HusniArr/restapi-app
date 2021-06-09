const conn = require('../config/db-config.js');

// constructor
const Blog = (blog)=>{
	this.title = blog.title;
	this.body = blog.body;
	this.created_by = blog.created_by;
}


Blog.fetchAll = (result) =>{
	const sql = "SELECT * FROM blogs";
	conn.query(sql,(err,res)=>{
		if(err){
			console.log(err);
		
		}
		result(null,{blogs:res});
		
	})
}

Blog.fetchByID = (id_blog,result) =>{
		const sql = `SELECT * FROM blogs WHERE id=${id_blog}`;
		conn.query(sql,(err,res)=>{
			if(err){
				console.log(err);
			}

			if(res.length){
				console.log({"blog":res[0]})
				result(null,{blog:res[0]});
			}else{
				result({kind:"MODULE_NOT_FOUND"},null);
			}
		})
}
Blog.create = (newblog,result)=>{
	const sql = "INSERT INTO blogs SET ?";
	conn.query(sql,newblog,(err,res)=>{
		if(err) throw err;
		console.log('Blog berhasil ditambahkan',{id:res.insertId,...newblog});
		result(null,{id:res.insertId,...newblog});
	})
}

Blog.update = (id_blog,blog,result)=>{
	const sql = `UPDATE blogs SET title =?, body=? , created_by =? WHERE id =?`;
	conn.query(sql,[blog.title,blog.body,blog.created_by,id_blog],(err,res)=>{
		if(err) throw err;
		if(res.affectedRows == 0){
			result({kind:"MODULE_NOT_FOUND"},null);
		}
		result(null,{id:id_blog,...blog});
	})
}

Blog.delete = (id_blog,result) =>{
	const sql = `DELETE FROM blogs WHERE id = ${id_blog}`;
	conn.query(sql,(err,res)=>{
		if(err) console.log(err);
		console.log('blog berhasil terhapus dengan id ='+id_blog);
		result(null,res);
	})
}
module.exports = Blog;