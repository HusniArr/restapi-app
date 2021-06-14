const UserController = require('../controllers/userController');
const UserMiddleware = require('../middleware/user');
module.exports = app =>{
	
	app.post('/user/sign-up',UserMiddleware.validation,UserController.register);
	app.post('/user/sign-in',UserMiddleware.login);
  app.get('/secret/:id',UserMiddleware.verify,UserController.halamanadmin);
 	app.put('/user/:id',UserMiddleware.validationEdit,UserController.update);
 	app.delete('/user/:id',UserController.delete);
}

