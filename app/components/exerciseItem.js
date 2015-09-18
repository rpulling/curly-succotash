var React = require('react');
var Firebase = require('firebase');
var FireBaseMixin = require('reactfire');
var PropTypes = React.PropTypes;

var exerciseItem = React.createClass({
  propTypes: {
    exerciseRef: PropTypes.string.isRequired,
    handleClick: PropTypes.func
  },

  mixins:[FireBaseMixin],

  getInitialState: function() {
    return {
      'exercise': {}
    };
  },

  componentWillMount: function() {
    if(this.props.exerciseRef){
      var ref = new Firebase(this.props.exerciseRef);
      this.bindAsObject(ref, 'exercise');
    }
  },

  render: function() {

    var handleClick = this.props.handleClick.bind(this.props.exerciseRef);
    return (
      <div className="ui centered card"
           onClick={handleClick}>
          <div className="content">
            <div className="header">Weight: {this.state.exercise.weight}</div>
            <div className="meta">
              <a>Reps: {this.state.exercise.reps}</a>
            </div>
          </div>
          <div className="extra content">
            <span className="right floated">
              {this.state.exercise.name}
            </span>
          </div>
      </div>
    );
  }

});

module.exports = exerciseItem;
