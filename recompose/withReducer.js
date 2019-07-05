/**
 * withReducer 实现
 * by liushuai
 */
import React from 'react'
export default (stateName, dispatchName, reducer, initialState) => BaseComponent => 
  class extends React.Component {
    state = {[stateName]: initialState}
    dispatch = action => this.setState({[stateName]: reducer(this.state[stateName], action)})
    render() {
      return <BaseComponent {...{[stateName]: this.state[stateName], [dispatchName]: this.dispatch, ...this.props}} />
    }
  }
