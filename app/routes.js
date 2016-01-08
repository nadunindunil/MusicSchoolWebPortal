module.exports = function(app) {

	app.get('/api/getData', function(req, res) {


		connection.query('SELECT * FROM student', function(err, rows, fields) {
			if (err) throw err;
			res.json(rows);
			console.log('The solution is: ', rows);
		});
	});

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests



	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};