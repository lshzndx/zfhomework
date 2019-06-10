const fs = require('fs')
const path = require('path')
const util = require('util')
const stat = util.promisify(fs.stat)
const readdir = util.promisify(fs.readdir)
const unlink = util.promisify(fs.unlink)
const rmdir = util.promisify(fs.rmdir)
// 基于callback版
function wideAsync(p, cb) {
  let arr = [p]
  let index = 0

  function walk(i, callback) {
    let current = arr[i]
    if (!current) {
      return callback()
    }
    let statObj = fs.statSync(current)
    if (statObj.isDirectory()) {
      fs.readdir(current, (err, dirs) => {
        if (err) return cb(err)
        dirs = dirs.map(dir => path.join(current, dir))
        arr = [...arr, ...dirs]
        walk(++index, callback)
      })
    } else {
      arr.splice(index, 1)
      fs.unlink(current, err => {
        if (err) return cb(err)
        walk(index, callback)
      })
    }
  }

  walk(index, () => {
    let i = arr.length - 1
    function rmdir(err) {
      if (err) return cb(err)
      if (i < 0) return cb(null)
      fs.rmdir(arr[i--], rmdir)
    }
    rmdir()
  })
}

// 异步串行
function widePromise0(p) {
  return new Promise((resolve, reject) => {
    let arr = [p]
    let index = 0

    new Promise((resolve, reject) => {
      function next(i) {
        let current = arr[i]
        if (!current) {
          return resolve()
        }
        let statObj = fs.statSync(current)
        if (statObj.isDirectory()) {
          readdir(current).then(dirs => {
            dirs = dirs.map(dir => path.join(current, dir))
            arr = [...arr, ...dirs]
            next(++index, resolve)
          }, reject)
        } else {
          arr.splice(index, 1)
          unlink(current).then(() => {
            next(index, resolve)
          }, reject)
        }
      }
      next(index)
    })
      .then(() => {
        let i = arr.length - 1
        function rmdir(err) {
          if (err) return reject(err)
          if (i < 0) return resolve()
          fs.rmdir(arr[i--], rmdir)
        }
        rmdir()
      })
      .catch(reject)
  })
}

// 广度优先异步并行
function widePromise(p) {
  return new Promise((resolve, reject) => {
    let arr = [p]
    let index = 0

    function walk() {
      return new Promise((resolve, reject) => {
        let promises = []

        !function next() {
          let current = arr[index++]
          if (!current) {
            return resolve(Promise.all(promises))
          }
          let statObj = fs.statSync(current)
          if (statObj.isDirectory()) {
            readdir(current).then(dirs => {

              let files = dirs.filter(file => !fs.statSync(path.join(current, file)).isDirectory()).map(file => path.join(current, file))
              let restDirs = dirs.filter(dir =>fs.statSync(path.join(current, dir)).isDirectory()).map(dir => path.join(current, dir))

              arr = [...arr, ...restDirs]
              let ps = files.map(file => unlink(file))
              promises = [...promises, ...ps]
              next()
            }, reject)
          }
        }()

      })
    }

    function rmdirs() {
      let i = arr.length - 1
      return new Promise((resolve, reject) => {
        !function next() {
          if (i < 0) return resolve()
          rmdir(arr[i--]).then(next, reject)
        }()
      })
    }

    walk().then(rmdirs).then(resolve, reject)
  })
}



widePromise(path.join(__dirname, 'a'))
