/**
 * withContext 实现
 * by liushuai
 */
import React from 'react'
export default (childContextTypes, getChildContext) => BaseComponent => {
  class WithContext extends React.Component {
    getChildContext() {
      return getChildContext()
    }
    render() {
      return <BaseComponent {...this.props} />
    }
  }
  WithContext.childContextTypes = childContextTypes
  return WithContext
}