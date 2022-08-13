import { Atlas } from '@atlas/sdk/lib/src/atlas/atlas'
import { useCallback, useEffect, useState } from 'react'

export function useAtlasProtocol(protocol: string, atlasSdk: Atlas): [boolean, (params: any) => void] {
  const [isAvailable, setAvailable] = useState(false)

  useEffect(() => {
    const checkAvailability = async () => {
      const available = await atlasSdk.protocol.isAvailable(protocol)
      setAvailable(available)
    }

    checkAvailability()
  }, [atlasSdk.protocol, protocol])

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
