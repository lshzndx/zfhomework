import { INCREMENT2, DECREMENT2 } from '../types'
export default {
  increment2(payload) {
    return {type: INCREMENT2, payload}
  },
  decrement2(payload) {
    return {type: DECREMENT2, payload}
  }  
}