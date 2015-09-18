/** @jsx React.DOM */

var React = require('react/addons');

var AccessDenied = React.createClass({

      render: function () {
        return (
          <div className="container">
            <div id="login-menu-box">
                <div className="row">
                  <div className="col-lg-4 col-lg-offset-4">
                    <h2>*You do not have the correct user permissions to view the requested page.</h2>
                  </div>
                </div>
            </div>
        </div>
        )
      }
  });

/* Module.exports instead of normal dom mounting */
module.exports = AccessDenied;