/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-13 00:21:16
 */
import React from 'react'
import { View } from 'react-native'
import { Page, StatusBarEvents, ListView, UM, Heatmap } from '@components'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import { hm } from '@utils/fetch'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import Header from './header'
import List from './list'
import LinkModal from './link-modal'
import Store from './store'

const title = '发现'

const Discovery = ({ isFocused }, { $ }) => {
  useRunAfter(() => {
    $.init()
    hm('discovery', 'Discovery')
  })

  return useObserver(() => {
    const { home, dragging } = $.state
    return (
      <Page>
        <StatusBarEvents backgroundColor='transparent' />
        <ListView
          ref={$.connectRef}
          style={_.container.flex}
          contentContainerStyle={_.container.bottom}
          keyExtractor={keyExtractor}
          data={home}
          ListHeaderComponent={<Header />}
          renderItem={renderItem}
          scrollToTop={isFocused}
          scrollEnabled={!dragging}
          // onHeaderRefresh={dragging ? undefined : $.init}
          // onFooterRefresh={$.fetchHome}
        />
        <LinkModal />
        <UM screen={title} />
        <Heatmap bottom={_.bottom} id='发现' screen='Discovery' />
      </Page>
    )
  })
}

export default ic(Store, Discovery)

function keyExtractor(item) {
  return item.type
}

function renderItem({ item }) {
  return (
    <View>
      <List {...item} />
      <Heatmap id='发现.跳转' from={MODEL_SUBJECT_TYPE.getTitle(item.type)} />
    </View>
  )
}
