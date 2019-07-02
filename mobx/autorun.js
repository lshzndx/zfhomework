import Reaction from './reaction'

const autorun = listener => {
  Reaction.start(listener)
  listener()
  Reaction.end()
}

export default autorun
