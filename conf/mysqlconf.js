const mysql = require('mysql')
const path = require('path')
const logger = require(path.join(__dirname, '../utils/log4js.js')).getLogger()
// const sqlconnection = mysql.createConnection({
//   host: 'localhost',
//   user: 'BioCotton',
//   password: 'BioCotton39558728cotton@',
//   port: 3306,
// })
const sqlPoolconnection = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  user: 'BioCotton',
  password: 'BioCotton39558728cotton@',
  port: 3306,
  database: 'wordpress',
})

// function handleDisconnect() {
//   sqlconnection.connect(function (err) {
//     if (err) {
//       logger.error('error when connecting to db:', err)
//       setTimeout(handleDisconnect, 2000)
//     }
//   })
//   sqlconnection.on('error', function (err) {
//     logger.error('db error:', err)
//     if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//       // Connection to the MySQL server is usually
//       // lost due to either server restart, or a
//       // connnection idle timeout (the wait_timeout
//       // server variable configures this)
//       handleDisconnect()
//     } else {
//       throw err
//     }
//   })
// }
// handleDisconnect()
/**
 * Package mysql query language
 * @param {charset} sql
 * @param {function middleware} next
 * return Promise
 */
const sqlQueryPromise = function (sql, next) {
  return new Promise((resolve, NULL) => {
    sqlPoolconnection.query(sql, function (err, result) {
      if (err) {
        console.log(err)
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
module.exports = {
  sqlQueryPromise,
}
