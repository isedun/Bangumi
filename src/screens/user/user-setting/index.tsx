/*
 * @Author: czy0729
 * @Date: 2020-09-05 15:53:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 07:50:31
 */
import React from 'react'
import { Component } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Header from './header'
import { useUserSettingPage } from './hooks'
import Scroll from './scroll'

/** 个人设置 */
const UserSetting = (props: NavigationProps) => {
  const { id, $ } = useUserSettingPage(props)

  return useObserver(() => (
    <Component id='screen-user-setting'>
      <StoreContext.Provider value={id}>
        <Header />
        <Scroll $={$} />
      </StoreContext.Provider>
    </Component>
  ))
}

export default UserSetting
