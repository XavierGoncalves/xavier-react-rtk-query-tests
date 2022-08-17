import isNil from 'lodash/isNil'
import { useTranslation } from 'react-i18next'
import { AppToolbar } from '@titanium/components'
import { useGetActivities } from 'activity-app/react-query/use-get-activities'
import useGetActiveFiltersCount from 'activity-app/hooks/use-get-activefilters-count'
import { useNavigate } from 'react-router-dom'
import useCreateSearchParams from 'activity-app/hooks/use-create-search-params'

const ActivityToolbar = () => {
  const navigate = useNavigate()
  const [t] = useTranslation()
  const { data, isFetching } = useGetActivities()
  const activeFiltersCount = useGetActiveFiltersCount()
  const createUrl = useCreateSearchParams()
  const onClickFilters = () => {
    navigate(createUrl({
      filtersVisible: true
    }))
  }
  const totalActivitiesCount = data?.total
  const title = !isNil(totalActivitiesCount)
    ? t('toolbar.counter', { count: totalActivitiesCount })
    : ''

  return (
    <AppToolbar
      filtersCount={activeFiltersCount}
      filtersLabel={t('actions.openFilters')}
      loading={isFetching}
      onFiltersClick={onClickFilters}
      //onOrderByClick={({ direction, field }) => onOrderBy(field, direction)}
      orderByLabel={t('toolbar.sort.label')}
      // orderByOptions={orderByOptions}
      title={title}
      withFilters={true}
      withOrderBy={true}
    />
  )
}

export default ActivityToolbar
