/** @jsx React.DOM */

var React = require('react/addons');
var $ = require('jquery');
var CreateAthlete = require('./createathlete');
var CoachSnap = require('./coachsnap');
var CoachList = require('./coachlist');
var EditAthlete = require('./editathlete');
var Router = require('react-router');
var Griddle = require('griddle-react');
var initData = [];
var pyformat = require('pyformat');
var pubsub = require('pubsub-js');

var LinkComponent = React.createClass({
  render: function() {
    url ="/athleteprofile/" + this.props.rowData.runnerID;
    return <a href={url}>{this.props.data}</a>
  }
});

var EditLinkComponent = React.createClass({

  handleClick: function() {
    $("#createAthleteDiv").addClass("hidden");
    $("#editAthleteDiv").removeClass("hidden");
    pubsub.publish('products', this.props.rowData);
    //return <button className="btn btn-transparent" onClick={this.handleClick}><i className="glyphicon glyphicon-pencil"></i></button>
  },

  render: function() {
    return <a onClick={this.handleClick}>Edit</a>
  }
});

var TimeConvComp = React.createClass({

  render: function() {
    if(this.props.rowData.finishTime) 
    {
      var elapsed = parseFloat(this.props.rowData.finishTime);
      var mins = parseInt(elapsed / 60.0);
      elapsed -= mins * 60;
      var secs = parseInt(elapsed);
      elapsed -= secs;
      var fraction = parseInt(elapsed * 10.0);

      var a = pyformat('{0}:{1}.{2}', [mins, secs, fraction]);

      return(
        <div> {a} </div>
      )
    }else{
      return(
        <div> 0:00.0 </div>
      )
    }
}

});

var TimeConvCompSplit = React.createClass({

  render: function() {
    if(this.props.rowData.splitTime) 
    {
      var elapsed = parseFloat(this.props.rowData.splitTime);
      var mins = parseInt(elapsed / 60.0);
      elapsed -= mins * 60;
      var secs = parseInt(elapsed);
      elapsed -= secs;
      var fraction = parseInt(elapsed * 10.0);

      var a = pyformat('{0}:{1}.{2}', [mins, secs, fraction]);

      return(
        <div> {a} </div>
      )
      } else {
        return(
          <div> 0:00.0 </div>
        )
      }
  }

});

var splitsColsMetadata = [
{
  "columnName":"splitID",
  "order": 1,
  "visibile":false
},
{
  "columnName":"splitIndex",
  "displayName":"Split No.",
  "order": 2
},
{
  "columnName":"splitTime",
  "displayName":"Time",
  "order": 3,
  "customComponent": TimeConvCompSplit
},
{
  "columnName":"fk_runInRaceID",
  "order": 4,
  "visibile":false
}
];

var myColumnMetadata = [
{
  "columnName":"runnerID",
  "order": 1,
  "visibile":false
},
{
  "columnName":"fullName",
  "displayName":"Name",
  "order": 2,
  "visibile": true,
  "customComponent": LinkComponent
},
{
  "columnName":"schoolName",
  "displayName":"School",
  "order": 3
},
{
  "columnName":"editLink",
  "displayName":"",
  "order": 4,
  "customComponent": EditLinkComponent
}
];

var athletesColumnMetadata = [
{
  "columnName":"runnerID",
  "order": 1,
  "visibile":false
},
{
  "columnName":"runInRaceID",
  "order": 2,
  "visibile":false
},
{
  "columnName":"fullName",
  "displayName":"Name",
  "order": 3,
  "visibile": true,
  "customComponent": LinkComponent
},
{
  "columnName":"finishTime",
  "displayName":"Finish Time",
  "order": 4,
  "customComponent": TimeConvComp
}
];

var workoutsColumnMetadata = [
{
  "columnName":"raceID",
  "order": 1,
  "visibile":false
},
{
  "columnName":"raceName",
  "displayName":"Workout Name",
  "order": 2,
  "visibile": true,
},
{
  "columnName":"raceDate",
  "displayName":"Date",
  "order": 3
},
{
  "columnName":"raceType",
  "displayName":"Type",
  "order": 4
},
{
  "columnName":"eventName",
  "displayName":"Event",
  "order": 5
}
];


