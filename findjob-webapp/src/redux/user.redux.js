import axios from 'axios'
import { getRedirectPath } from '../util'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'

const initState = {
  redirectTo: '',
  isAuth: false,
  msg: '',
  user: '',
  type: ''
}

export function user(state = initState, action) {
  switch(action.type) {
    case REGISTER_SUCCESS:
      return {...state, msg: '', redirectTo: getRedirectPath(action.data), isAuth: true, ...action.data}
    case ERROR_MSG:
      return {...state, isAuth: false, msg: action.msg}
    case LOGIN_SUCCESS:
      return {...state, msg: '', redirectTo: getRedirectPath(action.data), isAuth: true, ...action.data}
    case LOAD_DATA:
      return {...state, ...action.data, isAuth: true}
  }
  return state
}

function errorMsg(msg) {
  return { msg, type: ERROR_MSG }
}

function registeSuccess(data) {
  return { data, type: REGISTER_SUCCESS }
}

function loginSuccess(data) {
  return { data, type: LOGIN_SUCCESS }
}

export function loadData(data) {
  return { data, type: LOAD_DATA }
}

export function register({user, pwd, repeatPwd, type}) {
  if(!user || !pwd || !type) {
    return errorMsg('用户名密码必须输入')
  }

  if(pwd != repeatPwd) {
    return errorMsg('两次密码输入不同')
  }

  return dispatch => {
    axios.post('/user/register', {user, pwd, type})
    .then(res => {
      if(res.status === 200 && res.data.code === 0) {
        dispatch(registeSuccess({user, pwd, type}))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }

}

export function login({user, pwd}) {
  if(!user || !pwd) {
    return errorMsg('用户名密码必须输入')
  }

  return dispatch => {
    axios.post('/user/login', {user, pwd})
    .then(res => {
      if(res.status === 200 && res.data.code === 0) {
        dispatch(loginSuccess({user, pwd, type: res.data.user.type}))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}
