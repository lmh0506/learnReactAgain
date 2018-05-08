import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Login from './container/login'
import Register from './container/register'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path='/login' component={Login}></Route>
        <Route path='/register' component={Register}></Route>
      </div>
    );
  }
}

export default App;
