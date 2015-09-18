/** @jsx React.DOM */

var React = require('react/addons');

var Login = React.createClass({

      render: function () {
        return (
          <div className="container">
            <div id="login-menu-box" className="top-login-buffer">
                <div className="row">
                  <div className="col-lg-4 col-lg-offset-4">
                    <h2>Login</h2>
                  </div>
                </div>
                <form action="/login" method="post">
                  <div className="row">
                    <div className="col-lg-4 col-lg-offset-4">
                            <input type="text" className="form-control" name="email" placeholder="Email" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4 col-lg-offset-4">
                            <input type="password" className="form-control" name="password" placeholder="Password" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4 col-lg-offset-4">
                    <button type="submit" className="btn btn-outline-inverse btn-lg">Login</button>
                    </div>
                    </div>
                </form>
            </div>
        </div>
        )
      }
  });

/* Module.exports instead of normal dom mounting */
module.exports = Login;