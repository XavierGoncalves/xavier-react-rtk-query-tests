import { defaultFilterValues } from "voicemails-app/constants/filters.constants"
import { VOICEMAIL_OPEN, VOICEMAIL_RESOLVED } from "voicemails-app/constants/state-types.constants"

const queryStringToStatus = (value: string | null) =>
    ({ open: VOICEMAIL_OPEN, resolved: VOICEMAIL_RESOLVED }[value || ''] || defaultFilterValues.status)


export default queryStringToStatus
