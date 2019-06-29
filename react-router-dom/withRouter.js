/**
 * withRouter方法
 * by liushuai
 */

import React from 'react'
import Context from './ReactRouterContext'
const withRouter = (Component) => {
  return () => (
    <Context.Consumer>
      {
        context => {
          return <Component {...context} />
        }
      }
    </Context.Consumer>
  )
}

export default withRouter