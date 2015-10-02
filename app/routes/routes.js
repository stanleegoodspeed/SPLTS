/** @jsx React.DOM */

var React = require("react");
var Router = require("react-router");
var Application = require("../components/application");

var CoachProfile = require("../components/coachprofile");
var AthleteProfile = require("../components/athleteprofile");

var Signup = require("../components/signup");
var Login = require("../components/login");
var LoginMenu = require("../components/loginmenu");

var NotFound = require("../components/notfound");
var AccessDenied = require("../components/accessdenied");
var AddSchool = require("../components/addschool");
var AthleteSignup = require("../components/athletesignup");
var Admin = require("../components/admin");
var About = require("../components/about");
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var routes = (
  <Route handler={Application} path="/"> 
    <DefaultRoute handler={NotFound} />
    <Route name="athleteprofile" path="/athleteprofile/:id" handler={AthleteProfile}/>
    <Route name="coachprofile" path="/coachprofile/:id" handler={CoachProfile}/>
    <Route name="signup" path="/signup" handler={Signup}/>
    <Route name="login" path="/login" handler={Login}/>
    <Route name="loginmenu" path="/" handler={LoginMenu}/>
    <Route name="accessdenied" path="/accessdenied" handler={AccessDenied}/>
    <Route name="addschool" path="/addschool" handler={AddSchool}/>
    <Route name="athletesignup" path="/athletesignup" handler={AthleteSignup} />
    <Route name="admin" path="/admin" handler={Admin} />
    <Route name="faq" path="/faq" handler={About} />
    <Route name="notfound" path="/notfound" handler={NotFound} />
    <NotFoundRoute handler={NotFound} />
  </Route>
);

module.exports = routes;