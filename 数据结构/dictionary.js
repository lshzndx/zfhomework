/**
 * 字典的实现
 * by liushuai
 */
class Dictionary {
  constructor() {
    this.items = {}
  }
  set(key, value) {
    this.items[key] = value
  }
  get(key) {
    return this.items[key]
  }
  remove(key) {
    if (this.has(key)) {
      delete this.items[key]
      return true
    }
    return false
  }
  clear() {
    this.items = {}
  }
  size() {
    let count = 0
    for (let key in this.items)
      count++
    return count
  }
  keys() {
    const keys = []
    for (let key in this.items)
      keys.push(key)
    return keys
  }
  values() {
    const values = []
    for (let key in this.items)
      values.push(this.items[key])
    return values
  }
  has(key) {
    return key in this.items
  }
}

module.exports = Dictionary