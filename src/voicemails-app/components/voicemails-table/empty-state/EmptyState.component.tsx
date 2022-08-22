import { useTranslation } from 'react-i18next'
import {
  EmptyState as TiEmptyState,
  EmptyStateSelector
} from '@titanium/components'
import { Icon } from '@cobalt/cobalt-react-components'
import { STATE_ERROR, STATE_NO_ASSIGNED_VOICEMAILS, STATE_NO_FILTERED_RESULTS, STATE_NO_RESULTS } from 'voicemails-app/constants/state-types.constants'
import { IMG_NO_ASSIGNED_VOICEMAILS, IMG_NO_FILTERED_RESULTS, IMG_NO_RESULTS, IMG_VOICEMAILS_LOADING_ERROR } from 'voicemails-app/constants/ui.constants'

const EmptyState = ({ status, whiteLabel = false, onRetryClick }) => {
  const [t] = useTranslation()

  return (
    <EmptyStateSelector selected={status}>
      <TiEmptyState
        title={t('emptyStates.voicemails.error.title')}
        message={t('emptyStates.voicemails.error.message')}
        value={STATE_ERROR}
        imgSource={IMG_VOICEMAILS_LOADING_ERROR}
        iconName={Icon.VOICEMAIL}
        whiteLabel={whiteLabel}
      >
        <TiEmptyState.Action
          iconName={Icon.CACHED}
          text={t('actions.refresh')}
          onClick={() => onRetryClick()}
        />
      </TiEmptyState>
      <TiEmptyState
        title={t('emptyStates.voicemails.noResults.title')}
        message={t('emptyStates.voicemails.noResults.message')}
        value={STATE_NO_RESULTS}
        imgSource={IMG_NO_RESULTS}
        iconName={Icon.VOICEMAIL}
        whiteLabel={whiteLabel}
      >
        <TiEmptyState.Action
          iconName={Icon.CACHED}
          text={t('actions.refresh')}
          onClick={() => onRetryClick()}
        />
      </TiEmptyState>
      <TiEmptyState
        title={t('emptyStates.voicemails.noFilteredResults.title')}
        message={t('emptyStates.voicemails.noFilteredResults.message')}
        value={STATE_NO_FILTERED_RESULTS}
        imgSource={IMG_NO_FILTERED_RESULTS}
        iconName={Icon.ERROR_OUTLINE}
        whiteLabel={whiteLabel}
      >
        <TiEmptyState.Action
          iconName={Icon.CACHED}
          text={t('actions.refresh')}
          onClick={() => onRetryClick()}
        />
      </TiEmptyState>
      <TiEmptyState
        title={t('emptyStates.voicemails.noAssigned.title')}
        message={t('emptyStates.voicemails.noAssigned.message')}
        value={STATE_NO_ASSIGNED_VOICEMAILS}
        imgSource={IMG_NO_ASSIGNED_VOICEMAILS}
        iconName={Icon.VOICEMAIL}
        whiteLabel={whiteLabel}
      >
        <TiEmptyState.Action
          iconName={Icon.CACHED}
          text={t('actions.refresh')}
          onClick={() => onRetryClick()}
        />
      </TiEmptyState>
    </EmptyStateSelector>
  )
}

export default EmptyState
