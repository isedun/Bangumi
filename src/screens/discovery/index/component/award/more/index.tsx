/*
 * @Author: czy0729
 * @Date: 2023-12-26 07:20:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 11:21:54
 */
import React from 'react'
import { Flex, Squircle, Text, Touchable } from '@components'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { withT } from '@utils/fetch'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function More(_props, { navigation }: Ctx) {
  const styles = memoStyles()
  const { width, height } = styles.more
  const type = _.select('plain', 'title')
  return (
    <Touchable
      style={_.container.touch}
      animate
      onPress={withT(
        () => {
          navigation.push('Yearbook')
        },
        '发现.跳转',
        {
          to: 'Yearbook',
          from: 'Award'
        }
      )}
    >
      <Squircle width={width} height={height} radius={systemStore.coverRadius}>
        <Flex style={styles.more} justify='center' direction='column'>
          <Text size={18} type={type} bold>
            更多
          </Text>
          <Text size={18} type={type} bold>
            年鉴
          </Text>
        </Flex>
      </Squircle>
    </Touchable>
  )
}

export default obc(More, COMPONENT)
