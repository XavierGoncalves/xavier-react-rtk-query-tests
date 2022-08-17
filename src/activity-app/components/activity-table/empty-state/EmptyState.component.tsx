import { Icon } from '@cobalt/cobalt-react-components'
import { useTranslation } from 'react-i18next'
import {
  EmptyStateSelector,
  EmptyState as TiEmptyState
} from '@titanium/components'
import * as statusTypes from 'activity-app/constants/status-types'

const IMG_NO_RESULTS = `${process.env.CDN_URL}/talkdesk/product/empty_states/empty_activity.svg`
const IMG_FILTER_NO_RESULTS = `${process.env.CDN_URL}/talkdesk/product/empty_states/empty_filters.svg`
const IMG_ERROR = `${process.env.CDN_URL}/talkdesk/product/empty_states/error_generic.svg`

interface Props {
  status: string;
  whiteLabel?: boolean; 
  onRetryClick: () => void;
}

export const EmptyState = ({ status, whiteLabel = false, onRetryClick }: Props) => {
  const [t] = useTranslation()

  return (
    <EmptyStateSelector selected={status}>
      <TiEmptyState
        title={t('emptyState.empty.title')}
        message={t('emptyState.empty.message')}
        value={statusTypes.STATUS_NO_RESULTS}
        imgSource={IMG_NO_RESULTS}
        iconName={Icon.ASSIGNMENT_LATE}
        whiteLabel={whiteLabel}
      >
        <TiEmptyState.Action
          iconName={Icon.CACHED}
          text={t('actions.refresh')}
          onClick={() => onRetryClick()}
        />
      </TiEmptyState>
      <TiEmptyState
        title={t('emptyState.noResults.title')}
        message={t('emptyState.noResults.message')}
        value={statusTypes.STATUS_FILTER_NO_RESULTS}
        imgSource={IMG_FILTER_NO_RESULTS}
        iconName={Icon.ASSIGNMENT_LATE}
        whiteLabel={whiteLabel}
      >
        <TiEmptyState.Action
          iconName={Icon.CACHED}
          text={t('actions.refresh')}
          onClick={() => onRetryClick()}
        />
      </TiEmptyState>
      <TiEmptyState
        title={t('emptyState.error.title')}
        message={t('emptyState.error.message')}
        value={statusTypes.STATUS_ERROR}
        imgSource={IMG_ERROR}
        iconName={Icon.CLOSE_OUTLINE}
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
