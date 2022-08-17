
import { Table } from '@cobalt/cobalt-react-components'
import * as statusTypes from 'activity-app/constants/status-types'
import LoadingRows from 'activity-app/components/activity-table/loading-rows/LoadingRows'
import EmptyState from 'activity-app/components/activity-table/empty-state/EmptyState.component'
import TableSmallRows from 'activity-app/components/activity-table/table-small/table-rows/TableSmallRows.component'
import isEmptyStatus from 'activity-app/utils/is-empty-status'
import computeState from 'activity-app/utils/compute-state'
import { useGetActivities } from 'activity-app/react-query/use-get-activities'
import useGetActiveFiltersCount from 'activity-app/hooks/use-get-activefilters-count'

const DEFAULT_PAGE_SIZE = 10

const ActivityTableSmall = () => {
  const { data, isError, isFetching, refetch } = useGetActivities()
  const activeFilterCount = useGetActiveFiltersCount()
  const status = computeState(isError,isFetching, activeFilterCount, data?.total || 0)
  const onRetryClick = () => {
    refetch()
  }
  return (
    <>
      {
        isEmptyStatus(status) ? (
          <EmptyState
            status={status}
            onRetryClick={onRetryClick}
          />
        ) : (
          <Table sortable selectable data-table="main">
            <Table.Body>
              {status === statusTypes.STATUS_READY ? (
                <TableSmallRows />
              ) : (
                <LoadingRows numberOfRows={DEFAULT_PAGE_SIZE} small />
              )}
            </Table.Body>
          </Table>
        )
      }
    </>
  )
}


export default ActivityTableSmall
