
import diffBetweenObjects from "activity-app/utils/diff-between-objects"
import { defaultFilterValues } from "voicemails-app/constants/filters.constants"
import { TAB_ASSIGNED_TO_ME } from "voicemails-app/constants/ui.constants"
import useGetCurrentTab from "./use-get-current-tab"
import useAppUrlParams from "./use-search-params"

const useGetAppliedFiltersCount = () => {
    const currentTab = useGetCurrentTab()
    const { 
        voicemailStatus,
        contactId,
        assignedTo,
        when,
        ringGroups,
        duration,
        voicemailId
    } = useAppUrlParams()
    const filters = { 
        voicemailStatus,
        contactId,
        assignedTo: currentTab === TAB_ASSIGNED_TO_ME ? defaultFilterValues.assignedTo : assignedTo,
        when,
        ringGroups,
        duration,
        voicemailId
    }

    // console.log('useGetAppliedFiltersCount - defaultFilterValues ->',defaultFilterValues)
    // console.log('useGetAppliedFiltersCount - filters ->',filters)
    return Object.keys(diffBetweenObjects(defaultFilterValues, filters)).length
}

export default useGetAppliedFiltersCount
