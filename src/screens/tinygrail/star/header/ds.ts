/*
 * @Author: czy0729
 * @Date: 2024-03-10 03:41:59
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-03-10 03:41:59
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const HM = ['tinygrail/star', 'Star'] as const
