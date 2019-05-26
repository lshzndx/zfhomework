/**
 * 合并reducers模块
 * by liushuai
 */
export default reducers => (state = {}, action) => Object.keys(reducers).reduce((memo, reducerKey) => ((memo[reducerKey] = reducers[reducerKey](state[reducerKey], action)), memo),{})


