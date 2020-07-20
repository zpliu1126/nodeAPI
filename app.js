const express = require('express')
var app = express() //init server
path = require('path')
const confVar = require(path.join(__dirname, 'conf/conf.js'))
// open static resource
app.use('/public/', express.static('./public/'))

/**
 * config template engine;
 * config template directory
 */

app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, 'views'))
/**
 *deal the post of client
 *send JSON data
 *
 */
const bodayParse = require('body-parser')
app.use(bodayParse.urlencoded({ extended: false }))
app.use(bodayParse.json())
logger = confVar.logger
// logger.debug('This little thing went to market')
// logger.info('This little thing stayed at home')
// logger.error('This little thing had roast beef')
// logger.fatal('This little thing had none')
// logger.trace('and this little thing went wee, wee, wee, all the way home.')

/**
 * test router API
 */
const testRouter = require(path.join(__dirname, 'API/people/peopleRouter.js'))
app.use(testRouter)

/**
 * primer router API
 */
const primerRouter = require(path.join(__dirname, 'API/primer/primerRouter.js'))
app.use(primerRouter)

/**
 *error middleware
 */
app.use(function (err, req, res, next) {
  res.json(err)
})
/**
 * reponse:404
 * errCode: 1
 */
app.use(function (req, res) {
  res.json({
    code: 404,
  })
})
/**
 * node run port
 */
app.listen(8080, function () {
  logger.info('The server is running in 8080 port')
})
