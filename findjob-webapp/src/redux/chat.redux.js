import io from 'socket.io-client'
import axios from 'axios'
// 跨域时需要手动配置 socket
const socket = io('ws://localhost:1128')

// 获取聊天列表
const MSG_LSIT = 'MSG_LIST'
// 读取信息
const MSG_RECV = 'MSG_RECV'
// 标识已读
const MSG_READ = 'MSG_READ'

const initState = {
    chatmsg: [],
    unread: 0
}

export function chat(state = initState, action) {
    switch(action.type) {
        case MSG_LSIT:
            return {...state, chatmsg: action.data, unread: action.data.filter(v => !v.read).length}
        case MSG_RECV:
            return {...state, chatmsg: [...state.chatmsg, action.data], unread: state.unread + 1}
        case MSG_READ:
        default:
            return state
    }
}

function msgList(msgs) {
    return {type: MSG_LSIT, data: msgs}
}

function msgRecv(msgs) {
    return {type: MSG_RECV, data: msgs}
}

export function getMsgList() {
    return dispatch => {
        axios.get(`/user/getmsglist?token=${localStorage.getItem('token')}`)
            .then(res => {
                if(res.status === 200 && res.data.code === 0) {
                    dispatch(msgList(res.data.msgs))
                }
            })
    }
}

export function sendMsg({from, to , msg}) {
    return dispatch => {
        socket.emit('sendmsg', {from, to , msg})
    }
}

export function recvMsg() {
    return dispatch => {
        socket.on('recvmsg', data => {
            dispatch(msgRecv(data))
        })
    }
}
