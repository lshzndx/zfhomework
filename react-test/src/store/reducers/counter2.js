import { INCREMENT2, DECREMENT2 } from "../types";

export default (state = {number: 0}, action) => {
  switch(action.type) {
    case INCREMENT2:
      return {...state, number: state.number + 1}
    case DECREMENT2:
      return {...state, number: state.number - 1}
    default:
      return state
  }
}