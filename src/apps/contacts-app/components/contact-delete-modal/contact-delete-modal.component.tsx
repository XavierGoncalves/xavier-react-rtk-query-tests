import { useTranslation } from 'react-i18next'
import { Button, Dialog, Icon, Modal } from '@cobalt/cobalt-react-components'

interface Props {
  open: boolean;
  onClose: () => void;
  onDeleteContact?: (contactId: string) => void
}

const ContactDeleteModal = ({
  open,
  onClose,
  onDeleteContact
}: Props) => {
  const [t] = useTranslation()

  const onDeleteContactHandler = () => {
    // onDeleteContact(openContactId)
    onClose()
  }

  return (
    <Modal
      data-test-id="contact_delete_modal"
      small
      visible={open}
      dismissible={false}
    >
      <Dialog>
        <Dialog.Content>
          <Icon large name={Icon.TRASH} />
          <br />
          <h3>{t('pages.delete.title')}</h3>
          <p>{t('pages.delete.question')}</p>
          <Dialog.Actions>
            <Button
              id="contact_delete_modal__close_button"
              basic
              onClick={() => onClose()}
            >
              {t('pages.delete.actions.cancel')}
            </Button>
            <Button
              id="contact_delete_modal__accept_button"
              basic
              danger
              onClick={onDeleteContactHandler}
            >
              {t('pages.delete.actions.confirm')}
            </Button>
          </Dialog.Actions>
        </Dialog.Content>
      </Dialog>
    </Modal>
  )
}

export default ContactDeleteModal
