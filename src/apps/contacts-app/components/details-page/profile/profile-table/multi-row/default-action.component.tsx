import { useTranslation } from 'react-i18next'
import { Button, Icon } from '@cobalt/cobalt-react-components'
import { CopyToClipboard } from '@titanium/components'

interface Props {
  value: string
}

const DefaultAction = ({ value }: Props) => {
  const [t] = useTranslation()

  return (
    <CopyToClipboard
      text={value}
      tooltip={t('common.copyToClipboard.title')}
      tooltipInverted
    >
      <Button small>
        <Icon name={Icon.COPY} tiny />
      </Button>
    </CopyToClipboard>
  )
}

export default DefaultAction
