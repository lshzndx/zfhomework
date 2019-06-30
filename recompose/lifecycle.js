/**
 * lifecycle实现
 * by liushuai
 */
import React from 'react'
export default lifecycleMethodObj => BaseComponent => {
  class Lifecycle extends React.Component {
    render() {
      return <BaseComponent {...this.state} {...this.props} />
    }
  }
  Object.keys(lifecycleMethodObj).forEach(method => {
    Lifecycle.prototype[method] = function() {
      lifecycleMethodObj[method].call(this)
    }
  })
  return Lifecycle
}