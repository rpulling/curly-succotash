var React = require('react');
var PropTypes = React.PropTypes;
var Firebase = require('firebase');
var ReactFireMixin = require('reactfire');
var ExerciseItem = require('./exerciseItem.js');

var Exercises = React.createClass({
  mixins:[ReactFireMixin],

  propTypes: {
    exercisesRef: PropTypes.string.isRequired,
    handleExerciseClick: PropTypes.func
  },

  getInitialState: function(){
    return {
      'exercises': [],
    }
  },

  componentWillMount:function(){
    var exercisesRef = this.props.exercisesRef;
    if(exercisesRef){
      var ref = new Firebase(exercisesRef);
      this.bindAsArray(ref, 'exercises');
    }
  },

  handleExerciseClick:function(exerciseRef){
    this.props.handleExerciseClick(exerciseRef);
  },

  getExercises:function(){

    var exercisesRef = this.props.exercisesRef;
    var exerciseCards =  this.state.exercises.map(function(exercise, index){
                              var exerciseRef = exercisesRef + exercise['.key'];
                              var setEditRef = this.handleExerciseClick
                                                   .bind(this, exerciseRef);

                              return (
                              <ExerciseItem key={exerciseRef}
                                            exerciseRef={exerciseRef}
                                            handleClick={setEditRef} />
                              )
                          }.bind(this));

      return (
        <div className="ui container">
          <div className="ui segment">
            <div className="ui link cards">
              {this.props.children}
              {exerciseCards}
            </div>
          </div>
        </div>
      )
    },


  render: function() {
    return (
      <div>
        {this.getExercises()}
      </div>
    );
  }

});

module.exports = Exercises;
