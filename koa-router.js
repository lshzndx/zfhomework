/**
 * koa-router 中间件实现
 * by liushuai
 */
class KoaRouter {
  constructor() {
    this.middles = []
  }
  get(path, callback) {
    this.middles.push({path, callback})
  }
  compose(routers, ctx, next) {
    !function dispatch(index) {
      if (index.length === routers.length) return next()
      const router = routers[index++]
      router(ctx, () => dispatch(index))
    }(0)
  }
  routes() {
    return async (ctx, next) => {
      const {path} = ctx
      let routers = this.middles.filter(middle => middle.path === path)
      routers.map(router => router.callback)
      this.compose(routers, ctx, next)
    }
  }
}

module.exports = KoaRouter