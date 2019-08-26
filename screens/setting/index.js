/*
 * @Author: czy0729
 * @Date: 2019-05-24 01:34:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-26 11:05:03
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Switch } from '@ant-design/react-native'
import { Text } from '@components'
import { StatusBar, Popover, ItemSetting } from '@screens/_'
import Stores, { systemStore } from '@stores'
import { withHeader, observer } from '@utils/decorators'
import { info } from '@utils/ui'
import { appNavigate } from '@utils/app'
import { hm } from '@utils/fetch'
import {
  FEEDBACK_URL,
  GITHUB_URL,
  GITHUB_RELEASE_URL,
  GITHUB_RELEASE_VERSION,
  CODE_PUSH_VERSION
} from '@constants'
import { MODEL_SETTING_QUALITY } from '@constants/model'
import _ from '@styles'

const title = '设置'

export default
@withHeader()
@observer
class Setting extends React.Component {
  static navigationOptions = {
    title
  }

  state = {
    showDev: false
  }

  componentDidMount() {
    const { navigation } = this.props
    navigation.setParams({
      popover: {
        data: ['开发模式'],
        onSelect: key => {
          switch (key) {
            case '开发模式':
              this.toggleDev()
              break
            default:
              break
          }
        }
      },
      element: (
        <View
          style={{
            width: 32,
            height: 32
          }}
        />
      )
    })

    hm('settings', title)
  }

  setQuality = label => {
    if (label) {
      systemStore.setQuality(label)
    }
  }

  toggleDev = () => {
    const { showDev } = this.state
    this.setState({
      showDev: !showDev
    })
    info(`调式模式 ${!showDev ? '开' : '关'}`)
    systemStore.toggleDev()
  }

  render() {
    const { navigation } = this.props
    const {
      quality,
      cnFirst,
      autoFetch,
      speech,
      tinygrail,
      avatarRound
    } = systemStore.setting
    const { name } = systemStore.release
    const hasNewVersion = name !== GITHUB_RELEASE_VERSION
    let version = GITHUB_RELEASE_VERSION
    if (CODE_PUSH_VERSION) {
      version += `-${CODE_PUSH_VERSION}`
    }
    return (
      <>
        <StatusBar />
        <ScrollView
          style={_.container.screen}
          contentContainerStyle={_.container.bottom}
        >
          <Text style={[_.container.wind, _.mt.md]} type='sub'>
            基本
          </Text>
          <ItemSetting
            style={_.mt.sm}
            hd='图片质量'
            ft={
              <Popover
                data={MODEL_SETTING_QUALITY.data.map(({ label }) => label)}
                onSelect={this.setQuality}
              >
                <Text size={16} type='sub'>
                  {MODEL_SETTING_QUALITY.getLabel(quality)}
                </Text>
              </Popover>
            }
            arrow
            highlight
          />
          <ItemSetting
            border
            hd='优先中文'
            ft={
              <Switch checked={cnFirst} onChange={systemStore.switchCnFirst} />
            }
            withoutFeedback
          />

          <ItemSetting
            border
            hd='优化请求量 (实验性)'
            ft={
              <Switch
                checked={!autoFetch}
                onChange={systemStore.switchAutoFetch}
              />
            }
            withoutFeedback
          />
          <ItemSetting
            border
            hd='小圣杯信息'
            ft={
              <Switch
                checked={tinygrail}
                onChange={systemStore.switchTinygrail}
              />
            }
            withoutFeedback
          />

          <Text style={[_.container.wind, _.mt.md]} type='sub'>
            界面
          </Text>
          <ItemSetting
            style={_.mt.sm}
            hd='Bangumi娘话语'
            ft={<Switch checked={speech} onChange={systemStore.switchSpeech} />}
            withoutFeedback
          />
          <ItemSetting
            border
            hd='圆形头像'
            ft={
              <Switch
                checked={avatarRound}
                onChange={systemStore.switchAvatarRound}
              />
            }
            withoutFeedback
          />

          <Text style={[_.container.wind, _.mt.md]} type='sub'>
            联系
          </Text>
          <ItemSetting
            style={_.mt.sm}
            hd='检测更新'
            ft={
              hasNewVersion ? (
                <Text type='success' size={16}>
                  有新版本{name}
                  <Text type='sub' size={16}>
                    {' '}
                    / 当前{version}
                  </Text>
                </Text>
              ) : (
                `当前版本${version}`
              )
            }
            arrow
            onPress={() => appNavigate(GITHUB_RELEASE_URL)}
          />
          <ItemSetting
            border
            hd='问题反馈'
            arrow
            highlight
            onPress={() => appNavigate(FEEDBACK_URL, navigation)}
          />

          <ItemSetting
            border
            hd='项目地址'
            ft='喜欢的话求个Star'
            arrow
            highlight
            onPress={() => appNavigate(GITHUB_URL)}
          />

          <Text style={[_.container.wind, _.mt.md]} type='sub'>
            其他
          </Text>
          <ItemSetting
            style={_.mt.sm}
            hd='清除缓存'
            arrow
            highlight
            onPress={Stores.clearStorage}
          />
          <ItemSetting
            border
            hd='退出登陆'
            arrow
            highlight
            onPress={() => Stores.logout(navigation)}
          />
        </ScrollView>
      </>
    )
  }
}
