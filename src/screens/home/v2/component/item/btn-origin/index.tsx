/*
 * @Author: czy0729
 * @Date: 2021-01-21 14:49:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 02:57:21
 */
import React from 'react'
import { Flex, Heatmap, Iconfont } from '@components'
import { Popover } from '@_'
import { systemStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectId, SubjectTypeCn } from '@types'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function BtnOrigin({ subjectId }: { subjectId: SubjectId }) {
  const { $ } = useStore<Ctx>()
  if (systemStore.setting.homeOrigin === -1) return null

  const origins: string[] = [...$.actions(subjectId).map(item => item.name)]
  if (systemStore.setting.homeOrigin === true) {
    origins.push(
      ...$.onlineOrigins(subjectId).map(item => (typeof item === 'object' ? item.name : item))
    )
  }

  const subject = $.subject(subjectId)
  const title = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(subject.type)
  const data = [...origins, $.state.top.indexOf(subjectId) !== -1 ? '取消置顶' : '置顶']

  if (['动画', '三次元'].includes(title)) {
    data.push('全部展开', '全部收起')

    // 条目非 SP 章节有未播才显示此选项
    if (subject?.eps?.length && subject.eps.some(item => item.type === 0 && item.status === 'NA')) {
      data.push('一键添加提醒')
    }

    if (systemStore.setting.exportICS && subject?.eps?.length) data.push('导出放送日程ICS')
  }

  return (
    <Popover
      key={subjectId}
      style={styles.touch}
      data={data}
      onSelect={(label: string) => {
        $.onPopover(label, subjectId)
      }}
    >
      <Flex style={styles.btn} justify='center'>
        <Iconfont
          style={styles.icon}
          name={origins.length ? 'md-airplay' : 'md-menu'}
          size={origins.length ? 17 : 21}
        />
      </Flex>
      <Heatmap right={55} bottom={-7} id='首页.搜索源' />
    </Popover>
  )
}

export default ob(BtnOrigin, COMPONENT)
