var React = require('react/addons'),
LoginMenu = React.createFactory(require('../components/loginmenu')),
Login = React.createFactory(require('../components/login')),
Signup = React.createFactory(require('../components/signup')),
AthleteProfile = React.createFactory(require('../components/athleteprofile')),
CoachProfile = React.createFactory(require('../components/coachprofile')),
db = require('./database'),
Router = require("react-router"),
routes = require('./routes');

/* SERVER SIDE RENDERING */

module.exports = function(app, passport) {

    // app.use(function(req, res, next) {

    //     // We customize the onAbort method in order to handle redirects
    //     var router = Router.create({
    //         routes: routes,
    //         location: req.path,
    //         onAbort: function defaultAbortHandler(abortReason, location) {
    //             if (abortReason && abortReason.to) {
    //                 res.redirect(301, abortReason.to);
    //             } else {  // TODO: Is this needed?
    //                 res.redirect(404, "404");
    //             }
    //         }
    //     });

    //     router.run(function (Handler, state) {
    //         // React.renderToString takes your component
    //         // and generates the markup
    //         var html = React.renderToString(React.createElement(Handler, {
    //             routerState: state,
    //             //deviceType: deviceType,
    //             environment: "server"
    //         }), null);

    //         // Checks if route is NotFoundRoute
    //         if (state.routes[1].isNotFound) {
    //             res.status(404);
    //         }
    //         res.render('nav.ejs', { reactOutput: html} );
    //     });
    // });

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


	/* LOGIN */
    app.get('/login', function(req, res) {
        
        var reactHtml = React.renderToString(Login({}));
	    res.render('index.ejs', {reactOutput: reactHtml, message: req.flash('loginMessage') });
    });

    // app.post('/login', passport.authenticate('local-login', {
    //     successRedirect : '/coachprofile/1', // redirect to the secure profile section
    //     failureRedirect : '/signup', // redirect back to the signup page if there is an error
    //     failureFlash : true // allow flash messages
    // }));

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

        // render the page and pass in any flash data if it exists
        //res.render('signup.jsx', { message: req.flash('signupMessage') });

        var reactHtml = React.renderToString(Signup({}));
	    res.render('index.ejs', {reactOutput: reactHtml, message: req.flash('signupMessage')});
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/login', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    /* PROFILE */
    app.get('/athleteprofile/:id', isLoggedIn, function(req, res) {
        // res.render('profile.jsx', {
        //     user : req.user // get the user out of session and pass to template
        // });

        var id = req.params.id;
        Router.run(routes, '/athleteprofile/' + id , function (Handler) {
            var reactHtml = React.renderToString(React.createElement(Handler));
            //var injected = { list: [Api.getArticle(aid)]};
            res.render('nav.ejs', {reactOutput: reactHtml});
        });

        // var id = req.params.id;
    	// var reactHtml = React.renderToString(AthleteProfile({athleteID: id}));
	    // res.render('nav.ejs', {reactOutput: reactHtml});
    });

    app.get('/coachprofile/:id', isLoggedIn, function(req, res) {

        var id = req.params.id;
        Router.run(routes, '/coachprofile/' + id , function (Handler) {
            var reactHtml = React.renderToString(React.createElement(Handler));
            res.render('nav.ejs', {reactOutput: reactHtml});
        });

        // var id = req.params.id;
        // var reactHtml = React.renderToString(CoachProfile({}));
        // res.render('nav.ejs', {reactOutput: reactHtml});
    });

    
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()) {
    	console.log('yep its authenticated!');
    	return next();
    } else {
    	// if they aren't redirect them to the home page
    	console.log('nope not authenticated!');
    	res.redirect('/');
    }
}
