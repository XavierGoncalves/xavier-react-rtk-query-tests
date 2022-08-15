import { useTranslation } from 'react-i18next'
import {
  EmptyState as TiEmptyState,
  EmptyStateSelector
} from '@titanium/components'
import { Icon } from '@cobalt/cobalt-react-components'
import * as states from 'apps/contacts-app/constants/state.constants'

const CDN_URL = process.env.REACT_APP_CDN_URL
const EMPTY_STATE_URL = `${CDN_URL}/cdn-assets/latest/talkdesk/product/empty_states`
const EMPTY_URL = `${EMPTY_STATE_URL}/empty_no_contacts.svg`
const NO_RESULTS_URL = `${EMPTY_STATE_URL}/empty_no_search_results.svg`
const NO_FILTERED_RESULTS_URL = `${EMPTY_STATE_URL}/empty_filters.svg`
const ERROR_URL = `${EMPTY_STATE_URL}/error_generic.svg`

interface Props {
  status: string;
  whiteLabel?: boolean;
  onRetryClick: () => void
}

const EmptyState = ({ status, whiteLabel = false, onRetryClick }: Props) => {
  const [t] = useTranslation()

  const refreshAction = (
    <TiEmptyState.Action
      iconName={Icon.CACHED}
      text={t('emptyStates.actions.refresh')}
      onClick={onRetryClick}
    />
  )

  return (
    <EmptyStateSelector selected={status}>
      <TiEmptyState
        title={t('emptyStates.contacts.empty.title')}
        message={t('emptyStates.contacts.empty.message')}
        value={states.EMPTY}
        imgSource={EMPTY_URL}
        iconName={Icon.GROUP}
        whiteLabel={whiteLabel}
      />
      <TiEmptyState
        title={t('emptyStates.contacts.noSearchResults.title')}
        message={t('emptyStates.contacts.noSearchResults.message')}
        value={states.NO_RESULTS}
        imgSource={NO_RESULTS_URL}
        iconName={Icon.CLOSE_OUTLINE}
        whiteLabel={whiteLabel}
      >
        {refreshAction}
      </TiEmptyState>
      <TiEmptyState
        title={t('emptyStates.contacts.noFilterResults.title')}
        message={t('emptyStates.contacts.noFilterResults.message')}
        value={states.NO_FILTERED_RESULTS}
        imgSource={NO_FILTERED_RESULTS_URL}
        iconName={Icon.CLOSE_OUTLINE}
        whiteLabel={whiteLabel}
      >
        {refreshAction}
      </TiEmptyState>
      <TiEmptyState
        title={t('emptyStates.contacts.error.title')}
        message={t('emptyStates.contacts.error.message')}
        value={states.ERROR}
        imgSource={ERROR_URL}
        iconName={Icon.CLOSE_OUTLINE}
        whiteLabel={whiteLabel}
      >
        {refreshAction}
      </TiEmptyState>
    </EmptyStateSelector>
  )
}

export default EmptyState
