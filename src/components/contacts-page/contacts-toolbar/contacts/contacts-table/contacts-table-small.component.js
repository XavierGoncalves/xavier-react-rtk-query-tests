import { Table } from '@cobalt/cobalt-react-components'
import { Actions } from './actions'
import { Contact } from './contact'
import { LoadingRows } from './loading-rows'

const NUMBER_OF_LOADING_ROWS = 10

const ContactsTableSmall = ({
  contacts,
  isLoading,
  onContactDelete
}) => (
  <Table data-table="main">
    <Table.Body>
      {isLoading ? (
        <LoadingRows numberOfRows={NUMBER_OF_LOADING_ROWS} small />
      ) : (
        contacts.map(contact => (
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
