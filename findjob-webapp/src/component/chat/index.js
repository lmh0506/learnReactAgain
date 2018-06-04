import React, { Component } from 'react';
import { connect } from 'react-redux';
import {List, InputItem, NavBar} from 'antd-mobile'
// import io from 'socket.io-client'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux'

// 跨域时需要手动配置 socket
// const socket = io('ws://localhost:1128')
function mapStateToProps(state) {
    return state;
}
class Chat extends Component {

    constructor(props) {
        super(props)
        this.state = {
            text: '',
            msg: []
        }
    }

    componentDidMount() {
        this.props.getMsgList()
        this.props.recvMsg()
        // socket.on('recvmsg', data => {
        //     this.setState({
        //         msg: [...this.state.msg, data.text]
        //     })
        // })

    }

    handleSubmit() {
        console.log(this.state.text)
        
        const from = this.props.user._id
        const to = this.props.match.params.id
        const msg = this.state.text
        this.props.sendMsg({from, to, msg})
        // 发送消息
        // socket.emit('sendmsg', {text: this.state.text})
        this.setState({text: ''})
    }

    render() {
        const user = this.props.match.params.id
        const Item = List.Item
        return (
            <div id='chat-page'>
                <NavBar mode='dark'>
                    {this.props.match.params.id}
                </NavBar>
                {this.props.chat.chatmsg.map(v => {
                    return v.from === user ? (
                        <List key={v._id}>
                            <Item>{v.content}</Item>
                        </List>
                    ):
                    (<List key={v._id}>
                        <Item 
                            extra={'avatar'}
                            className='chat-me'>{v.content}</Item>
                    </List>)
                })}
                <div className='stick-footer'>
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={v => {
                                this.setState({
                                    text: v
                                })
                            }}
                            extra={<span onClick={() => {
                                this.handleSubmit()
                            }}>发送</span>}
                        ></InputItem>
                    </List>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    { getMsgList, sendMsg, recvMsg }
)(Chat);