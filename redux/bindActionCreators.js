/**
 * 通过封装，简化actions操作
 * @param {*} action
 * @param {*} dispatch
 * by liushuai
 */
const bindActionCreator = (action, dispatch) => payload => dispatch(action(payload))

export default (actions, dispatch) => {
  if (typeof actions === 'object')
    return Object.keys(actions).reduce((memo, actionKey) => (memo[actionKey] = bindActionCreator(actions[actionKey], dispatch), memo), {} )
  return bindActionCreator(actions)
}