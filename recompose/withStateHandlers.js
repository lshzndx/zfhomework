/**
 * withStateHandlers 实现
 * by liushuai
 */
import React from 'react'
export default (initialState, stateUpdaters) => BaseComponent => 
  class extends React.Component {
    state = initialState(this.props)
    render() {
      const stateUpdater = Object.keys(stateUpdaters).reduce((memo, key) => (memo[key] = (...args) => this.setState((state, props) => stateUpdaters[key](state, props)(...args)), memo), {})
      return <BaseComponent {...stateUpdater} {...this.props} {...this.state} />
    }
  }
