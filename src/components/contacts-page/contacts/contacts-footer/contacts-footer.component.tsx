import { useTranslation } from 'react-i18next'
import {
  EMPTY_STATES,
  LOADING
} from 'constants/constants'
import PaginationToolbar from 'titanium/components/pagination-toolbar/pagination-toolbar.component'
import { usePrefetchGetContacts } from 'react-query/contacts.queries'

const MAX_PAGES_COUNT = 9

const ContactsFooter = ({
  state,
  currentPage,
  totalPages,
  onPageChange
}) => {
  const [t] = useTranslation()
  const triggerPrefetchGetContacts = usePrefetchGetContacts()

  const isVisible = !(
    totalPages <= 1 || [...EMPTY_STATES, LOADING].includes(state)
  )

  return isVisible ? (
    <PaginationToolbar
      currentPage={currentPage}
      totalPages={totalPages}
      maxPagesCount={MAX_PAGES_COUNT}
      customLabels={{
        paginationPrevious: t('common.pagination.previous'),
        paginationNext: t('common.pagination.next'),
        jumpTo: t('common.pagination.jumpTo')
      }}
      onPageClick={onPageChange}
      onPageChange={onPageChange}
      onPageMouseEnter={triggerPrefetchGetContacts}
    />
  ) : null
}

export default ContactsFooter
