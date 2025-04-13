/*
 * @Author: czy0729
 * @Date: 2020-09-11 11:52:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-13 21:04:51
 */
import { useState } from 'react'
import { Linking } from 'react-native'
import useMount from './useMount'

export default function useInitialURL() {
  const [url, setUrl] = useState(null)
  const [processing, setProcessing] = useState(true)

  useMount(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL()
      console.info('useInitialURL', initialUrl)

      // The setTimeout is just for testing purpose
      setTimeout(() => {
        setUrl(initialUrl)
        setProcessing(false)
      }, 800)
    }

    getUrlAsync()
  })

  return {
    url,
    processing
  }
}
