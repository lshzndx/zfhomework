const Promise = require('./Promise')
// 测试Promise.all/race
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(100)
  }, 100)
})
let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(200)
  }, 200)
})
let p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(300)
  }, 300)
})
Promise.all([p1, p2, p3]).then(data => {
  console.log(data)
}).catch(e => {console.log(e)})
Promise.race([p1, p2, p3]).then(data => {
  console.log(data)
}).catch(e => {console.log(e)})

// 测试循环引用
const p4 = new Promise((resolve, reject) => {
  resolve(100)
})
const p5 = p4.then(v => {
  return p5
})
p5.catch(e => {
  console.log(e)
})
