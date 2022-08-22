import { useTranslation } from 'react-i18next'
import useGetVoicemails, { usePrefetchGetVoicemails } from 'voicemails-app/react-query/use-get-voicemails'
import computeState from 'voicemails-app/utils/compute-state'
import useAppUrlParams from 'voicemails-app/hooks/use-search-params'
import useCreateSearchParams from 'voicemails-app/hooks/use-create-search-params'
import { useNavigate } from 'react-router-dom'
import { EMPTY_STATES } from 'voicemails-app/constants/state-types.constants'
import PaginationToolbar from 'titanium/components/pagination-toolbar/pagination-toolbar.component'

const MAX_PAGES_COUNT = 9
const MAX_PAGES_COUNT_RESPONSIVE = 3

const VoicemailsFooter = () => {
  const [t] = useTranslation()
  const navigate = useNavigate()
  const {createUrl} = useCreateSearchParams()
  const { page } = useAppUrlParams()
  const { data, isError, isFetching } = useGetVoicemails()
  const isSinglePage = totalPages => totalPages <= 1
  const totalPages = data?.totalPages || 0
  const total = data?.totalCount || 0
  const isEmptyStateStatus = status => EMPTY_STATES.includes(status)
  const status = computeState(isError, isFetching, 0, total)
  const isVisible = !(
    isEmptyStateStatus(status) ||
    isFetching ||
    isSinglePage(totalPages)
  )
  const onPageClickHandler = (page: number) => {
    navigate(createUrl({ page, selectedVoicemailId: undefined }))
  }

  const teste = usePrefetchGetVoicemails()

  return isVisible ? (
    <PaginationToolbar
      currentPage={page}
      customLabels={{
        paginationPrevious: t('footer.paginationPrevious'),
        paginationNext: t('footer.paginationNext'),
        jumpTo: t('footer.jumpTo')
      }}
      totalPages={totalPages}
      maxPagesCount={MAX_PAGES_COUNT}
      onPageClick={onPageClickHandler}
      onPageChange={onPageClickHandler}
      onPageMouseEnter={(page: number) => teste(page)}
    />
  ) : null
}

export default VoicemailsFooter
