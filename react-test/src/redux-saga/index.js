/* eslint-disable */

/**
 * redux-saga核心逻辑
 * by liushuai
 */
const createChannel = () => {
  const subscribers = {}
  const subscribe = (actionType, subscriber) => {
    subscribers[actionType] ? subscribers[actionType].push(subscriber) : (subscribers[actionType] = [subscriber])
  }
  const publish = action => {
    const callbacks = subscribers[action.type]
    if (callbacks) {
      delete subscribers[action.type]
      callbacks.forEach(callback => callback(action))
    }
  }
  return {subscribe, publish}
}

const createSagaMiddleware = () => {
  const sagaMiddleware = store => dispatch => {
    const channel = createChannel()
    const run = (generator, callback) => {
      const it = typeof generator[Symbol.iterator] === 'function' ? generator : generator()
      !function next(value) {
        const {value: effect, done} = it.next(value)
        if (!done) {
          if (typeof effect[Symbol.iterator] === 'function') run(effect), next(value)
          else if (typeof effect.then === 'function') effect.finally(next)
          else {
            switch(effect.type) {
              case 'TAKE':
                channel.subscribe(effect.actionType, next)
                break
              case 'PUT':
                dispatch(effect.action)
                next(value)
                break
              case 'ALL':
                const times = (length, callback) => {
                  let i = 0
                  return () => {++i === length && callback()}
                }
                const all = times(effect.generators.length, next)
                effect.generators.forEach(generator => run(generator, all))
                break
              case 'RACE':
                const done = callback => {
                  let called = false
                  return () => {!called && (called = true, callback())}
                }
                const once = done(next)
                effect.generators.forEach(generator => run(generator, once))
                break
              case 'CALL':
                effect.fn(...effect.args).then(next)
                break
              case 'FORK':
                run(effect.generator), next(value)
                break
              case 'CANCEL':
                effect.task.return(``)
                break
            }
          }
          return
        }
        callback && callback()
      }()
    }
    sagaMiddleware.run = run
    return action => {
      channel.publish(action)
      dispatch(action)
    }
  }
  return sagaMiddleware
}

export default createSagaMiddleware