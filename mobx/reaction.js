let currentAutoRun = null
let count = 0
class Reaction {
  constructor() {
    this.id = ++count
    this.store = {}
  }
  run() {
    if (this.store[this.id]) 
      this.store[this.id].forEach(listener => listener())
  }
  collect() {
    if (currentAutoRun) 
      this.store[this.id] = this.store[this.id] ? [...this.store[this.id], currentAutoRun] : [currentAutoRun]
  }
  static start(listener) {
    currentAutoRun = listener
  }
  static end() {
    currentAutoRun = null
  }

}
