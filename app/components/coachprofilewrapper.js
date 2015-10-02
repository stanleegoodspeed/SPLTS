/** @jsx React.DOM */

var React = require('react/addons');
var $ = require('jquery');
var Router = require('react-router');
var CoachProfile = require('./coachprofile');

var CoachProfileWrapper = React.createClass({

      mixins: [Router.State],

      getInitialState: function() {
        return {
          firstName: '',
          lastName: ''
        }
      },

      handleEdit: function(data) {
        this.setState({firstName: data.firstName});
        this.setState({lastName: data.lastName});
      },

      render: function () {
        return (
        <div>
          <CoachProfile handleEdit={this.handleEdit} firstName={this.state.firstName} lastName={this.state.lastName} />
        </div>
        )
      }
  });

/* Module.exports instead of normal dom mounting */
module.exports = CoachProfileWrapper;