/*
 * @Author: czy0729
 * @Date: 2025-02-14 04:45:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-14 09:15:53
 */
import React from 'react'
import { View } from 'react-native'
import { ActionSheet, Flex, Text } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { useBoolean } from '@utils/hooks'
import { Ctx } from '../../../types'
import { useVIBTrend } from './hooks'
import { styles } from './styles'

function VibTrend() {
  const { $ } = useStore<Ctx>()
  const { state, setTrue, setFalse } = useBoolean(false)
  const data = useVIBTrend($.subjectId)
  if (!data.length) return null

  return (
    <>
      <IconTouchable
        style={[_.ml.xxs, _.mr._sm]}
        name='md-trending-up'
        size={18}
        onPress={() => {
          setTrue()

          t('条目.趋势', {
            subjectId: $.subjectId
          })
        }}
      />
      <ActionSheet title='评分趋势' show={state} onClose={setFalse}>
        {data.map(item => {
          const up = item.value.includes('+')
          return (
            <Flex key={`${item.month}|${item.title}`} style={_.mt.xs} justify='center'>
              <Text style={styles.label} lineHeight={28} noWrap>
                {item.month} · {item.title}{' '}
              </Text>
              <Flex style={styles.value}>
                <View style={up && styles.reverse}>
                  <Text type={up ? 'bid' : 'ask'} size={28}>
                    ▾
                  </Text>
                </View>
                <Text lineHeight={28} bold noWrap>
                  {'  '}
                  {item.value.slice(0, 5)}
                </Text>
              </Flex>
            </Flex>
          )
        })}
      </ActionSheet>
    </>
  )
}

export default ob(VibTrend)
