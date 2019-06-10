import React, { Component } from 'react'
import { connect } from '../react-redux'
import actions from '../store/actions/actions2'
class Counter2 extends Component {
  render() {
    return (
      <div>
        <p>{this.props.number}</p>
        <button onClick={this.props.increment2}>+</button>
        <span>Counter2</span>
        <button onClick={this.props.decrement2}>-</button>
      </div>
    )
  }
}
const mapStateToProps = state => state.counter2
export default connect(mapStateToProps, actions)(Counter2)