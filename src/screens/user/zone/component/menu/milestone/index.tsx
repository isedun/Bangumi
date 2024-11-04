/*
 * @Author: czy0729
 * @Date: 2024-10-14 06:26:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-04 18:48:25
 */
import React from 'react'
import { Flex, Iconfont, Touchable } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../../types'
import { styles } from './styles'

function Milestone(_props, { $, navigation }: Ctx) {
  return (
    <Touchable
      onPress={() => {
        const { id, username } = $.usersInfo
        const userId = username || id
        navigation.push('Milestone', {
          userId
        })

        t('空间.跳转', {
          to: 'WordCloud',
          userId
        })
      }}
    >
      <Flex style={styles.icon} justify='center'>
        <Iconfont name='md-image-aspect-ratio' size={19} color={_.__colorPlain__} />
      </Flex>
    </Touchable>
  )
}

export default obc(Milestone)
