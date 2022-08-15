import { useTranslation } from 'react-i18next'
import { Table, Text } from '@cobalt/cobalt-react-components'
import Actions from './actions/actions.component'
import Contact from './contact/contact.component'
import PhoneNumber from './phone-number/phone-number.component'
import EmailAddress from './email-address/email-address.component'
import LoadingRows from './loading-rows/loading-rows.component'

const WIDTHS = {
  NAME: Table.Data.WIDTH[30],
  NUMBER: Table.Data.WIDTH[20],
  EMAIL: Table.Data.WIDTH[30],
  COMPANY: Table.Data.WIDTH[20]
}

const NUMBER_OF_LOADING_ROWS = 10

const UP = Table.Header.SORT_DIRECTION.UP
const DOWN = Table.Header.SORT_DIRECTION.DOWN

const ContactsTableLarge = ({
  contacts,
  isLoading,
  sort,
  onContactDelete,
  onSortBy,
  setCurrentContact
}) => {
  const [t] = useTranslation()

  const onSortByHandler = (field, direction) =>
    onSortBy(field, direction === UP ? 'asc' : 'desc')

  const defaultDirection = sort.direction === 'asc' ? UP : DOWN

  return (
    <Table sortable data-table="main">
      <Table.Head>
        <Table.Row>
          <Table.Header
            width={WIDTHS.NAME}
            sortable
            defaultSortDirection={defaultDirection}
            sortSequence={[UP, DOWN]}
            onSortDirectionChange={sortDirection =>
              onSortByHandler('name', sortDirection)
            }
          >
            {t('pages.index.table.columns.name')}
          </Table.Header>
          <Table.Header width={WIDTHS.NUMBER}>
            {t('pages.index.table.columns.number')}
          </Table.Header>
          <Table.Header width={WIDTHS.EMAIL}>
            {t('pages.index.table.columns.email')}
          </Table.Header>
          <Table.Header width={WIDTHS.COMPANY}>
            {t('pages.index.table.columns.company')}
          </Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {isLoading ? (
          <LoadingRows numberOfRows={NUMBER_OF_LOADING_ROWS} />
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
                  title={contact.title}
                />
              </Table.Data>
              <Table.Data truncated>
                <PhoneNumber numbers={contact.phones} />
              </Table.Data>
              <Table.Data truncated>
                <EmailAddress addresses={contact.emails} />
              </Table.Data>
              <Table.Data truncated>
                <Text truncated>{contact.company}</Text>
              </Table.Data>
              <Table.ActionData>
                <Actions
                  id={contact.id}
                  maxVisibleButtons={3}
                  phones={contact.phones}
                  onContactDelete={onContactDelete}
                  setCurrentContact={setCurrentContact}
                />
              </Table.ActionData>
            </Table.Row>
          ))
        )}
      </Table.Body>
    </Table>
  )
}

export default ContactsTableLarge
