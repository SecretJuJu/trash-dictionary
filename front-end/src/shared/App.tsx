import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { Home } from '../components/home'
import { Login } from '../components/login'
import { Register } from '../components/register'
import './App.css';
class App extends Component {
  render () {
    return (
      <div>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
      </div>
    );
  }
}

export default App;
