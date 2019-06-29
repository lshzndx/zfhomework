/**
 * HashRouter核心组件
 * by liushuai
 */

import React, { Component } from 'react'
import Context from './ReactRouterContext'
export default class HashRouter extends Component {
  state = {
    location: {pathname: window.location.hash.slice(1)}
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({location: {pathname: window.location.hash.slice(1)}})
    })
  }

  render() {
    if (!window.location.hash) window.location.hash = '#/'
    const history = {
      push(pathname) {
        window.location.hash = `#${pathname}`
      }
    }
    return (
      <Context.Provider value={{...this.state, history}}>
        {this.props.children}
      </Context.Provider>
    )
  }
}
