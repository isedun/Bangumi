/*
 * @Author: czy0729
 * @Date: 2022-06-15 10:48:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-13 23:29:21
 */
import { rc } from '@utils/dev'
import { EVENT } from '@constants'
import { Navigation } from '@types'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'
import { Props as $ } from './types'

export const COMPONENT = rc(PARENT, 'ItemSearch')

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  styles: {} as ReturnType<typeof memoStyles>,
  style: {} as $['style'],
  index: 0 as number,
  id: '' as $['id'],
  name: '' as $['name'],
  nameCn: '' as $['nameCn'],
  cover: '' as $['cover'],
  // type: '',
  typeCn: '' as $['typeCn'],
  tip: '' as $['tip'],
  rank: '' as $['rank'],
  score: '' as $['score'],
  total: '' as $['total'],
  comments: '' as $['comments'],

  /** 动画才有, 具体收藏状态 */
  collection: '' as $['collection'],

  /** 是否收藏 */
  collected: false as $['collected'],
  showManage: true as boolean,
  position: [] as $['position'],
  event: EVENT as $['event']
}
