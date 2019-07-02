/**
 * express-session
 * by liushuai
 */
const uuid = require('uuid')
const querystring = require('querystring')
const signature = require('./signature')
const sessions = {}
const session = options => {
  const {secret} = options
  const {maxAge} = options.cookie || {}
  if (!secret)
    throw new Error(`secret option required for sessions`)
  return (req, res, next) => {
    const cookie = querystring.parse(req.headers['cookie'], '; ')
    let id = cookie['connect.sid']
    if (id && sessions[id] && sessions[id].cookie.expires < Date.now())
      delete sessions[id]
    if (!id || !signature.unsign(secret, id)) {
      id = signature.sign(secret, uuid.v4())
      sessions[id] = {cookie: {...cookie, maxAge: maxAge ? maxAge : Number.POSITIVE_INFINITY}}
      res.setHeader('Set-Cookie', `connect.sid=${id}`)
    }
    sessions[id].cookie.expires = Date.now() + maxAge
    req.session = sessions[id]
    next()
  }
}

module.exports = session
