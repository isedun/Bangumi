/*
 * @Author: czy0729
 * @Date: 2023-09-23 10:53:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-04 21:08:59
 */
import React from 'react'
import { ToolBar } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { ACTIONS_SORT } from '../../ds'
import { Ctx } from '../../types'

function Sort(_props, { $ }: Ctx) {
  const { sort } = $.state
  return (
    <ToolBar.Popover
      data={ACTIONS_SORT}
      icon='md-sort'
      iconColor={_.colorDesc}
      text={sort}
      type='desc'
      onSelect={title => {
        setTimeout(() => {
          $.onSelectSort(title)
        }, 0)
      }}
    />
  )
}

export default obc(Sort)
