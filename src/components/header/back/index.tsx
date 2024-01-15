/*
 * @Author: czy0729
 * @Date: 2022-03-12 04:56:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 16:08:53
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { Flex } from '../../flex'
import { Iconfont } from '../../iconfont'
import { Touchable } from '../../touchable'
import { Props } from './type'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Back({ navigation, color, onPress }: Props) {
  r(COMPONENT)

  return (
    <Touchable style={styles.touch} onPress={onPress || navigation.goBack}>
      <Flex style={styles.icon} justify='center'>
        <Iconfont name='md-arrow-back' color={color || _.colorTitle} />
      </Flex>
    </Touchable>
  )
}

export default observer(Back)
