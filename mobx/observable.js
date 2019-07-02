const createObjectProxyTraps = () => {
  const reaction = new Reaction()
  return {
    get(target, key) {
      reaction.collect()
      return Reflect.get(target, key)
    },
    set(target, key, value) {
      if (key === 'length') return true
      value = Reflect.set(target, key, value)
      reaction.run()
      return value
    }
  }
}
const createObservable = target => {
  if (typeof target !== 'object') return target
  Object.keys(target).forEach(key => target[key] = createObservable(target[key]))
  const objectProxyTraps = createObjectProxyTraps()
  return new Proxy(target, objectProxyTraps)
}
const observable = (target, key, descriptor) => {
  if (typeof key === 'string') {
    let v = descriptor.initialize()
    v = createObservable(v)
    const reaction = new Reaction()
    return {
      enumerable: true,
      configurable: true,
      get() {
        reaction.collect()
        return v
      },
      set(value) {
        v = value
        reaction.run()
      }
    }
  }
  return createObservable(target)
}

export default observable
