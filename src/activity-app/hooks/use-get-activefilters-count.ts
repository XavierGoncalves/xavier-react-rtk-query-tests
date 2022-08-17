import { defaultFilters } from "activity-app/constants/filters.constants"
import useAppUrlParams from "activity-app/hooks/use-app-url-params"
import isEqual from 'lodash/isEqual'

const useGetActiveFiltersCount = () => {
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
    return Object.keys(filters).reduce(
        (activeFiltersCount, key) => {
            // console.log('useGetActiveFiltersCount- key->', key , 'defaultFilters[key]->', defaultFilters[key], 'filters[key]->', filters[key])
            return isEqual(defaultFilters[key] === filters[key])
            ? activeFiltersCount + 1
            : activeFiltersCount
        },
        0
      )

}

export default useGetActiveFiltersCount
