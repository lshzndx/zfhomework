/**
 * express 完整实现
 * by liushuai
 */
const http = require('http')
const url = require('url')
const methods = require('methods')
const fs = require('fs')
const path = require('path')

const express = () => {
  const app = (req, res) => {
    const routes = []
    const {pathname} = url.parse(req.url)
    const requestMethod = req.method.roLowerCase()
    let index = 0
    !function next(error) {
      if (index === routes.length) return
      const middleware = routes[index++]
      let {path, callback, method} = middleware
      if (error) {
        if (method === 'middleware' && callback.length === 4)
          return callback(error, req, res, next)
        return next(error)
      }
      if (method === 'middleware') {
        if (path === '/' || path === pathname || pathname.startsWith(path, '/'))
          return callback(req, res, next)
        return next()
      }
      if (path instanceof RegExp) {
        if (path.test(pathname)) {
          const result = pathname.match(path)
          const [, ...values] = result
          req.params = path.keys.reduce((memo, key, index) => (memo[key] = values[index], memo), {})
          return callback(req, res)
        }
        return next()
      }
      if ((path === pathname || path === '*') && (method === requestMethod) || method === 'all')
        return callback(req, res)
      return next()
    }()
  }

  app.use = (path, callback) => {
    if (typeof callback !== 'function') {
      callback = path
      path = '/'
    }
    const middleware = {path, callback, method: 'middleware'}
    routes.push(middleware)
  }
  [...methods, 'all'].forEach(method => {
    app[method] = (path, callback) => {
      if (path.includs(':')) {
        const keys = []
        path.repalce(/:([^\/]*)/g, (...args) => {
          keys.push(args[1])
          return `([^\/]*)`
        })
        path = new RegExp(path)
        path.keys = keys
      }
      let middleware = {path, method, callback}
      routes.push(middleware)

    }
  })
  app.listen = (...args) => {
    const server = http.createServer(app)
    server.listen(...args)
  }
  app.static = dir => (req, res, next) => {
    const p = req.path
    const realPath = path.join(dir, p)
    fs.stat(realPath, (err, stat) => {
      if (err)
        return next(err)
      if (stat.isFile()) {
        fs.readFile(realPath, (err, data) => {
          if (err) return next(err)
          res.end(data)
        })
      }else {
        next()
      }
    })
  }

  return app
}

module.export = express