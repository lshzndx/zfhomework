exports.sign = function(val, secret) {
  return crypto.createHmac(secret).update(val).digest('base64').replace(/\=+$/, '')
}
exports.unsign = function(val, secret) {
  if (!val || !val.startsWith('s:')) return false
  let raw = val.slice(2, val.lastIndexOf('.'))
  return val.slice(2) === this.sign(raw, secret) ? raw : false
}