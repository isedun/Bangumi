/*
 * @Author: czy0729
 * @Date: 2022-03-22 16:58:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-06 05:11:13
 */
import React from 'react'
import { View } from 'react-native'
import { Page, ScrollView, Divider } from '@components'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import Cloud from './cloud'
import Title from './title'
import Item from './item'
import Create from './create'
import Store, { types } from './store'

const OriginSetting = (props, { $ }) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => {
    const styles = memoStyles()
    const { _loaded, active } = $.state
    return (
      <>
        <Header />
        <Page loaded={_loaded}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <Cloud active={active} onToggle={$.onToggle} onDownloaded={$.init} />
            {types.map((item, index) => (
              <View key={item.type}>
                {!!index && <Divider />}
                <Title type={item.type} name={item.name} />
                <View style={styles.list}>
                  {$.data[item.type]
                    .filter(i => (active ? true : i.active))
                    .map(i => (
                      <Item key={`${i.id}|${i.uuid}`} {...i} type={item.type} />
                    ))}
                  <Create type={item.type} name={item.name} />
                </View>
              </View>
            ))}
          </ScrollView>
        </Page>
      </>
    )
  })
}

export default ic(Store, OriginSetting)

const memoStyles = _.memoStyles(() => ({
  scrollView: {
    paddingTop: _.sm,
    paddingHorizontal: _.wind,
    paddingBottom: _.bottom
  },
  list: {
    minHeight: 80,
    marginTop: _.md
  }
}))
