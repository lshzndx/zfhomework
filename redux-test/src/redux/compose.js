/**
 * 聚合同步执行的中间件，实现洋葱模型
 * by liushuai
 */
export default funcs => funcs.reduce((a, b) => (...args) => a(b(...args)))