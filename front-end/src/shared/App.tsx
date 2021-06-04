import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Routes from '../pages'

import './App.css';
class App extends Component {
  render () {
    return (
      <div>
        <Route exact path="/" component={Routes.Home}/>
        <Route exact path="/login" component={Routes.Login}/>
        <Route exact path="/register" component={Routes.Register}/>
        <Route exact path="/logout" component={Routes.Logout}/>
      </div>
    );
  }
}

export default App;
