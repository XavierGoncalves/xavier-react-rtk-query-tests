import { Table } from '@cobalt/cobalt-react-components'
import { useTranslation } from 'react-i18next'
import * as statusTypes from '../../../constants/state.constants'
import EmptyState from '../empty-state/EmptyState.component'
import LoadingRows from 'activity-app/components/activity-table/loading-rows/LoadingRows'
import { useGetActivities } from 'activity-app/react-query/use-get-activities'
import computeState from 'activity-app/utils/compute-state'
import useGetAppliedFiltersCount from 'activity-app/hooks/use-get-applied-filters-count'
import isEmptyStatus from 'activity-app/utils/is-empty-status'
import TableLargeRows from './table-rows/TableLargeRows.component'
import sortToQuery from 'activity-app/utils/sort-to-query'
import { useNavigate } from 'react-router-dom'
import useCreateSearchParams from 'activity-app/hooks/use-create-search-params'


const UP = Table.Header.SORT_DIRECTION.UP
const DOWN = Table.Header.SORT_DIRECTION.DOWN

const WIDTHS = {
  ACTIVITY: Table.Data.WIDTH[20],
  AGENT: Table.Data.WIDTH[20],
  WHEN: Table.Data.WIDTH[20],
  DURATION: Table.Data.WIDTH[10],
  RING_GROUPS: Table.Data.WIDTH[30]
}

const ActivityTableLarge = () => {
  const [t] = useTranslation()
  const navigate = useNavigate()
  const { createUrl } = useCreateSearchParams()
  const { data, isError, isFetching, refetch } = useGetActivities()
  const activeFilterCount = useGetAppliedFiltersCount()
  const status = computeState(isError, isFetching, activeFilterCount, data?.total || 0)
  const onRetryClick = () => {
    refetch()
  }
  const onOrderBy = (field: string, direction: string) => {
    navigate(createUrl({
      ...sortToQuery({ field, direction: direction === UP ? 'asc' : 'desc' }),
      selectedActivityId: undefined,
    }))
  }
  return isEmptyStatus(status) ? (
    <EmptyState
      status={status}
      onRetryClick={onRetryClick}
    />
  ) : (
    <Table sortable selectable data-table="main">
      <Table.Head>
        <Table.Row>
          <Table.Header width={WIDTHS.ACTIVITY}>
            {t('fields.activity.label')}
          </Table.Header>
          <Table.Header width={WIDTHS.AGENT}>
            {t('fields.agent.label')}
          </Table.Header>
          <Table.Header
            width={WIDTHS.WHEN}
            defaultSortDirection={DOWN}
            sortable
            sortSequence={[UP, DOWN]}
            onSortDirectionChange={sortDirection =>
              onOrderBy('date', sortDirection)
            }
          >
            {t('fields.date.label')}
          </Table.Header>
          <Table.Header width={WIDTHS.DURATION}>
            {t('fields.duration.label')}
          </Table.Header>
          <Table.Header width={WIDTHS.RING_GROUPS}>
            {t('fields.ringGroups.label')}
          </Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {status === statusTypes.STATUS_READY ? (
          <TableLargeRows />
        ) : (
          <LoadingRows numberOfRows={10} />
        )}
      </Table.Body>
    </Table>
  )
}

export default ActivityTableLarge
