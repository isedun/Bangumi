/*
 * 气泡, 没有完全沿用官方的, 改了很多代码
 * @Doc: https://rn.mobile.ant.design/components/popover-cn/
 * @Author: czy0729
 * @Date: 2019-03-16 10:54:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-28 21:50:13
 */
import React, { useMemo, useRef } from 'react'
import { DeviceEventEmitter, View } from 'react-native'
import { HoldItem } from 'react-native-hold-menu'
import { _ } from '@stores'
import { useMount } from '@utils/hooks'
import { IOS } from '@constants'

const EVENT_TYPE = 'POPOVER_ONSELECT'
let id = 0

function Popover({ children, ...other }) {
  const { style, overlay } = other
  const data = other?.data || overlay?.props?.data
  const title = other?.title || overlay?.props?.title || ''
  const onSelect = other?.onSelect || overlay?.props?.onSelect || Function.prototype
  const eventId = useRef((id += 1))
  const eventType = `${EVENT_TYPE}|${eventId.current}`
  const items = useMemo(() => {
    const _items = (data || []).map(item => ({
      text: item,
      eventType
    }))
    if (title) {
      _items.unshift({
        text: title,
        isTitle: true
      })
    }
    return _items
  }, [title, data, eventType])
  useMount(() => {
    const subscription = DeviceEventEmitter.addListener(eventType, value =>
      onSelect(value)
    )
    return () => subscription.remove()
  })

  return (
    <View style={style}>
      <HoldItem
        styles={styles.holdItem}
        items={items}
        activateOn='tap'
        closeOnTap
        hapticFeedback={IOS ? 'Light' : 'None'}
      >
        {children}
      </HoldItem>
    </View>
  )
}

export default Popover

const styles = _.create({
  holdItem: {
    position: 'relative',
    maxWidth: '50%'
  }
})

// Old
// import CompPopover from '../@/ant-design/popover'
// import { _ } from '@stores'
//
// function Popover({ children, ...other }) {
//   return (
//     <CompPopover
//       arrowStyle={{
//         borderTopColor: _.select(_.colorPlain, _._colorDarkModeLevel2)
//       }}
//       {...other}
//     >
//       {children}
//     </CompPopover>
//   )
// }
