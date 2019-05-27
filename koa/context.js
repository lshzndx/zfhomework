const context = {
  get url () {
    return this.request.url
  },
  get path() {
    return this.request.path
  },
  get query() {
    return this.request.query
  },
  get body() {
    return this.response.body
  },
  set body(value) {
    this.response.body = value
  }
}

module.exports = context