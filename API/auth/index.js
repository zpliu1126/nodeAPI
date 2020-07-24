const express = require('express')
const path = require('path')
var router = express.Router()
var confVar = require(path.join(__dirname, '../../conf/conf.js'))
const DataBase = 'wordpress'
const logger = confVar.logger
const sqlQueryPromise = confVar.sqlQueryPromise

router.get('/login', function (req, res, next) {
  if (req.session.data) {
    res.json({
      code: 0,
      data: {
        message: '当前为session登录，没有进行数据库验证，一天后session过期',
      },
    })
    //处于登录状态了
  } else {
    req.session.data = true
    res.send('no') //非登录状态，进行数据库查询操作
  }
})
module.exports = router
