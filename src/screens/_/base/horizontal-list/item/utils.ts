/*
 * @Author: czy0729
 * @Date: 2024-09-02 17:49:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 17:56:41
 */
import { SubjectTypeCn } from '@types'

const memo = new Map<string, SubjectTypeCn>()

/** 推断条目的类型 */
export function getTypeCn(
  name: string,
  desc: string,
  typeCn?: SubjectTypeCn,
  relationTypeCn?: SubjectTypeCn
): SubjectTypeCn {
  if (String(name).toLocaleLowerCase().includes('soundtrack')) return '音乐'

  const str = String(desc || '')
  const id = `${str}|${typeCn}|${relationTypeCn}`
  if (memo.has(id)) return memo.get(id)

  let value: SubjectTypeCn = typeCn
  if (!value) {
    if (str.includes('动画')) {
      value = '动画'
    } else if (
      (!str.includes('演出') && str.includes('曲') && str !== '作曲') ||
      (!str.includes('演出') && str.includes('歌')) ||
      str.includes('声') ||
      str.includes('广播')
    ) {
      value = '音乐'
    } else if (str.includes('书籍') || str.includes('画')) {
      value = '书籍'
    } else if (str.includes('游戏')) {
      value = '游戏'
    } else if (relationTypeCn) {
      if (str.includes('不同演绎') || str.includes('相同世界观') || str.includes('主版本')) {
        value = relationTypeCn
      }
    }
  }

  memo.set(id, value)
  return value
}