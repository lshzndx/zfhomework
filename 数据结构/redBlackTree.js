/**
 * 红黑树实现
 * by liushuai
 */
class Node {
  constructor (key) {
    this.color = null
    this.key = key
    this.left = null
    this.right = null
    this.parent = null
  }
}
class RBTree {
  constructor() {
    this.nil = new Node(null)
    this.nil.color = 'black'
    this.root = this.nil
  }
  min(x) {
    while(x.left !== this.nil) 
      x = x.left
    return x
  }
  insert(z) {
    let x = this.root, y = this.nil
    while(x !== this.nil) {
      y = x
      if (z.key < x.key)
        x = x.left
      else 
        x = x.right
    }
    z.parent = y
    if (y === this.nil)
      this.root = z
    else if (z.key < y.key)
      y.left = z
    else
      y.right = z
    z.left = this.nil
    z.right = this.nil
    z.color = 'red'
    this._insertFixup(z)
  }
  delete(z) {
    const y = z, x, originColor = y.color
    if (z.left === this.nil) {
      x = z.right
      this._transplant(z, z.right)
    }
    else if (z.right === this.nil) {
      x = z.left
      this._transplant(z, z.left)
    }
    else {
      y = this.min(z.right)
      originColor = y.color
      x = y.right
      if (y.parent === z)
        x.parent = y
      else {
        this._transplant(y, y.right)
        y.right = z.right
        y.right.parent = y
      }
      this._transplant(z, y)
      y.left = z.left
      y.left.parent = y
      y.color = z.color
    }
    if (originColor === 'black')
      this._deleteFixup(x)
  } 
  _transplant(u, v) {
    if (u.parent === this.nil)
      this.root = v
    else if (u === u.parent.left)
      u.parent.left = v
    else
      u.parent.right = v
    v.parent = u.parent
  }
  _deleteFixup(x) {
    const w = this.nil
    while(x !== this.root && x.color === 'black') {
      if (x === x.parent.left) {
        w = x.parent.right
        if (w.color === 'red') {
          w.color = 'black'
          x.parent.color = 'red'
          this._leftRotate(x.parent)
          w = x.parent.right
        }
        if (w.left.color === 'black' && w.right.color === 'black') {
          w.color = 'red'
          x = x.parent
        }
        else if (w.right.color === 'black') {
          w.left.color = 'black'
          w.color = 'red'
          this._rightRotate(w)
          w = x.parent.right
        }
        w.color = x.parent.color
        x.parent.color = 'black'
        w.right.color = 'black'
        this._leftRotate(x.parent)
        x = this.root
      }
      else {
        w = x.parent.left
        if (w.color === 'red') {
          w.color = 'black'
          x.parent.color = 'red'
          this._rightRotate(x.parent)
          w = x.parent.left
        }
        if (w.right.color === 'black' && w.left.color === 'black') {
          w.color = 'red'
          x = x.parent
        }
        else if (w.left.color === 'black') {
          w.right.color = 'black'
          w.color = 'red'
          this._leftRotate(w)
          w = w.parent.left
        }
        w.color = x.parent.color
        x.parent.color = 'black'
        w.left.color = 'black'
        this._rightRotate(x.parent)
        x = this.root
      }
    }
    x.color = 'black'
  }
  _insertFixup(z) {
    const y = this.nil
    while(z.parent.color === 'red') {
      if (z.parent === z.parent.parent.left) {
        y = z.parent.parent.right
        if (y.color === 'red') {
          z.parent.color = 'black'
          y.color = 'black'
          z.parent.parent.color = 'red'
          z = z.parent.parent
        }
        else if (z === z.parent.right) {
          z = z.parent
          this._leftRotate(z)
        }
        z.parent.color = 'black'
        z.parent.parent.color = 'red'
        this._rightRotate(z.parent.parent)
      }
      else {
        y = z.parent.parent.left
        if (y.color === 'red') {
          z.parent.color = 'black',
          y.color = 'black'
          z.parent.parent.color = 'red'
          z = z.parent.parent
        }
        else if (z === z.parent.left) {
          z = z.parent
          this._rightRotate(z)
        }
        z.parent.color = 'black'
        z.parent.parent.color = 'red'
        this._leftRotate(z.parent.parent)
      }
    }
    this.root.color = 'black'

  }
  _leftRotate(x) {
    if (x.right === this.nil) return false
    const y = x.right
    x.right = y.left
    if (y.left)
      y.left.parent = x
    y.parent = x.parent
    if (x.parent === this.nil)
      this.root = y
    else if (x === x.parent.left)
      x.parent.left = y
    else
      x.parent.right = y
    y.left = x
    x.parent = y
    return true
  }
  _rightRotate(y) {
    if (y.left === this.nil) return false
    const x = y.left
    y.left = x.right
    if (x.right) 
      x.right.parent = y
    x.parent = y.parent
    if (y.parent === this.nil)
      this.root = x
    else if (y === y.parent.left) 
      y.parent.left = x
    else
      y.parent.right = x
    x.right = y
    y.parent = x
    return true
  }
}