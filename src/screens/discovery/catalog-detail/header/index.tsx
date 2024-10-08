/*
 * @Author: czy0729
 * @Date: 2022-03-11 23:02:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-10 16:21:19
 */
import React from 'react'
import { Flex, Header as HeaderComp, Heatmap } from '@components'
import { getSPAParams, open } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HOST, URL_SPA } from '@constants'
// import IconCopy from '../component/icon-copy'
import IconFavor from '../component/icon-favor'
import { Ctx } from '../types'
import { COMPONENT, DATA, TEXT_BROWSER, TEXT_COPY, TEXT_SPA } from './ds'

function Header({ fixed }, { $, navigation }: Ctx) {
  return (
    <HeaderComp
      mode='float'
      fixed={fixed}
      title={$.detail.title}
      alias='目录详情'
      hm={[`index/${$.catalogId}`, 'CatalogDetail']}
      headerRight={() => (
        <Flex>
          {/* <IconCopy $={$} navigation={navigation} /> */}
          <IconFavor $={$} />
          <HeaderComp.Popover
            data={DATA}
            onSelect={key => {
              if (key === TEXT_COPY) {
                $.onCopy(navigation)
              } else if (key === TEXT_BROWSER) {
                open(`${HOST}/index/${$.catalogId}`)
              } else if (key === TEXT_SPA) {
                const url = `${URL_SPA}/${getSPAParams('CatalogDetail', {
                  catalogId: $.catalogId
                })}`
                open(url)
              }

              t('目录详情.右上角菜单', {
                key
              })
            }}
          >
            <Heatmap id='目录详情.右上角菜单' />
          </HeaderComp.Popover>
        </Flex>
      )}
    />
  )
}

export default obc(Header, COMPONENT)
