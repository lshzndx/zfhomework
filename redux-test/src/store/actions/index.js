
import { INCREMENT1, DECREMENT1, INCREMENT2, DECREMENT2 } from './types'
export default {
  increment1(payload) {
    return {type: INCREMENT1, payload}
  },
  decrement1(payload) {
    return {type: DECREMENT1, payload}
  },
  increment2(payload) {
    return {type: INCREMENT2, payload}
  },
  decrement2(payload) {
    return {type: DECREMENT2, payload}
  }
}