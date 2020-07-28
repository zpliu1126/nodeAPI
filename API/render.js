/*
 * @Author: zpliu
 * @Date: 2020-07-28 13:37:41
 * @Last Modified by: zpliu
 * @Last Modified time: 2020-07-28 13:41:41
 * this routers return the html file to client
 */

const express = require('express')
const path = require('path')
var router = express.Router()
//home page
router.get('/', function (req, res) {
  res.render('cottonweb.html')
})
module.exports = router
