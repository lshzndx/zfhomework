/**
 * Switch组件实现
 * by liushuai
 */

import React from 'react'
import Context from './ReactRouterContext'
const Switch = ({children}) => {
  return (
    <Context.Consumer>
      {
        context => {
          let {location: {pathname}} = context
          pathname = new RegExp(`${pathname.substr(1)}(\/|$)`)
          let component, index = -1
          while(++index < children.length) {
            const child = children[index]
            if (child.props.path && child.props.path.match(pathname) || child.props.to) {
              component = child
              break
            }
          }
          return <div>{component ? component : null}</div>
        }
      }
    </Context.Consumer>
  )
}

export default Switch