import React, { Component } from 'react';
import { Home } from '../components/home'
import { Login } from '../components/login'
import { Route } from 'react-router-dom';
import './App.css';
class App extends Component {
  render () {
    return (
      <div>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
      </div>
    );
  }
}

export default App;
