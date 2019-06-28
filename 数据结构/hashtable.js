/**
 * 散列表的实现
 * by liushuai
 */
const LinkedList = require('./list')
class ValuePair {
  constructor(key, value) {
    this.key = key
    this.value = value
  }
}
/**
 * 链接法
 */
class HashTable {
  constructor() {
    this.table = []
  }
  put(key, value) {
    const position = this._loseloseHashCode(key)
    if (!this.table[position]) 
      this.table[position] = new LinkedList()
    this.table[position].append(new ValuePair(key, value))
  }
  remove(key) {
    const position = this._loseloseHashCode(key)
    if (this.table[position] !== undefined) {
      const list = this.table[position]
      let current = list.getHead()
      while(current) {
        if (current.item.key === key) {
          list.remove(current)
          if (list.isEmpty()) 
            this.table[position] = undefined
          return true
        }
        current = current.next
      }
    }
    return false
  }
  get(key) {
    const position = this._loseloseHashCode(key)
    const list = this.table[position]
    if (list) {
      let current = list.getHead()
      while(current) {
        if (current.item.key === key) return current.item.value
        current = current.next
      }
    }
    return undefined
  }
  _loseloseHashCode(key) {
    let code = 0
    for(let i = 0; i < key.length; i++) 
      code += key.charCodeAt(i)
    return code % 37
  }
}

/**
 * 开放寻址法
 */
class HashTable2 {
  constructor () {
    this.table = []
  }
  put(key, value) {
    let position = this._loseloseHashCode(key)
    if (!this.table[position]) 
      this.table[position] = new ValuePair(key, value)
    else {
      while(this.table[position] !== undefined) 
        position++
      this.table[position] = new ValuePair(key, value)
    }
  }
  get(key) {
    let position = this._loseloseHashCode(key)
    while(this.table[position] !== undefined && this.table[position].key !== key) 
      position++
    if (this.table[position].key === key) return this.table[position].value
    return undefined
  }
  remove(key) {
    let position = this._loseloseHashCode(key)
    while(this.table[position] !== undefined && this.table[position].key !== key) {
      position++
    }
    if (this.table[position].key === key) {
      this.table[position] = undefined
      return true
    }
    return false
  }
  _loseloseHashCode(key) {
    let code = 0
    for(let i = 0; i < key.length; i++) 
      code += key.charCodeAt(i)
    return code % 37
  }
  _djb2HashCode(key) {
    let hash = 5381
    for (let i = 0; i < key.length; i++) {
      hash = hash * 33 + key.charCodeAt(i)
    }
    return hash % 1013
  }
}
