/**
 * toRenderProps 实现
 * by liushuai
 */
export default hoc => hoc(props => props.children(props))
