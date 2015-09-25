/** @jsx React.DOM */

var React = require('react/addons');

var NotFound = React.createClass({

      render: function () {
        return (
          <div className="container">
            <div id="notfound-box">
                <div className="row">
                    <h2>Oops! 404!</h2> 
                </div>
            </div>
        </div>
        )
      }
  });

/* Module.exports instead of normal dom mounting */
module.exports = NotFound;