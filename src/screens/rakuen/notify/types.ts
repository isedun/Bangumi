/*
 * @Author: czy0729
 * @Date: 2022-08-19 15:33:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-18 06:52:34
 */
import { NotifyItem } from '@stores/rakuen/types'
import { factory } from '@utils'
import { GetRouteParams, Navigation, Override, RouteNotify } from '@types'
import Store from './store'
import { TABS } from './ds'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = GetRouteParams<RouteNotify>

export type TabsKey = (typeof TABS)[number]['key']

export type TabsLabel = (typeof TABS)[number]['title']

export type PMKeys = 'pmIn' | 'pmOut'

export type MergeNotifyItem = Override<
  NotifyItem,
  {
    repeat?: number
  }
>
