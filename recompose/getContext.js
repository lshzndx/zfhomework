/**
 * getContext 实现
 * by liushuai
 */
import React from 'react'
export default contextTypes => BaseComponent => {
  const GetContext = (ownerProps, context) => <BaseComponent {...ownerProps} {...context} />
  GetContext.contextTypes = contextTypes
  return GetContext
}
