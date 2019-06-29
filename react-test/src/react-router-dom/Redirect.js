/**
 * Redirect组件实现
 * by liushuai
 */

import React, { Component } from 'react'
import Context from './ReactRouterContext'
export default class Redirect extends Component {
  static contextType = Context
  componentDidMount() {
    const {history} = this.context
    history.push(this.props.to)
  }

  render() {return null}
}
