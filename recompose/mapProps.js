/**
 * mapProps实现
 * by liushuai
 */
import React from 'react'
export default propsMapper => BaseComponent => props => <BaseComponent {...propsMapper(props)} />
