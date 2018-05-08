const LOGIN_IN = 'LOGIN';
const LOGIN_OUT = 'LOGINOUT';


export function auth(state={isAuth: false, user: '李云龙'}, action) {
  switch(action.type) {
    case LOGIN_IN:
     return {...state, isAuth: true}
    case LOGIN_OUT:
    return {...state, isAuth: false}
    default:
     return state
  }
}

export function login() {
  return {type: LOGIN_IN}
}

export function loginout() {
  return {type: LOGIN_OUT}
}
