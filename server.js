// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var bcrypt = require('bcrypt-nodejs');

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

	connection.query('SELECT * FROM teacher LEFT JOIN course ON teacher.teacher_ID=course.teacherID', function(err, rows, fields) {
		if (err) throw err;
		res.json(rows);
		console.log('The solution is: ', rows);
	});

	//connection.end();


});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/getTimeSlotsTeachersCourseList', function(req, res){
	//connection.connect();

	connection.query('SELECT * FROM time_slots INNER JOIN course ON time_slots.slot_ID=course.time_slot_ID INNER JOIN teacher ON teacher.teacher_ID=course.teacherID', function(err, rows, fields) {
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/getPerfItems', function(req, res){
	//connection.connect();

	connection.query('SELECT * FROM performance_items', function(err, rows, fields) {
		if (err) throw err;
		res.json(rows);
		console.log('The solution is: ', rows);
	});

	//connection.end();


});



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/getInstrumentsList', function(req, res){
	//connection.connect();

	connection.query('SELECT * FROM instrument LEFT JOIN has_instruments ON instrument.instrument_ID = has_instruments.instr_ID ', function(err, rows, fields) {
		if (err) throw err;
		res.json(rows);
		console.log('The solution is: ', rows);
	});

	//connection.end();


});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/getPerGroupsList', function(req, res){
	//connection.connect();

	connection.query('SELECT * FROM performance_group LEFT JOIN performance_items ON performance_group.performance_item_ID = performance_items.item_ID ' +
		'LEFT JOIN time_slots ON time_slots.slot_ID = performance_group.practice_session_ID', function(err, rows, fields) {
		if (err) throw err;

		res.json(rows);
		console.log('The solution is: ', rows);
	});


});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.get('/getPerformanceGroup/:id', function(req, res){
	//connection.connect();
	var ID = req.params.id;
	connection.query('SELECT * FROM `perfgroup_has_members` left join `student` on perfgroup_has_members.s_ID = student.ID WHERE perfgroup_has_members.grp_ID = ?',[ID], function(err, rows, fields) {
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

app.get('/findGroupMembers/:id', function(req, res){
	//connection.connect();
	var ID = req.params.id;
	connection.query('SELECT * FROM student WHERE performance_group_ID = ?',[ID], function(err, rows, fields) {
		if (err) throw err;
		res.json(rows);
		console.log('The solution is: ', rows);
	});

	//connection.end();


});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/insertInstrument', function (req, res) {
	console.log("inside insert instrument");



	var post  = {
		instrument_ID: req.body.instrument_ID,
		name: req.body.name
	};

	var query = connection.query('INSERT INTO instrument SET ?', post, function(err, result) {
		// Neat!
	});
	console.log(query.sql);
	res.end('done');

});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/insertPerfGroup', function (req, res) {
	console.log("inside insert performance groups list");



	var post  = {
		group_ID: req.body.group_ID,
		performance_item_ID: req.body.performance_item_ID,
		practice_session_ID:req.body.practice_session_ID
	};

	var query = connection.query('INSERT INTO performance_group SET ?', post, function(err, result) {
		// Neat!
	});
	console.log(query.sql);
	res.end('done');

});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/insertPerfItem', function (req, res) {
	console.log("inside insert performance items list");



	var post  = {
		item_ID: req.body.item_ID,
		item_name: req.body.item_name,
		description:req.body.description
	};

	var query = connection.query('INSERT INTO performance_items SET ?', post, function(err, result) {
		// Neat!
	});
	console.log(query.sql);
	res.end('done');

});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/insertperfGroupMembers', function (req, res) {
	console.log("inside bulk members input");

	console.log(req.body);

	var post  = req.body;

	for (var i = 0 ; i < post.length ; i++){
		var query = connection.query('INSERT INTO perfgroup_has_members SET ?', post[i], function(err, result) {
			// Neat!
		});
		console.log(query.sql);
	}
	res.end('done');

});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/addStudentForInstrument', function (req, res) {




	var post  = {
		Std_ID: req.body.Std_ID,
		instr_ID: req.body.instr_ID
	};

	var query = connection.query('INSERT INTO has_instruments SET ?', post, function(err, result) {
		// Neat!
	});
	console.log(query.sql);
	res.end('done');

});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/insertStudent', function (req, res) {
	console.log(req.body.name);

	var post2 ={
		number_ID: req.body.ID,
		location: req.body.location,
		phone_number: req.body.phone_number

	};

	var query = connection.query('INSERT INTO phone_numbers SET ?', post2, function(err, result) {
		// Neat!
	});

	console.log(query.sql);

	var post  = {
		ID: req.body.ID,
		name: req.body.name,
		gender: req.body.gender,
		DOB: req.body.DOB,
		//access_level: req.body.access_level,
		course_ID: req.body.courseID,
		//performance_group_ID:req.body.performance_group_ID,
		phone_number_id:req.body.phone_number_id };

	var query2 = connection.query('INSERT INTO student SET ?', post, function(err, result) {
		// Neat!
	});
	console.log(query2.sql);
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
app.post('/signup', function (req, res) {

	var x;
	console.log("inside sign up");
	bcrypt.genSalt(5, function(err, salt) {
		bcrypt.hash(req.body.password, salt, null, function(err, hash) {
			console.log(hash);
			x = hash;
			update();
		});
	});


	function update(){
		console.log("inside update");
		var post ={
			IDs: req.body.ID,
			name: req.body.name,
			Admin: req.body.admin,
			password: x

		};

		var query = connection.query('INSERT INTO users SET ?', post, function(err, result) {
			// Neat!
		});
		console.log(query.sql);
		res.end('done');
	}

});

////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/login', function (req, res) {
	var y;
	var candidatePassword = req.body.password;
	var ID = req.body.ID;
	var ans = {};

	connection.query('SELECT password FROM users WHERE IDs= ?',[ID], function(err, rows, fields) {
		if (err) throw err;
		if  (rows.length > 0){

			console.log('The solution is: ', rows);
			console.log(candidatePassword);
			//ans.json(rows);
			console.log("pass from table" + rows[0].password );
			y = rows[0].password;
			update();
		}
		else {   res.json({ LogIn : 0 }); }
		//res.json(user1);
	});


	function update(){
		console.log(y);

		bcrypt.compare(candidatePassword, y , function(err, isMatch) {
			if (err) throw (err);
			console.log(isMatch);

			if(isMatch == true){
				connection.query('SELECT IDs,name,Admin FROM users WHERE IDs=?',[ID], function (err, rows, fields){
					res.json({
						LogIn : 1,
						name : rows[0].name,
						IDs : rows[0].IDs,
						Admin : rows[0].Admin
					});


				});
			} else {   res.json({ LogIn : 0 }); }

		});
	}
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/checkUser/:id', function (req, res) {


	var ID = req.params.id;

	connection.query('SELECT * FROM users WHERE IDs= ?',[ID], function(err, rows, fields) {
		if (err) throw err;
		res.json(rows);
		console.log('The solution is: ', rows);
	});

	//res.end('done');

});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/insertCourse', function (req, res) {




	var post  = {
		teacherID: req.body.teacherID,
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
	var post2 ={
		number_ID: req.body.NID,
		location: req.body.location,
		phone_number: req.body.phone_number

	}

	var query = connection.query('INSERT INTO phone_numbers SET ?', post2, function(err, result) {
		// Neat!
	});



	var post  = {
		NID: req.body.NID,
		name: req.body.name,
		child_ID: req.body.child_ID,
		gender: req.body.pgender,
		phone_number_ID:req.body.NID
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
