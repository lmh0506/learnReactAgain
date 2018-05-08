import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import Logo from '../../component/logo'

function mapStateToProps(state) {
  return {

  };
}

class Login extends Component {
  constructor(props) {
    super(props);
  }

  register = () => {
    this.props.history.push('/register')
  }

  render() {
    return (
      <div>
        <Logo />
        <h2>注册页面</h2>
        <WingBlank>
          <List>
            <InputItem>用户名</InputItem>
            <WhiteSpace />
            <InputItem>密码</InputItem>
          </List>
          <WhiteSpace />
          <Button type='primary'>登录</Button>
          <WhiteSpace />
          <Button onClick={this.register} type='primary'>注册</Button>
        </WingBlank>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(Login);