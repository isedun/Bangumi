/*
 * @Author: czy0729
 * @Date: 2024-05-07 18:05:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-14 06:56:50
 */
import React, { useCallback } from 'react'
import { ListView } from '@components'
import { ItemBlog } from '@_'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { c } from '@utils/decorators'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import { COMPONENT, EVENT } from './ds'

function List(_props, { $, navigation }: Ctx) {
  r(COMPONENT)

  const renderItem = useCallback(
    ({ item, index }) => <ItemBlog navigation={navigation} event={EVENT} index={index} {...item} />,
    []
  )

  return useObserver(() => (
    <ListView
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.bottom}
      data={$.blogs}
      scrollToTop
      renderItem={renderItem}
      onHeaderRefresh={$.refresh}
      onFooterRefresh={$.fetchBlogs}
    />
  ))
}

export default c(List)
