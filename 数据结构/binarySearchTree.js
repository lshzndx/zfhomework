/**
 * 二叉搜索树的实现
 * by liushuai
 */

class Node {
  constructor(key) {
    this.key = key
    this.left = null
    this.right = null
  }
}
class BinarySearchTree {
  constructor() {
    this.root = null
  }
  insert(key) {
    const insertedNode = new Node(key)
    if (!this.root) this.root = insertedNode
    else this._insert(this.root, insertedNode)
  }
  remove(key) {
    this.root = this._remove(this.root, key)
  }
  search(key) {
    return this._search(this.root, key)
  }
  min() {
    return this._min(this.root)
  }
  max() {
    return this._max(this.root)
  }
  inOrderTraverse(callback) {
    this._inOrderTraverse(this.root, callback)
  }
  preOrderTraverse(callback) {
    this._preOrderTraverse(this.root, callback)
  }
  postOrderTraverse(callback) {
    this._postOrderTraverse(this.root, callback)
  }
  _remove(node, key) {
    if (!node) return node
    if (key < node.key) return this._remove(node.left, key)
    else if (key > node.key) return this._remove(node.right, key)
    else {
      const successor = this._min(node.right)
      if (successor) {
        node.key = successor.key
        this._remove(node.right, successor.key)
        return node
      }else {
        return node.left
      }
    }
  }
  _search(node, key) {
    if (node) {
      if (key < node.key) return this._search(node.left, key)
      else if (key > node.key) return this._search(node.right, key)
    }
    return node
  }
  _max(node) {
    while(node && node.right)
      node = node.right
    return node
  }
  _min(node) {
    while(node && node.left)
      node = node.left
    return node
  }
  _preOrderTraverse(node, callback) {
    if (node) {
      callback(node)
      this._preOrderTraverse(node.left, callback)
      this._preOrderTraverse(node.right, callback)
    }
  }
  _inOrderTraverse(node, callback) {
    if (node) {
      this._inOrderTraverse(node.left, callback)
      callback(node)
      this._inOrderTraverse(node.right, callback)
    }
  }
  _postOrderTraverse(node, callback) {
    if (node) {
      this._postOrderTraverse(node.left, callback)
      this._postOrderTraverse(node.right, callback)
      callback(node)
    }
  }
  _insert(node, insertedNode) {
    if (insertedNode.key < node.key) {
      if (!node.left) node.left = insertedNode
      else this._insert(node.left, insertedNode)
    }else {
      if (!node.right) node.right = insertedNode
      else this._insert(node.right, insertedNode)
    }
  }
}