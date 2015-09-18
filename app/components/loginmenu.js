/** @jsx React.DOM */

var React = require('react/addons');

var Login = React.createClass({

      render: function () {
        return (
          <div className="container">
            <div id="splash-menu-box">
              <h1>SPLTS</h1>
              <div className="row">
                <a href="/login" className="btn btn-outline-inverse btn-lg">Login</a>
              </div>
              <div className="row">
                <a href="/signup" className="btn btn-outline-inverse btn-lg">Sign up</a>
              </div>     
            </div>
          </div>
        )
      }
  });

/* Module.exports instead of normal dom mounting */
module.exports = Login;





