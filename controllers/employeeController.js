const employee = require('../models/empModel.js');
const conn = require('../config/db-config.js');

// tangkap semua data employee
exports.findEmp = (req,res,next)=>{
	const key = req.query.key;
	const nip = req.query.nip;


if(!key){
res.send({status:400,message:"api key tidak ditemukan di database."})
}else{
			sql = "SELECT * FROM users WHERE  apikey=?";
		conn.query(sql,key,(err,result)=>{
			if(result.length > 0){
					if(!nip){

				employee.fetchAll((err,data)=>{
						if(err)
							res.status(500).send({
								message: "api key tidak ditemukan di database."
							});
						else res.send({status:200,data});
					})
			}else{
			employee.fetchByNip(nip,(err,data)=>{
									if(err)
									res.status(500).send({
										message: "api key tidak ditemukan di database."
									});
								else res.send({status:200,data});
									
								})
					
				}
				
		

			}else{
				res.send({status:400,message:"api key tidak ditemukan di database."})
			}
		})

}
	
}

