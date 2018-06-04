import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './container/login'
import Register from './container/register'
import BossInfo from './container/bossinfo'
import GeniusInfo from './container/geniusinfo'
import AuthRoute from './component/authRoute'
import DashBoard from './component/dashboard'
import Chat from './component/chat'

import './index.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <AuthRoute />
        <Switch>
          <Route path='/geniusinfo' component={GeniusInfo}></Route>
          <Route path='/bossinfo' component={BossInfo}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/chat/:id' component={Chat}></Route>
          <Route component={DashBoard}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
