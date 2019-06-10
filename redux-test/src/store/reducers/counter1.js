import { INCREMENT1, DECREMENT1 } from '../types'
export default (state = {number: 0}, action) => {
  switch(action.type) {
    case INCREMENT1:
      return {...state, number: state.number + 1}
    case DECREMENT1:
      return {...state, number: state.number - 1}
    default: 
      return state
  }
}