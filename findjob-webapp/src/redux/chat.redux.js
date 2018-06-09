import io from "socket.io-client";
import axios from "axios";
// 跨域时需要手动配置 socket
const socket = io("ws://localhost:1128");

// 获取聊天列表
const MSG_LSIT = "MSG_LIST";
// 读取信息
const MSG_RECV = "MSG_RECV";
// 标识已读
const MSG_READ = "MSG_READ";

const initState = {
  chatmsg: [],
  users: {},
  unread: 0
};

export function chat(state = initState, action) {
  switch (action.type) {
    case MSG_LSIT:
      return {
        ...state,
        users: action.data.users,
        chatmsg: action.data.msgs,
        unread: action.data.msgs.filter(
          v => !v.read && v.to === action.data.userid
        ).length
      };
    case MSG_RECV:
      let n = action.data.to === action.userid ? 1 : 0;
      return {
        ...state,
        chatmsg: [...state.chatmsg, action.data],
        unread: state.unread + n
      };
    case MSG_READ:
      return {
        ...state,
        chatmsg: state.chatmsg.map(v => {
            if(v.from === action.data.from && v.to === action.data.to) {
                v.read = true
            }
            return v
        }),
        unread: state.unread - action.data.num
      };
    default:
      return state;
  }
}

function msgList(msgs, users, userid) {
  return { type: MSG_LSIT, data: { msgs, users, userid } };
}

function msgRecv(msgs, userid) {
  return { type: MSG_RECV, data: msgs, userid };
}

function msgRead({from, to, num}) {
    return {type: MSG_READ, data: {from, to, num}}
}

export function getMsgList() {
  return (dispatch, getState) => {
    axios
      .get(`/user/getmsglist?token=${localStorage.getItem("token")}`)
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          let userid = getState().user._id;
          dispatch(msgList(res.data.msgs, res.data.users, userid));
        }
      });
  };
}

export function sendMsg({ from, to, msg }) {
  return dispatch => {
    socket.emit("sendmsg", { from, to, msg });
  };
}

export function recvMsg() {
  return (dispatch, getState) => {
    socket.on("recvmsg", data => {
      let userid = getState().user._id;
      dispatch(msgRecv(data, userid));
    });
  };
}

export function readMsg(from) {
    return (dispatch, getState) => {
        axios
            .post('/user/readmsg', {from, token: localStorage.getItem("token")})
            .then(res => {
                const userid = getState().user._id
                if(res.status === 200 && res.data.code === 0) {
                    dispatch(msgRead({to: userid, from, num: res.data.num}))
                }
            })
    };
}
