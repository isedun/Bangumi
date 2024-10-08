/*
 * @Author: czy0729
 * @Date: 2023-11-17 05:11:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-04 21:07:36
 */
import React from 'react'
import { Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { WEB } from '@constants'
import { Ctx } from '../../../types'
import { styles } from './styles'

function Example(
  {
    store
  }: {
    store: Ctx['$']
  },
  { $ }: Ctx
) {
  $ = $ || store

  const { id } = $.state
  return (
    <Flex style={WEB ? _.mt.md : _.mt.sm} justify='center'>
      <Touchable style={styles.touch} onPress={$.onSubmit}>
        <Text style={styles.btn} type='main'>
          {!!id ? '保存' : '新增'}
        </Text>
      </Touchable>
      <Touchable style={styles.touch} onPress={$.onClose}>
        <Text style={styles.btn} type='sub'>
          取消
        </Text>
      </Touchable>
    </Flex>
  )
}

export default obc(Example)
