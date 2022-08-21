import { useTranslation } from 'react-i18next'
import { AppToolbar } from '@titanium/components'
import useGetVoicemails from 'voicemails-app/react-query/use-get-voicemails'
import { useNavigate } from 'react-router-dom'
import useCreateSearchParams from 'voicemails-app/hooks/use-create-search-params'
import useGetAppliedFiltersCount from 'voicemails-app/hooks/use-get-applied-filters-count'

const VoicemailsToolbar = () => {
  const [t] = useTranslation()
  const { data, isFetching } = useGetVoicemails()
  const navigate = useNavigate()
  const { createUrlFromRoot } = useCreateSearchParams()
  const total = data?.totalCount
  const activeFiltersCount = useGetAppliedFiltersCount()
  const openFilters = () => {
   navigate(createUrlFromRoot({
    filtersVisible: true
   }))
  }
  return (
    <AppToolbar
      filtersCount={activeFiltersCount}
      filtersLabel={t('actions.openFilters')}
      loading={isFetching}
      onFiltersClick={openFilters}
      title={t('toolbar.title', { total })}
      withFilters={true}
    />
  )
}

export default VoicemailsToolbar
