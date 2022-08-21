import { defaultFilterValues } from "voicemails-app/constants/filters.constants"
import { TAB_ASSIGNED_TO_ME } from "voicemails-app/constants/ui.constants"

const queryStringToAssignedUser = (value: string | null, currentTab: string, currentUserId: string) => {
    if(currentTab === TAB_ASSIGNED_TO_ME) {
        return {id: currentUserId }
    }
    if(value === null) {
        return defaultFilterValues.assignedTo
    }
    return { id: value }
}

export default queryStringToAssignedUser
