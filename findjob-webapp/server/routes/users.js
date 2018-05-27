const router = require('koa-router')()
const model = require('../model')
const utils = require('utility')
const User = model.getModel('user')

const _filiter = {'pwd': 0, '__v': 0}

router.prefix('/user')

router.post('/login', async (ctx, next) => {
  let json = {
    code: -1,
    msg: ''
  }
  let {user, pwd} = ctx.request.body
  let hasUser;
  try {
    hasUser = await User.findOne({user, pwd: utils.md5(pwd)}, _filiter)
    if(hasUser) {
        json.code = 0
        json.user = hasUser
        ctx.session.user = hasUser
    } else {
      json.msg = '用户名不存在或密码错误'
    }
  } catch(e) {
    json.msg = e
  }

  ctx.body = json
})

router.get('/logout', async (ctx, next) => {
  ctx.session.user = null
  ctx.body = {
    code: 0,
    msg: ''
  }
})

router.post('/register', async (ctx, next) => {
  let json = {
    code: -1,
    msg: ''
  }
  let {user, pwd, type} = ctx.request.body
  let hasUser;
  try {
    hasUser = await User.findOne({user})
  } catch(e) {
    json.msg = e
  }

  if(hasUser) {
    json.msg = '用户名已存在'
  } else {
    try {
      newUser = new User({user, pwd: utils.md5(pwd), type})
      let userInfo = await newUser.save()
      let {_id} = userInfo
      json.code = 0
      ctx.session.user = {user, type, _id}
    } catch (e) {
      json.msg = e
    }
  }

  ctx.body = json
})

router.post('/update', async (ctx, next) => {
  const { _id } = ctx.session.user
  let json = {
    code: -1,
    msg: ''
  }
  if(!_id) {
    json.msg = '用户未登录'
    ctx.body = json
  }

  let userInfo = ctx.request.body
  let hasUser;
  try {
    // new为true则返回最新的数据  select进行筛选数据
    hasUser = await User.findByIdAndUpdate(_id, userInfo, {new: true, select: _filiter})
    if(hasUser) {
        json.code = 0
        json.user = hasUser
    } else {
      json.msg = '用户信息保存出错'
    }
  } catch(e) {
    json.msg = e
  }

  ctx.body = json
})

router.get('/info', async (ctx, next) => {
  let json = {
    code: -1,
    msg: ''
  }

  const user= ctx.session.user
  console.log(user)
  let hasUser;
  if(user) {
    try {
      let {_id} = user
      hasUser = await User.findById({_id}, _filiter)
      json.code = 0;
      json.user = hasUser
    } catch (e) {
      json.msg = e
    }
  } else {
    json.code = 1;
    json.msg = '登录超时'
  }

  ctx.body = json
})

router.get('/list', async (ctx, next) => {
  let json = {
    code: -1,
    msg: ''
  }

  const {type} = ctx.request.query

  try{
    let users = await User.find({type}, _filiter);
    json.data = users
    json.code = 0
  }catch(e) {
    json.msg = e
  }

  ctx.body = json
})

module.exports = router
