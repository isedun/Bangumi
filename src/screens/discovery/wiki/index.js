/*
 * @Author: czy0729
 * @Date: 2021-02-03 22:47:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-13 00:05:10
 */
import React from 'react'
import { View } from 'react-native'
import { Page } from '@components'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import Counts from './counts'
import Cate from './cate'
import List from './list'
import Store from './store'

const Wiki = (props, { $ }) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <>
      <Header />
      <Page>
        <Counts />
        <View style={styles.list}>
          <Cate />
          <List />
        </View>
      </Page>
    </>
  ))
}

export default ic(Store, Wiki)

const styles = _.create({
  list: {
    flex: 1,
    paddingTop: _.sm
  }
})
