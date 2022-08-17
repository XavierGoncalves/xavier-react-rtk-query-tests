import { useContext } from 'react'
import { Text, Button, Viewport } from '@cobalt/cobalt-react-components'
import { ActiveFilter, ActiveFiltersToolbar } from '@titanium/components'
import { useTranslation } from 'react-i18next'
import isSmallSize from 'activity-app/utils/is-small-size'
import { useNavigate } from 'react-router-dom'
import { ROOT_URL } from 'activity-app/constants/url.constants'
import useGetAppliedFilters from 'activity-app/hooks/use-get-applied-filters'

export const ActivityFiltersToolbar = () => {
  const [t] = useTranslation()
  const navigate = useNavigate()
  const breakpoint = useContext(Viewport.Context)
  const onDismissClick = (name: string, value: string) => {
    console.log('onDismissClick-name->', name, '<-value->', value)
    // remove filter from URL and navigate to it
    // navigate(createUrl({
    //   open: true
    // }))
  }
  const appliedFilters = useGetAppliedFilters()
  const onClearClick = () => navigate(ROOT_URL)
  return (
    <ActiveFiltersToolbar>
      {!isSmallSize(breakpoint) ? (
        <ActiveFiltersToolbar.Title>
          <Text>{t('filtersToolbar.title')}</Text>
        </ActiveFiltersToolbar.Title>
      ) : null}
      <ActiveFiltersToolbar.Filters>
        {appliedFilters.map(({name, label, values}) => (
          <ActiveFilter
            key={name}
            label={t(label)}
            name={name}
            values={values.map(({ label, value, translate }) => ({
              value,
              label: translate ? t(label) : label
            }))}
            onDismissClick={(name, value) => {
              onDismissClick(name, value)
            }}
          />
        ))}
      </ActiveFiltersToolbar.Filters>
      {!isSmallSize(breakpoint) ? (
        <ActiveFiltersToolbar.Actions>
          <Button small secondary onClick={() => onClearClick()}>
            {t('actions.clearAllFilters')}
          </Button>
        </ActiveFiltersToolbar.Actions>
      ) : null}
    </ActiveFiltersToolbar>
  )
}

export default ActivityFiltersToolbar