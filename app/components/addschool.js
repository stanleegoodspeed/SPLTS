/** @jsx React.DOM */

var React = require('react/addons');

var AddSchool = React.createClass({

      handleSubmit: function(e) {

        e.preventDefault();
        var schoolname = React.findDOMNode(this.refs.addSchoolInput).value.trim();

        if (!schoolname) {
            return;
        }

        var formData = {
            description: schoolname,
            fk_stateID: this.props.stateID
        };

        $.ajax({
            url:"/addschool",
            type:"POST",
            data:formData,
            success:function(data){   
              console.log('success!');  
              this.props.handleSubmit();
            }.bind(this),
            error: function() {
              console.log('error!');
            },     
            dataType:"json"
          });
      },

      render: function () {
        return (
          <div>
              <label forHtml="addSchoolInput">Add School</label><br/>
              <input type="text" className="form-control" id="addSchoolInput" name="addSchoolInput" placeholder="John Smith High School" ref="addSchoolInput" />
              <button id="saveschoolbtn" type="button" className="btn btn-outline-inverse" onClick={this.handleSubmit}>Save</button>
          </div>
        )
      }
  });

/* Module.exports instead of normal dom mounting */
module.exports = AddSchool;