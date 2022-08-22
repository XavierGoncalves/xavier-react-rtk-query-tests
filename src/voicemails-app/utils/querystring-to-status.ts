import { defaultFilterValues } from "voicemails-app/constants/filters.constants"
import { STATE_VOICEMAIL_OPEN, STATE_VOICEMAIL_RESOLVED } from "voicemails-app/constants/state-types.constants"

const queryStringToStatus = (value: string | null) =>
    ({ open: STATE_VOICEMAIL_OPEN, resolved: STATE_VOICEMAIL_RESOLVED }[value || ''] || defaultFilterValues.voicemailStatus)


export default queryStringToStatus
