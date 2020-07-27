const express = require('express')
const path = require('path')
var router = express.Router()
var confVar = require(path.join(__dirname, '../../conf/conf.js'))
const DataBase = 'wordpress'
const logger = confVar.logger
const sqlQueryPromise = confVar.sqlQueryPromise

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
  sqlQueryPromise(sql, next).then((result) => {
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
  sqlQueryPromise(sql, next).then(() => {
    res.json({ code: 0 })
  })
})

/**
 * insert one person Message
 */
router.post('/people/delete', function (req, res, next) {
  sql = `
  DELETE FROM student WHERE id=${req.body.id};
  `
  sqlQueryPromise(sql, next).then(() => {
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
