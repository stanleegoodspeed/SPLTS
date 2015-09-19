/** @jsx React.DOM */

var React = require('react/addons');
var Dropdown = require('./dropdown');
var AddSchool = require('./addschool');
var $ = require('jquery');


var Signup = React.createClass({

      getInitialState: function() {
        return {
          schoolsData:[{id:'Please select',description:'Please select'}],
          statesData: [],
          stateName: 'Select state',
          schoolName: 'Select school',
          schoolID: 0,
          stateID: 0
        };
      },

      handleStateSelect: function(val) {
        this.setState({stateName:val.selectedDomain.children});
        this.setState({stateID: val.selectedDomain.domainCode});

        $.ajax({
            url:"/getSchools/" + val.selectedDomain.domainCode,
            type:"GET",
            success:function(data){   
              this.setState({schoolsData: data});
              $("#schoolSelectDiv").removeClass('hidden');
            }.bind(this),
            error: function() {
              console.log('error!');
            },     
            dataType:"json"
        });

      },


      handleSchoolSelect: function(val) {
        this.setState({schoolName:val.selectedDomain.children});
        this.setState({schoolID:val.selectedDomain.domainCode});
      },

      handleAddSchoolClick: function() {
        $("#schoolSelectDiv").addClass('hidden');
        $("#addSchoolDiv").removeClass('hidden');
      },

      handleAddSchoolSubmit: function() {
        
         $.ajax({
            url:"/getSchools/" + this.state.stateID,
            type:"GET",
            success:function(data){   
              if (this.isMounted()) {
                this.setState({schoolsData: data});
                $("#schoolSelectDiv").removeClass('hidden');
                $("#addSchoolDiv").addClass('hidden');
              }
            }.bind(this),
            error: function() {
              console.log('error!');
            },     
            dataType:"json"
        });

        
      },

      loadDataFromServer: function() {

        $.ajax({
            url:"/getStates",
            type:"GET",
            success:function(data){   
              if (this.isMounted()) {
                this.setState({
                  statesData: data
                });
              }
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
            <div id="login-menu-box" className="top-signup-buffer">
                <div className="row">
                  <div className="col-lg-4 col-lg-offset-4">
                    <h2>Sign up</h2>
                  </div>
                </div>
                <form id="signup-form" action="/signup" method="post">
                      <div className="row">
                        <div className="col-lg-4 col-lg-offset-4">
                          <label forHtml="firstName">First name</label>
                          <input type="text" className="form-control" id="firstName" name="firstName" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-4 col-lg-offset-4">
                          <label forHtml="lastName">Last name</label>
                          <input type="text" className="form-control" id="lastName" name="lastName" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-4 col-lg-offset-4">
                          <label forHtml="stateSelect">State</label><br/>
                          <Dropdown myData={this.state.statesData} handleSelect={this.handleStateSelect} menuTitle={this.state.stateName} />
                        </div>
                      </div>
                      <div id="schoolSelectDiv" className="row hidden">
                        <div className="col-lg-8 col-lg-offset-4">
                              <label forHtml="schoolSelect">School</label><br/>
                              <Dropdown myData={this.state.schoolsData} handleSelect={this.handleSchoolSelect} menuTitle={this.state.schoolName} /> 
                              <button id="addschoolbtn" type="button" className="btn btn-outline-inverse" onClick={this.handleAddSchoolClick}>Not Listed? Click here to add your school.</button>
                              <input type="hidden" className="form-control" id="schoolID" name="schoolID" value={this.state.schoolID} />
                        </div>
                      </div>
                      <div id="addSchoolDiv" className="row hidden">
                        <div className="col-lg-8 col-lg-offset-4">
                            <AddSchool handleSubmit={this.handleAddSchoolSubmit} stateID={this.state.stateID} />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-4 col-lg-offset-4">
                          <label forHtml="email">Email</label>
                          <input type="email" className="form-control" id="email" name="email" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-4 col-lg-offset-4">
                          <label forHtml="password">Password</label>
                          <input type="password" className="form-control" id="password" name="password" />
                        </div>
                      </div>
                       <div className="row">
                        <div className="col-lg-4 col-lg-offset-4 bottom-buffer">
                          <label forHtml="referemail">Referral Email</label>
                          <label> *To ensure authenticity, you must enter the email address of a user already registered for this site. </label>
                          <input type="email" className="form-control" id="referemail" name="referemail" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-4 col-lg-offset-4">
                            <button type="submit" className="btn btn-outline-inverse btn-lg">Sign up</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        )
      }
  });

/* Module.exports instead of normal dom mounting */
module.exports = Signup;




