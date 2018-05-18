import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Login from './container/login'
import Register from './container/register'
import BossInfo from './container/bossinfo'
import GeniusInfo from './container/geniusinfo'
import AuthRoute from './component/authRoute'

class App extends Component {
  render() {
    return (
      <div className="App">
        <AuthRoute />
        <Route path='/geniusinfo' component={GeniusInfo}></Route>
        <Route path='/bossinfo' component={BossInfo}></Route>
        <Route path='/login' component={Login}></Route>
        <Route path='/register' component={Register}></Route>
      </div>
    );
  }
}

export default App;
