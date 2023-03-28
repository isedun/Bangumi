/*
 * @Author: czy0729
 * @Date: 2021-01-09 01:00:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-28 15:24:26
 */
import React from 'react'
import { Flex, Text, Touchable, Heatmap, Loading } from '@components'
import { _, otaStore, collectionStore, uiStore } from '@stores'
import { Tag, Cover, Stars, Rank, Manage } from '@_'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import {
  IMG_WIDTH_LG,
  IMG_HEIGHT_LG,
  IMG_DEFAULT,
  MODEL_COLLECTION_STATUS
} from '@constants'
import { CollectionStatus } from '@types'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function Item({ index, pickIndex }, { navigation }: Ctx) {
  const styles = memoStyles()
  const subjectId = otaStore.mangaSubjectId(pickIndex)
  const {
    id,
    mid,
    author,
    title,
    cates,
    ep,
    image,
    score,
    rank,
    total,
    status,
    publish
  } = otaStore.manga(subjectId)
  if (!id) {
    return (
      <Flex style={styles.loading} justify='center'>
        <Loading.Raw />
      </Flex>
    )
  }

  const size = title.length >= 20 ? 13 : title.length >= 14 ? 14 : 15
  const cover = image ? `https://lain.bgm.tv/pic/cover/m/${image}.jpg` : IMG_DEFAULT
  const _cates = String(cates).split(' ')
  const tipStr = [status, publish, author, ep].filter(item => !!item).join(' / ')
  const collection = collectionStore.collect(id)
  return (
    <Touchable
      style={styles.container}
      animate
      onPress={() => {
        navigation.push('Subject', {
          subjectId: id,
          _cn: title,
          _image: cover,
          _mid: mid
        })

        t('Manga.跳转', {
          subjectId: id
        })
      }}
    >
      <Flex style={styles.wrap} align='start'>
        <Cover src={cover} width={IMG_WIDTH_LG} height={IMG_HEIGHT_LG} radius shadow />
        <Flex.Item style={_.ml.wind}>
          <Flex align='start'>
            <Flex.Item>
              <Flex
                style={styles.content}
                direction='column'
                justify='between'
                align='start'
              >
                <Text size={size} bold numberOfLines={2}>
                  {title}
                </Text>
                <Text size={11} lineHeight={14}>
                  {tipStr}
                </Text>
              </Flex>
            </Flex.Item>
            <Manage
              subjectId={id}
              collection={collection}
              typeCn='书籍'
              onPress={() => {
                uiStore.showManageModal(
                  {
                    subjectId: id,
                    title,
                    status:
                      MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(collection),
                    action: '读'
                  },
                  '找漫画'
                )
              }}
            />
          </Flex>
          <Flex style={styles.bottom}>
            <Rank value={rank} />
            <Stars style={_.mr.xs} value={score} simple />
            {!!total && (
              <Text style={_.mr.sm} type='sub' size={11} bold>
                ({total})
              </Text>
            )}
            <Flex.Item>
              <Flex>
                {_cates.map(item => (
                  <Tag key={item} style={_.mr.sm} value={item} />
                ))}
              </Flex>
            </Flex.Item>
          </Flex>
        </Flex.Item>
      </Flex>
      {index === 0 && <Heatmap id='Manga.跳转' />}
    </Touchable>
  )
}

export default obc(Item)
