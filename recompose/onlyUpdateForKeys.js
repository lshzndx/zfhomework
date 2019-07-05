/**
 * onlyUpdateForKeys实现
 * by liushuai
 */
import React from 'react'
import shallowEqual from './shallowEqual'
import shouldUpdate from './shouldUpdate'

export default propKeys => BaseComponent => props => {
  const {children, ...otherProps} = props
  return (
    React.createElement(
      shouldUpdate(
        (props, nextProps) =>
          !shallowEqual(
            propKeys.reduce((memo, key) => (memo[key] = nextProps[key]), {}),
            propKeys.reduce((memo, key) => (memo[key] = props[key]), {})
          )
      )(BaseComponent),
      otherProps,
      children
    )
  )
}
