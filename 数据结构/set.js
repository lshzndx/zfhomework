/**
 * 集合的实现
 * by liushuai
 */
class Set {
  constructor(iterable) {
    this.items = {}
    if (typeof iterable[Symbol.iterator] === 'function') {
      const iterator = iterable[Symbol.iterator]()
      let result = iterator.next()
      while(!result.done) {
        this.add(result.value)
        result = iterator.next(result.value)
      }
    }
  }
  *[Symbol.iterator]() {
    const values = this.values()
    for(let i = 0; i < values.length; i++) 
      yield values[i]
  }
  add(value) {
    if (!this.has(value)) {
      this.items[value] = value
      return true
    }
    return false
  }
  remove(value) {
    if(this.has(value)) {
      delete this.items[value]
      return true
    }
    return false
  }
  has(value) {
    return value in this.items
  }
  size() {
    return this.values().length
  }
  clear() {
    this.items = {}
  }
  values() {
    const values = []
    for (let key in this.items) 
      values.push(this.items[key])
    return values
  }
  union(otherSet) {// 并集
    const unionedSet = new Set()
    this.values().forEach(value => unionedSet.add(value))
    otherSet.values().forEach(value => unionedSet.add(value))
    return unionedSet
  }
  intersection(otherSet) {// 交集
    const intersectedSet = new Set()
    this.values().forEach(value => {
      if (otherSet.has(value)) {
        intersectedSet.add(value)
      }
    })
    return intersectedSet
  }
  difference(otherSet) {// 差集
    const differedSet = new Set()
    this.values().forEach(value => {
      if (!otherSet.has(value)) {
        differedSet.add(value)
      }
    })
    return differedSet
  }
  subset(otherSet) {// 子集
    return otherSet.values().every(value => this.has(value))
  }
}
