/*
 * 适配 react-navigation@5
 * 完全替代 @utils/decorators/withHeader.js
 *
 * @Author: czy0729
 * @Date: 2022-03-10 17:27:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-14 23:19:50
 */
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { _ } from '@stores'
import { useObserver } from '@utils/hooks'
import { IOS } from '@constants'
import { StatusBarEvents } from '../status-bar-events'
import { Track } from '../track'
import Popover from './popover'
import Placeholder from './placeholder'
import { updateHeader } from './utils'

const statusBarEventsTypes = {
  Subject: fixed => {
    return {
      barStyle: _.isDark || fixed ? 'dark-content' : 'light-content',
      backgroundColor: 'transparent',
      action: 'onWillFocus'
    }
  },
  Topic: () => {
    return {
      barStyle: 'dark-content',
      backgroundColor: 'transparent',
      action: 'onWillFocus'
    }
  }
}

const Header = ({
  /* 模式: null | 'float' | 'transition' */
  mode,

  /* 是否锁定, 垂直y坐标: 模式为 'float' | 'transition' 时有效 */
  fixed = false,

  y = 0,

  /* 标题 */
  title,

  /* 统计参数: [url地址, 对应页面key] */
  hm,

  /* 统计别名 */
  alias,

  /*
   * 右侧element
   * https://reactnavigation.org/docs/5.x/stack-navigator#headerright
   */
  headerRight = null,

  /* 模式为 'transition' 时有效, 代替 title 显示 */
  headerTitle = null,

  /* 是否变动状态栏主题 */
  statusBarEvents = true,

  /* 预设的状态栏主题: 'Subject' | 'Topic' */
  statusBarEventsType
}) => {
  const navigation = useNavigation()
  useLayoutEffect(() => {
    updateHeader({
      navigation,
      mode,
      y,
      fixed,
      title,
      headerRight,
      headerTitle,
      statusBarEventsType
    })
  }, [navigation, mode, y, fixed, title, headerRight, headerTitle, statusBarEventsType])

  return useObserver(() => {
    let statusBarEventsProps = {}
    if (statusBarEvents) {
      if (statusBarEventsType && statusBarEventsTypes[statusBarEventsType]) {
        statusBarEventsProps = statusBarEventsTypes[statusBarEventsType](fixed)
      } else if (mode) {
        statusBarEventsProps = {
          barStyle: fixed ? 'light-content' : 'dark-content',
          backgroundColor: 'transparent',
          action: 'onWillFocus'
        }
      } else if (!IOS && _.isDark) {
        statusBarEventsProps = {
          backgroundColor: _._colorPlainHex
        }
      }
    }

    return (
      <>
        {statusBarEvents && <StatusBarEvents {...statusBarEventsProps} />}
        <Track title={title} hm={hm} alias={alias} />
      </>
    )
  })
}

Header.Popover = Popover
Header.Placeholder = Placeholder

export { Header }
