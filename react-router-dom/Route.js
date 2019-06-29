/**
 * Route核心组件
 * by liushuai
 */

import React from 'react'
import Context from './ReactRouterContext'
const Route = ({path, component: Component}) => {
  return (
    <Context.Consumer>
      {
        context => {
          let {location: {pathname}} = context
          pathname = new RegExp(`${pathname.substr(1)}(\/|$)`)
          return <div>{path.match(pathname) ? <Component /> : null}</div>
        }
      }
    </Context.Consumer>
  )
}

export default Route