/** @jsx React.DOM */

var React = require("react");
var Router = require("react-router");
var Application = require("../components/Application");

var CoachProfile = require("../components/coachprofile");
var AthleteProfile = require("../components/athleteprofile");

var Signup = require("../components/signup");
var Login = require("../components/login");
var LoginMenu = require("../components/loginmenu");

var NotFound = require("../components/notfound");
var AccessDenied = require("../components/accessdenied");
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;


// var wrapComponent = function(Component, props) {
//   return React.createClass({
//     render: function() {
//       return React.createElement(Component, props);
//     }
//   });
// };

var routes = (
  <Route handler={Application} path="/"> 
    <DefaultRoute handler={NotFound} />
    <Route name="athleteprofile" path="/athleteprofile/:id" handler={AthleteProfile}/>
    <Route name="coachprofile" path="/coachprofile/:id" handler={CoachProfile}/>
    <Route name="signup" path="/signup" handler={Signup}/>
    <Route name="login" path="/login" handler={Login}/>
    <Route name="loginmenu" path="/" handler={LoginMenu}/>
    <Route name="accessdenied" path="/accessdenied" handler={AccessDenied}/>
    <NotFoundRoute handler={NotFound} />
  </Route>
);

module.exports = routes;