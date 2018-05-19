import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import Logo from '../../component/logo'
import { register } from '../../redux/user.redux'

function mapStateToProps(state) {
  return state.user
}

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pwd: '',
      repeatPwd: '',
      type: 'genius'
    }
  }

  handleRegiste = () => {
    console.log(this.state)
    this.props.register(this.state)
  }

  handleChange(key, val) {
    this.setState({
      [key]: val
    })
  }

  render() {
    const RadioItem = Radio.RadioItem

    return (
      <div>
        <Logo />
        <h2>注册页面</h2>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <List>
          {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
          <InputItem onChange={v => this.handleChange('user', v)}>用户名</InputItem>
          <WhiteSpace />
          <InputItem
            type='password'
            onChange={v => this.handleChange('pwd', v)}>密码</InputItem>
          <WhiteSpace />
          <InputItem
            type='password'
            onChange={v => this.handleChange('repeatPwd', v)}>确认密码</InputItem>
          <WhiteSpace />
          <RadioItem 
            checked={this.state.type === 'genius'}
            onChange={v => this.handleChange('type', 'genius')}>
            牛人
          </RadioItem>
          <RadioItem
            checked={this.state.type === 'boss'}
            onChange={v => this.handleChange('type', 'boss')}>
            BOSS
          </RadioItem>
        </List>
        <Button onClick={this.handleRegiste} type='primary'>注册</Button>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  {register}
)(Register);