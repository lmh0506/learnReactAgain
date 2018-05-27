import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadData } from '../../redux/user.redux'

function mapStateToProps(state) {
  return state.user;
}

@withRouter
class AuthRoute extends Component {
  componentDidMount() {
    const publicList = ['/login', '/register'];
    const pathname = this.props.location.pathname;

    if(publicList.indexOf(pathname) > -1) {
      return null
    }
    // 获取用户信息
    axios.get('/user/info')
    .then(res => {
      if(res.status === 200) {
         // 是否登录
        if(res.data.code === 0) {
          
          // 有登录信息
          this.props.loadData(res.data.user)
          
         // 现在的url地址 login是不需要跳转的
         // 用户的type 身份是boss还是牛人
         // 用户是否完善信息(选择头像 个人简介)
        }else {
          console.log(this.props.history)
          this.props.history.push('/login')
        }
      }
    })
  }

  render() {
    return (
      null
    );
  }
}

export default connect(
  mapStateToProps,
  {loadData}
)(AuthRoute);