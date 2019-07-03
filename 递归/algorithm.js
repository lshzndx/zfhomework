/**
 * 常见算法的递归实现
 * by liushuai
 */

 /**
 * 全排列
 */
function perm(arr) {
  if (arr.length <= 1) return [arr]
  return arr.map((a, i) => (perm([...arr.slice(0, i), ...arr.slice(i + 1)]).map(permItem => [a, ...permItem]))).reduce((permResultA, permResultB) => ([...permResultA, ...permResultB]))
}
/**
 * 八皇后问题
 * 共计92组解 console.log(queen()) -> 皇后的摆放坐标
 */
function queen() {
  const queen = [0, 1, 2, 3, 4, 5, 6, 7] // 数组中每一项的值代表行，其下标代表列
  const permedQueens = perm(queen) // 任意两两交换的所有组合
  const result = permedQueens.filter(queen => { // 只需要过滤正斜线和反斜线，不需要考虑行和列
    const slash = queen.map((row, col) => row - col)
    const backlash = queen.map((row, col) => row + col)
    if (new Set(slash).size < slash.length || new Set(backlash).size < backlash.length) return false
    return true
  }).map(queen => queen.map((row, col) => [row, col]))
  return result
}
/**
 * 01背包问题
 * @param {*} goods Array<{weight: number, value: number}>
 * @param {*} capacity number
 */
function pack(goods, capacity) {
  let preMax = [], currentMax = [], subCapacity
  goods.forEach((g, i) => {
    subCapacity = capacity - g.weight
    if (subCapacity >= 0) {
      currentMax = [g, ...pack(goods.slice(0, i).concat(goods.slice(i + 1)), subCapacity)]
      if ((preMax.length && preMax.reduce((value, next) => value + next.value, 0)) < (currentMax.length && currentMax.reduce((value, next) => value + next.value, 0)))
        preMax = currentMax
    }
  })
  return preMax
}
/**
 * 钢条切割问题
 * @param {*} length key in keyof typeof priceTable
 * priceTable: 价格表
 */
const priceTable = {1: 1, 2: 5, 3: 8, 4: 9, 5: 10, 6: 17, 7: 17, 8: 20, 9: 24, 10: 30}
function cut(length) {
  if (length === 1) return [length]
  let result = [length], subLength, nextResult
  for (let first = 1; first < length; first++) {
    subLength = length - first
    nextResult = [first, ...cut(subLength)]
    if (result.reduce((value, key) => value + priceTable[key], 0) < nextResult.reduce((value, key) => value + priceTable[key], 0))
      result = nextResult
  }
  return result
}
/**
 * 最长公共子序列问题
 * const X = ['A', 'B', 'C', 'B', 'D', 'A', 'B']
 * const Y = ['B', 'D', 'C', 'A', 'B', 'A']
 * console.log(lcs(X, Y)) -> [ 'B', 'C', 'B', 'A' ]
 */
function lcs (X, Y) {
  if (X.length === 0 || Y.length === 0) return []
  if (X[0] === Y[0]) return [X[0], ...lcs(X.slice(1), Y.slice(1))]
  const result1 = lcs(X.slice(1), Y), result2 = lcs(X, Y.slice(1))
  return result1.length > result2.length ? result1 : result2
}
/**
 * 硬币最小找零
 * amount = 100 -> [50, 50]
 * amount = 20 -> [20]
 */
function makeChange(amount) {
  const coins = [1, 5, 10, 20, 50]
  let minResult = [], subAmount, subMinResult
  coins.forEach(value => {
    subAmount = amount - value
    if (subAmount >= 0)
      subMinResult = makeChange(subAmount)
    if (subAmount >= 0 && (subMinResult.length < minResult.length -1 || !minResult.length) && (subAmount.length || !subAmount))
      minResult = [value, ...subMinResult]
  })
  return minResult
}
/**
 * 数组展平
 */
const flatten = arr => ( arr.reduce((flattened, cur) => ([...flattened, ...(Array.isArray(cur) ? flatten(cur) : [cur])]), []))
/**
 * 快速排序
 */
function quickSort(arr) {
  if (arr.length <= 1) return arr
  const [first, ...rest] = arr
  const larger = [], smaller = []
  rest.forEach(value => value > first ? larger.push(value) : smaller.push(value))
  return [...quickSort(smaller), first, ...quickSort(larger)]
}
/**
 * 归并排序
 */
function mergeSort(arr) {
  if (arr.length <= 1) return arr
  if (arr.length === 2) {
    if (arr[0] > arr[1]) return [arr[1], arr[0]]
    return arr
  }
  const middle = Math.ceil(arr.length / 2)
  let left = arr.slice(0, middle)
  let right = arr.slice(middle)
  left = mergeSort(left)
  right = mergeSort(right)
  return merge(left, right)
}
function merge(left, right) {
  let len = left.length + right.length
  const arr = []
  let l, r
  while(len--) {
    l = left[0] === undefined ? Number.POSITIVE_INFINITY : left[0]
    r = right[0] === undefined ? Number.POSITIVE_INFINITY : right[0]
    if (l < r) arr.push(left.shift())
    else arr.push(right.shift())
  }
  return arr
}
/**
 * 堆排序
 */
