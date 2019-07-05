/**
 * withState 实现
 * by liushuai
 */
import React from 'react'
export default (stateName, stateUpdaterName, initialState) => BaseComponent => 
  class extends React.Component {
    state = {[stateName]: initialState}
    stateUpdater = updater => {
      let update = typeof updater === 'function' ? updater : () => updater
      this.setState({[stateName]: update(this.state[stateName])})
    }
    render() {
      return <BaseComponent {...{[stateName]: this.state[stateName], [stateUpdaterName]: this.stateUpdater, ...this.props}} />
    }
  }
