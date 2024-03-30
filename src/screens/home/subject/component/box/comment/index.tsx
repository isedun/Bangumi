/*
 * @Author: czy0729
 * @Date: 2024-03-25 11:07:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-30 11:31:52
 */
import React, { useState } from 'react'
import { Expand, Text } from '@components'
import { Likes } from '@_'
import { timelineStore, uiStore, userStore } from '@stores'
import { c } from '@utils/decorators'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Comment(props, { $ }: Ctx) {
  r(COMPONENT)

  const [lines, setLines] = useState(3)

  return useObserver(() => {
    const { comment } = $.collection
    if (!comment) return null

    const styles = memoStyles()
    const relatedId = timelineStore.relatedId(userStore.userInfo.username || $.userId, $.subjectId)
    const el = (
      <Text
        style={styles.comment}
        size={14}
        lineHeight={15}
        numberOfLines={lines}
        onPress={() => {
          setLines(undefined)
        }}
      >
        {comment}
      </Text>
    )

    return (
      <>
        {comment.length >= 80 ? <Expand ratio={0.72}>{el}</Expand> : el}
        {!!relatedId && (
          <Likes
            topicId={$.subjectId}
            id={relatedId}
            likeType='40'
            formhash={userStore.formhash}
            onLongPress={uiStore.showLikesUsers}
          />
        )}
      </>
    )
  })
}

export default c(Comment)
