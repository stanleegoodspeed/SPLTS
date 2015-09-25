/** @jsx React.DOM */

var React = require('react/addons');
var $ = require('jquery');

var EditAthlete = React.createClass({

      handleSubmit: function(e) {

          e.preventDefault();
          var firstname = React.findDOMNode(this.refs.firstname).value.trim();
          var lastname = React.findDOMNode(this.refs.lastname).value.trim();

          if (!firstname || !lastname) {
            return;
          }

          var formData = {
            firstName: firstname,
            lastName: lastname
          };

          $.ajax({
            url:"/editAthlete",
            type:"POST",
            data:formData,
            success:function(data){   
              console.log('success!');  
              $('#form-response').html('<p className="info">Success!</p>').delay(2000).fadeOut();      
              this.props.handleSubmit();
            }.bind(this),
            error: function() {
              $('#form-response').html('<p className="danger">Error!</p').delay(2000).fadeOut(); 
              console.log('error!');
            },     
            dataType:"json"
          });
      },

      handleDelete: function() {
        console.log('delete athlete'); // how to delete linked user? maybe just the linking schoolID?
      },

      render: function () {
        return (
                <div id="createAthletePanel" className="panel panel-default">
                  <div className="panel-heading"><h5 className="panel-title">Edit Athlete</h5></div>
                  <div className="panel-body">
                  
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                    <div className="row">
                        <label forHtml="firstNameInput">First name</label>
                        <input type="text" className="form-control" id="firstNameInput" name="firstNameInput" ref="firstname" value={this.props.firstName} />
                      </div>
                    </div>
                    <div className="form-group">
                    <div className="row">
                        <label forHtml="lastNameInput">Last name</label>
                        <input type="text" className="form-control" id="lastNameInput" name="lastNameInput" ref="lastname" value={this.props.lastName} />
                      </div>
                    </div>
                    <div id="final-form-group" className="form-group">
                    <div className="row">
                        <label forHtml="schoolNameInput">School</label>
                        <input type="text" className="form-control" id="schoolNameInput" value="Haddon Heights High School" disabled />
                        <input type="hidden" id="schoolCode" name="schoolCode" value={this.props.schoolCode} ref="schoolcode" />
                      </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-sm-12 no-left-padding">
                          <button type="submit" className="btn btn-outline-inverse-ca">Save</button>
                          <button type="button" className="btn btn-danger pull-right" onClick={this.handleDelete}><i className="glyphicon glyphicon-trash"></i></button>
                        </div>
                        
                    </div>      
                  </form>
                  </div>
              </div>
        )
      }
  });

//<div id="form-response" className="col-sm-4"></div>
/* Module.exports instead of normal dom mounting */
module.exports = EditAthlete;