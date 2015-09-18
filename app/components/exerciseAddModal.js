var React = require('react');
var Firebase = require('firebase');
var PropTypes = React.PropTypes;

var exerciseAddModal = React.createClass({

  propTypes: {
    exercisesRef: PropTypes.string.isRequired,
    addingExercise: PropTypes.bool,
    onHide: PropTypes.func,
  },

  getInitialState: function() {
    return {
      'exercise': {
        'name': '',
        'weight': '',
        'reps': ''
      },
      'exercisesFireRef': new Firebase(this.props.exercisesRef)
    };
  },

  handleAddExercise:function(){
    this.state.exercisesFireRef.push(this.state.exercise);
  },

  handleChange:function(key, evt){
    this.state.exercise[key] = evt.target.value;
    this.setState(this.state.exercise);
  },

  onHide:function(){
    this.setState({
      'exercise': {
                    'name': '',
                    'weight': '',
                    'reps': ''
                  }
      });
    this.props.onHide && this.props.onHide();
  },


  showModal:function(){
    $('.ui.basic.modal.add.exercise').modal({
        blurring: true,
        onApprove: this.handleAddExercise,
        onHide: this.onHide
      })
      .modal('setting', 'closable', false)
      .modal('show');
  },

  render: function() {

    var exercise = this.state.exercise;

    if(this.props.addingExercise){
      this.showModal();
    }

    return (
        <div className="ui basic modal add exercise">
          <div className="ui green segment">
            <h3>Add exercise</h3>
            <div className="ui form">
              <div className="inline fields">
                <div className="seven wide field">
                  <input type="text"
                         placeholder="Name"
                         value={exercise.name}
                         onChange={this.handleChange.bind(this, 'name')}/>
                </div>
                <div className="three wide field">
                  <input type="number"
                         placeholder="Weight?"
                         value={exercise.weight}
                         onChange={this.handleChange.bind(this, 'weight')} />
                </div>
                <div className="five wide field">
                  <input type="number"
                         placeholder="Reps?"
                         value={exercise.reps}
                         onChange={this.handleChange.bind(this, 'reps')} />
                </div>
                <div className="actions">
                  <div className="two fluid ui inverted buttons">
                    <div className="ui red basic cancel button">
                      <i className="close icon"></i>
                      Close
                    </div>
                    <div className="ui green basic ok button">
                      <i className="checkmark icon"></i>
                      Save
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }

});

module.exports = exerciseAddModal;
