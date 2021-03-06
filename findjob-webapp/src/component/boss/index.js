import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import { WingBlank, WhiteSpace, Card } from 'antd-mobile'
import UserCard from '../usercard'
import { getUserList } from '../../redux/chatuser.redux'

function mapStateToProps(state) {
  return state.chatuser
}

class Boss extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getUserList('genius')
  }

  render() {
    return (
      <UserCard userList={this.props.userList}></UserCard>
    );
  }
}

export default connect(
  mapStateToProps,
  { getUserList }
)(Boss);