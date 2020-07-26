/**
 * auth router
 */
var routers = []
const authRouter = require(path.join(__dirname, 'auth/index.js'))
routers.push(authRouter)
/**
 * test router API
 */
const peopleRouter = require(path.join(__dirname, 'people/peopleRouter.js'))
routers.push(peopleRouter)

/**
 * primer router API
 */
const primerRouter = require(path.join(__dirname, 'primer/primerRouter.js'))
routers.push(primerRouter)

errRouter = function (err, req, res, next) {
  res.json(err)
}

fourOFourRouter = function (req, res) {
  res.json({
    code: 404,
  })
}

module.exports = function (app) {
  routers.forEach((item) => {
    app.use(item)
  })
  app.use(errRouter)
  app.use(fourOFourRouter)
}
