const crypto = require('crypto')
// const cookieParser = require('cookie-parser')
let cookieParser0 = (secret) => {
  return (req, res, next) => {
    req.secret = secret
    req.cookies = {}
    if (req.headers.cookie) {
      let arr = req.headers.cookie.split('; ')
      let memo = arr.reduce((memo, current) => {
        let arr = current.split('=')
        let key = arr[0]
        let value = arr[1]
        memo[key] = value
        return memo
      }, {})
      req.cookies = memo
    }
    next()
  }
}
let cookieParser = (secret) => {
  return (req, res, next) => {
    req.secret = secret
    req.cookies = {}
    req.signedCookies = {}
    if (req.headers.cookie) {
      let arr = req.headers.cookie.split('; ')
      arr.forEach((cookie) => {
        let arr = cookie.split('=')
        let key = arr[0]
        let value = arr[1]
        if (value.startsWith('s:')) {
          req.signedCookies[key] = cookieParser.unsign(value, secret) ? value.slice(2, value.lastIndexOf('.')) : false
        }else {
          req.cookies[key] = value
        }
      })
    }
    next()
  }
}
// citicbank.6Dg6vLQ+7q5KuH+NSA9JTG9q/QnxAEtcb4VRSNA51us=
// citicbank.6Dg6vLQ+7q5KuH+NSA9JTG9q/QnxAEtcb4VRSNA51us
cookieParser.sign = function(val, secret) {
  return `${val}.${crypto.createHmac('sha256', secret).update(val).digest('base64').replace(/\=+$/, '')}`
}

cookieParser.unsign = function(val, secret) {
  val = val.slice(2)
  let source = val.slice(0, val.lastIndexOf('.'))
  return val === `${source}.${crypto.createHmac('sha256', secret).update(source).digest('base64').replace(/\=+$/, '')}`
}

module.exports = cookieParser