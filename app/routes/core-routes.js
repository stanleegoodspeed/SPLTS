var React = require('react/addons'),
LoginMenu = React.createFactory(require('../components/loginmenu')),
Login = React.createFactory(require('../components/login')),
Signup = React.createFactory(require('../components/signup')),
AthleteProfile = React.createFactory(require('../components/athleteprofile')),
CoachProfile = React.createFactory(require('../components/coachprofile')),
AccessDenied = React.createFactory(require('../components/accessdenied')),
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

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    /* STATIC Routes */

	app.get('/', function(req, res){
		var reactHtml = React.renderToString(LoginMenu({}));
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
                return next(err); 
            }
            if (!user) { 
                return res.redirect('/login'); 
            }

            req.logIn(user, function(err) {
              if (err) { 
                return next(err); 
              }
              return res.redirect('/coachprofile/' + user.id);
            });

          })(req, res, next);
    });

   
    /* SIGNUP */
    app.get('/signup', function(req, res) {

        var reactHtml = React.renderToString(Signup({}));
	    res.render('index.ejs', {reactOutput: reactHtml, message: req.flash('signupMessage')});
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/login', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
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
};

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
        
        if(req.user.fk_userType == 1) 
        {
            // Check to see if the requested athlete profile is linked to the coach's school
            return next();
        }
        else if(req.user.fk_userType == 2)
        {
            // Each athlete can only access his/her profile
            if(req.user.runnerID == req.params.id)
            {
                // Continue to /athleteprofile
                return next();
            }
        }
        
        res.redirect('/accessdenied');

    } else {
        // if they aren't redirect them to the home page
        res.redirect('/');
    }
}
