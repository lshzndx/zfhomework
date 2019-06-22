/**
 * dva核心实现
 * by liushuai
 */
import React from 'react'
import reactDom from 'react-dom'
import createSagaMiddleware from 'redux-saga'
import * as effects from 'redux-saga/effects'
import { createStore, combineReducers, Provider } from 'redux'
const dva = () => {
  let CurrentRootComponent
  const currentModels = []

  const model = model => currentModels.push(model)

  const router = fnComponent => CurrentRootComponent = fnComponent

  const start = root => {
    const reducers = currentModels.reduce((reducer, model) => {
      const {namespace, reducers, state} = model
      reducer[namespace] = (state = state, action) => {
        const [actionNamespace, actionType] = action.type.split('/')
        if (actionNamespace === namespace) 
          state = typeof reducers[action.type] === 'function' ? reducers[actionType](state) : state
        return state
      }
      return reducer
    }, {})

    function* rootSaga () {
      for(const model of currentModels) {
        const {namespace, effects: currentEffects = {}} = model
        for (const key in currentEffects) {
          yield effects.takeEvery(`${namespace}/${key}`, currentEffects[key], effects)
        }
      }
    }

    const sagaMiddleware = createSagaMiddleware()
    const reducer = combineReducers(reducers)

    const store = createStore(sagaMiddleware)(reducer)

    sagaMiddleware.run(rootSaga)

    reactDom.render(<Provider store={store}><CurrentRootComponent /></Provider>, document.querySelector(root))
  }

  return {model, router, start}
}

export default dva