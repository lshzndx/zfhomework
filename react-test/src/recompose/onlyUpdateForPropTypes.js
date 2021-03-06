/**
 * onlyUpdateForPropTypes 实现
 * by liushuai
 */
import React from 'react'
import onlyUpdateForKeys from './onlyUpdateForKeys'
export default BaseComponent => {
  const types = BaseComponent.propTypes
  const typeKeys = Object.keys(types || {})
  return onlyUpdateForKeys(typeKeys)(BaseComponent)
}
