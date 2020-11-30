/*
 * @Author: czy0729
 * @Date: 2020-11-30 15:39:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-30 19:06:22
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { IconHeader } from '@screens/_'
import { _ } from '@stores'
import { inject, withHeader, observer } from '@utils/decorators'
import { t } from '@utils/fetch'
import { withHeaderParams } from '../styles'
import StatusBarEvents from '../_/status-bar-events'
import List from './list'
import Store from './store'

const title = '粘贴板'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['tinygrail/clipboard', 'TinygrailClipboard'],
  withHeaderParams
})
@observer
class TinygrailClipboard extends React.Component {
  static navigationOptions = {
    title
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  async componentDidMount() {
    const { $, navigation } = this.context
    $.init(navigation)

    navigation.setParams({
      extra: (
        <>
          <IconHeader
            name='refresh'
            color={_.colorTinygrailPlain}
            onPress={() => {
              t('粘贴板.刷新')
              $.init()
            }}
          />
          <IconHeader
            style={{
              transform: [
                {
                  rotate: '-90deg'
                }
              ]
            }}
            name='logout'
            color={_.colorTinygrailPlain}
            onPress={() => {
              t('粘贴板.分享')
              $.onShare()
            }}
          />
        </>
      )
    })
  }

  render() {
    return (
      <View style={this.styles.container}>
        <StatusBarEvents />
        <List />
      </View>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  container: {
    flex: 1,
    backgroundColor: _.colorTinygrailContainer
  }
}))