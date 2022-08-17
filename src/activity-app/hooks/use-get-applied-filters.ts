import { AppliedFilter } from "types"
import useGetActiveFiltersCount from "./use-get-activefilters-count"
import useGetCurrentFilters from "./use-get-current-filters"
const teste = [
    {
        "name": "activity",
        "label": "fields.activityType.label",
        "values": [
            { 
                "value": "INBOUND", 
                "label": "activityTypes.inboundCall", 
                "translate": true 
            }
        ]
    },
    {
        "name": "agent",
        "label": "fields.agent.label",
        "values": [
            {
                "value": "613f28ccbd32b443cbaa86f3", 
                "label": "Agent Valeria STG" 
            }
        ]
    },
    {
        "name": "when",
        "label": "fields.date.label",
        "values": [
            { 
                "value": "LAST_WEEK", 
                "label": "fields.date.lastWeek", 
                "translate": true 
            }
        ]
    },
    {
        "name": "ringGroups",
        "label": "fields.ringGroups.label",
        "values": [
            {
                "value": "%22xavier",
                "label": "%22xavier"
            }
        ]
    },
    {
        "name": "contact",
        "label": "fields.contact.label",
        "values": [
            {
                "value": "61d60793d782fd001df203ef",
                "label": "+12014355369 20220718-creation-app-custom-fields-edit-contactssssssssddd"
            }
        ]
    }
]

const useGetAppliedFilters = (): AppliedFilter[] => {
    const activeFilterCount = useGetActiveFiltersCount()
    if(activeFilterCount > 0) {
        return teste
    }
    return []

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
