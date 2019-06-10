import { createStore, combineReducers, applyMiddleware } from '../redux'
import reducers from './reducers'
import logger from './middlewares/logger'
const reducer = combineReducers(reducers)
const store = applyMiddleware(logger)(createStore)(reducer)

export default  store