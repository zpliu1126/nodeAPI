const mysql = require('mysql')

const sqlconnection = mysql.createConnection({
  host: 'localhost',
  user: 'BioCotton',
  password: 'BioCotton39558728cotton@',
  port: 3306,
})
const sqlPoolconnection = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  user: 'BioCotton',
  password: 'BioCotton39558728cotton@',
  port: 3306,
})

module.exports = {
  connection: sqlconnection,
  sqlPoolconnection,
}
