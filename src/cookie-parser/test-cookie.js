const express = require('express')
const cookieParser = require('./index.js')

let app = express()

app.use(cookieParser('abc'))

app.get('/set', (req, res) => {
  let name = 's:' + cookieParser.sign('zf', req.secret)
  res.setHeader('Set-Cookie', ['age=3; Max-Age=10; ', `name=${name}; `])
  // res.cookie('name', 'zf', {signed: true})
  res.end('set')
})

app.get('/get', (req, res) => {
  console.log(req.headers.cookie.expires)
  res.end('get')
})

app.listen(3000)