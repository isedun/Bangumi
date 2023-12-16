/*
 * @Author: czy0729
 * @Date: 2019-08-23 00:24:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-16 08:47:04
 */
import React from 'react'
import { View } from 'react-native'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { TITLE_INFO } from '../ds'
import { Ctx } from '../types'
import Info from './info'
import { memoStyles } from './styles'

export default obc(({ onBlockRef }, { $, navigation }: Ctx) => {
  rerender('Subject.Info')

  if (!$.showInfo[1]) return null

  const { showInfo } = systemStore.setting
  return (
    <>
      <View ref={ref => onBlockRef(ref, TITLE_INFO)} />
      <Info
        navigation={navigation}
        styles={memoStyles()}
        subjectId={$.subjectId}
        showInfo={showInfo}
        info={$.info}
        onSwitchBlock={$.onSwitchBlock}
      />
    </>
  )
})