var CoachProfile = React.createClass({

      mixins: [Router.State, React.addons.LinkedStateMixin],

      getInitialState: function () {
        return {
          filteredData: [],
          coachData: [{fullName: 'Johnny Doe', createdDate: '01-01-1999', schoolName: 'John Doe High'}],
          schoolCode: 0,
          workouts:[],
          athletes: [],
          splits:[],
          coaches:[],
          editFirst: '',
          editLast: '',
          editID: 0
        };
      },

      handleSelect: function(row) {

        //$($("#myRacesTable tbody tr")[i]).toggleClass("info");;

        var id = row.props.data.raceID;
        this.setState({splits:[]}); // reset splits table

        $.ajax({
              url:"/getAthletesInRace/" + id,
              type:"GET",
              success:function(data){   
                this.setState({athletes: data});
              }.bind(this),
              error: function() {
                console.log('error!');
              },     
              dataType:"json"
        });

      },

      handleAthleteSelect: function(row) {

        var id = row.props.data.runInRaceID;

          $.ajax({
            url:"/getSplits/" + id ,
            type:"GET",
            success:function(data){   
              console.log('success!');         
              this.setState({splits: data});  
            }.bind(this),
            error: function() {
              console.log('error!');
            },     
            dataType:"json"
          });
      },

      handleSubmit: function() {

              // Reload athletes 
              var id = this.getParams().id;

              $.ajax({
                  url:"/getAthletes/" + id,
                  type:"GET",
                  success:function(data){   
                    this.setState({filteredData: data});
                  }.bind(this),
                  error: function() {
                    console.log('error!');
                  },     
                  dataType:"json"
              });        

      },

      handleEditSubmit: function(e) {

          e.preventDefault();

          if (!this.state.editFirst || !this.state.editLast) {
            $('#form-response').html('<p className="danger">Error! Missing values.</p>').delay(2000).fadeOut(); 
          }

          var formData = {
            firstName: this.state.editFirst,
            lastName: this.state.editLast,
            runnerID: this.state.editID
          };

          $.ajax({
            url:"/editAthlete",
            type:"POST",
            data:formData,
            success:function(data){   
              console.log('success!');  
              $('#form-response').html('<p className="info">Success!</p>').delay(2000).fadeOut();  
              this.handleSubmit();   
            }.bind(this),
            error: function() {
              console.log('error!');
              $('#form-response').html('<p className="danger">Error!</p').delay(2000).fadeOut(); 
            },     
            dataType:"json"
          });
      },

      handleDelete: function() {

        var formData = {
            runnerID: this.state.editID
        };

        $.ajax({
            url:"/deleteAthlete",
            type:"POST",
            data:formData,
            success:function(data){   
              console.log('success!');  
              $('#form-response').html('<p className="info">Success!</p>').delay(2000).fadeOut(); 
              this.handleSubmit();      
            }.bind(this),
            error: function() {
              $('#form-response').html('<p className="danger">Error!</p').delay(2000).fadeOut(); 
              console.log('error!');
            },     
            dataType:"json"
        });
      },

      loadDataFromServer: function() {

        var id = this.getParams().id;

         $.ajax({
              url:"/getWorkoutsCoach/" + id,
              type:"GET",
              success:function(data){   
                this.setState({workouts: data});
              }.bind(this),
              error: function() {
                console.log('error!');
              },     
              dataType:"json"
        });


        // Get all athletes associated with coach's school
        $.ajax({
              url:"/getAthletes/" + id,
              type:"GET",
              success:function(data){   
                this.setState({filteredData: data});
                initData = data.slice();
              }.bind(this),
              error: function() {
                console.log('error!');
              },     
              dataType:"json"
        }); 

        $.ajax({
            url:"/getCoachData/" + id,
            type:"GET",
            success:function(data){   
              this.setState({
                coachData: data[0],
                schoolCode: data[0].fk_schoolID
              })             

              // Get list of all coaches for school
              $.ajax({
                  url:"/getCoaches/" + data[0].fk_schoolID,
                  type:"GET",
                  success:function(data){   
                    this.setState({coaches: data});
                  }.bind(this),
                  error: function() {
                    console.log('error!');
                  },     
                  dataType:"json"
              });

            }.bind(this),
            error: function() {
              console.log('error!');
            },     
            dataType:"json"
        });

      },

      componentDidMount: function() {    
        // load
        this.loadDataFromServer();

        // subscribe to global event
        var token = pubsub.subscribe('products', function(topic, product) {
          this.setState({ editFirst: product.firstName });
          this.setState({ editLast: product.lastName });
          this.setState({ editID: product.runnerID });
        }.bind(this));

      },

      render: function () {
        return (
        <div className="container">
            <div className="row profile-header">
              <div className="col-sm-10"><h1>{this.state.coachData.fullName}</h1></div>
            </div>
            <div className="row">
              <div className="col-sm-3">

                 <CoachSnap coachData={this.state.coachData} />
                 <CoachList data={this.state.coaches} />
                 
              </div>

              <div className="col-sm-9">
                  
                  <ul className="nav nav-tabs" id="myTab">
                    <li className="active"><a href="#athletes" data-toggle="tab">Athletes</a></li>
                    <li><a href="#workouts" data-toggle="tab">Workouts</a></li>
                  </ul>
                      
                  <div className="tab-content">
                      <div className="tab-pane active" id="athletes">

                        <div className="col-sm-8 no-left-padding">
                            <Griddle results={this.state.filteredData} columnMetadata={myColumnMetadata} columns={["fullName", "schoolName", "editLink"]} resultsPerPage={10} showFilter={true} showPager={true} />
                        </div>
                        <div id="createAthleteDiv" className="col-sm-4">
                            <CreateAthlete schoolCode={this.state.schoolCode} schoolName={this.state.coachData.schoolName} handleSubmit={this.handleSubmit} />
                        </div>
                        <div id="editAthleteDiv" className="col-sm-4 hidden">


                            <div id="createAthletePanel" className="panel panel-default">
                              <div className="panel-heading"><h5 className="panel-title">Edit Athlete</h5></div>
                              <div className="panel-body">
                              
                              <form onSubmit={this.handleEditSubmit}>
                                <div className="form-group">
                                <div className="row">
                                    <label forHtml="firstNameInput">First name</label>
                                    <input type="text" className="form-control" valueLink={this.linkState('editFirst')} />
                                  </div>
                                </div>
                                <div className="form-group">
                                <div className="row">
                                    <label forHtml="lastNameInput">Last name</label>
                                    <input type="text" className="form-control" valueLink={this.linkState('editLast')} />
                                  </div>
                                </div>
                                <div id="final-form-group" className="form-group">
                                <div className="row">
                                    <label forHtml="schoolNameInput">School</label>
                                    <input type="text" className="form-control" id="schoolNameInput" value={this.state.coachData.schoolName} disabled />
                                  </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-sm-12 no-left-padding">
                                      <button type="submit" className="btn btn-outline-inverse-ca">Save</button>
                                      <button type="button" className="btn btn-danger pull-right" onClick={this.handleDelete}><i className="glyphicon glyphicon-trash"></i></button>
                                    </div>
                                </div>  
                                <div className="row">
                                  <div id="form-response" className="col-sm-12 no-left-padding"></div>
                                </div>    
                              </form>
                              </div>
                          </div>


                        </div>
                      </div>

                      <div className="tab-pane" id="workouts">

                          <div>
                            <Griddle results={this.state.workouts} onRowClick={this.handleSelect} columnMetadata={workoutsColumnMetadata} columns={["raceName", "raceDate", "eventName", "raceType"]} resultsPerPage={10} showFilter={true} showPager={true} noDataMessage={"There are no workouts to display."} />
                          </div>
                          
                          <div id="coach-profile-athletes-table">
                            <div className="col-sm-9 no-left-padding">
                              <Griddle results={this.state.athletes} onRowClick={this.handleAthleteSelect} columnMetadata={athletesColumnMetadata} columns={["fullName", "finishTime"]} resultsPerPage={10} showFilter={false} showPager={true} noDataMessage={"Please select a workout to view participants."} />
                            </div>
                            <div className="col-sm-3">
                              <Griddle results={this.state.splits} columnMetadata={splitsColsMetadata} columns={["splitIndex", "splitTime"]} resultsPerPage={10} showPager={false} noDataMessage={""} />
                            </div>
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
module.exports = CoachProfile;