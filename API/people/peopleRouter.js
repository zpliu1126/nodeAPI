const express = require('express')
const path = require('path')
const { connect } = require('http2')
const { resolve } = require('path')
const { nextTick } = require('process')
const { sqlPoolconnection } = require('../../conf/mysqlconf')
var router = express.Router()
var confVar = require(path.join(__dirname, '../../conf/conf.js'))
const DataBase = 'wordpress'
const logger = confVar.logger
const mysqlconnection = confVar.connection

function sqlQueryPromise(sqlConnecion, sql, next) {
  return new Promise((resolve, NULL) => {
    sqlConnecion.query(sql, function (err, result) {
      if (err) {
        logger.error(
          'sql language error: errcode:' + err.errno + '\t`' + err.sql + '`'
        )
        next({
          code: err.errno,
        }) //sql language error
        return
      }
      resolve(result)
    })
  })
}

/**
 * get All People message
 *
 */
router.get('/people', function (req, res, next) {
  sql = `
  SELECT 
  student.\`id\`,
  student.\`name\`,
  student.\`sex\`,
  student.\`introduction\`,
  student.\`photo\`,
  student.\`email\`,
  grade.\`name\` AS 'grade' 
FROM
  \`student\` 
  LEFT JOIN \`grade\` 
    ON student.\`grade\` = grade.\`id\` 
ORDER BY student.\`grade\` ASC ;
  `
  sqlQueryPromise(mysqlconnection, `use ${DataBase};`, next)
    .then(() => {
      return sqlQueryPromise(mysqlconnection, sql, next)
    })
    .then((result) => {
      res.json(result)
    })
})
/**
 * update one person Message
 */
router.post('/people/update', function (req, res, next) {
  sql = `
UPDATE 
  student 
SET
  \`name\` = '${req.body.name}',
  \`sex\` = ${req.body.sex},
  \`grade\` = ${req.body.grade},
  \`photo\` = '${req.body.photo}',
  \`email\` = '${req.body.email}' 
WHERE \`id\` =${req.body.id}  ;
  `
  sqlQueryPromise(mysqlconnection, `use ${DataBase};`, next)
    .then(() => {
      return sqlQueryPromise(mysqlconnection, sql, next)
    })
    .then(() => {
      res.json({ code: 0 })
    })
})

/**
 * insert one person Message
 */
router.post('/people/insert', function (req, res, next) {
  sql = `
   INSERT INTO student (
    \`name\`,
    \`sex\`,
    \`grade\`,
    \`photo\`,
    \`email\`
  ) 
  VALUES
    (
      '${req.body.name}' ,
      ${req.body.sex},
      ${req.body.grade},
      '${req.body.photo}',
      '${req.body.email}'
    ) ; 
  `
  sqlQueryPromise(mysqlconnection, `use ${DataBase};`, next)
    .then(() => {
      return sqlQueryPromise(mysqlconnection, sql, next)
    })
    .then(() => {
      res.json({ code: 0 })
    })
})
router.post('/people/delete', function (req, res, next) {
  sql = `
  DELETE FROM student WHERE id=${req.body.id};
  `
  sqlQueryPromise(mysqlconnection, `use ${DataBase};`, next)
    .then(() => {
      return sqlQueryPromise(mysqlconnection, sql, next)
    })
    .then(() => {
      res.json({ code: 0 })
    })
})

/**
 * delete one
 *
 *
 */
/**
 *
 *
 *
 */
module.exports = router