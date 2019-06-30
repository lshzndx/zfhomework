/**
 * compose实现
 * by liushuai
 */

export default (...hocs) => hocs.reduce((a, b) => BaseComponent => a(b(BaseComponent)))
