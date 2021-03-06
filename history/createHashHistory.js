/**
 * createHashHistory 实现
 * by liushuai
 */

export default options => {
  if (!window.location.hash) window.location.hash = '#/'
  const {basename = ''} = options || {}
  let blocked = null
  let currentAction = 'POP'
  const currentListeners = []

  let api = {
    get action() {
      return currentAction
    },
    get length() {
      return window.history.length
    },
    get location(){
      const {pathname, search, hash} = window.location
      const location = {pathname, search, hash, state: window.history.state}
      return location
    },
    listen(listener) {
      currentListeners.push(listener)
      let subscribed = true
      return () => {
        if (subscribed) {
          subscribed = false
          const index = currentListeners.indexOf(listener)
          currentListeners.splice(index, 1)
        }
      }
    },
    block(message) {
      blocked = message
      return () => blocked = null
    },
    createHref(location) {
      const {pathname, search, hash} = location
      return basename + pathname + search + hash
    },
    go: window.history.go.bind(window.history),
    goBack: window.history.back.bind(window.history),
    goForward: window.history.forward.bind(window.history)
  }

  api = ['push', 'replace'].reduce((memo, method) => {
    memo[method] = (path, state) => {
      currentAction = method.toUpperCase()
      let location
      if (typeof path === 'object') {
        const {pathname, search = '', hash = '', state} = path
        location = {pathname, search, hash, state}
        path = pathname + search + hash
      }else {
        const {pathname, search, hash} = URL(path)
        location = {pathname, search, hash, state}
      }
      if (afterBlock(location, currentAction)) {
        window.location.hash = path
        currentListeners.forEach(listener => listener(location, currentAction))
      }
    }
    return memo
  }, api)

  const afterBlock = (location, action) => {
    if (!blocked) return true
    if (typeof blocked === 'function') return blocked(location, action)
    return window.confirm(blocked)
  }

  window.addEventListener('hashchange', event => {
    currentAction = 'POP'
    const location = api.location
    const {hash} = location
    if (!hash) window.location.hash = '#/'
    if (afterBlock(location, currentAction)) 
      currentListeners.forEach(listener => listener(location, currentAction))
  })

  return api
}