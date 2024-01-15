/*
 * @Author: czy0729
 * @Date: 2024-01-15 02:02:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-15 02:04:59
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT_CONTAINER = rc(PARENT, 'NavigationContainer')

export const COMPONENT_EVENTS = rc(PARENT, 'NavigationEvents')
