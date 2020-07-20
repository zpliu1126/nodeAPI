/**
 * mysql connection promise
 *
 */
const connection = require(path.join(__dirname, '/mysqlconf.js')).connection
const logger = require(path.join(__dirname, '../utils/log4js.js')).getLogger()
// console.log(mysqlconnection)
module.exports = {
  connection,
  logger,
}
