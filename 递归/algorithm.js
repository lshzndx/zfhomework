/**
 * 常见算法的递归实现
 * by liushuai
 */

/**
 * 快速排序
 */
function quickSort(arr) {
  if (arr.length === 0) return arr
  const [first, ...rest] = arr
  const larger = [], smaller = []
  rest.forEach(value => value > first ? larger.push(value) : smaller.push(value))
  return [...quickSort(smaller), first, ...quickSort(larger)]
}
/**
 * 全排列
 */
function perm(arr) {
  if (arr.length <= 1) return [arr]
  return arr.map((a, i) => (perm([...arr.slice(0, i), ...arr.slice(i + 1)]).map(permItem => [a, ...permItem]))).reduce((permResultA, permResultB) => ([...permResultA, ...permResultB]))
}
/**
 * commonjs
 */
const fs = require('fs')
const cachedModule = {}
function req(moduleId) {
  if (cachedModule[moduleId]) return cachedModule[moduleId]
  moduleId = path.join(__dirname, moduleId)
  const content = fs.readFileSync(moduleId)
  const module = {exports: {}}
  const fn = new Function('module', 'exports', '__dirname', '__filename', 'req', `${content}\r\nreturn module.exports`)
  fn(module, module.exports, __dirname, __filename, req)
  cachedModule[moduleId] = module.exports
  return module.exports
}
/**
 * 深度拷贝
 */
function deepClone(obj) {
  if (typeof obj !== 'object' || obj === null) return obj
  let clonedObj 
  if (obj instanceof Date || obj instanceof RegExp)
    clonedObj = new obj.constructor(obj)
  else
    clonedObj = new obj.constructor
  Object.keys(obj).forEach(key => clonedObj[key] = deepClone(obj[key]))
  return clonedObj
}
/**
 * 深度比较
 */
function deepCompare(a, b) {
  if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) return a === b
  if (a instanceof Date || b instanceof Date) return new Date(a).getTime() === new Date(b).getTime()
  if (a instanceof RegExp || b instanceof RegExp) return a.toString() === b.toString()
  const keysA = Object.keys(a)
  const keysB = Object.keys(b)
  if (keysA.length !== keysB.length) return false
  return keysA.every(key => deepCompare(a[key], b[key]))
}
/**
 * 括号平衡
 * str = '({()})' -> true
 */
const match = (left, right) => left === '(' && right === ')' || left === '{' && right === '}' || left === '[' && right === ']'
const isBalance = str => [...str].reduce((stack, cur) => (match(stack[stack.length - 1], cur) ? stack.pop() : stack.push(cur), stack), []).length === 0



