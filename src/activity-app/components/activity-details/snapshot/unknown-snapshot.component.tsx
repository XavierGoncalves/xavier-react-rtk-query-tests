import { useTranslation } from 'react-i18next'
import { Icon } from '@cobalt/cobalt-react-components'
import { EmptyState } from '@titanium/components'

const UnknownSnapshot = () => {
  const [t] = useTranslation()

  return (
    <EmptyState
      title={t('details.unknownSnapshot.title')}
      message={t('details.unknownSnapshot.message')}
      iconName={Icon.CLOSE_OUTLINE}
      whiteLabel={true}
    ></EmptyState>
  )
}

export default UnknownSnapshot
