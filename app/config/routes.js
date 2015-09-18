'use strict';

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var main = require('../components/main');
var login = require('../components/login');
var exercisesContainer = require('../components/exercisesContainer');

var routes = (
  <Route name="app" path="/" handler={main}>
    <Route name="exercises" handler={exercisesContainer}></Route>
    <Route name="login" handler={login}></Route>
    <DefaultRoute handler={login}/>
  </Route>

);

module.exports = routes;
