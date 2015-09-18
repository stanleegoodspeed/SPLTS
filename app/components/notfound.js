/** @jsx React.DOM */

var React = require('react/addons');

var NotFound = React.createClass({

      render: function () {
        return (
          <div className="container">
            <div id="login-menu-box">
                <div className="row">
                  <div className="col-lg-4 col-lg-offset-4">
                    <h2>Oops! 404!</h2>
                  </div>
                </div>
            </div>
        </div>
        )
      }
  });

/* Module.exports instead of normal dom mounting */
module.exports = NotFound;