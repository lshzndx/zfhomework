/**
 * BrowserRouter核心组件
 * by liushuai
 */

import React, { Component } from 'react'
import Context from './ReactRouterContext'

export default class BrowserRouter extends Component {
  state = {location: {pathname: window.location.pathname}}
  componentDidMount() {
    window.onpopstate = () => {
      this.setState({location: {pathname: window.location.pathname}})
    }
  }

  pushState = (state, title, pathname) => {
    window.history.pushState(state, title, pathname)
    this.setState({location: {pathname}})
  }

  render() {
    const self = this
    const history = {
      push(pathname) {
        self.pushState({}, null, pathname)
      }
    }
    return (
      <Context.Provider value={{...this.state, history}}>
        {this.props.children}
      </Context.Provider>
    )
  }
}
