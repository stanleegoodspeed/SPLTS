/** @jsx React.DOM */

var React = require('react/addons');
// var SearchBar = React.createFactory(require('./searchbar'));
// var SearchResults = React.createFactory(require('./searchresults'));
var SearchBar = require('./searchbar');
var SearchResults = require('./searchresults');
var initData = [];

var SearchBox = React.createClass({

      getInitialState: function () {
        return {
          filteredData: [],
        };
      },

      handleSearch: function(queryText) {
        console.log(queryText);
        
        var queryResult=[];

        initData.forEach(function(athlete) {

            if(athlete.lastName.toLowerCase().localeCompare(queryText)!=-1)
              queryResult.push(athlete);
        });
 
        this.setState({
            filteredData: queryResult
        });
      },

      loadDataFromServer: function() {

        $.ajax({
          url:"/getAthletes/" + this.props.coachID,
          type:"GET",
          success:function(data){   

            console.log('success!');         

            this.setState({filteredData: data});
            initData = data.slice();

          }.bind(this),
          error: function() {
            console.log('error!');
          },     
          dataType:"json"
        });

      },

      componentDidMount: function() {
        //this.loadDataFromServer();
      },

      render: function () {
        return (
          <div id="search-box">
              <SearchBar handleSearch={this.handleSearch} />
              <SearchResults data={this.props.athletes} />
          </div>
        )
      }
  });

/* Module.exports instead of normal dom mounting */
module.exports = SearchBox;

