/**
 * shouldUpdate 实现
 * by liushuai
 */
import React from 'react'
export default test => BaseComponent => (
  class extends React.Component {
    shouldComponentUpdate(nextProps) {
      return test(this.props, nextProps)
    }
    render() {
      return <BaseComponent {...this.props} />
    }
  }
)