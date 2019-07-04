import { createHashHistory, createBrowserHistory  } from './history'

// const hashHistory = createHashHistory ()
const browserHistory = createBrowserHistory ()

// const location = hashHistory.location
const location = browserHistory.location

// const unlisten = hashHistory.listen((location, action) => {
//   console.log(222, action, location)
// })
const unlisten = browserHistory.listen((location, action) => {
  console.log(222, action, location)
})

document.getElementById('btn').addEventListener('click', event => {
  // hashHistory.push({
  //   pathname: '/home',
  //   search: '?the=query',
  //   state: { some: 'state222' }
  // })
  browserHistory.push({
    pathname: '/home',
    search: '?the=query',
    state: { some: 'state222' }
  })
})

document.getElementById('btn2').addEventListener('click', event => {
  // hashHistory.go(-1)
  browserHistory.go(-1)
})

// const unblock = hashHistory.block('Are you sure you want to leave this page?');
const unblock = browserHistory.block('Are you sure you want to leave this page?');
setTimeout(unblock, 6000)

// hashHistory.block((location, action) => {
//   const {pathname} = location
//   if (pathname === '/home') return false
//   return true
// });

// browserHistory.block((location, action) => {
//   const {pathname} = location
//   if (pathname === '/home') return false
//   return true
// });

// window.myHashHistory = hashHistory
window.browserHistory = browserHistory