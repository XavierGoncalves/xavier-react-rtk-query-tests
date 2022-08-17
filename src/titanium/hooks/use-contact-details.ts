import { Atlas } from "@atlas/sdk"
import { useAtlasProtocol } from "titanium/common/hooks/use-atlas-protocol"

const SHOW_CONTACT_DETAILS_PROTOCOL_NAME = 'contacts:show-details'

const useContactDetails = (atlasSdk: Atlas): [boolean, (contactId: string) => void] => {
  const [isAvailable, triggerProtocol] = useAtlasProtocol(
    SHOW_CONTACT_DETAILS_PROTOCOL_NAME,
    atlasSdk
  )

  const trigger = contactId => {
    triggerProtocol({
      id: contactId
    })
  }

  return [isAvailable, trigger]
}

export default useContactDetails
