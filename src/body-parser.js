const express = require('express')

let bodyParser = {
  json() {
    return (req, res, next) => {
      if (req.headers['content-type'] === 'application/json') {
        let arr = []
        req.on('data', chunk => {arr = [...arr, chunk]})
        req.on('end', () => {
          req.body = JSON.parse(Buffer.concat(arr).toString())
          next()
        })
      }else {
        next()
      }
    }
  },
  urlencoded() {
    return (req, res, next) => {
      if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let arr = []
        req.on('data', chunk => (arr = [...arr, chunk]))
        req.on('end', () => {
          let queryString = Buffer.concat(arr).toString()
          let queryArr = queryString.split('&')
          let memo = queryArr.reduce((memo, current) => {
            let cArr = current.split('=')
            let key = cArr[0]
            let value = cArr[1]
            memo[key] = value
            return memo
          }, {})
          req.body = memo
          next()
        })
      }else {
        next()
      }
    }
  }
}

let app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.post('/json', (req, res, next) => {
  console.log(typeof req.body);
  res.setHeader('Content-Type', 'application/json;charset="utf-8"')
  res.end(JSON.stringify(req.body))

})
app.post('/urlencoded', (req, res, next) => {
  console.log(typeof req.body);
  res.setHeader('Content-Type', 'application/x-www-form-urlencoded;charset="utf-8"')
  res.end(JSON.stringify(req.body))
})

app.listen(3000)