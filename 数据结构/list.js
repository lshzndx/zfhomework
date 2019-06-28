/**
 * 链表实现
 * by liushuai
 */

/**
 * 单向链表
 */
class LinkedListItem {
  constructor(item) {
    this.item = item
    this.next = null
  }
}
class LinkedList {
  constructor() {
    this.length = 0
    this.head = null
  }
  append(element) {
    const item = new LinkedListItem(element)
    if (!this.head) this.head = item
    else {
      let current = this.head
      while(current.next) 
        current = current.next
      current.next = item
    }
    this.length++
  }
  insert(position, element) {
    const item = new LinkedListItem(element)
    if (position >=0 && position <= this.length) {
      if (position === 0) {
        item.next = this.head
        this.head = item
      }else {
        let count = 0, current = this.head
        while(count++ < position - 1) 
          current = current.next
        item.next = current.next
        current.next = item
      }
      this.length++
      return true
    }
    return false
  }
  remove(item) {
    const position = this.indexOf(item)
    this.removeAt(position)
  }
  indexOf(item) {
    let index = 0, current = this.head
    while(current) {
      if (current.item === item) return index
      current = current.next
      index++
    }
    return -1
  }
  removeAt(position) {
    let current = this.head, removed = null
    if (position >= 0 && position < this.length) {
      if (position === 0) {
        removed = this.head
        this.head = this.head.next
      }else {
        let count = 0
        while(count++ < position - 1) 
          current = current.next
        removed = current.next
        current.next = current.next.next
      }
      this.length--
    }
    return removed && removed.element
  }
  isEmpty() {
    return this.length === 0
  }
  size() {
    return this.length
  }
  toString() {
    let str = '', current = this.head
    while(current) {
      str += current.item
      current = current.next
    }
    return str
  }
  getHead() {
    return this.head
  }
}
/**
 * 双向链表
 */
class DoublyLinkedListItem {
  constructor(item) {
    this.item = item
    this.next = null
    this.prev = null
  }
}
class DoublyLinkedList {
  constructor() {
    this.length = 0
    this.head = null
    this.tail = null
  }
  insert(position, item) {
    if (position >=0 && position <= this.length) {
      let current = this.head, index = 0
      if (position === 0) {
        if (!this.head) {
          this.head = item
          this.tail = item
        }else {
          item.next = current
          current.prev = item
          this.head = item
        }
      }else {
        if (position === this.length) {
          this.tail.next = item
          item.prev = this.tail
          this.tail = item
        }else {
          while(index++ < position - 1) 
            current = current.next
          item.next = current.next
          item.prev = current
          current.next = item
          current.next.prev = item
        }
      }
      this.length++
      return true
    }
    return false
  }
  removeAt(position) {
    let removed = null
    if (position >= 0 && position < this.length) {
      if (position === 0) {
        removed = this.head
        this.head = this.head.next
        if (this.length === 1) this.tail = this.head
        else this.head.prev = null
      }else if (position === this.length - 1) {
        removed = this.tail
        this.tail = this.tail.prev
        this.tail.next = null
      }else {
        let index = 0, current = this.head
        while(index++ < position - 1) 
          current = current.next
        removed = current.next
        current.next = removed.next
        removed.next.prev = current
      }
      this.length--
    }
    return removed && removed.element
  }
}

module.exports = LinkedList