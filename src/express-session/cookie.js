let { sign, unsign } = require('./signature')

class Cookie {
  constructor(req, options = {}) {
    this.req = req
    this.expires = options.expires || Date.now() + 1000 * 60 * 60
    this.cookies = this.parse()
  }
  parse() {
    let cookies = {}
    if (this.req.headers.cookie) {
      let arr = this.req.headers.cookie.split('; ')
      cookies = arr.reduce((memo, current) => {
        let cookie = current.split('=')
        let key = cookie[0]
        let value = cookie[1]
        memo[key] = value
        return memo
      }, {})
    }
    return cookies
  }

  get(name, secret) {
    let val = this.cookies[name]
    val = unsign(val, secret)
    return val ? val : false
  }
}

module.exports = Cookie