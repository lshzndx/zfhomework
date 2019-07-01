/**
 * branch实现
 * by liushuai
 */
import React from 'react'
export default (test, left, right) => BaseComponent => props => React.createElement(test(props) ? left(BaseComponent) : (right ? right(BaseComponent) : BaseComponent), props)
