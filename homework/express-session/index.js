const Store = require('./store')
const Cookie = require('./cookie')
module.exports = session

function session(options) {
  let name = options.name || 'connect.sid'
  let secret = options.secret
  let store = new Store
  return (req, res, next) => {
    let cookie = new Cookie(req)
    req.cookies = cookie.cookies
    req.sessionID = cookie.get(name, secret)
    if (!req.sessionID) {
      store.generate(req)
      next()
      return
    }
    store.get(req.sessionID).then(sess => {
      if (sess) req.session = sess
      next()
    }, next)
  }
}