import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelect from '../../component/avatarSelect'
import { updateUser } from '../../redux/user.redux'

function mapStateToProps(state) {
  return state.user;
}

class BossInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      company: '',
      money: '',
      desc: '',
      avatar: ''
    }
  }

  onChange(key, val) {
    this.setState({
      [key]: val
    })
  }

  handleSave = () => {
    this.props.updateUser(this.state)
  }

  render() {
    const path = this.props.history.location.pathname
    const redirect = this.props.redirectTo

    return (
      <div>
        {redirect && redirect != path ? <Redirect to={redirect} /> : null}
        <NavBar mode='dark' >BOSS完善信息页面</NavBar>
        <AvatarSelect selectAvatar={v=>this.onChange('avatar', v)}></AvatarSelect>
        <InputItem onChange={v=>this.onChange('title', v)}>
          招聘职位
        </InputItem>
        <InputItem onChange={v=>this.onChange('company', v)}>
          公司名称
        </InputItem>
        <InputItem onChange={v=>this.onChange('money', v)}>
          职位薪资
        </InputItem>
        <TextareaItem 
          onChange={v=>this.onChange('desc', v)}
          rows={3}
          autoHeight
          title='职位要求'>
        </TextareaItem>
        <Button
          onClick={this.handleSave}
          type='primary'>保存</Button>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  {updateUser}
)(BossInfo);