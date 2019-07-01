/**
 * fromRenderProps 实现
 * by liushuai
 */
import React from 'react'
export default (RenderPropsComponent, propsMapper, renderPropName = 'children') => BaseComponent => ownerProps => (
  renderPropName !== 'children'
    ? <RenderPropsComponent {...{[renderPropName]: props => <BaseComponent {...propsMapper(props)} {...ownerProps} />}} />
    : <RenderPropsComponent>{props => <BaseComponent {...propsMapper(props)} {...ownerProps} />}</RenderPropsComponent>
)
