import { Atlas } from '@atlas/sdk/lib/src/atlas/atlas'
import omitBy from 'lodash/omitBy'
import isNil from 'lodash/isNil'
import { useAtlasProtocol } from './use-atlas-protocol'

const TRIGGER_VOICE_CONVERSATION = 'trigger-voice-conversation'

export function useVoiceConversation(atlasSdk: Atlas): [boolean, (phoneNumber: string, contactId: string) => void] {
  const [isAvailable, triggerProtocol] = useAtlasProtocol(
    TRIGGER_VOICE_CONVERSATION,
    atlasSdk
  )

  const trigger = (phoneNumber, contactId) => {
    triggerProtocol(
      omitBy(
        {
          target: phoneNumber,
          contact_person_id: contactId
        },
        isNil
      )
    )
  }

  return [isAvailable, trigger]
}
