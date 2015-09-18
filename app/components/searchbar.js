/** @jsx React.DOM */

var React = require('react/addons');


var SearchBar = React.createClass({

      getInitialState: function () {
        return {
          searchInput:''
        };
      },

      handleSearch: function (e) {
        this.setState({ searchInput: e.target.value });
        this.props.handleSearch(e.target.value);
      },

      render: function () {
        return (
           <div id="search-bar">
              <div className={'input-group'}>
                <span className={"input-group-addon"}><i className={"glyphicon glyphicon-search"}></i></span>
                <input type="text" className={"form-control"} value={this.state.searchInput} onChange={this.handleSearch} placeholder="Search by last name"/>
              </div>
            </div>
        )
      }
  });

/* Module.exports instead of normal dom mounting */
module.exports = SearchBar;
