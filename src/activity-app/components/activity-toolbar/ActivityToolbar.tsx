import isNil from 'lodash/isNil'
import { useTranslation } from 'react-i18next'
import { AppToolbar } from '@titanium/components'
import { useGetActivities } from 'activity-app/react-query/use-get-activities'
import useGetActiveFiltersCount from 'activity-app/hooks/use-get-activefilters-count'
import { useNavigate } from 'react-router-dom'
import useCreateSearchParams from 'activity-app/hooks/use-create-search-params'
import useAppUrlParams from 'activity-app/hooks/use-app-url-params'
import sortToQuery from 'activity-app/utils/sort-to-query'

const ActivityToolbar = () => {
  const navigate = useNavigate()
  const [t] = useTranslation()
  const { data, isFetching } = useGetActivities()
  const activeFiltersCount = useGetActiveFiltersCount()
  const { sortBy } = useAppUrlParams()
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

  const onOrderBy = (field: string, direction: string) => {
    navigate(createUrl({
      ...sortToQuery({ field, direction }),
      selectedActivityId: undefined,
    }))
  }

  const orderByOptions = [
    {
      label: t('toolbar.sort.when.desc'),
      value: { direction: 'desc', field: 'date' }
    },
    {
      label: t('toolbar.sort.when.asc'),
      value: { direction: 'asc', field: 'date' }
    }
  ].map(option => ({
    ...option,
    active:
      option.value.direction === sortBy.direction &&
      option.value.field === sortBy.field
  }))

  return (
    <AppToolbar
      filtersCount={activeFiltersCount}
      filtersLabel={t('actions.openFilters')}
      loading={isFetching}
      onFiltersClick={onClickFilters}
      onOrderByClick={({ direction, field }) => onOrderBy(field, direction)}
      orderByLabel={t('toolbar.sort.label')}
      orderByOptions={orderByOptions}
      title={title}
      withFilters={true}
      withOrderBy={true}
    />
  )
}

export default ActivityToolbar
