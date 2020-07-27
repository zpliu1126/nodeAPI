var CryptoJS = require('crypto-js')

cryptPW = function (str) {
  return CryptoJS.HmacMD5(str, 'cotton').toString()
}
module.exports = {
  cryptPW,
}
