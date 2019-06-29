/**
 * 核心组件Link实现
 * by liushuai
 */

import React from 'react'
import Context from './ReactRouterContext'
const Link = ({to, ...rest}) => {
  return (
    <Context.Consumer>
      {
        context => {
          const {history} = context
          return <a onClick={() => history.push(to)} {...rest}>{rest.children}</a>
        }
      }
    </Context.Consumer>
  )
}

export default Link