const express = require('express')
const path = require('path')
var router = express.Router()
var confVar = require(path.join(__dirname, '../../conf/conf.js'))
const DataBase = 'wordpress'
const logger = confVar.logger
const sqlQueryPromise = confVar.sqlQueryPromise
var cryptPw = require(path.join(__dirname, '../../utils/md5.js')).cryptPW

router.post('/login', function (req, res, next) {
  if (req.session.data) {
    res.json({
      code: 0,
      data: {
        token: cryptPw(req.session.id + req.session.data.name),
      },
    }) //处于登录状态了
  } else {
    //进行密码验证
    var password = cryptPw(req.body.password) //再加一次盐
    sql = `
    SELECT 
    student.\`id\`,
    student.\`name\`,
    student.\`sex\`,
    student.\`introduction\`,
    student.\`photo\`,
    student.\`email\`,
    grade.\`name\` AS 'gradeName',
    role.\`name\` AS 'roleName' 
  FROM
    student 
    LEFT JOIN \`grade\` 
      ON student.\`grade_id\` = grade.\`id\` 
    LEFT JOIN \`role\` 
      ON student.\`role\` = role.\`id\` 
  WHERE student.\`email\` = '${req.body.username}' 
    AND student.\`password\` = '${password}' ;
  `
    sqlQueryPromise(sql, next).then((data) => {
      if (data.length !== 0) {
        req.session.data = data[0] //设置session
        // res.status(301).redirect('/login')
        res.json({
          code: 0,
          data: {
            token: cryptPw(req.session.id + req.session.data.name),
          },
        })
      } else {
        res.send({
          code: 6000,
          message: '账号或密码错误',
        })
      }
    })
  }
})

router.post('/register', function (req, res, next) {
  //重复注册，错误代码1062
  var password = cryptPw(req.body.password) //传进来的密文再加一次盐
  sql = `
  INSERT INTO student (
    \`name\`,
    \`sex\`,
    \`grade_id\`,
    \`photo\`,
    \`email\`,
    \`role\`,
    \`password\`
  ) 
  VALUES
    (
      '${req.body.name}' ,
      ${req.body.sex},
      ${req.body.grade_id},
      '${req.body.photo}',
      '${req.body.email}',
      2,
      '${password}'
    ) ;
 `
  sqlQueryPromise(sql, next).then(() => {
    res.json({ code: 0 }) //登录成功
  })
})
module.exports = router
