/** @jsx React.DOM */

var React = require('react/addons');
var $ = require('jquery');
var Router = require('react-router');
var Griddle = require('griddle-react');

var LinkComponent = React.createClass({
  render: function() {
    var url ="/coachprofile/" + this.props.rowData.userID;
    return <a href={url}>{this.props.rowData.fullName}</a>
  }
});

var myColumnMetadata = [
{
  "columnName":"userID",
  "order": 1,
  "visibile":false
},
{
  "columnName":"fullName",
  "displayName":"Name",
  "order": 2,
  "visibile": true,
  "customComponent": LinkComponent
}
];


var Admin = React.createClass({

      mixins: [Router.State],

      getInitialState: function () {
        return {
          users: []
        };
      },

      loadDataFromServer: function() {

         $.ajax({
              url:"/getUsers",
              type:"GET",
              success:function(data){   
                this.setState({users: data});
              }.bind(this),
              error: function() {
                console.log('error!');
              },     
              dataType:"json"
        });
      },

      componentDidMount: function() {    
        this.loadDataFromServer();
      },

      render: function () {
        return (
        <div className="container">
            <div className="row profile-header">
              <div className="col-sm-10"><h1>Admin</h1></div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                  
                  <ul className="nav nav-tabs" id="myTab">
                    <li className="active"><a href="#myusers" data-toggle="tab">Users</a></li>
                  </ul>
                      
                  <div className="tab-content">
                      <div className="tab-pane active" id="myusers">

                        <div className="col-sm-12 no-left-padding">
                            <Griddle results={this.state.users} columnMetadata={myColumnMetadata} columns={["fullName"]} resultsPerPage={50} showFilter={true} showPager={true} />
                        </div>

                      </div>     

                  </div>
                </div>
              </div>
        </div>
        )
      }
  });

/* Module.exports instead of normal dom mounting */
module.exports = Admin;