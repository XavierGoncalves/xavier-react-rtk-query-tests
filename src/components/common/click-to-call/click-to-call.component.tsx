import { Button, Icon, Tooltip } from '@cobalt/cobalt-react-components'
import { useTranslation } from 'react-i18next'
import { ButtonListPopup, formatPhoneNumber } from '@titanium/components'
import { LinkButton } from '@cobalt/react-button'
import { useAtlasSdk } from 'titanium/common/context/atlas.context'
import { useVoiceConversation } from 'titanium/common/hooks/use-voice-conversation'

const ClickToCall = ({ id, phones = [] }) => {
  const [t] = useTranslation()
  const atlasSdk = useAtlasSdk()
  const [hasConversationApp, triggerVoiceCall] = useVoiceConversation(atlasSdk)

  const onClickToCall = (e, phoneNumber) => {
    e.stopPropagation()
    if (hasConversationApp) {
      triggerVoiceCall(phoneNumber, id)
      e.preventDefault()
    }
  }

  if (phones.length === 0) {
    return null
  }

  return phones.length > 1 ? (
    <ButtonListPopup
      target={
        <Tooltip inverted text={t('common.clickToCall.action')}>
          <Button aria-label={t('common.clickToCall.action')} small>
            <Icon name={Icon.PHONE} tiny />
          </Button>
        </Tooltip>
      }
    >
      {phones.map((phone, index) => (
        <LinkButton
          key={index}
          href={`tel:${phone}`}
          onClick={e => onClickToCall(e, phone)}
          size="small"
          type="secondary"
          shape="compact"
        >
          <Icon name={Icon.PHONE} tiny />
          {formatPhoneNumber(phone).phoneNumber}
        </LinkButton>
      ))}
    </ButtonListPopup>
  ) : (
    <Tooltip inverted text={t('common.clickToCall.action')}>
      <LinkButton
        aria-label={t('common.clickToCall.action')}
        size="small"
        href={`tel:${phones[0]}`}
        onClick={e => onClickToCall(e, phones[0])}
        type="secondary"
        shape="compact"
      >
        <Icon name={Icon.PHONE} tiny />
      </LinkButton>
    </Tooltip>
  )
}

export default ClickToCall
