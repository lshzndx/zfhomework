/**
 * withProps 实现
 * by liushuai
 */
import React from 'react'
export default createProps => BaseComponent => props => <BaseComponent {...props} {...createProps} />
