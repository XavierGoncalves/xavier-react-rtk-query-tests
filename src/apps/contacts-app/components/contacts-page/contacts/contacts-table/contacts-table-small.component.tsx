import { Table } from '@cobalt/cobalt-react-components'
import { Contact as ContactType } from 'apps/contacts-app/api/fetch-contacts.api'
import Actions from './actions/actions.component'
import Contact from './contact/contact.component'
import LoadingRows from './loading-rows/loading-rows.component'

const NUMBER_OF_LOADING_ROWS = 10

interface Props {
  contacts?: ContactType[];
  isLoading: boolean;
  onContactDelete: (contactId: string) => void
}

const ContactsTableSmall = ({
  contacts,
  isLoading,
  onContactDelete
}: Props) => (
  <Table data-table="main">
    <Table.Body>
      {isLoading ? (
        <LoadingRows numberOfRows={NUMBER_OF_LOADING_ROWS} small />
      ) : (
        contacts?.map(contact => (
          <Table.Row
            key={contact.id}
            data-testid={`contacts-table__row-${contact.id}`}
          >
            <Table.Data truncated>
              <Contact
                id={contact.id}
                initials={contact.initials}
                name={contact.name}
                phoneNumbers={contact.phones}
                faxNumbers={contact.faxes}
                small
              />
            </Table.Data>
            <Table.ActionData>
              <Actions
                id={contact.id}
                maxVisibleButtons={2}
                phones={contact.phones}
                onContactDelete={onContactDelete}
              />
            </Table.ActionData>
          </Table.Row>
        ))
      )}
    </Table.Body>
  </Table>
)
export default ContactsTableSmall
