/**
 * defaultProps实现
 * by liushuai
 */
import React from 'react'
export default props => BaseComponent => (
  class extends React.Component {
    static defaultProps = props
    render() {
      return <BaseComponent {...this.props} />
    }
  }
)