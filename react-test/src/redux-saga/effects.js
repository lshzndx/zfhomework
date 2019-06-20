/**
 * 主要的effecs
 * by liushuai
 */
export const take = actionType => ({type: 'TAKE', actionType})
export const fork = generator => ({type: 'FORK', generator})
export const call = (fn, ...args) => ({type: 'CALL', fn, args})
export const all = generators => ({type: 'ALL', generators})
export const race = generators => ({type: 'RACE', generators})
export const cancel = task => ({type: 'CANCEL', task})
export const put = action => ({type: 'PUT', action})
export function* takeEvery(actionType, generator) {
  yield fork(function* () {
    while(true) {
      yield take(actionType)
      yield generator()
    }
  })
}