/**
 * Promise对象，es6版本
 * by liushuai
 */
class Promise {
  constructor(executor) {
    this.state = Promise.State.PENDING
    this.value = null
    this.callbacks = []
    try {
      executor(this._resolve.bind(this), this._reject.bind(this))
    }catch(e) {
      this._reject(e)
    }
  }

  _resolve(x) {
    if (this.state === Promise.State.PENDING) {
      if (x === this) {
        throw new TypeError(`循环引用`)
      }
      if (x !== null && typeof x === 'object' && typeof x.then === 'function') {
        let called = false;
        try {
          const then = x.then
          then.call(x, x => {
            if (!called) {
              called = true
              this._resolve(x)
            }
          }, r => {
            if (!called) {
              called = true
              this._reject(r)
            }
          })
        } catch(e) {
          this._reject(e)
        }
        return
      }
      this.state = Promise.State.FULFILLED
      this.value = x
      this._fire()
    }
  }

  _reject(reason) {
    if (this.state === Promise.State.PENDING) {
      this.state = Promise.State.REJECTED
      this.value = reason
      this._fire()
    }
  }

  _fire() {
    setTimeout(() => {
      if (this.state !== Promise.State.PENDING) {
        this.callbacks.forEach(callback => {
          const [onFulfilled, onRejected, resolve, reject] = callback
          try {
            if (this.state === Promise.State.FULFILLED) {
              if (typeof onFulfilled === 'function') {
                resolve(onFulfilled.call(null, this.value))
              }else {
                resolve(this.value)
              }
            }else if (this.state === Promise.State.REJECTED) {
              if (typeof onRejected === 'function') {
                resolve(onRejected.call(null, this.value))
              }else {
                reject(this.value)
              }
            }
          }catch(e) {
            reject(e)
          }
        })
      }
    })

  }

  then(onFulfilled, onRejected) {
    return new Promise((resolve, reject) => {
      this.callbacks = [...this.callbacks, [onFulfilled, onRejected, resolve, reject]]
      this._fire()
    })
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

module.exports = Promise