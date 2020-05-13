/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:03:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-12 23:39:35
 */
import React from 'react'
import { Animated, View } from 'react-native'
import PropTypes from 'prop-types'
import { Text, Iconfont } from '@components'
import { Popover, IconHeader, IconBack } from '@screens/_'
import { _ } from '@stores'
import { open } from '@utils'
import { observer } from '@utils/decorators'
import { t } from '@utils/fetch'
import { getCoverMedium } from '@utils/app'
import { IOS } from '@constants'
import { CDN_OSS_SUBJECT } from '@constants/cdn'
import Head from './head'
import { height, headerHeight } from './store'

const dataMe = [
  '我的好友',
  'netaba.re'
  // '缺少收藏?'
]
const dataOther = ['TA的好友', 'TA的netaba.re']

function ParallaxImage({ scrollY, fixed }, { $, navigation }) {
  const styles = memoStyles()
  const { id, avatar = {}, nickname } = $.usersInfo
  const isMe = $.myUserId === id
  const parallaxStyle = {
    transform: [
      {
        translateY: scrollY.interpolate({
          inputRange: [-height, 0, height - headerHeight, height],
          outputRange: [
            height / 2,
            0,
            -(height - headerHeight),
            -(height - headerHeight)
          ]
        })
      },
      {
        scale: scrollY.interpolate({
          inputRange: [-height, 0, height],

          // -h: 2, 0: 1, h: 1 当scrollY在-h到0时, scale按照2-1的动画运动
          // 当scrollY在0-h时, scale不变. 可以输入任意数量对应的值, 但必须是递增或者相等
          outputRange: [2, 1, 1]
        })
      }
    ]
  }

  const data = isMe ? dataMe : dataOther
  return (
    <>
      <View style={styles.parallax} pointerEvents={fixed ? 'none' : undefined}>
        <Animated.Image
          style={[styles.parallaxImage, parallaxStyle]}
          source={{
            uri: CDN_OSS_SUBJECT(getCoverMedium(avatar.medium))
          }}
          blurRadius={IOS ? 2 : 1}
        />
        <Animated.View
          style={[
            styles.parallaxMask,
            parallaxStyle,
            {
              backgroundColor: _.select(
                'rgba(0, 0, 0, 0.48)',
                'rgba(0, 0, 0, 0.64)'
              ),
              opacity: scrollY.interpolate({
                inputRange: [-height, 0, height - headerHeight, height],
                outputRange: _.select([0, 0.4, 1, 1], [0.4, 0.8, 1, 1])
              })
            }
          ]}
        />
        <Animated.View
          style={[
            styles.parallaxMask,
            parallaxStyle,
            {
              opacity: scrollY.interpolate({
                inputRange: [-height, 0, height - headerHeight, height],
                outputRange: [0, 0, 1, 1]
              })
            }
          ]}
        >
          <Text style={styles.title} size={16} align='center' numberOfLines={1}>
            {nickname}
          </Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.parallaxMask,
            parallaxStyle,
            {
              opacity: scrollY.interpolate({
                inputRange: [-height, 0, height - headerHeight, height],
                outputRange: [1, 1, 0, 0]
              })
            }
          ]}
        >
          <Head style={styles.head} />
        </Animated.View>
      </View>
      {!!$.params.userId && (
        <IconBack
          style={styles.back}
          navigation={navigation}
          color={_.__colorPlain__}
        />
      )}
      <View style={[isMe ? styles.menu : styles.more]}>
        <Popover
          data={data}
          onSelect={key => {
            t('我的.右上角菜单', {
              key
            })

            switch (key) {
              case '我的好友':
                navigation.push('Friends')
                break

              case 'TA的好友':
                navigation.push('Friends', {
                  userId: id
                })
                break

              case 'netaba.re':
              case 'TA的netaba.re':
                open(`https://netaba.re/user/${id}`)
                break

              default:
                break
            }
          }}
        >
          <Iconfont name={isMe ? 'list' : 'more'} color={_.__colorPlain__} />
        </Popover>
      </View>
      {!$.params.userId && (
        <IconHeader
          style={styles.setting}
          name='setting'
          color={_.__colorPlain__}
          onPress={() => {
            t('我的.跳转', {
              to: 'Setting'
            })

            navigation.push('Setting')
          }}
        />
      )}
    </>
  )
}

ParallaxImage.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(ParallaxImage)

const memoStyles = _.memoStyles(_ => ({
  parallax: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    left: 0
  },
  parallaxImage: {
    height
  },
  parallaxMask: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: -_.hairlineWidth,
    left: 0
  },
  head: {
    marginTop: 76
  },
  title: {
    position: 'absolute',
    left: '50%',
    width: 200,
    bottom: _.sm + (IOS ? 5 : 12),
    color: _.__colorPlain__,
    transform: [
      {
        translateX: -100
      }
    ]
  },
  back: {
    ..._.header.left,
    zIndex: 1
  },
  menu: {
    ..._.header.left,
    zIndex: 1,
    padding: _.sm,
    marginLeft: 2
  },
  setting: {
    ..._.header.right,
    zIndex: 1
  },
  more: {
    ..._.header.right,
    zIndex: 1,
    padding: _.sm
  }
}))
