/*
 * @Author: czy0729
 * @Date: 2019-08-24 01:29:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-11 11:49:18
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Flex, Text, Heatmap } from '@components'
import { SectionTitle, Avatar, Stars, PreventTouchPlaceholder } from '@_'
import { _, systemStore } from '@stores'
import { memo, obc } from '@utils/decorators'
import { URL_DEFAULT_AVATAR } from '@constants'
import IconHidden from './icon/hidden'

const defaultProps = {
  navigation: {},
  subjectId: 0,
  showRecent: true,
  who: [],
  hideScore: false,
  onSwitchBlock: Function.prototype
}

const Recent = memo(
  ({ navigation, subjectId, showRecent, who, hideScore, onSwitchBlock }) => {
    global.rerender('Subject.Recent.Main')

    return (
      <View style={[_.mt.lg, showRecent ? _.mb.sm : _.short]}>
        <SectionTitle
          style={_.container.wind}
          right={!showRecent && <IconHidden name='动态' value='showRecent' />}
          icon={!showRecent && 'md-navigate-next'}
          onPress={() => onSwitchBlock('showRecent')}
        >
          动态
        </SectionTitle>
        {showRecent && (
          <>
            <ScrollView
              style={_.mt.md}
              contentContainerStyle={_.container.wind}
              horizontal
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              overScrollMode='never'
            >
              {who.map(item => (
                <Flex key={item.userId} style={styles.item}>
                  <Avatar
                    navigation={navigation}
                    userId={item.userId}
                    name={item.name}
                    src={item.avatar}
                    event={{
                      id: '条目.跳转',
                      data: {
                        from: '用户动态',
                        subjectId
                      }
                    }}
                  />
                  <View style={_.ml.sm}>
                    <Flex>
                      <Text size={13} bold>
                        {item.name}
                      </Text>
                      {!hideScore && <Stars style={_.ml.xs} value={item.star} simple />}
                    </Flex>
                    <Text style={_.mt.xs} size={10} type='sub'>
                      {item.status}
                    </Text>
                  </View>
                </Flex>
              ))}
            </ScrollView>
            <Heatmap id='条目.跳转' from='用户动态' />
          </>
        )}
        <PreventTouchPlaceholder />
      </View>
    )
  },
  defaultProps
)

export default obc((props, { $, navigation }) => {
  global.rerender('Subject.Recent')

  const { showRecent } = systemStore.setting
  if (showRecent === -1) return null

  const { who } = $.subjectFormHTML
  let _who = who || []
  if ($.filterDefault || $.isLimit) {
    _who = _who.filter(item => !item.avatar.includes(URL_DEFAULT_AVATAR))
  }
  if (!_who.length) return null

  return (
    <Recent
      navigation={navigation}
      showRecent={showRecent}
      subjectId={$.subjectId}
      who={_who}
      hideScore={$.hideScore}
      onSwitchBlock={$.switchBlock}
    />
  )
})

const styles = _.create({
  item: {
    paddingRight: _.sm,
    marginRight: _.sm
  }
})