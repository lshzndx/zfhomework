/**
 * 队列的实现
 * by liushuai
 */

class Base {
  constructor () {
    this.elements = []
  }
  enqueue(element) {
    this.elements.push(element)
  }
  dequeue() {
    return this.elements.shift()
  }
  front() {
    return this.elements[0]
  }
  size() {
    return this.elements.length
  }
  isEmpty() {
    return this.elements.length === 0
  }
}
/**
 * 基本队列
 */
class Queue extends Base {
  constructor() {
    super()
  }
}
/**
 * 优先队列
 */
class QueueElement {
  constructor(element, priority) {
    this.element = element
    this.priority = priority
  }
}
class PriorityQueue extends Base {
  constructor() {
    super()
  }
  enqueue(element, priority) {
    const queueelement = new QueueElement(element, priority)
    if (this.isEmpty()) this.elements.push(queueelement)
    else {
      let i = this.elements.length
      while(--i >= 0) {
        const cur = this.elements[i]
        if (cur.priority >= priority) {
          this.elements.splice(i + 1, 0, queueelement)
          break
        }
      }
    }
  }
}

module.exports = Queue