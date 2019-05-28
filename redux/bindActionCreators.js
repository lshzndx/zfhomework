/**
 * 通过封装，简化actions操作
 * @param {*} action
 * @param {*} dispatch
 * by liushuai
 */
const bindActionCreator = (action, dispatch) => value => dispatch(action(value))

export default (actions, dispatch) => {
  if (typeof actions === 'object')
    return Object.keys(actions).reduce((obj, actionKey) => (obj[actionKey] = bindActionCreator(actions[actionKey], dispatch), obj), {} )
  else if (typeof actions === 'function')
    return bindActionCreator(actions)
}