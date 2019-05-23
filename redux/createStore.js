/**
 * 核心方法
 * by liushuai
 */
import { INIT } from './types'
export default (reducers, preloadedState) => {
  let currentListeners = []
  let currentReducers = reducers
  let currentState = preloadedState

  const getState = () => currentState
  const dispatch = action => {
    currentState = currentReducers(currentState, action)
    currentListeners.forEach(listener => listener())
  }
  const subscribe = listener =>{
    currentListeners.push(listener)
    let subscribed = true
    return () => {
      if (subscribed) {
        const index = currentListeners.indexOf(listener)
        currentListeners.splice(index, 1)
        subscribed = false
      }
    }
  }

  dispatch({type: INIT})
  return {
    getState,
    dispatch,
    subscribe
  }
}