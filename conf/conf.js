/**
 * mysql connection promise
 *
 */
const sqlQueryPromise = require(path.join(__dirname, '/mysqlconf.js'))
  .sqlQueryPromise
const logger = require(path.join(__dirname, '../utils/log4js.js')).getLogger()
// console.log(mysqlconnection)
module.exports = {
  sqlQueryPromise,
  logger,
}
