/*
 * @Author: czy0729
 * @Date: 2022-09-07 00:07:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 07:35:47
 */
import React from 'react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Chart from './component/chart'
import List from './component/list'
import Header from './header'
import { useSponsorPage } from './hooks'

/** 赞助者 */
const Sponsor = (props: NavigationProps) => {
  const { id, $, navigation } = useSponsorPage(props)

  return useObserver(() => (
    <Component id='screen-sponsor'>
      <StoreContext.Provider value={id}>
        <Header />
        <Page loaded={$.state._loaded}>
          {$.state.list ? <List /> : <Chart navigation={navigation} />}
        </Page>
      </StoreContext.Provider>
    </Component>
  ))
}

export default Sponsor
