import {autorun} from '../mobx'

const observer = target => {
  const cwm = target.componentWillMount
  target.prototype.componentWillMount = function() {
    cwm.call(this)
    autorun(() => {
      this.render()
      this.forceUpdate()
    })
  }
}

export default observer