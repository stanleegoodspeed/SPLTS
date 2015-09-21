/** @jsx React.DOM */

var React = require('react/addons');

var Login = React.createClass({

      handleCoach: function() {
        window.location.href = "/signup"
      },

      handleAthlete: function() {
        window.location.href = "/athletesignup";
      },

      handleSignup: function() {
        $("#signup-selection").removeClass('hidden');
      },

      render: function () {
        return (
          <div className="container">
            <div id="splash-menu-box">
              <h1>SPLTS</h1>
              <div className="row">
                <a href="/login" className="btn btn-outline-inverse btn-lg">Login</a>
              </div>
              <div className="row">
                <a className="btn btn-outline-inverse btn-lg" onClick={this.handleSignup}>Sign up</a>
              </div>
              <div id="signup-selection" className="hidden">
              <div className="radio">
                <label>
                  <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" onClick={this.handleCoach} />
                  Coach
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2" onClick={this.handleAthlete} />
                  Athlete
                </label>
              </div>  
              </div>   
            </div>
          </div>
        )
      }
  });

/* Module.exports instead of normal dom mounting */
module.exports = Login;





