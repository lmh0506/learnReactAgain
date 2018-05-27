import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    this.props.getUserList('boss')
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