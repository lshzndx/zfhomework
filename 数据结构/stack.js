/**
 * 栈的实现
 * by liushuai
 */
class Stack {
  constructor() {
    this.elements = []
  }
  pop() {
    return this.elements.pop()
  }
  push(element) {
    this.elements.push(element)
  }
  isEmpty() {
    return this.elements.length === 0
  }
  size() {
    return this.elements.length
  }
  clear() {
    this.elements = []
  }
  peek() {
    return this.elements[this.elements.length - 1]
  }
}