/**
 * withState实现
 * by liushuai
 */
import React from 'react'
export default (stateName, stateUpdaterName, initialState) => BaseComponent => (
  class extends React.Component {
    state = {[stateName]: initialState}
    stateUpdater = updater => this.setState({[stateName]: updater(this.state[stateName])})
    render() {
      return <BaseComponent {...{[stateName]: this.state[stateName], [stateUpdaterName]: this.stateUpdater, ...this.props}} />
    }
  }
)