
const Add_Gun = '加机关枪';
const Remove_Gun = '减机关枪';
// 新建store
// 通过reducer简历
// 根据老的state和action 生成新的state

export function counter(state = 0, action) {
  switch(action.type) {
    case Add_Gun: 
      return state + 1
    case Remove_Gun: 
      return state - 1
    default:
    return 10
  }
}

export function addGun(){
  return {type: Add_Gun}
}

export function removeGun(){
  return {type: Remove_Gun}
}

export function removeGunSync() {
  return dispatch => {
    setTimeout(() => {
      
      dispatch(removeGun())
    }, 2000)
}
}

