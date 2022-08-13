import { Viewport } from '@cobalt/cobalt-react-components'
import { LOADING } from 'constants/constants'
import ContactsTableSmall from './contacts-table/contacts-table-small.component'
import ContactsTableLarge from './contacts-table/contacts-table-large.component'
import ContactsFooter from './contacts-footer/contacts-footer.component'

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