/*
 * @Author: czy0729
 * @Date: 2024-03-09 05:15:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-10 04:35:58
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'StarsLogs')

export const DRAWER_WITDH = _.r(280)
