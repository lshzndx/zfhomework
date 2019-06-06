/**
 * Koa完整实现
 * by liushuai
 */
const http = require('http')
const Stream = require('stream')
const context = require('./context')
const request = require('./request')
const response = require('./response')
const EventEmitter = require('events')

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
    ctx.res = ctx.response.res = res
    return ctx
  }
  compose(ctx) {
    const next = (index) => {
      if (index === this.middlewares.length) return Promise.resolve()
      const middleware = this.middlewares[index++]
      return Promise.resolve(middleware(ctx, () => next(index)))
    }
    return next(0)
  }
  handleRequest(req, res) {
    const ctx = this.createContext(req, res)
    const runnedMiddlewares = this.compose(ctx)
    runnedMiddlewares.then(() => {
      const body = ctx.body
      if (typeof body === 'object') return res.end(JSON.stringify(body))
      if (body instanceof Stream) return body.pipe(res)
      res.end(body)
    }).catch(err => this.emit('error', err))
  }
  listen() {
    const server = http.createServer(this.handleRequest.bind(this))
    server.listen(...arguments)
  }
}

module.exports = Koa