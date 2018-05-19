import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import { WingBlank, WhiteSpace, Card } from 'antd-mobile'
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
      <div>
        <WingBlank>
          {
            this.props.userList.map(v => (
              v.avatar ? <Card key={v._id}>
                <Card.Header
                  title={v.user}
                  thumb={require(`../img/${v.avatar}.png`)}
                  extra={<span>{v.title}</span>}></Card.Header>
                <Card.Body>
                  {v.desc.split('\n').map(v => (
                    <div key={v}>{v}</div>
                  ))}
                </Card.Body>
              </Card>
              : null
            ))
          }
        </WingBlank>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { getUserList }
)(Boss);