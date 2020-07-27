const express = require('express')
const path = require('path')
var router = express.Router()
var confVar = require(path.join(__dirname, '../../conf/conf.js'))
const DataBase = 'wordpress'
const logger = confVar.logger
const sqlQueryPromise = confVar.sqlQueryPromise
var cryptPw = require(path.join(__dirname, '../../utils/md5.js')).cryptPW
const username = 'zpliu'
const password = '111'
router.post('/login', function (req, res, next) {
  if (req.session.data) {
    res.json({
      code: 0,
      data: req.session.data,
    })
    //处于登录状态了
  } else {
    //进行密码验证
    if (req.body.username === username && req.body.password === password) {
      req.session.data = {
        name: 'zpliu',
        grade: 'master',
        role: 'Administrator',
        token: cryptPw(req.session.id + 'zpliu'),
      }
      res.redirect('/login')
    } else {
      res.send({
        code: 6000,
        message: '账号或密码错误',
      })
    }
  }
})
module.exports = router
