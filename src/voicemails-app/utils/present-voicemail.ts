import { STATE_UNINITIALIZED, STATE_VOICEMAIL_OPEN, STATE_VOICEMAIL_RESOLVED } from "voicemails-app/constants/state-types.constants"
import get from 'lodash/get'

const presentVoicemail = data => ({
    id: data.id,
    date: data.created_at,
    duration: data.duration,
    talkdeskPhoneNumber: data.talkdesk_phone_number,
    contactPhoneNumber: data.contact_phone_number,
    contactId: data.contact_id,
    assignedTo: data.user_id,
    ringGroups: data.ring_groups || [],
    status: {
        value: data.resolved
            ? STATE_VOICEMAIL_RESOLVED
            : STATE_VOICEMAIL_OPEN,
        loading: false
    },
    phoneNumberId: get(data, 'number_id', null),
    recordings: { status: STATE_UNINITIALIZED, items: [] }
})

export default presentVoicemail
