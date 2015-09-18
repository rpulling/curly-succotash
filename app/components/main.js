var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var PropTypes = React.PropTypes;

var main = React.createClass({

  render: function() {
    return (
      <div className="container">
        <RouteHandler {...this.props} />
      </div>
    );
  }

});

module.exports = main;
