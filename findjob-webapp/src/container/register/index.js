import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import Logo from '../../component/logo'
import { register } from '../../redux/user.redux'
import MyForm from '../../component/myForm'

function mapStateToProps(state) {
  return state.user
}

@MyForm
class Register extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // 设置默认值
    this.props.handleChange('type', 'genius')
  }

  handleRegiste = () => {
    this.props.register(this.props.state)
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
          <InputItem onChange={v => this.props.handleChange('user', v)}>用户名</InputItem>
          <WhiteSpace />
          <InputItem
            type='password'
            onChange={v => this.props.handleChange('pwd', v)}>密码</InputItem>
          <WhiteSpace />
          <InputItem
            type='password'
            onChange={v => this.props.handleChange('repeatPwd', v)}>确认密码</InputItem>
          <WhiteSpace />
          <RadioItem 
            checked={this.props.state.type === 'genius'}
            onChange={v => this.props.handleChange('type', 'genius')}>
            牛人
          </RadioItem>
          <RadioItem
            checked={this.props.state.type === 'boss'}
            onChange={v => this.props.handleChange('type', 'boss')}>
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