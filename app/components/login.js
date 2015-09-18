var React = require('react');
var Navigation = require('react-router').Navigation;
var fireHelper = require('../utils/fireHelper.js');
var PropTypes = React.PropTypes;

var Login = React.createClass({

  mixins:[Navigation],
  statics:{
    willTransitionTo: function (transition, params, query) {
        if(fireHelper.loggedIn()){
          transition.redirect('exercises');
        }
      }
  },


  getInitialState: function() {
    return {
      'username': '',
      'password': ''
    };
  },

  authCallback:function(error, authData){
    if(authData){
      this.transitionTo('exercises');
    }
  },

  login:function(){
    if(!this.state.username || !this.state.password){
      return;
    }
    fireHelper.login(this.state.username,
                     this.state.password,
                     this.authCallback);
  },

  handleUsernameChange:function(event){
    this.setState({
      'username': event.target.value
    })
  },

  handlePasswordChange:function(event){
    this.setState({
      'password': event.target.value
    })
  },

  render: function() {
    return (
        <div className="ui middle aligned center aligned grid">
          <div className="column">
            <h2 className="ui teal image header">
              <img src="http://placehold.it/125x125" className="image" />
              <div className="content">
                Log in
              </div>
            </h2>
            <form className="ui large form">
              <div className="ui stacked segment">
                <div className="field">
                  <div className="ui left icon input">
                    <i className="user icon"></i>
                    <input type="text" name="email" onChange={this.handleUsernameChange} />
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="lock icon"></i>
                    <input type="password" name="password" onChange={this.handlePasswordChange} />
                  </div>
                </div>
                <div className="ui fluid large teal submit button" onClick={this.login}>Login</div>
              </div>
              <div className="ui error message"></div>
            </form>
          </div>
        </div>
    );
  }

});

module.exports = Login;
