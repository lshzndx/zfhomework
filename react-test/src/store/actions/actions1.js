import { INCREMENT1, DECREMENT1, INCREMENT1ASYNC } from '../types'
export default {
  increment1(payload) {
    return {type: INCREMENT1, payload}
  },
  decrement1(payload) {
    return {type: DECREMENT1, payload}
  },
  increment1Async() {
    return {type: INCREMENT1ASYNC}
  },
  ReduxThunk() {
    return (dispatch, getState, api) => {
      console.log(api)
      setTimeout(() => dispatch({type: INCREMENT1}), 1000)
    }
  }
}