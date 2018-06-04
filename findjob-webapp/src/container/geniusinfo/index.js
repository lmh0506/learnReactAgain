import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelect from '../../component/avatarSelect'
import { updateUser } from '../../redux/user.redux'

function mapStateToProps(state) {
  return state.user
}

class GeniusInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      desc: ''
    }
  }

  onChange(key, val) {
    this.setState({
      [key]: val
    })
  }

  handleSave = () => {
    let data = {...this.state, token: localStorage.getItem('token')}
    this.props.updateUser(data)
  }

  render() {
    const path = this.props.history.location.pathname
    const redirect = this.props.redirectTo

    return (
      <div>
        {redirect && redirect != path ? <Redirect to={redirect} /> : null}
        <NavBar mode='dark' >牛人完善信息页面</NavBar>
        <AvatarSelect selectAvatar={v=>this.onChange('avatar', v)}></AvatarSelect>
        <InputItem onChange={v=>this.onChange('title', v)}>
          求职岗位
        </InputItem>
        <TextareaItem 
          onChange={v=>this.onChange('desc', v)}
          rows={3}
          autoHeight
          title='个人简介'>
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
  { updateUser }
)(GeniusInfo);