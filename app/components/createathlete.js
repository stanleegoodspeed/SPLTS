/** @jsx React.DOM */

var React = require('react/addons');
var $ = require('jquery');

var CreateAthlete = React.createClass({

      handleSubmit: function(e) {

          e.preventDefault();
          var firstname = React.findDOMNode(this.refs.firstname).value.trim();
          var lastname = React.findDOMNode(this.refs.lastname).value.trim();
          var schoolcode = React.findDOMNode(this.refs.schoolcode).value.trim();

          if (firstname.length == 0 || lastname.length == 0) {
            $('#form-response').html('<p class="text-danger">Missing fields!</p>').fadeIn(2000).delay(2000).fadeOut();
          }
          else
          {
            var formData = {
              firstName: firstname,
              lastName: lastname,
              fk_schoolID: schoolcode
            };

            $.ajax({
              url:"/createAthlete",
              type:"POST",
              data:formData,
              success:function(data){   
                console.log('success!');  
                $('#form-response').html('<p class="text-primary">Success!</p>').fadeIn(2000).delay(2000).fadeOut();      
                this.props.handleSubmit();
              }.bind(this),
              error: function() {
                $('#form-response').html('<p class="text-danger">Error!</p').fadeIn(2000).delay(2000).fadeOut(); 
                console.log('error!');
              },     
              dataType:"json"
            });
        }
      },

      render: function () {
        return (
                <div id="createAthletePanel" className="panel panel-default">
                  <div className="panel-heading"><h5 className="panel-title">Create New Athlete</h5></div>
                  <div className="panel-body">
                  
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                    <div className="row">
                        <label forHtml="firstNameInput">First name</label>
                        <input type="text" className="form-control" id="firstNameInput" name="firstNameInput" placeholder="First name" ref="firstname" />
                      </div>
                    </div>
                    <div className="form-group">
                    <div className="row">
                        <label forHtml="lastNameInput">Last name</label>
                        <input type="text" className="form-control" id="lastNameInput" name="lastNameInput" placeholder="Last name" ref="lastname" />
                      </div>
                    </div>
                    <div id="final-form-group" className="form-group">
                    <div className="row">
                        <label forHtml="schoolNameInput">School</label>
                        <input type="text" className="form-control" id="schoolNameInput" value={this.props.schoolName} readOnly />
                        <input type="hidden" id="schoolCode" name="schoolCode" value={this.props.schoolCode} ref="schoolcode" readOnly />
                      </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-sm-4 no-left-padding">
                        <button type="submit" className="btn btn-outline-inverse-ca">Save</button>
                        </div>
                        <div id="form-response" className="col-sm-8"></div>
                    </div>      
                  </form>
                  </div>
              </div>
        )
      }
  });

/* Module.exports instead of normal dom mounting */
module.exports = CreateAthlete;