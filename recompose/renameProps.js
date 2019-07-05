/**
 * renameProps 实现
 * by liushuai
 */
import React from 'react'
import renameProp from './renameProp'
import compose from './compose'
export default nameMap => BaseComponent => props => {
  const {children, otherProps} = props
  return (
    React.createElement(
      compose(...Object.keys(nameMap).map(key => renameProp(key, nameMap[key])))(BaseComponent),
      otherProps,
      children
    )
  )
}

