/** @jsx React.DOM */

var React = require('react/addons');

var SplitsList = React.createClass({

      render: function () {
        return (
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Time</th>
                            </tr>
                          </thead>
                          <tbody id="items">
                            {this.props.splits.map(function(split, j) {
                                return (<tr>
                                          <td>
                                          {split.splitIndex}
                                          </td>
                                          <td>
                                          {split.splitTime}
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
module.exports = SplitsList;