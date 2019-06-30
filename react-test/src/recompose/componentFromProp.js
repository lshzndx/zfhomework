/**
 * componentFromProp实现
 * by liushuai
 */
import React from 'react'
export default propName => props => {
  const {[propName]: Component, ...rest} = props
  return <Component {...rest} />
}
