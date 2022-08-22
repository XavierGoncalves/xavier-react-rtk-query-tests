import { mapWhenToDate } from "activity-app/utils/map-when-to-date"
import { ALL, CUSTOM, defaultFilterValues, DURATION_SECONDS } from "voicemails-app/constants/filters.constants"
import { STATE_VOICEMAIL_OPEN, STATE_VOICEMAIL_RESOLVED } from "voicemails-app/constants/state-types.constants"
import { VALUE_FILTER_ALL, VALUE_FILTER_UNASSIGNED } from "voicemails-app/constants/ui.constants"
import addDaysToDate from "./add-days-to-date"
import isEqual from 'lodash/isEqual'

const getRequestParams = ({
    page,
    voicemailStatus,
    contactId,
    when,
    duration,
    ringGroups,
    assignedTo
}) => {
    let params: any = {
        page: page,
        per_page: 10
    }

    // console.log('getRequestParams - input - page ->', page)
    // console.log('getRequestParams - input - statusFilter ->', voicemailStatus)
    // console.log('getRequestParams - input - contactFilter ->', contactId)
    // console.log('getRequestParams - input - whenFilter ->', when)
    // console.log('getRequestParams - input - durationFilter ->', duration)
    // console.log('getRequestParams - input - ringGroupFilter ->', ringGroups)
    
    // console.log('getRequestParams - input - assignedFilter ->', assignedTo)

    const assignedFilterId = assignedTo
        ? assignedTo.id || assignedTo
        : undefined

    if (voicemailStatus === STATE_VOICEMAIL_RESOLVED) {
        params = { ...params, resolved: true }
    } else if (voicemailStatus === STATE_VOICEMAIL_OPEN) {
        params = { ...params, resolved: false }
    }
    // debugger
    if (contactId && contactId.id !== VALUE_FILTER_ALL) {
        params = { ...params, contact_id: contactId.id }
    }

    if (when) {
        if(when.value !== ALL) {
            if (when.value) {
                params = {
                    ...params,
                    'created_at[gte]': when.customRange.start,
                    'created_at[lte]': addDaysToDate(when.customRange.end, 1)
                }
            } else {
                params = { ...params, 'created_at[gte]': mapWhenToDate(when) }
            }
        }
    }

    if (!isEqual(duration, defaultFilterValues.duration)) {
        const convertToSeconds = (value, unit) =>
            unit === DURATION_SECONDS ? value : Math.round(value * 60)

        const { min, max, unit } = duration

        params = {
            ...params,
            'duration[gte]': min ? convertToSeconds(min, unit) : null,
            'duration[lte]': max ? convertToSeconds(max, unit) : null
        }
    }

    if (ringGroups && ringGroups?.length > 0) {
        params = {
            ...params,
            'ring_groups[]': ringGroups
        }
    }

    if (assignedFilterId === VALUE_FILTER_UNASSIGNED) {
        params = { ...params, unassigned: true }
    } else if (
        assignedFilterId !== undefined &&
        assignedFilterId !== VALUE_FILTER_ALL
    ) {
        params = { ...params, user_id: assignedFilterId }
    }

    const result =  {
        ...params,
        order_by: "-date"
    }
    console.log('- getRequestParams - output ->', result)

    return result
}

export default getRequestParams
