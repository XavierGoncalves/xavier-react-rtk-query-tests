import useGetCurrentFilters from 'activity-app/hooks/use-get-current-filters'
import { useSearchParams } from 'react-router-dom'
import FilterGroup from './filter-group/FilterGroup.component'

const ActivityFilters = () => {
  const [searchParams] = useSearchParams()

  return (
    <>
      <FilterGroup key={searchParams.toString()} />
    </>
  )
}

export default ActivityFilters
