/**
 * react-redux核心组件
 * by liushuai
 */
import React, { Component } from 'react'
import bindActionCreators from './bindActionCreators'
import ReduxContext from './context'
export default (mapStateToProps, mapDispatchToProps) => {
  return function (WrappedComponent) {
    return class extends Component {
      static contextType = ReduxContext

      constructor(props, context) {
        super(props)
        this.state = mapStateToProps(context.store.getState())
      }

      componentDidMount() {
        this.unsubscribe = this.context.store.subscribe(() => this.setState(mapStateToProps(this.context.store.getState())))
      }

      componentWillUnmount() {
        this.unsubscribe()
      }

      render() {
        let actions = bindActionCreators(mapDispatchToProps, this.context.store.dispatch)
        return (
          <WrappedComponent {...this.state} {...actions}/>
        )
      }
    }
  }
}