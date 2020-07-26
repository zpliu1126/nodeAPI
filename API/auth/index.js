const express = require('express')
const path = require('path')
var router = express.Router()
var confVar = require(path.join(__dirname, '../../conf/conf.js'))
const DataBase = 'wordpress'
const logger = confVar.logger
const sqlQueryPromise = confVar.sqlQueryPromise
var cryptPw = require(path.join(__dirname, '../../utils/md5.js')).cryptPW
router.get('/login', function (req, res, next) {
  if (req.session.data) {
    res.json(req.session.data)
    //处于登录状态了
  } else {
    //非登录状态进行验证
    req.session.data = {
      code: 0,
      data: {
        token: cryptPW(req.sessionID + 'zpliu'),
        name: 'zpliu',
        grade: 'master',
        sex: 0,
        role: 'administrator',
      },
    }
    res.send('no') //非登录状态，进行数据库查询操作
  }
})
module.exports = router
