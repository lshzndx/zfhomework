/*eslint-disable */
/**
 * redux-thunk核心实现
 * by liushuai
 */
const ReduxThunk = store => dispatch => action => {
  if (typeof action === 'function') action(dispatch, store.getState, ReduxThunk.api)
  else if (typeof action.then === 'function') action.then(dispatch)
  else dispatch(action)
}

ReduxThunk.withExtraArgument = api => (ReduxThunk.api = api, ReduxThunk)

export default ReduxThunk