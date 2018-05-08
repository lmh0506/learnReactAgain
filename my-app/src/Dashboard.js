import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom'
import One from './App'
import {loginout} from './Auth.redux'
function mapStateToProps(state) {
  return {
    ...state.auth
  };
}

function two() {
  return (<h1>二营</h1>)
}

function three() {
  return (<h1>骑兵连</h1>)
}

class DashBoard extends Component {
  render() {
    const matchUrl = this.props.match.url
    const redirectToLogin = <Redirect to='/login'></Redirect>
    const App = <div>
      {this.props.isAuth ? <button onClick={this.props.loginout}>你好{this.props.user}注销</button>:null}
    <ul>
      <li>
        <Link to={`${matchUrl}/`}>一营</Link>
      </li>
      <li>
        <Link to={`${matchUrl}/eryin`}>二营</Link>
      </li>
      <li>
        <Link to={`${matchUrl}/qibinlian`}>骑兵连</Link>
      </li>
    </ul>
    <Route path={`${matchUrl}/`} exact component={One}></Route>
    <Route path={`${matchUrl}/eryin`} component={two}></Route>
    <Route path={`${matchUrl}/qibinlian`} component={three}></Route>
  </div>
    return (
      this.props.isAuth ? App : redirectToLogin
    );
  }
}

export default connect(
  mapStateToProps,
  {loginout}
)(DashBoard);