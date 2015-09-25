/** @jsx React.DOM */

var React = require('react/addons');
var $ = require('jquery');
var AthleteSnap = require('./athletesnap');
var Griddle = require('griddle-react');
var Router = require('react-router');
var pyformat = require('pyformat');

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
  "columnName":"runInRaceID",
  "order": 1,
  "visibile":false
},
{
  "columnName":"raceDate",
  "displayName":"Date",
  "order": 3
},
{
  "columnName":"raceName",
  "displayName":"Workout Name",
  "order": 2
},
{
  "columnName":"eventName",
  "displayName":"Event",
  "order": 4
},
{
  "columnName":"finishTime",
  "displayName":"Finish Time",
  "order": 5,
  "customComponent": TimeConvComp
}
];

var AthleteProfile = React.createClass({

      mixins: [Router.State],

      getInitialState: function () {
        return {
            workouts: [],
            splits: [],
            athleteData: [{fullName: 'Johnny Doe', createdDate: '01-01-1999', schoolName: 'John Doe High'}],
            schoolCode: 0
        };
      },

      handleSelect: function(row) {

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

      loadDataFromServer: function() {
        var id = this.getParams().id;
         
        $.ajax({
          url:"/getWorkouts/" + id,
          type:"GET",
          success:function(data){   
            this.setState({workouts: data});  
          }.bind(this),
          error: function() {
            console.log('error!');
          },     
          dataType:"json"
        });

        $.ajax({
          url:"/getAthleteData/" + id,
          type:"GET",
          success:function(data){   
           this.setState({
                athleteData: data[0],
                schoolCode: data[0].fk_schoolID
              })
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
              <div className="col-sm-10"><h1>{this.state.athleteData.fullName}</h1></div>
            </div>
            <div className="row">
              <div className="col-sm-3">
                      
                 <AthleteSnap athleteData={this.state.athleteData} />

              </div>
              <div className="col-sm-9">
                  
                  <ul className="nav nav-tabs" id="myTab">
                    <li className="active"><a href="#workouts" data-toggle="tab">Workouts</a></li>
                  </ul>
                      
                  <div className="tab-content">
                      <div className="tab-pane active" id="workouts">

                        <div className="col-sm-9 no-left-padding">
                          <Griddle onRowClick={this.handleSelect} results={this.state.workouts} columnMetadata={myColumnMetadata} columns={["raceDate", "raceName", "eventName", "finishTime"]} resultsPerPage={10} showFilter={true} showPager={true} noDataMessage={"There are no workouts to display."} />
                        </div>
                        <div className="col-sm-3 split-table-top-padding">
                          <Griddle results={this.state.splits} columnMetadata={splitsColsMetadata} columns={["splitIndex", "splitTime"]} resultsPerPage={10} showPager={false} noDataMessage={""} />                           
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
module.exports = AthleteProfile;

