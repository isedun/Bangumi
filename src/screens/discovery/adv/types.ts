/*
 * @Author: czy0729
 * @Date: 2022-08-28 15:37:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 10:15:15
 */
import { factory } from '@utils'
import { Navigation } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}
