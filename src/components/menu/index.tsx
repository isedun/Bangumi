/*
 * @Author: czy0729
 * @Date: 2019-04-06 06:57:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-04 22:01:31
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { STORYBOOK } from '@constants'
import { Component } from '../component'
import { Text } from '../text'
import { Touchable } from '../touchable'
import { memoStyles } from './styles'
import { Props as MenuProps } from './types'

export { MenuProps }

/** iOS 风格菜单 */
export const Menu = observer(
  ({ style, title = [], desc = '', data = [], onSelect = () => {} }: MenuProps) => {
    const styles = memoStyles()
    return (
      <Component id='component-menu'>
        <View style={stl(styles.container, style)}>
          {title.length !== 0 && (
            <View style={styles.title}>
              {title.map((item, index) => (
                <Text
                  key={index}
                  style={index !== 0 && _.mt.sm}
                  type='sub'
                  size={12}
                  align='center'
                >
                  {item}
                </Text>
              ))}
            </View>
          )}
          {!!desc && (
            <Text style={_.mt.sm} type='sub' size={10} lineHeight={16} align='center'>
              {desc}
            </Text>
          )}
          {data.map((item: string | { title: string; type: string }, index: number) => {
            const showBorder = title.length !== 0 || (title.length === 0 && index !== 0)
            if (typeof item === 'string') {
              return (
                <View key={item} style={showBorder && styles.border}>
                  <Touchable style={styles.item} onPress={() => onSelect(item, index)}>
                    <Text align='center' size={STORYBOOK ? 13 : 14}>
                      {item}
                    </Text>
                  </Touchable>
                </View>
              )
            }

            if (item.type === 'divider') {
              return <View key={index} style={styles.border} />
            }

            return (
              <View key={item.title} style={showBorder && styles.border}>
                <Touchable
                  style={styles.item}
                  onPress={() => onSelect(item.title, index)}
                >
                  {item.title}
                </Touchable>
              </View>
            )
          })}
        </View>
      </Component>
    )
  }
)
