/** @jsx React.DOM */

var React = require('react/addons');

var RecentTimes = React.createClass({

      render: function () {
        return (
          <div>
            <ul className="list-group">
                    <li className="list-group-item text-muted">Recent Times<i className="fa fa-dashboard fa-1x"></i></li>
                    <li className="list-group-item text-right"><span className="pull-left"><strong>Cherokee Challenge</strong></span>16:42</li>
                    <li className="list-group-item text-right"><span className="pull-left"><strong>South Jersey Shootout</strong></span>17:12</li>
                    <li className="list-group-item text-right"><span className="pull-left"><strong>Dual Meet 9.15.2015</strong></span>16:48</li>
                    <li className="list-group-item text-right"><span className="pull-left"><strong>Shore Coaches</strong></span>16:12</li>
            </ul> 
        </div>
        )
      }
  });

/* Module.exports instead of normal dom mounting */
module.exports = RecentTimes;