import { defaultFilters } from "activity-app/constants/filters.constants"
import useAppUrlParams from "activity-app/hooks/use-app-url-params"
import diffBetweenObjects from "activity-app/utils/diff-between-objects"
import isEqual from 'lodash/isEqual'

const useGetAppliedFiltersCount = () => {
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
    return Object.keys(diffBetweenObjects(defaultFilters, filters)).length

    // return Object.keys(filters).reduce(
    //     (activeFiltersCount, key) => {
    //         // console.log('useGetAppliedFiltersCount- key->', key , '--defaultFilters ->', defaultFilters[key], 'filters ->', filters[key])
    //         return isEqual(defaultFilters[key], filters[key])
    //         ? activeFiltersCount 
    //         : activeFiltersCount + 1
    //     },
    //     0
    //   )

}

export default useGetAppliedFiltersCount