const swap = (arr, i, j) => {[arr[i], arr[j]] = [arr[j], arr[i]]}
function heapSort(arr) {
  buildMaxHeap(arr)
  for(let size = arr.length; size > 0; size--) {
    swap(arr, 0, size - 1)
    maxHeapify(arr, 0, size - 1)
  }
}
function buildMaxHeap(arr) {
  const bottom = Math.floor(arr.length / 2)
  for(let node = bottom - 1; node >= 0; node--) {
    maxHeapify(arr, node, arr.length)
  }
}
function maxHeapify(arr, node, size) {
  let max = node
  const l = node * 2 + 1
  const r = node * 2 + 2
  if(l < size && arr[l] > arr[max]) max = l
  if(r < size && arr[r] > arr[max]) max = r
  if(max === node) return
  swap(arr, node, max)
  maxHeapify(arr, max, size)
}
/**
 * 异步递归创建目录（基于callback）(为突出递归逻辑实现，不考虑边界条件)
 * a/b/c -> - a
 *            - b
 *              - c
 */
const fs = require('fs')
function mkdir(dir, callbak) {
  fs.mkdir(dir, err => {
    if(err) {
      const parent = dir.split('/').slice(0, -1).join('/')
      return mkdir(parent, () => mkdir(dir, callbak))
    }
    callbak(null, `创建完成`)
  })
}
/**
 * 异步递归创建目录（Promise版）(为突出递归逻辑实现，不考虑边界条件)
 * a/b/c -> - a
 *            - b
 *              - c
 */
function mkdirPromise(dir) {
  return new Promise((resolve, reject) => {
    fs.mkdir(dir, err => {
      if (err) {
        const parent = dir.split('/').slice(0, -1).join('/')
        return mkdirPromise(parent).then(() => {mkdirPromise(dir).then(resolve, reject)})
      }
      resolve(`创建完成`)
    })
  })
}
/**
 * 异步递归删除目录（callback版）
 */
function rmdir(dir, callback) {
  fs.stat(dir, (err, stat) => {
    if (stat.isDirectory()) {
      fs.rmdir(dir, err => {
        if(err) {
          fs.readdir(dir, (err, files) => {
            let index = 0
            const next = () => { if (++index === files.length) rmdir(dir, callback) }
            files.forEach(file => {
              const currentPath = path.resolve(dir, file)
              rmdir(currentPath, next)
            })
          })
          return
        }
        callback(null, `删除完毕`)
      })
    }else
      fs.unlink(dir, callback)
  })
}
/**
 * 异步递归删除目录（Promise版）
 */
function rmdirPromise(dir) {
  return new Promise((resolve, reject) => {
    fs.stat(dir, (err, stat) => {
      if (stat.isDirectory()) {
        fs.rmdir(dir, err => {
          if (err) {
            const promises = []
            fs.readdir(dir, (err, files) => {
              files.forEach(file => {
                const currentPath = path.resolve(dir, file)
                const promise = rmdirPromise(currentPath)
                promises.push(promise)
              })
            })
            return Promise.all(promises).then(() => rmdirPromise(dir).then(resolve, reject))
          }
          resolve()
        })
      }else {
        fs.unlink(dir, resolve)
      }
    })
  })
}
/**
 * commonjs
 */
const path = require('path')
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
 * requirejs
 */
const factories = {}
function define(moduleName, dependencies, factory) {
  factory.dependencies = dependencies
  factories[moduleName] = factory
}
function require(dependedModules, callback) {
  const result = dependedModules.map(moduleName => {
    const factory = factories[moduleName]
    const dependencies = factory.dependencies
    return require(dependencies, factory)
  })
  return callback(...result)
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
  if (a instanceof Date || b instanceof Date) return (a.getTime && a.getTime()) === (b.getTime && b.getTime())
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
/**
 * 树深度优先遍历（先序|中序|后序）
 * class Tree {
 *   constructor(v, children) {
 *     this.v = v
 *     this.children = children
 *   }
 * }
 * const tree = new Tree(10, [
 *   new Tree(5),
 *   new Tree(3, [
 *     new Tree(7),
 *     new Tree(11)
 *   ]),
 *   new Tree(2)
 * ])
 * console.log(...traverse(tree, 0)) -> [ 10, 5, 3, 7, 11, 2 ]
 */
function* traverse(tree, ord) {
  let traversed = false
  let children = tree.children
  if (children) {
    for (let i = 0; i < children.length; i++) {
      if (ord === i) {
        traversed = true
        yield tree.v
      }
      yield* traverse(children[i], ord)
    }
  }
  if(!traversed)
    yield tree.v
}
