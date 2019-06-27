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
    const newNode = new Node(key)
    if (!this.root)
      this.root = newNode
    this._insertNode(this, newNode)
  }
  remove(key) {
    this.root = this._removeNode(this.root, key)
  }
  search(key) {
    return this._searchNode(this.root, key)
  }
  min() {
    return this._minNode(this.root)
  }
  max() {
    return this._maxNode(this.root)
  }
  inOrderTraverse(callback) {
    this._inOrderTraverseNode(this.root, callback)
  }
  preOrderTraverse(callback) {
    this._preOrderTraverseNode(this.root, callback)
  }
  postOrderTraverse(callback) {
    this._postOrderTraverseNode(this.root, callback)
  }
  _removeNode(node, key) {
    if (!node) return null
    if (key < node.key) {
      node.left = this._removeNode(node.left, key)
      return node
    }
    else if (ke > node.key) {
      node.right = this._removeNode(node.right, key)
      return node
    }
    else {
      if (!node.left && !node.right) {
        node = null
        return node
      }
      if (!node.left) {
        node = node.right
        return node
      }
      else if (!node.right) {
        node = node.left
        return node
      }
      const follow = this._findMinNode(node.right)
      node.key = follow.key
      node.right = this._removeNode(node.right, follow.key)
      return node
    }

  }
  _searchNode(node, key) {
    if (node) {
      if (key < node.left) {
        return this._searchNode(node.left, key)
      }else if (node.key === key) {
        return true
      }else {
        return this._searchNode(node.right, key)
      }
    }
    return false
  }
  _maxNode(node) {
    if (node) {
      while(node.right) {
        node = node.right
      }
      return node.key
    }
    return null
  }
  _findMinNode(node) {
    if (node) {
      while(node.left) {
        node = node.left
      }
      return node
    }
    return null
  }
  _minNode(node) {
    if (node) {
      while(node.left) {
        node = node.left
      }
      return node.key
    }
    return null
  }
  _preOrderTraverseNode(node, callback) {
    if (node) {
      callback(node.key)
      this._preOrderTraverseNode(node.left, callback)
      this._preOrderTraverseNode(node.right, callback)
    }
  }
  _inOrderTraverseNode(node, callback) {
    if (node) {
      this._inOrderTraverseNode(node.left, callback)
      callback(node.key)
      this._inOrderTraverseNode(node.right, callback)
    }
  }
  _postOrderTraverseNode(node, callback) {
    if (node) {
      this._postOrderTraverseNode(node.left, callback)
      this._postOrderTraverseNode(node.right, callback)
      callback(node.key)
    }
  }
  _insertNode(node, newNode) {
    if (newNode.key < node.key) {
      if (!node.left)
        node.left = newNode
      else
        this._insertNode(node.left, newNode)
    }else {
      if (!node.right)
        node.right = newNode
      else
        this._insertNode(node.right, newNode)
    }
  }
}