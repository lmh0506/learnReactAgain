import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import Logo from '../../component/logo'
import { login } from '../../redux/user.redux'
import MyForm from '../../component/myForm'

function mapStateToProps(state) {
  return state.user;
}

@MyForm
class Login extends Component {
  constructor(props) {
    super(props);
  }

  register = () => {
    this.props.history.push('/register')
  }

  handleLogin = () => {
    this.props.login(this.props.state)
  }

  render() {
    return (
      <div>
        <Logo />
        <h2>登录页面</h2>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <WingBlank>
          <List>
            {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
            <InputItem onChange={v => this.props.handleChange('user', v)}>用户名</InputItem>
            <WhiteSpace />
            <InputItem 
              type='password'
              onChange={v => this.props.handleChange('pwd', v)}>密码</InputItem>
          </List>
          <WhiteSpace />
          <Button onClick={this.handleLogin} type='primary'>登录</Button>
          <WhiteSpace />
          <Button onClick={this.register} type='primary'>注册</Button>
        </WingBlank>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  {login}
)(Login);