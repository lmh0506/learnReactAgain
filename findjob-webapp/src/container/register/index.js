import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import Logo from '../../component/logo'

function mapStateToProps(state) {
  return {

  };
}

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'genius'
    }
  }

  register = () => {
  }

  render() {
    const RadioItem = Radio.RadioItem

    return (
      <div>
        <Logo />
        <h2>注册页面</h2>
        <List>
          <InputItem>用户名</InputItem>
          <WhiteSpace />
          <InputItem>密码</InputItem>
          <WhiteSpace />
          <InputItem>确认密码</InputItem>
          <WhiteSpace />
          <RadioItem checked={this.state.type === 'genius'}>
            牛人
          </RadioItem>
          <RadioItem checked={this.state.type === 'boss'}>
            BOSS
          </RadioItem>
        </List>
        <Button onClick={this.register} type='primary'>注册</Button>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(Register);