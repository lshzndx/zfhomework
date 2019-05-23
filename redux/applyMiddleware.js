/**
 * redux中间件模块
 * by liushuai
 */
import compose from './compose'
export default (...middlewares) => createStore => reducers => {
  const store = createStore(reducers)
  let dispatch = () => {
    throw new Error(`not ready`)
  }
  let middlewareApi = {
    getState: store.getState,
    dispatch: (...args) => dispatch(...args)
  }
  const chain = middlewares.map(middleware => middleware(middlewareApi))
  dispatch = compose(chain)(store.dispatch)
  return {...store, dispatch}
}
