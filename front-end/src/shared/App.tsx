import React, { Component } from 'react';
import { Search } from '../components/search'
import { Route } from 'react-router-dom';
import './App.css';

class App extends Component {
  render () {
    return (
      <div>
          <Route exact path="/" component={Search}/>
      </div>
    );
  }
}

export default App;
