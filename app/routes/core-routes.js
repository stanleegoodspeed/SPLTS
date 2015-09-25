var React = require('react/addons'),
LoginMenu = React.createFactory(require('../components/loginmenu')),
Login = React.createFactory(require('../components/login')),
Signup = React.createFactory(require('../components/signup')),
AthleteSignup = React.createFactory(require('../components/athletesignup')),
AccessDenied = React.createFactory(require('../components/accessdenied')),
NotFound = React.createFactory(require('../components/notfound')),
db = require('./database'),
Router = require("react-router"),
routes = require('./routes');

/* SERVER SIDE RENDERING */

module.exports = function(app, passport) {



    /* API Routes*/
    app.get('/getWorkouts/:id', function(req,res){

        var id = req.params.id;
        
        db.getWorkouts(id, function(err, results) {
            if(err) { 
                res.send(500,"Server Error"); 
                return;
            }
            // Respond with results as JSON
            res.send(results);
        });
    });

    app.get('/getSplits/:id', function(req,res){
        
        var id = req.params.id;

        db.getSplits(id, function(err, results) {
            if(err) { 
                res.send(500,"Server Error"); 
                return;
            }
            // Respond with results as JSON
            res.send(results);
        });
    });

    app.get('/getAthletes/:id', function(req,res){
        
        var id = req.params.id;

        db.getAthletes(id, function(err, results) {
            if(err) { 
                res.send(500,"Server Error"); 
                return;
            }
            // Respond with results as JSON
            res.send(results);
        });
    });

    app.get('/getStates', function(req,res){
        
        db.getStates(function(err, results) {
            if(err) { 
                res.send(500,"Server Error"); 
                return;
            }
            // Respond with results as JSON
            res.send(results);
        });
    });

    app.get('/getEvents', function(req,res){
        
        db.getEvents(function(err, results) {
            if(err) { 
                res.send(500,"Server Error"); 
                return;
            }

            var response = {
                status  : 200,
                message : 'Events',
                data    : results
            };
            // Respond with results as JSON
            res.send(response);
        });
    });

    app.get('/getTypes', function(req,res){
        
        db.getTypes(function(err, results) {
            if(err) { 
                res.send(500,"Server Error"); 
                return;
            }

            console.log('returning results from Types: ' + results);
             var response = {
                status  : 200,
                message : 'Types',
                data    : results
            };
            // Respond with results as JSON
            res.send(response);
        });
    });

    app.get('/getSchools/:id', function(req,res){
        
        var id = req.params.id;

        db.getSchools(id, function(err, results) {
            if(err) { 
                res.send(500,"Server Error"); 
                return;
            }
            // Respond with results as JSON
            res.send(results);
        });
    });
    
    app.get('/getCoachData/:id', function(req,res){
        
        var id = req.params.id;

        db.getCoachData(id, function(err, results) {
            if(err) { 
                res.send(500,"Server Error"); 
                return;
            }
            // Respond with results as JSON
            res.send(results);
        });
    });

    app.get('/getAthleteData/:id', function(req,res){
        
        var id = req.params.id;

        db.getAthleteData(id, function(err, results) {
            if(err) { 
                res.send(500,"Server Error"); 
                return;
            }
            // Respond with results as JSON
            res.send(results);
        });
    });

    app.get('/getWorkoutsCoach/:id', function(req,res){
        
        var id = req.params.id;

        db.getWorkoutsCoach(id, function(err, results) {
            if(err) { 
                res.send(500,"Server Error"); 
                return;
            }
            // Respond with results as JSON
            res.send(results);
        });
    });

    app.get('/getAthletesInRace/:id', function(req,res){
        
        var id = req.params.id;

        db.getAthletesInRace(id, function(err, results) {
            if(err) { 
                res.send(500,"Server Error"); 
                return;
            }
            // Respond with results as JSON
            res.send(results);
        });
    });

    app.get('/getCoaches/:id', function(req,res){
        
        var id = req.params.id;

        db.getCoaches(id, function(err, results) {
            if(err) { 
                res.send(500,"Server Error"); 
                return;
            }
            // Respond with results as JSON
            res.send(results);
        });
    });

    app.get('/checkProfile/:schoolID/:athleteID', function(req,res){

        var get = {
            schoolID: req.params.schoolID,
            athleteID: req.params.athleteID
        };
        
        db.checkProfile(get, function(err, results) {
            if(err) { 
                res.send(500,"Server Error"); 
                return;
            }
            // Respond with results as JSON
            res.send(results);
        });
    });

    app.post('/createAthlete', function(req,res){
        
        var schoolCode = parseInt(req.body.fk_schoolID);

        var post = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            fk_schoolID: schoolCode
        };

        db.createAthlete(post, function(err, results) {
            if(err) { 
                console.log('server error');
                var response = {
                    status  : 500,
                    success : 'Server Error'
                };
                res.end(JSON.stringify(response));
            }
            // Success
            console.log('success');
            var response = {
                status  : 200,
                success : 'Updated Successfully'
            };

            res.end(JSON.stringify(response));
        });
    });

    app.post('/createWorkout', function(req,res){
        
        var post = {
            fk_eventID: req.body.fk_eventID,
            fk_typeID: req.body.fk_typeID,
            createdBy: req.body.createdBy,
            raceName: req.body.raceName
        };

        db.createWorkout(post, function(err, results) {
            if(err) { 
                console.log('server error');
                var response = {
                    status  : 500,
                    success : 'Server Error'
                };
                res.end(JSON.stringify(response));
            }
            else
            {
                // Success
                console.log('success');
                console.log('results in createWorkout are: ' + results);
                // var response = {
                //     results
                // };

                res.end(JSON.stringify(results));
            }
        });
    });

    app.post('/addAthleteToWorkout', function(req,res){
        
        var post = {
            fk_raceID: req.body.fk_raceID,
            fk_runnerID: req.body.fk_runnerID
        };

        db.addAthleteToWorkout(post, function(err, results) {
            if(err) { 
                console.log('server error');
                var response = {
                    status  : 500,
                    success : 'Server Error'
                };
                res.end(JSON.stringify(response));
            }
            else
            {
                // Success
                console.log('success');
                // var response = {
                //     status  : 200,
                //     success : 'Updated Successfully'
                // };

                res.end(JSON.stringify(results));
            }
        });
    });

    app.post('/postWorkoutTime', function(req,res){
        
        var post = {
            runInRaceID: req.body.runInRaceID,
            finishTime: req.body.finishTime
        };

        db.postWorkoutTime(post, function(err, results) {
            if(err) { 
                console.log('server error');
                var response = {
                    status  : 500,
                    success : 'Server Error'
                };
                res.end(JSON.stringify(response));
            }
            else
            {
                // Success
                console.log('success');
                var response = {
                    status  : 200,
                    success : 'Updated Successfully'
                };

                res.end(JSON.stringify(response));
            }
        });
    });

    app.post('/postSplit', function(req,res){
        
        var post = {
            fk_runInRaceID: req.body.fk_runInRaceID,
            splitNumber: req.body.splitNumber,
            splitTime: req.body.splitTime
        };

        db.postSplit(post, function(err, results) {
            if(err) { 
                console.log('server error');
                var response = {
                    status  : 500,
                    success : 'Server Error'
                };
                res.end(JSON.stringify(response));
            }
            else
            {
                // Success
                console.log('success');
                var response = {
                    status  : 200,
                    success : 'Updated Successfully'
                };

                res.end(JSON.stringify(response));
            }
        });
    });

    app.get('/getAthletesWithSplits/:id', function(req,res){
        
        var id = req.params.id;

        db.getAthletesWithSplits(id, function(err, results) {
            if(err) { 
                res.send(500,"Server Error"); 
                return;
            }
            // Respond with results as JSON
            res.send(results);
        });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    /* STATIC Routes */

	app.get('/', function(req, res){
		var reactHtml = React.renderToString(LoginMenu({}));
	    res.render('index.ejs', {reactOutput: reactHtml, message: req.flash('loginMenuMessage') });
	});

    app.get('/notfound', function(req, res){
        var reactHtml = React.renderToString(NotFound({}));
        res.render('index.ejs', {reactOutput: reactHtml, message: req.flash('loginMenuMessage') });
    });

    app.get('/accessdenied', function(req, res){
        var reactHtml = React.renderToString(AccessDenied({}));
        res.render('index.ejs', {reactOutput: reactHtml, message: req.flash('loginMenuMessage') });
    });


	/* LOGIN */
    app.get('/login', function(req, res) {
        
        var reactHtml = React.renderToString(Login({}));
	    res.render('index.ejs', {reactOutput: reactHtml, message: req.flash('loginMessage') });
    });

    app.post('/login', function(req, res, next) {
          passport.authenticate('local-login', function(err, user, info) {
            if (err) { 
                console.log('error loggin in: ' + err)
                return res.redirect('/login'); 
            }
            if (!user) { 
                console.log('user not found!');
                return res.redirect('/login'); 
            }

            req.logIn(user, function(err) {
              if (err) { 
                console.log('cant log in because: ' + err);
                return res.redirect('/login');  
              }

              // If coach, link to coachprofile
              if(user.fk_userType == 1)
              {
                return res.redirect('/coachprofile/' + user.id);
              }
              // If athlete, link to athlete profile
              else 
              {
                return res.redirect('/athleteprofile/' + user.fk_runnerID);
              }
              
            });

          })(req, res, next);
    });

    app.post('/mobilelogin', function(req, res, next) {
          passport.authenticate('local-login', function(err, user, info) {
            // If error
            if (err) { 
                console.log('error 1: ' + err);
                var response = {
                    status  : 500,
                    message : err
                };

                res.end(JSON.stringify(response));
            }
            // If user not found
            if (!user) { 
                console.log('error 2');
                var response = {
                    status  : 500,
                    message : 'The username/password is incorrect. Please double check and try again.'
                };

                res.end(JSON.stringify(response));
            }

            // No error yet, try to log in...
            req.logIn(user, function(err) {
              // If error upon login
              if (err) { 
                console.log('error 3:' + err);
                var response = {
                    status  : 500,
                    message : 'The username/password is incorrect. Please double check and try again.'
                };
                res.end(JSON.stringify(response));

              } else {
                // Success
                console.log('success mobile login!');
                var response = {
                    status  : 200,
                    message : 'Login Success',
                    userID  : user.id
                };
                res.end(JSON.stringify(response));
              }  
            });
          })(req, res, next);
    });

   
    /* Coach SIGNUP */
    app.get('/signup', function(req, res) {

        var reactHtml = React.renderToString(Signup({}));
	    res.render('index.ejs', {reactOutput: reactHtml, message: req.flash('signupMessage')});
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/login', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    /* Athlete SIGNUP */
    app.get('/athletesignup', function(req, res) {

        var reactHtml = React.renderToString(AthleteSignup({}));
        res.render('index.ejs', {reactOutput: reactHtml, message: req.flash('signupMessage')});
    });

    app.post('/athletesignup', passport.authenticate('local-athlete-signup', {
        successRedirect : '/login', // redirect to the secure profile section
        failureRedirect : '/athletesignup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    /* PROFILE */
    app.get('/athleteprofile/:id', isLoggedInAthlete, function(req, res) {
    
        var id = req.params.id;
        Router.run(routes, '/athleteprofile/' + id , function (Handler) {
            var reactHtml = React.renderToString(React.createElement(Handler));
            res.render('nav.ejs', {reactOutput: reactHtml});
        });
    });

    app.get('/coachprofile/:id', isLoggedInCoach, function(req, res) {

        var id = req.params.id;
        Router.run(routes, '/coachprofile/' + id , function (Handler) {
            var reactHtml = React.renderToString(React.createElement(Handler));
            res.render('nav.ejs', {reactOutput: reactHtml});
        });
    }); 

    /* ADD SCHOOL */
    app.get('/addschool', function(req, res) {
    
        Router.run(routes, '/addschool' , function (Handler) {
            var reactHtml = React.renderToString(React.createElement(Handler));
            res.render('index.ejs', {reactOutput: reactHtml});
        });
    });

    app.post('/addschool', function(req,res){
        
        var stateID = parseInt(req.body.fk_stateID);

        var post = {
            description: req.body.description, 
            fk_stateID: stateID
        };

        db.addSchool(post, function(err, results) {
            if(err) { 
                console.log('server error');
                var response = {
                    status  : 500,
                    success : 'Server Error'
                };
                res.end(JSON.stringify(response));
            }
            // Success
            console.log('success');
            var response = {
                status  : 200,
                success : 'Updated Successfully'
            };

            res.end(JSON.stringify(response));
        });
    });

};


/* MIDDLEWARE Funcs */

// route middleware to make sure a user is logged in
function isLoggedInCoach(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()) {
        // Only users with a 'Coach' userType are allowed to access coach profile
        if(req.user.fk_userType == 1) 
        {
            // Each coach can only access his/her profile
            if(req.user.id == req.params.id)
            {
                // Continue to /coachprofile
                return next();
            }
        }
        else if(req.user.fk_userType == 3)
        {
            return next();
        }

    	res.redirect('/accessdenied');

    } else {
    	// if they aren't redirect them to the home page
    	res.redirect('/');
    }
}

// route middleware to make sure a user is logged in
function isLoggedInAthlete(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()) {
        
        // Coach
        if(req.user.fk_userType == 1) 
        {

            var get = {
                schoolID: req.user.fk_schoolID,
                athleteID: req.params.id
            };
            
            db.checkProfile(get, function(err, results) {
                if(err) { 
                    res.send(500,"Server Error"); 
                }

                if(results.length == 0)
                {
                    res.redirect('/accessdenied');
                }
                else
                {
                    return next();
                }
            });  

        }
        // Athlete
        else if(req.user.fk_userType == 2)
        {
            // Each athlete can only access his/her profile
            if(req.user.fk_runnerID == req.params.id)
            {
                // Continue to /athleteprofile
                return next();
            }
            else
            {
                res.redirect('/accessdenied');
            }
        }
        // Superuser
        else if(req.user.fk_userType == 3)
        {
            return next();
        }    

    } else {
        // if they aren't redirect them to the home page
        res.redirect('/');
    }
}
