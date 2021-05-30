import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { Home } from '../components/home'
import { Login } from '../components/login'
import { Logout } from '../components/logout'
import { Register } from '../components/register'
import './App.css';
class App extends Component {
  render () {
    return (
      <div>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/logout" component={Logout}/>
      </div>
    );
  }
}

export default App;
