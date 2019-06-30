import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  withState,
  withReducer,
  defaultProps,
  componentFromProp,
  withContext,
  getContext,
  compose,
  lifecycle,
  mapProps
 } from 'recompose'

const Counter = ({number1, setNumber}) => (
  <div>
    <p>{number1}</p>
    <button onClick={() => setNumber(n => n + 1)}>+</button>
  </div>
)
const enhance1 = withState('number1', 'setNumber', 0)
const WithStateComponent = enhance1(Counter)


const counterReducer = (number, action) => {
  switch(action.type) {
    case 'INCREMENT':
      return number + 1
    default:
      return number
  }
}
const enhance2 = withReducer('number2', 'dispatch', counterReducer, 0)
const WithReducerComponent = enhance2(({number2, dispatch}) => (
  <div>
    <p>{number2}</p>
    <button onClick={() => dispatch({type: 'INCREMENT'})}>+</button>
  </div>
))


const enhance3 = defaultProps({component: 'input', placeholder: '输入框'})
const ComponentFromPropComponent = enhance3(componentFromProp('component'))
const ComponentFromPropComponent2 = () => <ComponentFromPropComponent component="textarea" />


const ComposedComponent = compose(enhance2, enhance1)(({number1, setNumber, number2, dispatch}) => (
  <div>
    <p>{number1}</p>
    <button onClick={() => setNumber(n => n + 1)}>withState+</button>
    <p>{number2}</p>
    <button onClick={() => dispatch({type: 'INCREMENT'})}>withReducer+</button>
  </div>
))


const posts = [{title: '石破天'}, {title: '郭靖'}, {title: '黄蓉'}]
const PostsList = ({posts}) => <ul>{posts && posts.map(p => <li key={p.title}>{p.title}</li>)}</ul>
const PostsListWithData = lifecycle({
  componentDidMount() {
    new Promise(resolve => setTimeout(() => resolve(posts), 1000)).then(posts => this.setState({posts}))
  }
})(PostsList)


export {
  WithStateComponent,
  WithReducerComponent,
  ComponentFromPropComponent,
  ComponentFromPropComponent2,
  ComposedComponent,
  PostsListWithData
}
