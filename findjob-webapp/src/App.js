import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Login from './container/login'
import Register from './container/register'
import AuthRoute from './component/authRoute'

function Boss() {
  return <h1>boss页面</h1>
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <AuthRoute />
        <Route path='/boss' component={Boss}></Route>
        <Route path='/login' component={Login}></Route>
        <Route path='/register' component={Register}></Route>
      </div>
    );
  }
}

export default App;
