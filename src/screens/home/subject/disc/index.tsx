/*
 * @Author: czy0729
 * @Date: 2019-06-02 02:26:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-29 07:19:50
 */
import React from 'react'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import Disc from './disc'
import { memoStyles } from './styles'

export default obc((props, { $, navigation }: Ctx) => {
  // global.rerender('Subject.Disc')

  return (
    <Disc
      navigation={navigation}
      styles={memoStyles()}
      subjectId={$.subjectId}
      disc={$.disc}
      discTranslateResult={$.state.discTranslateResult.slice()}
    />
  )
})
