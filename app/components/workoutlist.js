/** @jsx React.DOM */

var React = require('react/addons');

var WorkoutList = React.createClass({

      handleSelect: function(i) {

        var runInRaceID = this.props.workouts[i].runInRaceID;
        this.props.onWorkoutSelect(runInRaceID);          
      },

      render: function () {
        return (
          <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Event</th>
                              <th>Date</th>
                              <th>Time</th>
                            </tr>
                          </thead>
                          <tbody id="items">
                            {this.props.workouts.map(function(workout, i) {
                                return (<tr onClick={this.handleSelect.bind(this, i)} key={i}>  
                                          <td>
                                          {workout.raceName}
                                          </td>
                                          <td>
                                          {workout.eventName}
                                          </td>
                                          <td>
                                          {workout.raceDate}
                                          </td>
                                          <td>
                                          {workout.finishTime}
                                          </td>
                                        </tr>);
                              },this)}
                          </tbody>
                        </table>
                        <div className="row">
                          <div className="col-md-4 col-md-offset-4 text-center">
                            <ul className="pagination" id="myPager"></ul>
                          </div>
                        </div>
                      </div>
        )
      }
  });

/* Module.exports instead of normal dom mounting */
module.exports = WorkoutList;