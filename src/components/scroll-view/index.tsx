/*
 * @Author: czy0729
 * @Date: 2020-12-10 20:03:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-15 02:18:20
 */
import React, { useRef } from 'react'
import { Animated, ScrollView as RNScrollView } from 'react-native'
import { r } from '@utils/dev'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { ScrollToTop } from '../scroll-to-top'
import { COMPONENT } from './ds'
import { Props as ScrollViewProps } from './types'

export { ScrollViewProps }

/** 通用 ScrollView */
export const ScrollView = ({
  style,
  contentContainerStyle,
  horizontal,
  scrollToTop,
  connectRef,
  animated,

  // 此属性对于 iOS 需要有默认值, 否则会出现首次渲染滚动条位置不正确的问题
  scrollIndicatorInsets = {
    right: 1
  },
  scrollEventThrottle,
  onScroll,
  children,
  ...other
}: ScrollViewProps) => {
  r(COMPONENT)

  const scrollViewEl = useRef(null)

  let ref: React.LegacyRef<RNScrollView>
  if (scrollToTop) {
    ref = ref => (scrollViewEl.current = ref?.scrollTo)
  } else if (connectRef) {
    ref = ref => connectRef(ref?.scrollTo)
  }

  const Component: any = animated ? Animated.ScrollView : RNScrollView
  return (
    <>
      <Component
        ref={ref}
        style={style}
        contentContainerStyle={contentContainerStyle}
        horizontal={horizontal}
        scrollIndicatorInsets={scrollIndicatorInsets}
        scrollEventThrottle={
          scrollEventThrottle === undefined && onScroll ? 4 : scrollEventThrottle
        }
        onScroll={onScroll}
        {...other}
        {...SCROLL_VIEW_RESET_PROPS}
      >
        {children}
      </Component>
      {scrollToTop && <ScrollToTop scrollTo={scrollViewEl.current} />}
    </>
  )
}
