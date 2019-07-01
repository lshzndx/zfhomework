/**
 * withHandlers实现
 * by liushuai
 */
import React from 'react'
export default handlersObj => BaseComponent => (
  class extends React.Component {
    render() {
      const handlers = Object.keys(handlersObj).reduce((memo, key) => (memo[key] = handlersObj[key](this.props).bind(this), memo), {})
      return <BaseComponent {...handlers} {...this.props} />
    }
  }
)
