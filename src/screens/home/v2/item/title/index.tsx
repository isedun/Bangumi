/*
 * @Author: czy0729
 * @Date: 2021-01-21 15:55:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-15 20:49:11
 */
import React from 'react'
import { Text } from '@components'
import { _ } from '@stores'
import { cnjp, HTMLDecode } from '@utils'
import { obc } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { Ctx } from '../../types'
import { WEEK_DAY_MAP } from '../ds'
import { Props } from './types'

function Title({ subject, subjectId }: Props, { $ }: Ctx) {
  const type = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(subject.type)
  const isBook = type === '书籍'
  const action = isBook ? '读' : '看'

  const { weekDay, isExist } = $.onAirCustom(subjectId)
  const weekDayText = isExist ? ` · 周${WEEK_DAY_MAP[weekDay]}` : ''

  const _subject = $.subject(subjectId)
  const doing = subject?.collection?.doing || _subject?.collection?.doing || 0

  const title = HTMLDecode(
    cnjp(_subject?.name_cn || subject.name_cn, _subject?.name || subject.name)
  )
  return (
    <>
      <Text numberOfLines={2} bold>
        {title}
      </Text>
      {!!doing && (
        <Text style={_.mt.xs} type='sub' size={12}>
          {doing} 人在{action}
          {weekDayText}
        </Text>
      )}
    </>
  )
}

export default obc(Title)
