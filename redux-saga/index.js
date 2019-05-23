/**
 * redux-saga核心逻辑
 * by liushuai
 */

const createChannel = () => {
    const subscribers = {}
    const subscribe = (actionType, callback) => {
        subscribers[actionType] ? subscribers[actionType].push(callback) : (subscribers[actionType] = [callback])
    }
    const publish = action => {
        const callbacks = subscribers[action.type]
        callbacks && callbacks.forEach(callback => callback(action)), delete subscribers[action.type]
    }
    return {subscribe, publish}
}

export default function createSagaMiddleware() {
    const channel = createChannel()
    const sagaMiddleware = store => {
        return dispatch => {
            const run = (generator, callback) => {
                const it = typeof generator[Symbol.iterator] === 'function' ? generator : generator()
                !function next(value) {
                    let {value: effect, done} = it.next()
                    if (!done) {
                        if (typeof effect[Symbol.iterator] === 'function') run(effect), next()
                        else if (typeof effect.then === 'function') effect.then(next)
                        else {
                            switch(effect.type) {
                                case 'TAKE':
                                    channel.subscribe(effect.actionType, next)
                                    break
                                case 'PUT':
                                    dispatch(effect.type)
                                    break
                                case 'ALL':
                                    const times = (length, callback) => {
                                        let i = 0
                                        return () => {++i === length && callback()}
                                    }
                                    const done = times(effect.generators.length, next)
                                    effect.generators.forEach(generator => run(generator, done))
                                    break
                                case 'RACE':
                                    const done = callback => {
                                        let called = false
                                        return () => {
                                            if (!called) 
                                                called = true, callback()
                                        }
                                    }
                                    const once = done(next)
                                    effect.generators.forEach(generator => run(generator, once))
                                    break
                                case 'CALL':
                                    effect.fn(...effect.args), next()
                                    break
                                case 'FORK':
                                    run(effect.generator), next()
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
    }
    return sagaMiddleware
}