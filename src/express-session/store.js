class Store {
  constructor() {
    this.sessions = {}
  }
  generate(req) {
    req.session = {
      id: req.sessionID,
      req,
      cookie: req.headers.cookie
    }
    this.sessions[req.sessionID] = req.session
  }
  get(sessionID) {
    return new Promise((resolve, reject) => {
      let sess = this.sessions(sessionID)
      if (!this.sess) return resolve(null)
      resolve(sess)
    })
  }
}

module.exports = Store