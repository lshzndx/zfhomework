import React, { Component } from 'react'
import { connect } from '../react-redux'
import actions from '../store/actions/actions1'
class Counter1 extends Component {
  render() {
    return (
      <div>
        <p>{this.props.number}</p>
        <button onClick={this.props.increment1}>+</button>
        <button onClick={this.props.decrement1}>-</button>
        <button onClick={this.props.increment1Async}>Async+</button>
        <button onClick={this.props.ReduxThunk}>ReduxThunk+</button>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return state.counter1
}
export default connect(mapStateToProps, actions)(Counter1)