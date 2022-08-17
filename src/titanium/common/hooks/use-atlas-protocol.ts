import { Atlas } from '@atlas/sdk'
import { useCallback, useEffect, useState } from 'react'

export function useAtlasProtocol(protocol: string, atlasSdk: Atlas): [boolean, (params: any) => void] {
  const [isAvailable, setAvailable] = useState(false)
  useEffect(() => {
    const checkAvailability = async () => {
      
      try {
        const available = await atlasSdk.protocol.isAvailable(protocol)
        setAvailable(available)
      } catch (error) {
        // console.log('atlasSdk.protocol.isAvailable-error', atlasSdk.protocol)
      }
    }

    checkAvailability()
  }, [atlasSdk, protocol])

  const trigger = useCallback(
    params => {
      if (isAvailable) {
        atlasSdk.protocol.trigger(protocol, params)
      }
    },
    [isAvailable, atlasSdk.protocol, protocol]
  )

  return [isAvailable, trigger]
}
