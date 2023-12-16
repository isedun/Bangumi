/*
 * @Author: czy0729
 * @Date: 2023-12-15 13:26:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-15 13:26:46
 */
import { DEV } from '@/config'

/** [DEV] */
export function log(method: string, ...others: any[]) {
  if (DEV) console.info(`[@utils/utils/${method}]`, ...others)
}
