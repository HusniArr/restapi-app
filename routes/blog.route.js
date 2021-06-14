const blog  = require('../controllers/blogController.js');

module.exports = app =>{
	


	// get all blog
	app.get('/blog',blog.findAll);

	// get by id
	app.get('/blog/:id',blog.findByID);

	// create new blog
	app.post('/blog',blog.create);

	// update blog
	app.put('/blog/:id',blog.update);

	// delete blog
	app.delete('/blog/:id',blog.delete);


};
