// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// configuration ===========================================
	
// config files
var db = require('./config/db');




var port = process.env.PORT || 3000; // set our port
// mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
var mysql      = require('mysql');
var connection = mysql.createConnection({
	host     : '127.0.0.1',
	user     : 'root',
	password : '',
	database : 'g19'
});


app.get('/getStudentsList', function(req, res) {


	connection.query('SELECT * FROM student', function(err, rows, fields) {
		if (err) throw err;
		res.json(rows);
		console.log('The solution is: ', rows);
	});
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/getTeachersList', function(req, res){
	//connection.connect();

	connection.query('SELECT * FROM teacher', function(err, rows, fields) {
		if (err) throw err;
		res.json(rows);
		console.log('The solution is: ', rows);
	});

	//connection.end();


});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/getTeachersCourseList', function(req, res){
	//connection.connect();

	connection.query('SELECT * FROM teacher LEFT JOIN course ON teacher.teacher_ID=course.teacher_ID', function(err, rows, fields) {
		if (err) throw err;
		res.json(rows);
		console.log('The solution is: ', rows);
	});

	//connection.end();


});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/getTimeSlotsTeachersCourseList', function(req, res){
	//connection.connect();

	connection.query('SELECT * FROM time_slots INNER JOIN course ON time_slots.slot_ID=course.time_slot_ID INNER JOIN teacher ON teacher.teacher_ID=course.teacher_ID', function(err, rows, fields) {
		if (err) throw err;
		res.json(rows);
		console.log('The solution is: ', rows);
	});

	//connection.end();


});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/getCoursesList', function(req, res){
	//connection.connect();

	connection.query('SELECT * FROM course', function(err, rows, fields) {
		if (err) throw err;
		res.json(rows);
		console.log('The solution is: ', rows);
	});

	//connection.end();


});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/getTelNumList', function(req, res){
	//connection.connect();

	connection.query('SELECT * FROM phone_numbers', function(err, rows, fields) {
		if (err) throw err;
		res.json(rows);
		console.log('The solution is: ', rows);
	});

	//connection.end();


});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/getPerfGrpsList', function(req, res){
	//connection.connect();

	connection.query('SELECT * FROM performance_group', function(err, rows, fields) {
		if (err) throw err;
		res.json(rows);
		console.log('The solution is: ', rows);
	});

	//connection.end();


});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/getTimeSlotList', function(req, res){
	//connection.connect();

	connection.query('SELECT * FROM time_slots', function(err, rows, fields) {
		if (err) throw err;
		res.json(rows);
		console.log('The solution is: ', rows);
	});

	//connection.end();


});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/findTelNum/:id', function(req, res){
	//connection.connect();
	var ID = req.params.id;
	connection.query('SELECT * FROM phone_numbers WHERE number_ID= ?',[ID], function(err, rows, fields) {
		if (err) throw err;
		res.json(rows);
		console.log('The solution is: ', rows);
	});

	//connection.end();


});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/insertStudent', function (req, res) {
	console.log(req.body.name);

	var post2 ={
		number_ID: req.body.ID,
		location: req.body.location,
		phone_number: req.body.phone_number

	}

	var query = connection.query('INSERT INTO phone_numbers SET ?', post2, function(err, result) {
		// Neat!
	});

	console.log(query.sql);

	var post  = {
		ID: req.body.ID,
		name: req.body.name,
		gender: req.body.gender,
		DOB: req.body.DOB,
		access_level: req.body.access_level,
		course_ID: req.body.courseID,
		performance_group_ID:req.body.performance_group_ID,
		phone_number_id:req.body.phone_number_id };

	var query = connection.query('INSERT INTO student SET ?', post, function(err, result) {
		// Neat!
	});
	console.log(query.sql);
	res.end('done');

});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/insertTeacher', function (req, res) {
	console.log(req.body.name);

	var post2 ={
		number_ID: req.body.ID,
		location: req.body.location,
		phone_number: req.body.phone_number

	}

	var query = connection.query('INSERT INTO phone_numbers SET ?', post2, function(err, result) {
		// Neat!
	});

	console.log(query.sql);

	var post  = {
		teacher_ID: req.body.ID,
		name: req.body.name,
		gender: req.body.gender,
		DOB: req.body.DOB,
		access_level: req.body.access_level,
		phone_number_id:req.body.phone_number_id,
		NID:req.body.nic };

	var query = connection.query('INSERT INTO teacher SET ?', post, function(err, result) {
		// Neat!
	});
	console.log(query.sql);
	res.end('done');

});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/insertCourse', function (req, res) {




	var post  = {
		teacher_ID: req.body.teacher_ID,
		title: req.body.title,
		time_slot_ID: req.body.time_slot_ID,
		course_ID: req.body.course_ID
		 };

	var query = connection.query('INSERT INTO course SET ?', post, function(err, result) {
		// Neat!
	});
	console.log(query.sql);
	res.end('done');

});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/insertSibling', function (req, res) {




	var post  = {
		Stdt_ID: req.body.Stdt_ID,
		sibling_ID: req.body.sibling_ID
	};

	var query = connection.query('INSERT INTO siblings SET ?', post, function(err, result) {
		// Neat!
	});
	console.log(query.sql);
	res.end('done');

});

app.post('/insertParent', function (req, res) {




	var post  = {
		NID: req.body.NID,
		name: req.body.name,
		child_ID: req.body.id,
		gender: req.body.pgender,
		phone_number_ID:req.body.phone_number_ID
	};

	var query = connection.query('INSERT INTO parents SET ?', post, function(err, result) {
		// Neat!
	});
	console.log(query.sql);
	res.end('done');

});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app
