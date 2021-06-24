const employee = require("../controllers/employeeController");

module.exports = app =>{

	app.get("/employee",employee.findEmp);
	
}