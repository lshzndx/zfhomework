/**
 * Promise对象，es6版本
 * by liushuai
 */
class Promise {
  constructor(executor) {
    this.state = Promise.State.PENDING
    this.value = null
    this.reason = null
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []
    this.executor = typeof executor === 'function' ? executor : () => { }
    this.executor(this._resolve.bind(this), this._reject.bind(this))
  }

  _resolve(val) {
    if (this.state === Promise.State.PENDING) {
      if (val instanceof Promise) {
        val.then(this._resolve.bind(this), this._reject.bind(this))
        return
      }
      this.state = Promise.State.FULFILLED
      this.value = val
      setTimeout(() => {
        this.onFulfilledCallbacks.forEach(callback => {
          let [onFulfilled, resolve, reject, promise2] = callback
          if (typeof onFulfilled === 'function') {
            try {
              let x = onFulfilled.call(null, this.value)
              this._resolvePromise([promise2, resolve, reject], x)
            } catch (e) {
              reject(e)
            }
          } else {
            resolve(this.value)
          }
        })
      })
    }
  }

  _reject(reason) {
    if (this.state === Promise.State.PENDING) {
      this.state = Promise.State.REJECTED
      this.reason = reason
      setTimeout(() => {
        this.onRejectedCallbacks.forEach(callback => {
          let [onRejected, resolve, reject, promise2] = callback
          if (typeof onRejected === 'function') {
            try {
              let x = onRejected.call(null, this.reason)
              this._resolvePromise([promise2, resolve, reject], x)
            } catch (e) {
              reject(e)
            }
          } else {
            reject(this.reason)
          }
        })
      })
    }
  }

  _resolvePromise([promise2, resolve, reject], x) {
    if (x === promise2) {
      return reject(new TypeError(`循环引用`))
    }
    if (x instanceof Promise) {
      return x.then(resolve, reject)
    }
    if (typeof x === 'object' && x !== null || typeof x === 'function') {
      let called = false
      const then = x.then
      if (typeof then === 'function') {
        try {
          then.call(x, y => {
            if (!called) {
              this._resolvePromise([promise2, resolve, reject], y)
              called = true
            }
          }, r => {
            if (!called) {
              reject(r)
              called = true
            }
          })
        }catch(e) {
          if (!called) {
            reject(e)
            called = true
          }
        }
      }else {
        resolve(x)
      }

      return
    }
    resolve(x)
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : err => {throw err}
    let promise2
    promise2 = new Promise((resolve, reject) => {
      this.onFulfilledCallbacks = [...this.onFulfilledCallbacks, [onFulfilled, resolve, reject, promise2]]
      this.onRejectedCallbacks = [...this.onRejectedCallbacks, [onRejected, resolve, reject, promise2]]
    })
    return promise2
  }

  catch(onRejected) {
    return this.then(null, onRejected)
  }

  finally(onFinally) {
    return Promise.resolve(this).then(onFinally, onFinally)
  }

  static all(iterable) {
    if (!iterable || !iterable.length) throw new Error('params must be an iterable object')
    if (iterable.length === 0) return Promise.resolve([])
    return new Promise((resolve, reject) => {
      let count = 0
      const result = []
      const onFulfilled = index => value => {
        result[index] = value
        if (++count === iterable.length) resolve(result)
      }
      iterable.forEach((promise, index) => Promise.resolve(promise).then(onFulfilled(index), reject))
    })
  }

  static race(iterable) {
    if (!iterable || !iterable.length) throw new Error('params must be an iterable object')
    if (iterable.length === 0) return new Promise()
    return new Promise((resolve, reject) => {
      iterable.forEach(promise => Promise.resolve(promise).then(resolve, reject))
    })
  }

  static resolve(value) {
    return new Promise(resolve => resolve(value))
  }

  static reject(reason) {
    return new Promise((resolve,reject) => reject(reason))
  }
}

Promise.State = {
  PENDING: 0,
  FULFILLED: 1,
  REJECTED: 2
}


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