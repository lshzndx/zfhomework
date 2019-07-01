import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  withState,
  withReducer,
  defaultProps,
  componentFromProp,
  compose,
  lifecycle,
  mapProps,
  renameProp,
  withHandlers,
  renameProps,
  flattenProp,
  withStateHandlers,
  renderComponent,
  branch,
  renderNothing,
  onlyUpdateForKeys,
  onlyUpdateForPropTypes,
  toRenderProps,
  fromRenderProps,
  getContext,
  withContext,
  withProps
 } from '../recompose'


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


const enhance4 = compose(
  withState('value', 'updateValue', ''),
  withHandlers({
    onChange: props => event => {
      props.updateValue(event.target.value)
    },
    onSubmit: props => event => {
      event.preventDefault()
      console.log(props.value)
    }
  })
)
const Form = enhance4(({value, onChange, onSubmit}) => (
  <form onSubmit={onSubmit}>
    <label>Value
      <input type="text" value={value} onChange={onChange} />
    </label>
  </form>
))


const items = [{id: 1, title: '杨过'}, {id: 2, title: '小龙女'}]
const enhance5 = compose(
  withProps({'loadingDataFromApi': true, 'posts': items}),
  renameProps({'loadingDataFromApi': 'isLoading', 'posts': 'items'})
)
const Posts = enhance5(({isLoading, items}) => (
  <div>
    <div>Loading: {isLoading ? 'yes' : 'no'}</div>
    <ul>
      {isLoading && items.map(({id, title}) => <li key={id}>{title}</li>)}
    </ul>
  </div>
))


const enhance6 = compose(
  withProps({
    object: { a: 'a', b: 'b' },
    c: 'c'
  }),
  flattenProp('object')
)
const Abc = enhance6(({a, b, c}) => <p>{a}{b}{c}</p>)


const Counter3 = withStateHandlers(
  ({initialCounter = 0}) => ({counter: initialCounter}),
  {
    // incrementOn: ({counter}) => value => ({counter: counter + value}),
    incrementOn: ({counter}) => value => {
      console.log(222, counter, value)
      return {counter: counter + value}
    },
    decrementOn: ({counter}) => value => ({counter: counter - value}),
    resetCounter: (_, {initialCounter = 0}) => () => ({counter: initialCounter})
  }
)(
  ({ counter, incrementOn, decrementOn, resetCounter }) => 
    <div>
      <p>{counter}</p>
      <button onClick={() => incrementOn(2)}>Inc</button>
      <button onClick={() => decrementOn(3)}>Dec</button>
      <button onClick={resetCounter}>Reset</button>
    </div>  
)


const Spinner = props => {
  console.log(props)
  return null
}
const spinnerWhileLoading = isLoading => branch(isLoading, renderComponent(Spinner))
const enhance7 = spinnerWhileLoading(props => !(props.title && props.author && props.content))
const Post = enhance7(({ title, author, content }) =>
  <article>
    <h1>{title}</h1>
    <h2>By {author}</h2>
    <div>{content}</div>
  </article>
)
const Post2 = () => <Post {...{title: '侠客行', author: 'jinyong', content: '话说……'}} />


const enhance8 = withProps(({ foo }) => ({ fooPlusOne: foo + 1 }))
const Enhanced = toRenderProps(enhance8)

const ToRenderProps = () => <Enhanced foo={1}>{({ fooPlusOne }) => <h1>{fooPlusOne}</h1>}</Enhanced>
// renders <h1>2</h1>


const App = props => {
  console.log(props)
  return null
}
const { Consumer: ThemeConsumer } = React.createContext({ theme: 'dark' })
const { Consumer: I18NConsumer } = React.createContext({ i18n: 'en' });
const RenderPropsComponent = ({ render, value }) => render({ value: 1 })

const EnhancedApp = compose(
  fromRenderProps(ThemeConsumer, ({ theme }) => ({ theme })),
  fromRenderProps(I18NConsumer, ({ i18n }) => ({ locale: i18n })),
  fromRenderProps(RenderPropsComponent, ({ value }) => ({ value }), 'render'),
)(App);



export {
  WithStateComponent,
  WithReducerComponent,
  ComponentFromPropComponent,
  ComponentFromPropComponent2,
  ComposedComponent,
  PostsListWithData,
  Posts,
  Abc,
  Counter3,
  Post2,
  ToRenderProps,
  EnhancedApp,
  Form
}
