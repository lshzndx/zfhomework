/**
 * flattenProp 实现
 * by liushuai
 */
import React from 'react'
export default propName => BaseComponent => props => {
  const {...rest} = props
  delete rest[propName]
  return <BaseComponent {...rest} {...props[propName]} />
}
