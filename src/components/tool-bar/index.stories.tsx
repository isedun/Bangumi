/*
 * @Author: czy0729
 * @Date: 2023-04-07 07:41:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-07 07:50:06
 */
import React from 'react'
import { StorybookPage } from '@components/storybook'
import { _ } from '@stores'
import { MONO_WORKS_ORDERBY } from '@constants'
import { ToolBar } from './index'

export default {
  title: 'components/ToolBar',
  component: ToolBar
}

export const Component = () => (
  <StorybookPage>
    <ToolBar>
      <ToolBar.Popover
        data={MONO_WORKS_ORDERBY.map(item => item.label)}
        icon='md-sort'
        iconColor={_.colorDesc}
        text='排名'
        type='desc'
      />
      <ToolBar.Popover
        data={['分镜', '原画', '演出', '脚本', '导演']}
        text='职位'
        type='desc'
      />
      <ToolBar.Popover data={['配角', '主角', '客串']} text='角色' type='desc' />
    </ToolBar>
  </StorybookPage>
)
