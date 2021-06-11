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
        <Route path="*">
          <div> 404 Not Found </div>
        </Route>
      </div>
    );
  }
}

export default App;
