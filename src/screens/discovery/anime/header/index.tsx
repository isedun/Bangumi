/*
 * @Author: czy0729
 * @Date: 2022-03-11 17:19:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-26 04:18:48
 */
import React from 'react'
import { Header as HeaderComp } from '@components'
import { obc } from '@utils/decorators'
import Extra from '../component/extra'
import { Ctx } from '../types'
import { COMPONENT } from './ds'
import { Props } from './types'

function Header({ title = '找番剧', alias = 'Anime', hm }: Props, { $ }: Ctx) {
  return (
    <HeaderComp
      title={title}
      alias={alias}
      hm={hm || ['anime', 'Anime']}
      headerRight={() => <Extra $={$} title={alias} />}
    />
  )
}

export default obc(Header, COMPONENT)
