// server.js

var express 	= require('express'),
app 			= express(),
port 			= process.env.PORT  || 8081,
passport 		= require('passport'),
flash    		= require('connect-flash'),
path     		= require('path'),
morgan       	= require('morgan'),
cookieParser 	= require('cookie-parser'),
bodyParser 		= require('body-parser'),
session      	= require('express-session');

require('./config/passport')(passport); // pass passport for configuration

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

// Make sure to include the JSX transpiler
require("node-jsx").install();

// Include static assets. Not advised for production
app.use(express.static(path.join(__dirname, 'public')));
// Set view path
app.set('views', path.join(__dirname, 'views'));
// set up ejs for templating. You can use whatever
app.set('view engine', 'ejs');

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Set up Routes for the application
require('./app/routes/core-routes.js')(app,passport);

//Route not found -- Set 404
app.get('*', function(req, res) {
    res.redirect('/notfound');
});

app.listen(port);
//app.listen(port, "0.0.0.0");
console.log('Server is Up and Running at Port : ' + port);