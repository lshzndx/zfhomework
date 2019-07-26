/**
 * co 实现 by liushuai
 * @param {Generator | Iterable} iterator 
 */
const co = iterator => 
  new Promise((resolve, reject) => {
    iterator = typeof iterator[Symbol.iterator] === 'function' ? iterator : iterator()
    function next(data) {
      const {value, done} = iterator.next(data)
      if (done) resolve(value)
      else value.then(next, reject)
    }
    next()    
  })

module.exports = co
