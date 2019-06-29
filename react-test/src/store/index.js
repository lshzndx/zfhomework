import { createStore, combineReducers, applyMiddleware } from '../redux'
import createSagaMiddleware from '../redux-saga'
import thunk from '../redux-thunk'

import reducers from './reducers'
import logger from './middlewares/logger'
import {rootSaga} from './saga'
const sagaMiddleware = createSagaMiddleware()

const reducer = combineReducers(reducers)
const store = applyMiddleware(thunk.withExtraArgument('test'), sagaMiddleware, logger)(createStore)(reducer)
sagaMiddleware.run(rootSaga)
export default  store