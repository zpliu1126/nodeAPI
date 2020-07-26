const express = require('express')
var app = express() //init server
var session = require('express-session') //use session
var FileStore = require('session-file-store')(session) //use file store session

path = require('path')
const confVar = require(path.join(__dirname, 'conf/conf.js'))
// open static resource
app.use('/public/', express.static('./public/'))

//use express-session
var fileStoreOptions = {
  ttl: 86400, //session文件一天后清理
  path: path.join(__dirname, './sessions'),
}
app.use(
  session({
    secret: 'cotton',
    name: 'token',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 86400000, //cookie一天之后过期
      path: '/',
    },
    store: new FileStore(fileStoreOptions),
  })
)

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
 * load router
 */
const loadRouter = require(path.join(__dirname, 'API/index.js'))
loadRouter(app)

/**
 * node run port
 */
app.listen(8080, function () {
  logger.info('The server is running in 8080 port')
})
