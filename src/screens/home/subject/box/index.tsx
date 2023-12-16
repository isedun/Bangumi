/*
 * @Author: czy0729
 * @Date: 2019-03-23 09:16:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-16 11:28:17
 */
import React from 'react'
import { View } from 'react-native'
import { systemStore, userStore } from '@stores'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { TITLE_BOX } from '../ds'
import { Ctx } from '../types'
import Box from './box'
import { memoStyles } from './styles'

export default obc(({ onBlockRef }, { $, navigation }: Ctx) => {
  rerender('Subject.Box')

  return (
    <>
      <View ref={ref => onBlockRef(ref, TITLE_BOX)} />
      <Box
        styles={memoStyles()}
        navigation={navigation}
        isLogin={$.isLogin}
        status={$.status}
        url={$.url}
        showCount={systemStore.setting.showCount}
        showManageModel={$.showManageModel}
        toRating={$.toRating}
        outdate={userStore.outdate}
      />
    </>
  )
})
