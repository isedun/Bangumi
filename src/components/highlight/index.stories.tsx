/*
 * @Author: czy0729
 * @Date: 2023-04-07 06:15:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-07 06:26:41
 */
import React from 'react'
import { StorybookPage } from '@components/storybook'
import { Flex } from '@components/flex'
import { _ } from '@stores'
import { Highlight, HighlightProps } from './index'

export default {
  title: 'components/Highlight',
  component: Highlight
}

export const Component = (args: HighlightProps) => (
  <StorybookPage container>
    <Flex direction='column' align='start'>
      <Highlight
        {...args}
        children='在异世界获得超强能力的我，在现实世界照样无敌～等级提升改变人生命运～'
      />
      <Highlight style={_.mt.md} {...args} children='第二次被异世界召唤' />
    </Flex>
  </StorybookPage>
)

Component.args = {
  value: '异世界'
}
