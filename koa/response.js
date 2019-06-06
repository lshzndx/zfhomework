const response = {
  set body(value) {
    this._body = value
  },
  get body() {
    return this._body
  },
  get(key) {
    return this[key]
  }
}

module.exports = response