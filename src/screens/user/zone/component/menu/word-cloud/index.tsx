/*
 * @Author: czy0729
 * @Date: 2024-10-14 06:26:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:13:41
 */
import React from 'react'
import { Image, Touchable } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { GROUP_THUMB_MAP } from '@assets/images'
import { Ctx } from '../../../types'

function Milestone() {
  const { $, navigation } = useStore<Ctx>()
  return (
    <Touchable
      style={{
        padding: 8,
        marginRight: 8,
        opacity: _.select(1, 0.9)
      }}
      onPress={() => {
        const { id, username } = $.usersInfo
        const userId = username || id
        navigation.push('WordCloud', {
          userId
        })

        t('空间.跳转', {
          to: 'WordCloud',
          userId
        })
      }}
    >
      <Image
        src={GROUP_THUMB_MAP.wordcloud}
        size={19}
        resizeMode='contain'
        placeholder={false}
        skeleton={false}
      />
    </Touchable>
  )
}

export default ob(Milestone)
