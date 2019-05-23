/**
 * 合并reducers模块
 * by liushuai
 */
export default reducers => (state = {}, action) => Object.keys(reducers).reduce((obj, reducerKey) => ((obj[reducerKey] = reducers[reducerKey](state[reducerKey], action)), obj),{})
