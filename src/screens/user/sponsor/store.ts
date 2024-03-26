/*
 * @Author: czy0729
 * @Date: 2023-01-07 16:44:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-12 22:32:09
 */
import { computed, observable } from 'mobx'
import { info } from '@utils'
import store from '@utils/store'
import DS from '@assets/json/advance.json'
import { STATE } from './ds'

const NAMESPACE = 'ScreeSponsor'

export default class ScreeSponsor extends store<typeof STATE> {
  state = observable(STATE)

  init = async () => {
    this.setState({
      ...(await this.getStorage(NAMESPACE)),
      _loaded: true
    })

    return true
  }

  // -------------------- get --------------------
  @computed get list() {
    return Object.keys(DS)
  }

  // -------------------- page --------------------
  onToggle = () => {
    const { list } = this.state
    const value = !list
    this.setState({
      list: value
    })
    this.setStorage(NAMESPACE)

    if (value) {
      info('列表显示')
    } else {
      info('按打赏金额分布显示')
    }
  }
}
