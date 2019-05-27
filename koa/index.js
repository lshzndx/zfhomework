/**
 * Koa完整实现
 * by liushuai
 */
const http = require('http')
const EventEmitter = require('events')
const Stream = require('stream')
const context = require('./context')
const request = require('./request')
const response = require('./response')

class Koa extends EventEmitter {
  constructor() {
    super()
    this.middlewares = []
    this.context = Object.create(context)
    this.request = Object.create(request)
    this.response = Object.create(response)
  }
  use(middleware) {
    this.middlewares.push(middleware)
  }
  createContext(req, res) {
    const ctx = this.context
    ctx.request = this.request
    ctx.response = this.response
    ctx.req = ctx.request = req
    ctx.res = ctx.response = res
    return ctx
  }
  compose(ctx) {
    return !function next(index) {
      if (index === this.middlewares.length) return Promise.resolve()
      const middleware = this.middleware[index++]
      return Promise.resolve(middleware(ctx, () => next(index)))
    }(0)
  }
  handleRequest = (req, res) => {
    const ctx = this.createContext(req, res)
    const runMiddlewares = this.compose(ctx)
    runMiddlewares.then(() => {
      const body = ctx.body
      if (typeof body === 'object') return res.end(JSON.stringify(body))
      if (body instanceof Stream) return body.pipe(res)
      return res.end(body)
    })
  }
  listen() {
    const server = http.createServer(this.handleRequest)
    server.listen(...arguments)
  }
}

module.exports = Koa