import { Viewport } from '@cobalt/cobalt-react-components'
import ContactsTableSmall from './contacts-table/contacts-table-small.component'
import ContactsTableLarge from './contacts-table/contacts-table-large.component'
import ContactsFooter from './contacts-footer/contacts-footer.component'
import { Contact } from 'api/fetch-contacts.api'
import { onSortFn, SortType } from 'types'
import { LOADING } from 'constants/state.constants'

interface Props {
  contacts?: Contact[];
  totalPages?: number;
  state: string;
  currentPage: number;
  sort: SortType;
  onContactDelete: (contactId: string) => void;
  onPageChange: (page: string) => void;
  onSortBy: onSortFn
}


const Contacts = ({
  contacts,
  totalPages,
  state,
  currentPage,
  sort,
  onContactDelete,
  onPageChange,
  onSortBy
}: Props) => (
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
