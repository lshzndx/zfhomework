module.exports = (req, res, next) => {
  res.send = body => {
    if (body instanceof Buffer) {
      return res.end(body)
    }
    res.end(JSON.stringify(body))
  }
  next()
}