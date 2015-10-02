// config/passport.js
				
// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var mysql           = require('mysql');
var bcrypt          = require('bcrypt');

// var connection = mysql.createConnection({
//   host     : '127.0.0.1',
//   user     : 'Colin',
//   password : 'SaltyTuna814',
//   database : 'TeamTrack'
// });

var connection = mysql.createConnection({
  host     : 'virginia-mysql-instance1.ctlbtxqxbjwy.us-east-1.rds.amazonaws.com',
  port     : '3306',
  user     : 'colincole',
  password : 'SaltyTuna814',
  database : 'TeamTrack'
});

connection.connect(function(err) {
    if (err) {
        console.log('ERROR: ' + err);
    } else {
        console.log('Connected !');
    };
});

  
// expose this function to our app using module.exports
module.exports = function(passport) {

	// =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
		done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
		connection.query('SELECT * FROM Users WHERE id = ?', id, function(err,rows){	
			done(err, rows[0]);
		});
    });
	

 	// =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',

        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

        // Validation
        if(email.length == 0 || password.length == 0 || req.body.firstName.length == 0 || req.body.lastName.length == 0 || req.body.schoolID == 0 || req.body.referemail.length == 0) {
            return done(null, false, req.flash('signupMessage', 'All fields are required to complete sign up.'));
        }
		// find a user whose email is the same as the forms email
		// we are checking to see if the user trying to login already exists
        connection.query('SELECT * FROM Users WHERE email = ?', email, function(err,rows){
			if (err)
                return done(err);
			 if (rows.length) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {

                // Check if the referral email exists
                var referralCheck = connection.query('SELECT * FROM Users WHERE email = ?', req.body.referemail, function(err,rows){

                    if (err)
                        return done(err);
                    if (!rows.length) {
                        return done(null, false, req.flash('signupMessage', 'The referral email provided is not a regsitered user.'));
                    } else {
                        // if there is no user with that email
                        // create the user
                        var myUser          = new Object(); 
                        myUser.email        = email;
                        myUser.password     = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
                        myUser.firstName    = req.body.firstName;
                        myUser.lastName     = req.body.lastName;
                        myUser.schoolID     = req.body.schoolID;
                        myUser.userType     = 1;

                        var query = connection.query('INSERT INTO Users (email, password, firstName, lastName, fk_schoolID, fk_userType) VALUES (?,?,?,?,?,?)', [myUser.email, myUser.password, myUser.firstName, myUser.lastName, myUser.schoolID, myUser.userType], function(err, rows) {
                          myUser.id = rows.insertId;
                          return done(null, myUser);
                        });
                    }

                });

				
            }	
		});
    }));

    // LOCAL Athlete SIGNUP
    passport.use('local-athlete-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',

        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

        // Validation
        if(email.length == 0 || password.length == 0 || req.body.firstName.length == 0 || req.body.lastName.length == 0 || req.body.schoolID == 0) {
            return done(null, false, req.flash('signupMessage', 'All fields are required to complete sign up.'));
        }

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        connection.query('SELECT * FROM Users WHERE email = ?', email, function(err,rows){
            if (err)
                return done(err);
             if (rows.length) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {
                // Check if the referral email exists
                var runnerProfileCheck = connection.query('SELECT * FROM Runners WHERE fk_schoolID = ? AND firstName = ? AND lastName = ?', [req.body.schoolID, req.body.firstName, req.body.lastName], function(err,rows){

                    if (err)
                        return done(err);
                    if (!rows.length) {
                        return done(null, false, req.flash('signupMessage', 'There is no athlete profile to link to. In order for you to complete registration, your coach needs to use the Create New Athlete tool to build your running profile. Once completed, please check with your coach to make sure your name is spelled correctly, as this is used for the linking process.'));
                    } else {
                        // if there is no user with that email
                        // create the user
                        var myUser          = new Object(); 
                        myUser.email        = email;
                        myUser.password     = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
                        myUser.firstName    = req.body.firstName;
                        myUser.lastName     = req.body.lastName;
                        myUser.schoolID     = req.body.schoolID;
                        myUser.runnerID     = rows[0].runnerID;
                        myUser.userType     = 2;

                        var query = connection.query('INSERT INTO Users (email, password, firstName, lastName, fk_schoolID, fk_runnerID, fk_userType) VALUES (?,?,?,?,?,?,?)', [myUser.email, myUser.password, myUser.firstName, myUser.lastName, myUser.schoolID, myUser.runnerID, myUser.userType], function(err, rows) {
                          myUser.id = rows.insertId;
                          return done(null, myUser);
                        });
                    }

                });

                
            }   
        });
    }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

         connection.query('SELECT * FROM Users WHERE email = ?', email, function(err,rows){
			if (err) {
                console.log('the login error:' + err);
                return done(null, false, req.flash('loginMessage', 'No user found.'));
            }
                
			 if (!rows.length) {
                console.log('no user found');
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
            } 
			
			// if the user is found but the password is wrong
            //!( rows[0].password == password)
            //
            if (!bcrypt.compareSync(password, rows[0].password)) {
                console.log('wrong password');
                return done(null, false, req.flash('loginMessage', 'Incorrect password.')); // create the loginMessage and save it to session as flashdata
            }
                
			
            // all is well, return successful user
            return done(null, rows[0]);			
		
		});
		


    }));

};