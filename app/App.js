var React = require('react');
var Router = require('react-router');
var Routes = require('./config/routes');
require('./styles/semantic/dist/semantic.min.css');
require('./styles/semantic/dist/semantic.min.js');

Router.run(Routes, (Root, state)=> {
  React.render(<Root {...state} />, document.body )
});
