/**
 * 图的实现
 * by liushuai
 */
const Dictionary = require('./dictionary')
const Queue = require('./queue')
class Graph {
  constructor() {
    this.vertices = []
    this.adjList = new Dictionary()
  }
  addVertex(vertex) {
    this.vertices.push(vertex)
    this.adjList.set(vertex, [])
  }
  addEdge(vertex, neighbor) {
    this.adjList.get(vertex).push(neighbor)
    this.adjList.get(neighbor).push(vertex)
  }
  bfs(vertex, callback) {// Breadth-First Search
    const stateMap = this._initState()
    const queue = new Queue()
    queue.enqueue(vertex)
    while(!queue.isEmpty()) {
      const vertex = queue.dequeue()
      const neighbors = this.adjList.get(vertex)
      stateMap[vertex] = 'touched'
      for (let i = 0; i < neighbors.length; i++) {
        const neighbor = neighbors[i]
        if (stateMap[neighbor] === 'inited') {
          stateMap[neighbor] = 'touched'
          queue.enqueue(neighbor)
        }
      }
      stateMap[vertex] = 'traversed'
      if (callback) callback(vertex)
    }
  }
  BFS(vertex) {
    const stateMap = this._initState()
    const queue = new Queue()
    const distances = {}, predecessors = {}
    queue.enqueue(vertex)
    for (let i = 0; i < this.vertices.length; i++) {
      distances[this.vertices[i]] = 0
      predecessors[this.vertices[i]] = null
    }
    while(!queue.isEmpty()) {
      const predecessor = queue.dequeue()
      const neighbors = this.adjList.get(predecessor)
      stateMap[predecessor] = 'touched'
      for (let i = 0; i < neighbors.length; i++) {
        const neighbor = neighbors[i]
        if (stateMap[neighbor] === 'inited') {
          stateMap[neighbor] = 'touched'
          distances[neighbor] = distances[predecessor] + 1
          predecessors[neighbor] = predecessor
          queue.enqueue(neighbor)
        }
      }
      stateMap[predecessor] = 'traversed'
    }
    return { distances, predecessors }
  }
  dfs(callback) { // Depth-First Search
    const stateMap = this._initState()
    for (let i = 0; i < this.vertices.length; i++) {
      const vertex = this.vertices[i]
      if (stateMap[vertex] === 'inited') {
        this._dfsVisit(vertex, stateMap, callback)
      }
    }
  }
  _dfsVisit(vertex, stateMap, callback) {
    stateMap[vertex] = 'touched'
    if (callback) callback(vertex)
    const neighbors = this.ajsList.get(vertex)
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i]
      if (stateMap[neighbor] === 'inited') 
        this._dfsVisit(neighbor, stateMap, callback)
    }
    stateMap[vertex] = 'traversed'
  }

  _initState() {
    const stateMap = {}
    for(let i = 0; i < this.vertices.length; i++) 
      stateMap[this.vertices[i]] = 'inited'
    return stateMap
  }
}

