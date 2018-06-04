import axios from 'axios'
import { getRedirectPath } from '../util'

const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOGOUT = 'LOGOUT'

const initState = {
  redirectTo: '',
  msg: '',
  user: '',
  type: ''
}

export function user(state = initState, action) {
  switch(action.type) {
    case AUTH_SUCCESS:
      return {...state, msg: '', redirectTo: getRedirectPath(action.data), ...action.data}
    case ERROR_MSG:
      return {...state, isAuth: false, msg: action.msg}
    case LOAD_DATA:
      return {...state, ...action.data, isAuth: true}
    case LOGOUT: 
      return {...initState, redirectTo: '/login'}
  }
  return state
}

function errorMsg(msg) {
  return { msg, type: ERROR_MSG }
}

function authSuccess(data) {
  return { data, type: AUTH_SUCCESS }
}

function logout() {
  return {type: LOGOUT}
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
        localStorage.setItem('token', res.data.token)
        dispatch(authSuccess({user, type}))
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
        localStorage.setItem('token', res.data.token)
        dispatch(authSuccess(res.data.user))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

export function logoutSubmit() {
  return dispatch => {
    axios.get('/user/logout')
    .then(res => {
      if(res.status === 200 && res.data.code === 0) {
        localStorage.removeItem('token')
        dispatch(logout())
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

export function updateUser(data) {
  return dispatch => {
    axios.post('/user/update', data)
      .then(res => {
        if(res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.user))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}
