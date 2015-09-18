/** @jsx React.DOM */

var React = require('react/addons');
var SearchBar = React.createFactory(require('./searchbar'));

var SearchResults = React.createClass({

      handleSelect: function(i) {
        var selected = this.props.data[i];
        window.location.href = "/athleteprofile/" + selected.runnerID;
      },

      render: function() {

        //making the rows to display
        // var rows=[];
        // this.props.data.forEach(function(athlete) {
        //   rows.push(<tr><td> {athlete.firstName} </td><td> {athlete.schoolName}</td></tr>);
        // });

        return (
            
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                  <th>Name</th>
                  <th>School</th>
                </tr>
                </thead>
                <tbody>
                 {this.props.data.map(function(athlete, i) {
                      return (<tr onClick={this.handleSelect.bind(this, i)} key={i}>
                                <td>
                                {athlete.firstName}{' '}{athlete.lastName}
                                </td>
                                <td>
                                {athlete.schoolName}
                                </td>
                              </tr>);
                    },this)}
                </tbody>
              </table>
            </div>              
          )
      }
  });

/* Module.exports instead of normal dom mounting */
module.exports = SearchResults;

