/** @jsx React.DOM */

var React = require('react/addons');

var AthleteSnap = React.createClass({
      
      render: function () {
        return (
          <div>
           <ul className="list-group">
                    <li className="list-group-item text-muted">Profile</li>
                    <li className="list-group-item text-right"><span className="pull-left"><strong>Type</strong></span>Athlete</li>
                    <li className="list-group-item text-right"><span className="pull-left"><strong>Profile Created</strong></span>{this.props.athleteData.createdDate}</li>
                    <li className="list-group-item text-right"><span className="pull-left"><strong>School</strong></span>{this.props.athleteData.schoolName}</li>
            </ul> 
        </div>
        )
      }
  });

/* Module.exports instead of normal dom mounting */
module.exports = AthleteSnap;