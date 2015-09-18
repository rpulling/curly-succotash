var React = require('react');
var Firebase = require('firebase');
var ReactFireMixin = require('reactfire');
var PropTypes = React.PropTypes;

var ExerciseEditModal = React.createClass({

    propTypes: {
      exerciseRef: PropTypes.string,
      onEditHide: PropTypes.func
    },

    getInitialState: function() {
      return {
        'exercise': {
          'name': '',
          'weight': '',
          'reps': ''
        },

        'modified': false
      };
    },

    showModal:function(){
      $('.ui.basic.modal.edit.exercise').modal({
          blurring: true,
          onDeny: this.handleDenied,
          onApprove: this.handleApprove,
          onHide: this.handleHidden
        })
        .modal('setting', 'closable', false)
        .modal('show');
    },


    handleSaveEdit:function(exerciseRef, updatedExercise){
      var ref = new Firebase(exerciseRef);
      ref.update(updatedExercise);
    },

    handleApprove:function(){
      // save off changes
      this.handleSaveEdit(this.props.exerciseRef, this.state.exercise);
    },

    handleDelete:function(){
      var ref = new Firebase(this.props.exerciseRef);
      ref.remove();
      this.hideModal();
    },

    hideModal:function(){
      $('.ui.basic.modal.edit.exercise').modal('hide');
    },

    handleDenied:function(handleDeniedCb){
      // any additional logic for denying an edit here
    },

    handleHidden:function(modalCb){
      this.setState({
        'modified': false
      });

      this.props.onEditHide && this.props.onEditHide();
    },

    getCurrentExerciseData:function(snapshot){
      var name, weight, reps;
      this.state.exercise.name = snapshot.child('name').val();
      this.state.exercise.weight = snapshot.child('weight').val();
      this.state.exercise.reps = snapshot.child('reps').val();
      this.showModal();

    },

    handleEdit:function(key, evt){
      this.state.exercise[key] = evt.target.value;
      this.state.modified = true;
      this.setState(this.state);
    },

    render: function() {

      var name, weight, reps, ref, onDelete,
          exerciseRef = this.props.exerciseRef;


      if(!this.state.modified && exerciseRef){
        ref = new Firebase(exerciseRef);
        ref.once('value', this.getCurrentExerciseData);

        // set prop vals
        name = this.state.exercise.name;
        weight = this.state.exercise.weight;
        reps = this.state.exercise.reps;
        ref.off('value', this.getCurrentExerciseData);
        onDelete = this.handleDelete.bind(this, this.props.exerciseRef);
      } else{
        name = this.state.exercise.name;
        weight = this.state.exercise.weight;
        reps = this.state.exercise.reps;
      }

      return (
        <div>
          <div className="ui basic modal edit exercise">
            <div className="header">
              Edit
            </div>
            <div className="image content">
              <div className="image">
                <i className="write icon"></i>
              </div>
              <div className="description">
                <div className="ui small form">
                  <div className="three fields">
                    <div className="field">
                      <input placeholder="exercise name..."
                             value={name}
                             onChange={this.handleEdit.bind(this, 'name')}
                             type="text"/>
                    </div>
                    <div className="field">
                      <input placeholder="weight..."
                             value={weight}
                             onChange={this.handleEdit.bind(this, 'weight')}
                             type="number"/>
                    </div>
                    <div className="field">
                      <input placeholder="reps..."
                             value={reps}
                             onChange={this.handleEdit.bind(this, 'reps')}
                             type="number" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="actions">
              <div className="three fluid ui inverted buttons">
                <div className="ui red button" onClick={this.handleDelete}>
                  <i className="trash outline icon"></i>
                  Remove
                </div>
                <div className="ui yellow basic cancel inverted button">
                  <i className="close icon"></i>
                  Close
                </div>
                <div className="ui green basic ok inverted button">
                  <i className="checkmark icon"></i>
                  Save
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

});

module.exports = ExerciseEditModal;
