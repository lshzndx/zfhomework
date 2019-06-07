/**
 * express 完整实现
 * by liushuai
 */

const fs = require('fs')
const url = require('url')
const path = require('path')
const http = require('http')
const methods = require('methods')
const inlineMiddleware = require('./inlineMiddleware')
const express = () => {
  const routes = []
  const app = (req, res) => {
    const {pathname} = url.parse(req.url, true)
    const requestMethod = req.method.toLowerCase()
    let index = 0
    !function next(error) {
      if (index === routes.length) return res.end('Not found')
      const route = routes[index++]
      const {path, callback, method} = route
      // console.log(path, pathname, method, requestMethod)

      if (error) {
        console.log('error')
        if (callback.length === 4)
          return callback(error, req, res, next)
        return next(error)
      }
      if (path instanceof RegExp) {
        console.log('if (path instanceof RegExp)')
        if (path.test(pathname)) {
          const result = pathname.match(path)
          const [, ...values] = result
          req.params = req.keys.reduce((memo, key, index) => (memo[key] = values[index], memo), {})
          return callback(req, res, next)
        }
        return next()
      }
      if ((path === pathname || path === '/') && method === 'middleware') {
        console.log('if middleware')
        return callback(req, res, next)
      }

      if ((path === pathname || path === '*') && (method === requestMethod || method === 'all')) {
        console.log('if route')
        return callback(req, res, next)

      }
      return next()
    }()
  }

  app.use = (path, callback) => {
    if (typeof callback !== 'function') {callback = path, path = '/'}
    routes.push({path, callback, method: 'middleware'})
  }

  [...methods, 'all'].forEach(method => {
    app[method] = (path, callback) => {
      if (path.includes(':')) {
        const keys = []
        path.repalce(/:([^\/]*)/g, (...args) => (keys.push(args[1]), `([^\/]*)`))
        path = new RegExp(path)
        path.keys = keys
      }
      routes.push({path, method, callback})
    }
  })

  app.listen = (...args) => {
    const server = http.createServer(app)
    server.listen(...args)
  }

  app.static = dir => (req, res, next) => {
    const {pathname} = url.parse(req.url, true)
    const absPath = path.join(__dirname, dir, pathname)
    const rs = fs.createReadStream(absPath)
    rs.pipe(res)
    rs.on('error', err => next())
  }

  app.use(inlineMiddleware)

  return app
}

module.exports = express