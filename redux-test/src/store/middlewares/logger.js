export default store => dispatch => action => {
  console.log(`状态改变前`, store.getState())
  dispatch(action)
  console.log(`状态改变后`, store.getState())
}