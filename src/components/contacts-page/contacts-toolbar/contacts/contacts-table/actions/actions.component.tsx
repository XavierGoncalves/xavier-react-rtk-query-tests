import { Icon, Tooltip } from '@cobalt/cobalt-react-components'
import { useTranslation } from 'react-i18next'
import { ButtonGroup } from '@titanium/components'
import Button from '@cobalt/react-button'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import ClickToCall from 'components/common/click-to-call/click-to-call.component'
import { EDIT_CONTACT_URL } from 'constants/constants'

const ActionsWrapper = styled.div`
  button {
    margin-left: 4px !important;
    margin-right: 0px !important;
  }

  a > i {
    color: var(--gray-800) !important;
  }
`

interface Props {
  id: string;
  maxVisibleButtons: number; 
  onContactDelete: (contactId: string) => void;
  phones: string[];
  canUpdateContact?: boolean;
  canDeleteContact?: boolean;
}

const Actions = ({
  id,
  maxVisibleButtons,
  onContactDelete,
  phones,
  canUpdateContact,
  canDeleteContact
}: Props) => {
  const [t] = useTranslation()

  return (
    <ActionsWrapper>
      <ButtonGroup maxVisibleButtons={maxVisibleButtons}>
        <ButtonGroup.Viewport large medium small visible={phones.length > 0}>
          <ClickToCall id={id} phones={phones} />
        </ButtonGroup.Viewport>
        {canUpdateContact && (
          <Link
            to={`${EDIT_CONTACT_URL.replace(':id', id)}?from=table`}
            aria-label={t('pages.index.table.actions.edit')}
          >
            <Tooltip inverted text={t('pages.index.table.actions.edit')}>
              <Button
                data-testid="contacts-table__edit-contact-button"
                shape="compact"
                variation="transparent"
                type="secondary"
                size="small"
              >
                <Icon name={Icon.EDIT} tiny />
              </Button>
            </Tooltip>
          </Link>
        )}
        {canDeleteContact && (
          <Tooltip inverted text={t('pages.index.table.actions.delete')}>
            <Button
              aria-label={t('pages.index.table.actions.delete')}
              data-testid="contacts-table__delete-contact-button"
              onClick={() => onContactDelete(id)}
              variation="transparent"
              type="danger"
            >
              <Icon name={Icon.TRASH} tiny color="co--red-700" />
            </Button>
          </Tooltip>
        )}
      </ButtonGroup>
    </ActionsWrapper>
  )
}

export default Actions
