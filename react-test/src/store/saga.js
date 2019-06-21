import { put, takeEvery, all, call, race } from '../redux-saga/effects'
import { INCREMENT1, INCREMENT1ASYNC } from './types';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export function* logSaga() {
  console.log('Hello Saga!')
}

export function* incrementAsync2 () {
  yield delay(1000)
  yield put({type: INCREMENT1})
}

export function* incrementAsync() {
  yield call(delay, 1000)
  yield put({type: INCREMENT1})
}

export function* watchIncrementAsync() {
  yield takeEvery(INCREMENT1ASYNC, incrementAsync)
}

export function* rootSaga () {
  yield all([logSaga, watchIncrementAsync])
}

export function* delaySaga1() {
  yield delay(1000)
  console.log(1000)
}

export function* delaySaga2() {
  yield delay(400)
  console.log(400)
}

export function* rootSaga2() {
  yield all([delaySaga1, delaySaga2])
  console.log('race')
}