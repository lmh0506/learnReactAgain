import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom'
import {login} from './Auth.redux'


function mapStateToProps(state) {
  return {
    ...state.auth
  };
}

class Auth extends Component {
  render() {
    return (
      <div>
        {this.props.isAuth ? <Redirect to='dashboard'></Redirect> : 
        <button onClick={this.props.login}>登录</button>}
        你没有权限，需要登录才能观看
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  {login}
)(Auth);