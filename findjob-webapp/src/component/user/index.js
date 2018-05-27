import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Result, List, WhiteSpace, Modal, Button } from 'antd-mobile';
import { logoutSubmit } from '../../redux/user.redux';

function mapStateToProps(state) {
  return state.user
}
class User extends Component {

  logout = () => {
    const alert = Modal.alert;

    alert('注销', '确认退出登录吗?', [
      {text: '取消', onPress: () => { console.log('cancle') }},
      {text: '确认', onPress: () => { 
        this.props.logoutSubmit()
      }}
    ])
  }

  render() {
    return this.props.user ?  (
      <div>
        <Result 
          img={<img src={require(`../img/${this.props.avatar}.png`)} style={{width: '50px'}} />}
          title={this.props.user}
          message={this.props.type === 'boss' ? this.props.company : ''}></Result>
        <List renderHeader={() => '简介'}>
          <List.Item>
            {this.props.title}
            {this.props.desc.split('\n').map(v => <List.Item.Brief key={v}>{v}</List.Item.Brief>)}
            {this.props.money ? <List.Item.Brief>薪资：{this.props.money}</List.Item.Brief> : null}
          </List.Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <Button type='warning'  onClick={this.logout}>退出登录</Button>
      </div> 
    ) : <Redirect to={this.props.redirectTo}></Redirect>
  }
}

export default connect(
  mapStateToProps,
  { logoutSubmit }
)(User);