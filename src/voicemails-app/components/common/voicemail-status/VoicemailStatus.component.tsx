import { Icon, Loader, Viewport } from '@cobalt/cobalt-react-components'
import { useTranslation } from 'react-i18next'
import { VOICEMAIL_OPEN_COLOR, VOICEMAIL_RESOLVED_COLOR } from 'voicemails-app/constants/colors.constants'
import { STATE_VOICEMAIL_OPEN, STATE_VOICEMAIL_RESOLVED } from 'voicemails-app/constants/state-types.constants'

const VoicemailStatus = ({ status, loading, responsive = true }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <StatusIcon status={status} loading={loading} />
    <StatusText status={status} responsive={responsive} />
  </div>
)

const StatusIcon = ({ status, loading }) => {
  const iconProps = {
    [STATE_VOICEMAIL_OPEN]: {
      name: Icon.BULLET,
      color: VOICEMAIL_OPEN_COLOR
    },
    [STATE_VOICEMAIL_RESOLVED]: {
      name: Icon.DONE,
      color: VOICEMAIL_RESOLVED_COLOR
    }
  }[status]

  return loading ? <Loader tiny /> : <Icon {...iconProps} />
}

const StatusText = ({ status, responsive }) => {
  const [t] = useTranslation()

  const label = t(
    status === STATE_VOICEMAIL_RESOLVED
      ? 'fields.status.resolved'
      : 'fields.status.open'
  )

  return (
    <div style={{ lineHeight: '1.125rem', paddingLeft: '0.25rem' }}>
      {responsive ? <Viewport large>{label}</Viewport> : label}
    </div>
  )
}

export default VoicemailStatus
