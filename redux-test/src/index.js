import React from 'react'
import reactDom from 'react-dom'
import { Provider } from './react-redux'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import Counter1 from './components/Counter1'
import Counter2 from './components/Counter2'
import store from './store'
reactDom.render(
  <Provider store={store}>
    <Router>
      <Link to='/'>Counter1</Link>
      <Link to='/counter2'>Counter2</Link>
      <Route path='/' component={Counter1} exact />
      <Route path='/counter2' component={Counter2} />
    </Router>
  </Provider>

  , document.getElementById('root'))
