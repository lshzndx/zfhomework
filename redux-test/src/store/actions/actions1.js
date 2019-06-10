import { INCREMENT1, DECREMENT1 } from '../types'
export default {
  increment1(payload) {
    return {type: INCREMENT1, payload}
  },
  decrement1(payload) {
    return {type: DECREMENT1, payload}
  }  
}