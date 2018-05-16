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
        ctx.session.user = user
    } else {
      json.msg = '用户名不存在或密码错误'
    }
  } catch(e) {
    json.msg = e
  }

  ctx.body = json
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
      User.create({user, pwd: utils.md5(pwd), type})
      json.code = 0
      ctx.session.user = user
    } catch (e) {
      json.msg = e
    }
  }

  ctx.body = json
})

router.get('/info', async (ctx, next) => {
  let json = {
    code: -1,
    msg: ''
  }

  const user = ctx.session.user
  let hasUser;
  if(user) {
    try {
      hasUser = await User.findOne({user}, _filiter)
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
  try{
    let user = await User.find({});
    json.user = user
    json.code = 0
  }catch(e) {
    json.msg = e
  }

  ctx.body = json
})

module.exports = router
