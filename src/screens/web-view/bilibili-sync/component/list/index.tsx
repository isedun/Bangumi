/*
 * @Author: czy0729
 * @Date: 2022-04-24 14:16:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-16 16:55:21
 */
import React from 'react'
import { Notice, PaginationList2 as PaginationList } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import ToolBar from '../tool-bar'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

function List(_props, { $ }: Ctx) {
  return (
    <>
      <ToolBar />
      <PaginationList
        contentContainerStyle={_.container.bottom}
        data={$.data}
        limit={12}
        ListHeaderComponent={
          $.data.length ? <Notice>共查找到 {$.data.length} 项结果</Notice> : null
        }
        renderItem={renderItem}
        onPage={$.onPage}
      />
    </>
  )
}

export default obc(List, COMPONENT)
