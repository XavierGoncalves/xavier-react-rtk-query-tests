import { Viewport } from '@cobalt/cobalt-react-components'
import { LOADING, ALL_TABLE_STATES } from '../../../constants/states'
import { ContactsTableLarge, ContactsTableSmall } from './contacts-table'
import { ContactsFooter } from './contacts-footer'

const Contacts = ({
  contacts,
  totalPages,
  state,
  currentPage,
  sort,
  onContactDelete,
  onPageChange,
  onSortBy
}) => (
  <div>
    <Viewport small>
      <ContactsTableSmall
        contacts={contacts}
        isLoading={state === LOADING}
        onContactDelete={onContactDelete}
      />
    </Viewport>
    <Viewport medium large>
      <ContactsTableLarge
        contacts={contacts}
        isLoading={state === LOADING}
        sort={sort}
        onContactDelete={onContactDelete}
        onSortBy={onSortBy}
      />
    </Viewport>
    <ContactsFooter
      state={state}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
    />
  </div>
)

export default Contacts
