/*
 * @Author: czy0729
 * @Date: 2025-07-17 13:15:32
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-07-17 13:15:32
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { EXCLUDE_STATE, NAMESPACE, STATE } from './ds'

export default class State extends Store<typeof STATE> {
  state = observable(STATE)

  save = () => {
    return this.saveStorage(NAMESPACE, EXCLUDE_STATE)
  }
}
