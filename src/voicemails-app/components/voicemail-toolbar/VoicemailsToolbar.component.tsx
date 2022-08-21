import { useTranslation } from 'react-i18next'
import { AppToolbar } from '@titanium/components'
import useGetVoicemails from 'voicemails-app/react-query/use-get-voicemails'
import { useNavigate } from 'react-router-dom'

const VoicemailsToolbar = ({
  activeFiltersCount,
  filterResultsCount,
}) => {
  const [t] = useTranslation()
  const { isFetching } = useGetVoicemails()
  const navigate = useNavigate()

  const openFilters = () => {
    //create url com filtros abertos
   // navigate()
  }
  return (
    <AppToolbar
      filtersCount={activeFiltersCount}
      filtersLabel={t('actions.openFilters')}
      loading={isFetching}
      onFiltersClick={openFilters}
      title={t('toolbar.title', { total: filterResultsCount })}
      withFilters={true}
    />
  )
}

export default VoicemailsToolbar
