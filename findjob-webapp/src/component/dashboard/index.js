import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { NavBar } from 'antd-mobile'
import NavLinkBar from '../../component/navlink'
import Boss from '../../component/boss'
import Genius from '../../component/genius'
import User from '../../component/user'
import Msg from '../../component/Msg'
import { getMsgList, recvMsg } from '../../redux/chat.redux'

function mapStateToProps(state) {
  return state
}

class DashBoard extends Component {
  componentDidMount() {
    if(!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }

  render() {
    const {pathname} = this.props.location
    const user = this.props.user
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'boss',
        icon: 'job',
        title: 'boss列表',
        component: Genius,
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ]

    return (
      <div>
        <NavBar className='fixd-header' mode='dark'>
          {navList.find(v => v.path === pathname).title}
        </NavBar>
        <div style={{marginTop: 45, position: 'relative', zIndex: 100}}>
          <Switch>
            {navList.map(v => (
              <Route 
                key={v.path}
                path={v.path}
                component={v.component}></Route>
            ))}
          </Switch>
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { getMsgList, recvMsg }
)(DashBoard);