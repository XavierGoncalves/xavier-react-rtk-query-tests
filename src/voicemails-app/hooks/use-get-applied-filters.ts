import diffBetweenObjects from "activity-app/utils/diff-between-objects"
import isEmpty from 'lodash/isEmpty'
import { ALL, defaultFilterValues, DURATION_MINUTES, LAST_DAY, LAST_MONTH, LAST_SIX_HOURS, LAST_WEEK } from "voicemails-app/constants/filters.constants"
import { STATE_VOICEMAIL_OPEN, STATE_VOICEMAIL_RESOLVED } from "voicemails-app/constants/state-types.constants"
import { formatDateRange } from '@titanium/components'
import useAppUrlParams from "./use-search-params"
import { useCurrentUser } from "titanium/common/context/user.context"
import useGetCurrentTab from "./use-get-current-tab"
import { TAB_ASSIGNED_TO_ME } from "voicemails-app/constants/ui.constants"
import { useQueryClient } from "@tanstack/react-query"

const FILTERS_SORT_ORDER = {
    voicemailStatus: 1,
    contactId: 2,
    assignedTo: 3,
    when: 4,
    ringGroups: 5,
    duration: 6,
    voicemailId: 8
}

const STATUS_LABELS = {
    [ALL]: 'fields.status.all',
    [STATE_VOICEMAIL_OPEN]: 'fields.status.open',
    [STATE_VOICEMAIL_RESOLVED]: 'fields.status.resolved'
}

const FILTER_LABELS = {
    voicemailStatus: 'fields.status.label',
    contactId: 'fields.contact.label',
    assignedTo: 'fields.agent.label',
    when: 'fields.date.label',
    ringGroups: 'fields.ringGroups.label',
    duration: 'fields.duration.label'
}

const WHEN_LABELS = {
    [LAST_SIX_HOURS]: 'fields.date.last6Hours',
    [LAST_DAY]: 'fields.date.last24Hours',
    [LAST_WEEK]: 'fields.date.lastWeek',
    [LAST_MONTH]: 'fields.date.lastMonth',
    [ALL]: 'fields.date.allTime'
}

const getValueLabel = ({ min, max }) => {
    if (min && max) {
        return min === max
            ? 'fields.duration.minEqMaxLabel'
            : 'fields.duration.minMaxLabel'
    } else if (min) {
        return 'fields.duration.minLabel'
    } else {
        return 'fields.duration.maxLabel'
    }
}

const getUnitLabel = unit => (unit === DURATION_MINUTES ? 'Minutes' : 'Seconds')

const getDurationLabel = value => ({
    label: `${getValueLabel(value)}${getUnitLabel(value.unit)}`,
    translate: true
})

const createArray = value =>
    Array.isArray(value) ? value : value ? [value] : []

const compareFilters = (a, b) => FILTERS_SORT_ORDER[a] - FILTERS_SORT_ORDER[b]

const getUserName = (user, currentUser) =>
    user.id === currentUser.id
        ? { label: 'fields.assigned.currentUser', translate: true }
        : { label: user.name }

const getFilterValueLabel = (name, value, props) =>
({
    voicemailStatus: value => ({ label: STATUS_LABELS[value], translate: true }),
    contactId: value => ({ label: value.label }),
    when: value =>
        value.customRange.start
            ? { label: formatDateRange(value.customRange) }
            : { label: WHEN_LABELS[value.value], translate: true },
    ringGroups: value => ({ label: value }),
    assignedTo: ({ id: assignedUserId }, { 
        // users, 
        currentUser,
        currentTab
    }) => {
        // const user = users.find(user => user.id === assignedUserId)
        // return user
        //     ? getUserName(user, currentUser)
        //     : { label: 'fields.assigned.unassigned', translate: true }
        return { label: 'fields.assigned.unassigned', translate: true }
    },
    duration: getDurationLabel,
    voicemailId: value => ({ label: value })
}[name](value, props))

const useGetAppliedFilters = () => {
    const queryClient = useQueryClient()
    const {
        voicemailStatus,
        contactId,
        assignedTo,
        when,
        ringGroups,
        duration,
        voicemailId
    } = useAppUrlParams()
    const currentTab = useGetCurrentTab()
    const assignedUsers = queryClient.getQueryData(['assignedUsers', 'list'])
    const filters = {
        voicemailStatus,
        contactId,
        assignedTo: currentTab === TAB_ASSIGNED_TO_ME ? defaultFilterValues.assignedTo : assignedTo,
        when,
        ringGroups,
        duration,
        voicemailId
    }
    const currentUser = useCurrentUser()
    const appliedFilters = diffBetweenObjects(defaultFilterValues, filters)
    // console.log('useGetAppliedFilters - appliedFilters->', Object.keys(appliedFilters).sort(compareFilters))
    const teste = Object.keys(appliedFilters)
        .sort(compareFilters)
        .map(filterName => ({
            name: filterName,
            label: FILTER_LABELS[filterName],
            values: createArray(filters[filterName]).map(filterValue => ({
              value:
                (filterValue && filterValue.value) ||
                (filterValue && filterValue.id) ||
                filterValue,
              ...getFilterValueLabel(filterName, filterValue, {
                users: assignedUsers || [],
                currentUser,
                currentTab
              })
            }))
          }))
    console.log('useGetAppliedFilters - teste->', teste)
    if (isEmpty(appliedFilters)) {
        return []
    }
    return teste
    // const activeFilterCount = useGetAppliedFiltersCount()
    // console.log('activeFilterCount->', activeFilterCount)
    // if(activeFilterCount > 0) {
    //     return teste
    // }
    // return []

}
//createSelector(
// getActiveFilters,
// getUsersEntries,
// getUserId,
// getContacts,
// getPhoneNumbers,
// (filters, users, userId, contacts, phoneNumbers) =>
//     Object.keys(filters)
//         .filter(filterName => isActiveFilter(filterName, filters[filterName]))
//         .sort(compareFilters)
//         .map(filterName => ({
//             name: filterName,
//             label: FILTER_LABELS[filterName],
//             values: createArray(filters[filterName]).map(value => ({
//                 value: value.id || value,
//                 ...getFilterValueLabel(filterName, value, {
//                     users,
//                     userId,
//                     contacts,
//                     phoneNumbers
//                 })
//             }))
//         }))


export default useGetAppliedFilters
