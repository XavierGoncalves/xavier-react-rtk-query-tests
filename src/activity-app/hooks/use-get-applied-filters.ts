import { ALL, defaultFilters, LAST_MONTH, LAST_SIX_HOURS, LAST_TWENTY_FOUR_HOURS, LAST_WEEK } from "activity-app/constants/filters.constants"
import diffBetweenObjects from "activity-app/utils/diff-between-objects"
import { ActivityAppliedFilter } from "types"
import useAppUrlParams from "./use-app-url-params"
import isEmpty from 'lodash/isEmpty'
import { getActivityType } from '@titanium/activity-details'
import { useCurrentUser } from "titanium/common/context/user.context"

const FILTERS_SORT_ORDER = {
    type: 1,
    contact: 2,
    agent: 3,
    when: 4,
    ringGroups: 5,
    via: 6
}

const FILTER_LABELS = {
    type: 'fields.activityType.label',
    agent: 'fields.agent.label',
    when: 'fields.date.label',
    ringGroups: 'fields.ringGroups.label',
    via: 'fields.via.label',
    contact: 'fields.contact.label'
}

const WHEN_LABELS = {
    [LAST_SIX_HOURS]: 'fields.date.last6Hours',
    [LAST_TWENTY_FOUR_HOURS]: 'fields.date.last24Hours',
    [LAST_WEEK]: 'fields.date.lastWeek',
    [LAST_MONTH]: 'fields.date.lastMonth',
    [ALL]: 'fields.date.allTime'
}

const createArray = value =>
    Array.isArray(value) ? value : value ? [value] : []

const compareFilters = (a, b) => FILTERS_SORT_ORDER[a] - FILTERS_SORT_ORDER[b]

const getFilterValueLabel = (name, value, props) =>
({
    type: value => ({
        label: getActivityType(value).name,
        translate: true
    }),
    agent: (value, { userId }) => {
        if (value.id === userId) {
            return {
                label: 'fields.agent.me',
                translate: true
            }
        } else {
            return {
                label: value ? value.name : null
            }
        }
    },
    when: value => ({ label: WHEN_LABELS[value], translate: true }),
    ringGroups: value => ({ label: value }),
    // via: (value, { phoneNumbers }) => {
    //     const via = phoneNumbers.find(number => number.id === value)
    //     return {
    //         label: via ? via.name || via.number : null
    //     }
    // },
    contact: value => ({ label: value.label })
}[name](value, props))

const useGetAppliedFilters = (): ActivityAppliedFilter[] => {
    const {
        type,
        agent,
        when,
        ringGroups,
        via,
        contact,
    } = useAppUrlParams()
    const filters = {
        agent,
        contact,
        ringGroups,
        type,
        via,
        when
    }
    const { id: userId } = useCurrentUser()
    const appliedFilters = diffBetweenObjects(defaultFilters, filters)
    console.log('useGetAppliedFilters - appliedFilters->', Object.keys(appliedFilters).sort(compareFilters))
    const teste = Object.keys(appliedFilters).sort(compareFilters).map(filterName => ({
        name: filterName,
        label: FILTER_LABELS[filterName],
        values: createArray(filters[filterName]).map(value => ({
            value: value.id || value,
            ...getFilterValueLabel(filterName, value, {
                // users,
                userId,
                // contacts,
                // phoneNumbers
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
