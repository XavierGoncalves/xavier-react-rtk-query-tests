import { useTranslation } from 'react-i18next'
import { PaginationToolbar } from '@titanium/components'
import {
  ALL_TABLE_STATES,
  EMPTY_STATES,
  LOADING
} from '../../../../constants/states'

const MAX_PAGES_COUNT = 9
const MAX_PAGES_COUNT_RESPONSIVE = 3

const ContactsFooter = ({
  state,
  currentPage,
  totalPages,
  onPageChange
}) => {
  const [t] = useTranslation()

  const isVisible = !(
    totalPages <= 1 || [...EMPTY_STATES, LOADING].includes(state)
  )

  return isVisible ? (
    <PaginationToolbar
      currentPage={currentPage}
      totalPages={totalPages}
      maxPagesCount={MAX_PAGES_COUNT}
      maxPagesCountResponsive={MAX_PAGES_COUNT_RESPONSIVE}
      customLabels={{
        paginationPrevious: t('common.pagination.previous'),
        paginationNext: t('common.pagination.next'),
        jumpTo: t('common.pagination.jumpTo')
      }}
      onPageClick={onPageChange}
      onPageChange={onPageChange}
    />
  ) : null
}

export default ContactsFooter
