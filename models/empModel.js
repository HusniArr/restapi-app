const conn = require('../config/db-config.js');

// constructor
const Employee = (employee)=>{
	this.nip = employee.nip;
	this.nm_pegawai = employee.nm_pegawai;
	this.no_hp = employee.no_hp;
	this.alamat = employee.alamat;
	this.status = employee.status;
}
 
 

Employee.fetchAll = (result) =>{
		const sql = "SELECT * FROM employees";
			conn.query(sql,(err,res)=>{
				if(err){
					console.log(err);
				
				}	
				result(null,{employee:res});
				
			})
}

Employee.fetchByNip = (nip,result) =>{
		const sql = `SELECT * FROM employees WHERE nip=${nip}`;
		conn.query(sql,(err,res)=>{
					if(err){
						console.log(err);
					}

					console.log({"employee":res[0]})
					result(null,{employee:res[0]});
				
				})
}

module.exports = Employee;