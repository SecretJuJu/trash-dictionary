import React, { Component } from 'react';
import { Home } from '../components/home'
import { Route } from 'react-router-dom';
import './App.css';

class App extends Component {
  render () {
    return (
      <Route exact path="/" component={Home}/>
    );
  }
}

export default App;
