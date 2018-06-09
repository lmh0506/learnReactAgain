import React, { Component } from "react";
import { connect } from "react-redux";
import { List, Badge } from "antd-mobile";

function mapStateToProps(state) {
  return state;
}

class Msg extends Component {
  getLast(arr) {
    return arr[arr.length - 1];
  }

  render() {
    const Item = List.Item;
    const Brief = Item.Brief;
    const userid = this.props.user._id;
    const userInfo = this.props.chat.users;

    // 按照聊天用户分组  根据chatid
    const msgGroup = {};
    this.props.chat.chatmsg.map(v => {
      if (!msgGroup[v.chatid]) {
        msgGroup[v.chatid] = [];
      }

      msgGroup[v.chatid].push(v);
    });

    const chatList = Object.values(msgGroup).sort((a, b) => {
      const a_last = this.getLast(a).create_time;
      const b_last = this.getLast(b).create_time;
      return b_last - a_last;
    });
    console.log(chatList);
    return (
      <div>
        {chatList.map(v => {
          const lastItem = this.getLast(v);
          const targetId =
            lastItem.from === userid ? lastItem.to : lastItem.from;
          const unreadNum = v.filter(v => !v.read && v.to === userid).length;

          return (
            <List key={lastItem._id}>
              <Item
                arrow="horizontal"
                extra={<Badge text={unreadNum} />}
                thumb={require(`../img/${userInfo[targetId].avatar}.png`)}
                onClick={() => {
                  this.props.history.push(`/chat/${targetId}`);
                }}
              >
                {lastItem.content}
                <Brief>{userInfo[targetId].name}</Brief>
              </Item>
            </List>
          );
        })}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Msg);
