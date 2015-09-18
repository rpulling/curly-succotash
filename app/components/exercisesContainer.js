var React = require('react');
var PropTypes = React.PropTypes;
var Navigation = require('react-router').Navigation;
var Firebase = require('firebase');
var fireHelper = require('../utils/fireHelper.js');
var Exercises = require('./exercises.js');
var ExerciseEditModal = require('./exerciseEditModal.js');
var ExerciseAddModal = require('./exerciseAddModal.js');

var ExercisesContainer = React.createClass({

  mixins: [Navigation],

  getInitialState: function() {
    var userRef = fireHelper.getUserBase() || '',
        exercisesRef = userRef + '/exercises/',
        editingExerciseRef = '';
    return {
      'exercisesRef': exercisesRef,
      'editingExerciseRef': editingExerciseRef,
      'addingExercise': false,
    };
  },

  statics:{
    willTransitionTo: function (transition, params, query) {
        if(!fireHelper.loggedIn()){
          transition.redirect('login');
        }
      }
  },

  openAddExerciseModal:function(){
      this.setState({
        'addingExercise': true
      })
  },

  setEditExerciseRef:function(exerciseRef){
    this.setState({
      'editingExerciseRef': exerciseRef
    });
  },

  onEditHide:function(){
    this.setState({
      'editingExerciseRef': '',
    });
  },

  onAddExercisesHandled:function(){
    this.setState({
      'addingExercise': false
    })
  },

  render: function() {

    return (
      <div className="container">
        <h1>Muscle Loggs</h1>
        <ExerciseAddModal exercisesRef={this.state.exercisesRef}
                          addingExercise={this.state.addingExercise}
                          onHide={this.onAddExercisesHandled}/>
        <ExerciseEditModal exerciseRef={this.state.editingExerciseRef}
                           onEditHide={this.onEditHide} />
        <Exercises exercisesRef={this.state.exercisesRef}
                   handleExerciseClick={this.setEditExerciseRef}>

                   <div className="ui centered card"
                        onClick={this.openAddExerciseModal}>
                       <div className="content">
                         <div className="header">
                         <div className="meta">
                           <i className="add circle large icon"></i>
                         </div>
                       </div>
                     </div>
                   </div>

        </Exercises>
      </div>
    );
  }

});

module.exports = ExercisesContainer;
