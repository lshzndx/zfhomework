const crypto = require('crypto')
module.exports = {
  sign(secret, key) {
    return  `${key}.${crypto.createHmac('sha256', secret).update(key).digest('base64')}`
  },
  unsign(secret, value) {
    const [key, signed] = value.split('.')
    return signed === crypto.createHmac('sha256', secret).update(key).digest('base64')
  }
}