import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom';

import Routes from '../pages'

import './App.css';
class App extends Component {
  render () {
    return (
      <Switch>
        <Route exact path="/" component={Routes.Home}/>
        <Route exact path="/login" component={Routes.Login}/>
        <Route exact path="/register" component={Routes.Register}/>
        <Route exact path="/logout" component={Routes.Logout}/>
        <Route exact path="/newFeed" component={Routes.NewFeed}></Route>
        <Route>
          <div> 404 Not Found </div>
        </Route>
      </Switch>
    );
  }
}

export default App;
