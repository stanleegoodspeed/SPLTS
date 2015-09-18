/** @jsx React.DOM */

var React = require('react/addons');

var CoachSnap = React.createClass({
      
      render: function () {
        return (
          <div>
           <ul className="list-group">
                    <li className="list-group-item text-muted">Profile</li>
                    <li className="list-group-item text-right"><span className="pull-left"><strong>Type</strong></span>Coach</li>
                    <li className="list-group-item text-right"><span className="pull-left"><strong>Profile Created</strong></span>{this.props.coachData.createdDate}</li>
                    <li className="list-group-item text-right"><span className="pull-left"><strong>School</strong></span>{this.props.coachData.schoolName}</li>
            </ul> 
        </div>
        )
      }
  });

/* Module.exports instead of normal dom mounting */
module.exports = CoachSnap;