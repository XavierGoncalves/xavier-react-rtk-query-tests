import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import { STATE_VOICEMAIL_OPEN, STATE_VOICEMAIL_RESOLVED } from 'voicemails-app/constants/state-types.constants'
import { AxiosInstance } from 'axios'

interface Input {
    voicemailId: string;
    contactId?: string;
    userId?: string;
    voicemailStatus?: string;
    http: AxiosInstance;
}

const updateVoicemailApi = async ({ 
    contactId, userId, voicemailId, voicemailStatus, http 
}: Input) => {
  const resolved = voicemailStatus
    ? voicemailStatus === STATE_VOICEMAIL_RESOLVED
    : undefined

  const response = await http.patch(
    `voicemails/${voicemailId}`,
    omitUndefined({
      contact_id: contactId,
      resolved,
      user_id: userId
    }),
    {
      headers: {
        Accept: 'application/hal+json'
      }
    }
  )

  return omitUndefined(presentVoicemail(response.data))
}

const presentVoicemail = data => ({
  id: data.id,
  contactId: data.contact_id,
  userId: data.user_id,
  status: data.resolved ? STATE_VOICEMAIL_RESOLVED : STATE_VOICEMAIL_OPEN
})

const omitUndefined = obj => omitBy(obj, isUndefined)

export default updateVoicemailApi
