/** @jsx React.DOM */

var React = require('react/addons');
var Boot = require('react-bootstrap');

var DropdownWrapper = React.createClass({

  getInitialState:function(){
      return {
        selectValue:'Please select...'
      };
  },
  handleChange:function(e){
    this.props.handleSelect(e.target.value);
  },


  render: function() {

    var myParent = this;

    function selectedDomainVal() {
       myParent.props.handleSelect({selectedDomain:this})
    }

    var MenuItem = Boot.MenuItem;
    var DropdownButton = Boot.DropdownButton;
    var rows = [];

    this.props.myData.map(function(domainVal, i) {
          rows.push(<MenuItem onSelect={selectedDomainVal} domainCode={domainVal.id} eventKey={domainVal.id}>{domainVal.description}</MenuItem>)
    });

    return (
       <DropdownButton id={this.props.menuTitle} ref="DropMenu" bsStyle="default" title={this.props.menuTitle}  >
              {rows}
       </DropdownButton>         
    );
  }
      
});

module.exports = DropdownWrapper;
