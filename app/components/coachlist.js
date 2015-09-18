/** @jsx React.DOM */

var React = require('react/addons');

var CoachList = React.createClass({

      render: function() {

        return (        
            <div>
              <ul id="coachList" className="list-group">
                <li className="list-group-item text-muted">Coaches</li>
                 {this.props.data.map(function(coach, i) {
                      return (<li className="list-group-item text-right" key={i}>
                                <span className="pull-left">{coach.fullName}</span>
                              </li>);
                    },this)}
              </ul>
            </div>              
          )
      }
  });

/* Module.exports instead of normal dom mounting */
module.exports = CoachList;

