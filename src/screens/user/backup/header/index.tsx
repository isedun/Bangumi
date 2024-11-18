/*
 * @Author: czy0729
 * @Date: 2022-12-03 10:17:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 06:34:19
 */
import React from 'react'
import { Header as HeaderComp } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { useNavigation } from '@utils/hooks'
import { COMPONENT } from './ds'

function Header() {
  const navigation = useNavigation()
  return (
    <HeaderComp
      title='本地备份'
      hm={['backup', 'Backup']}
      headerRight={() => (
        <IconTouchable
          name='md-info-outline'
          color={_.colorDesc}
          onPress={() => {
            navigation.push('Information', {
              title: '本地备份',
              message: [
                '条目地址和封面地址为可选导出项。',
                '因为这些值长度较长，对于部分有大量收藏记录的用户来说，很可能导致内存溢出导出失败，请自行尝试。'
              ]
            })
          }}
        />
      )}
    />
  )
}

export default ob(Header, COMPONENT)
