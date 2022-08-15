import { useTranslation } from 'react-i18next'
import {
  Button,
  Icon,
  Tooltip,
  Viewport
} from '@cobalt/cobalt-react-components'

interface Props {
  isLoading: boolean;
  onDelete: (contactId: string) => void
}

const DeleteButton = ({ isLoading, onDelete }: Props) => {
  const [t] = useTranslation()

  const props = {
    'aria-label': t('pages.details.profile.actions.delete'),
    asLink: true,
    danger: true,
    'data-testid': 'profile-toolbar__delete-button',
    disabled: isLoading,
    onClick: onDelete,
    small: true
  }

  return (
    <>
      <Viewport large medium>
        <Button {...props}>
          <Icon name={Icon.TRASH} tiny />
          <span>{t('pages.details.profile.actions.delete')}</span>
        </Button>
      </Viewport>
      <Viewport small>
        <Tooltip inverted text={t('pages.details.profile.actions.delete')}>
          <Button {...props}>
            <Icon name={Icon.TRASH} tiny />
          </Button>
        </Tooltip>
      </Viewport>
    </>
  )
}

export default DeleteButton 
