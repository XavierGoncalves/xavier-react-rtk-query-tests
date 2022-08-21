import { useTranslation } from 'react-i18next'
import { Text, Button, Viewport } from '@cobalt/cobalt-react-components'
import { ActiveFilter, ActiveFiltersToolbar } from '@titanium/components'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import useCreateSearchParams from 'voicemails-app/hooks/use-create-search-params'
import useGetCurrentTab from 'voicemails-app/hooks/use-get-current-tab'
import { TAB_ASSIGNED_TO_ME } from 'voicemails-app/constants/ui.constants'
import { ALL_VOICEMAILS_URL, ROOT_URL } from 'voicemails-app/constants/url.constants'
import useGetAppliedFilters from 'voicemails-app/hooks/use-get-applied-filters'

const VoicemailsFiltersToolbar = () => {
  const [t] = useTranslation()
  const navigate = useNavigate()
  const currentTab = useGetCurrentTab()
  const { createUrl } = useCreateSearchParams()
  let appliedFilters = useGetAppliedFilters()
  const breakpoint = useContext(Viewport.Context)
  const isSmallSize = viewportSize => viewportSize === 'small'
  const onDismissClick = (filterName: string, value: string) => {
    navigate(createUrl({
      [filterName]: undefined
    }))
  }
  const onClearAllClick = () => navigate(currentTab === TAB_ASSIGNED_TO_ME ? ROOT_URL : ALL_VOICEMAILS_URL)

  return (
    <ActiveFiltersToolbar>
      {!isSmallSize(breakpoint) ? (
        <ActiveFiltersToolbar.Title>
          <Text>{t('filtersToolbar.title')}</Text>
        </ActiveFiltersToolbar.Title>
      ) : null}
      <ActiveFiltersToolbar.Filters>
        {appliedFilters.map(appliedFilter => (
          <ActiveFilter
            key={appliedFilter.name}
            label={t(appliedFilter.label)}
            name={appliedFilter.name}
            values={appliedFilter.values.map(({ label, value, translate }) => ({
              value,
              label: translate ? t(label, value) : label
            }))}
            onDismissClick={(name, value) => onDismissClick(name, value)}
          // onShowMoreClick={() => onShowMore()}
          />
        ))}
      </ActiveFiltersToolbar.Filters>
      {!isSmallSize(breakpoint) ? (
        <ActiveFiltersToolbar.Actions>
          <Button small secondary onClick={() => onClearAllClick()}>
            {t('actions.clearAllFilters')}
          </Button>
        </ActiveFiltersToolbar.Actions>
      ) : null}
    </ActiveFiltersToolbar>
  )
}

export default VoicemailsFiltersToolbar
