/*
 * @Author: czy0729
 * @Date: 2022-07-04 13:00:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-30 03:12:11
 */
import React from 'react'
import { TouchableWithoutFeedback, Insets } from 'react-native'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { getTimestamp, titleCase } from '@utils'
import { memo } from '@utils/decorators'
import { IOS, MODEL_RAKUEN_SCROLL_DIRECTION } from '@constants'
import { DEFAULT_PROPS, HIT_SLOP } from './ds'

type PassProps = {
  hitSlop: Insets
  onPress?: () => any
  onPressIn?: () => any
}

export const TouchScroll = memo(
  ({ styles, list, readedTime, scrollDirection, isWebLogin, onPress }) => {
    global.rerender('Topic.TouchScroll.Main')

    const showFloor = [
      Math.floor(list.length * 0.33333),
      Math.floor(list.length * 0.66666),
      list.length - 1
    ]

    const isVertical =
      scrollDirection === MODEL_RAKUEN_SCROLL_DIRECTION.getValue('右侧') ||
      scrollDirection === MODEL_RAKUEN_SCROLL_DIRECTION.getValue('左侧')

    const passProps: PassProps = {
      hitSlop: HIT_SLOP
    }
    if (IOS) {
      passProps.onPress = () => onPress(-1)
    } else {
      passProps.onPressIn = () => onPress(-1)
    }
    return (
      <Flex
        style={[
          styles[`container${titleCase(scrollDirection)}`],
          !isWebLogin && !isVertical && styles.notLogin
        ]}
        direction={isVertical ? 'column' : undefined}
      >
        <Flex.Item flex={isVertical ? 1 : 3}>
          <TouchableWithoutFeedback {...passProps}>
            <Flex style={isVertical ? styles.itemVertical : styles.itemHorizontal}>
              <Text style={styles.text} size={8} type='icon' align='center'>
                1
              </Text>
            </Flex>
          </TouchableWithoutFeedback>
        </Flex.Item>
        {list.map((item, index) => {
          let isNew = false

          if (readedTime) {
            if (getTimestamp(item.time) > readedTime) isNew = true

            if (!isNew) {
              if (item.sub) {
                item.sub.forEach(i => {
                  if (getTimestamp(i.time) > readedTime) isNew = true
                })
              }
            }
          }

          const showFloorText = showFloor.includes(index)
          const passProps: PassProps = {
            hitSlop: HIT_SLOP
          }
          if (IOS) {
            passProps.onPress = () => onPress(index)
          } else {
            passProps.onPressIn = () => onPress(index)
          }
          return (
            <Flex.Item key={index} flex={isVertical ? 1 : showFloorText ? 3 : 1}>
              <TouchableWithoutFeedback {...passProps}>
                <Flex
                  style={[
                    isVertical ? styles.itemVertical : styles.itemHorizontal,
                    isNew && styles.itemNew,
                    showFloorText && styles.itemText
                  ]}
                >
                  {showFloorText && (
                    <Text
                      style={styles.text}
                      size={8}
                      type={isNew ? _.select('plain', 'icon') : 'icon'}
                      align='center'
                    >
                      {String(list[index]?.floor).replace('#', '')}
                    </Text>
                  )}
                </Flex>
              </TouchableWithoutFeedback>
            </Flex.Item>
          )
        })}
      </Flex>
    )
  },
  DEFAULT_PROPS,
  ({ list, ...other }: { list: any[] }) => ({
    list: list.length,
    ...other
  })
)