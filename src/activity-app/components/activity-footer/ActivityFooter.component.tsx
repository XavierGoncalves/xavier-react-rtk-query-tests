import useAppUrlParams from 'activity-app/hooks/use-app-url-params'
import useCreateSearchParams from 'activity-app/hooks/use-create-search-params'
import useGetAppliedFiltersCount from 'activity-app/hooks/use-get-applied-filters-count'
import { useGetActivities, usePrefetchGetActivities } from 'activity-app/react-query/use-get-activities'
import useGetHydratedActivities, { usePrefetchGetHydratedActivities } from 'activity-app/react-query/use-get-hydrated-activities'
import computeState from 'activity-app/utils/compute-state'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import PaginationToolbar from 'titanium/components/pagination-toolbar/pagination-toolbar.component'
import * as statusTypes from '../../constants/status-types'

const maxPagesCount = 9
const maxPagesCountResponsive = 3

// interface Props {
//   totalPages: PropTypes.number.isRequired,
//   currentPage: PropTypes.number.isRequired,
//   status: PropTypes.string,
//   onPageClick: PropTypes.func.isRequired,
//   onPageChange: PropTypes.func.isRequired,
//   maxPagesCount: PropTypes.number,
//   maxPagesCountResponsive: PropTypes.number
// }

const ActivityFooter = () => {
  const [t] = useTranslation()
  const { data, isError, isFetching } = useGetHydratedActivities()
  const { page: currentPage } = useAppUrlParams()
  const totalPages = data?.totalPages || 0
  const total = data?.total || 0
  const activeFiltersCount = useGetAppliedFiltersCount()
  const status = computeState(isError, isFetching, activeFiltersCount, total)
  const { createUrl } = useCreateSearchParams()
  const navigate = useNavigate()
  const prefetchGetActivities = usePrefetchGetActivities()
  const prefetchHydratedActivities = usePrefetchGetHydratedActivities()
  const onPageClick = (page: number) => {
    navigate(createUrl({ page, selectedActivityId: undefined }))
  }
  const onPageMouseEnter = (page: number) => {
    prefetchHydratedActivities(page)
  }
  return (<>
    {
      isPaginationHidden(status, totalPages) ? null : (
        <PaginationToolbar
          currentPage={currentPage}
          customLabels={{
            paginationPrevious: t('footer.pagination.previous'),
            paginationNext: t('footer.pagination.next'),
            jumpTo: t('footer.pagination.jumpTo')
          }}
          totalPages={totalPages}
          maxPagesCount={maxPagesCount}
          onPageClick={onPageClick}
          onPageChange={onPageClick}
          onPageMouseEnter={(page) => {}}
          // onPageMouseEnter={onPageMouseEnter}
        />
      )
    }
  </>)
}

const isPaginationHidden = (status, totalPages) =>
  isEmptyStatus(status) || isLoadingStatus(status) || isSinglePage(totalPages)

const isSinglePage = totalPages => totalPages <= 1

const isEmptyStatus = status =>
  statusTypes.ALL_EMPTY_STATUS.indexOf(status) > -1

const isLoadingStatus = status => status === statusTypes.STATUS_LOADING

export default ActivityFooter
