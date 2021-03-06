const router = require('koa-router')()
const model = require('../model')
const utils = require('utility')
const User = model.getModel('user')
const Chat = model.getModel('chat')

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
        json.token = (new Date().getTime()*112856).toString(16)
        if(!ctx.session.user) {
          ctx.session.user = {}
        }
        ctx.session.user[json.token] = hasUser
    } else {
      json.msg = '用户名不存在或密码错误'
    }
  } catch(e) {
    json.msg = e
  }

  ctx.body = json
})

router.get('/logout', async (ctx, next) => {
  const token = ctx.request.query.token
  delete ctx.session.user[token]
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
      let newUser = new User({user, pwd: utils.md5(pwd), type})
      let userInfo = await newUser.save()
      let {_id} = userInfo
      json.code = 0
      json.token = (new Date().getTime()*112856).toString(16)
      ctx.session.user[json.token] = {user, type, _id}
    } catch (e) {
      json.msg = e
    }
  }

  ctx.body = json
})

router.post('/update', async (ctx, next) => {
  const token = ctx.request.body.token
  const { _id } = ctx.session.user[token]
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
  const token = ctx.request.query.token
  const user = ctx.session.user[token]
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

router.get('/getmsglist', async (ctx, next) => {
  const token = ctx.request.query.token
  const user = ctx.session.user[token]
  console.log(user._id)
  let json = {
    code: -1,
    msg: ''
  }
  
  
  let users = {}
  try{
    let allUser = await User.find({})
    allUser.forEach(v => {
      users[v._id] = {name: v.user, avatar: v.avatar}
    })
  }catch(e) {
    json.msg = e
  }

  try{
    let chat = await Chat.find({'$or': [{from: user._id}, {to: user._id}]})
    json.code = 0
    json.msgs = chat
    json.users = users
  }catch(e) {
    json.msg = e
  }

  ctx.body = json
})

router.post('/readmsg', async (ctx, next) => {
  const {token, from} = ctx.request.body
  const user = ctx.session.user[token]
  console.log(user._id)
  let json = {
    code: -1,
    msg: ''
  }
  
  try{
    let chat = await Chat.update(
      {from, to: user._id}, 
      {'$set': {read: true}},
      {'multi': true}
    )
    json.code = 0
    json.num = chat.nModified
  }catch(e) {
    json.msg = e
  }

  ctx.body = json
})

module.exports = router
