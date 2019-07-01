/**
 * renameProp实现
 * by liushuai
 */
import React from 'react'
export default (oldName, newName) => BaseComponent => props => {
  const {...rest} = props
  delete rest[oldName]
  return <BaseComponent {...{[newName]: props[oldName], ...rest}} />
}