import React, { Component } from 'react';
import { connect } from 'react-redux';
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux'
import { getChatId } from '../../util'

function mapStateToProps(state) {
    return state;
}
class Chat extends Component {

    constructor(props) {
        super(props)
        this.state = {
            text: '',
            msg: [],
            showEmoji: false
        }
    }

    fixCarousel() {
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'))
        }, 0)
    }

    componentDidMount() {
        if(!this.props.chat.chatmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }
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
        const emoji = '😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 ☺️ 🙂 🤗  🤔 😐 😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 ☹️ 🙁 😖 😞 😟 😤 😢 😭 😦 😧 😨 😩 😬 😰 😱 😳 😵 😡 😠 😷 🤒 🤕 🤢 🤧 😇 🤠 🤡 🤥 🤓 😈 👿 👹 👺 💀 👻 👽 🤖 💩 😺 😸 😹 😻 😼 😽 🙀 😿 😾'
                        .split(' ')
                        .filter(v => v)
                        .map(v => ({text: v}))

        const userId = this.props.match.params.id
        const users = this.props.chat.users
        const Item = List.Item
        if(!users[userId]) {
            return null
        }

        const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid === getChatId(userId, this.props.user._id))

        return (
            <div id='chat-page'>
                <NavBar 
                    mode='dark'
                    leftContent={<Icon type='left'/>}
                    onLeftClick={() => {
                        this.props.history.goBack()
                    }}>
                    {users[userId].name}
                </NavBar>
                {chatmsgs.map(v => {
                    let avatar = require(`../img/${users[v.from].avatar}.png`)
                    return v.from === userId ? (
                        <List key={v._id}>
                            <Item thumb={avatar}>{v.content}</Item>
                        </List>
                    ):
                    (<List key={v._id}>
                        <Item 
                            extra={<img src={avatar}/>}
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
                            extra={
                            <div>
                                <span 
                                    style={{marginRight: '15px'}}
                                    onClick={() => {
                                        this.setState({
                                            showEmoji: !this.state.showEmoji
                                        })
                                        this.fixCarousel()
                                    }}>😃</span>
                                <span onClick={() => {
                                    this.handleSubmit()
                                }}>发送</span>
                            </div>}
                        ></InputItem>
                    </List>
                    {this.state.showEmoji ? 
                    <Grid 
                        data={emoji}
                        columnNum={9}
                        carouselMaxRow={4}
                        isCarousel={true}
                        onClick={el => {
                            this.setState({
                                text: this.state.text + el.text
                            })
                        }}/>
                    : null}
                    
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    { getMsgList, sendMsg, recvMsg }
)(Chat);