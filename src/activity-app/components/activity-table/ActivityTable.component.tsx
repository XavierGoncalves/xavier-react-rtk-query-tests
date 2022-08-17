import { useContext } from 'react'
import { Viewport } from '@cobalt/cobalt-react-components'
// import { ActivityTableSmall } from './activity-table-small.component'
import { useProtocolsConfig } from 'titanium/common/context/protocols-config.context'
import ActivityTableLarge from 'activity-app/components/activity-table/table-large/ActivityTableLarge.component'
import ActivityTableSmall from './table-small/ActivityTableSmall.component'

const SMALL = 'small'

// activities: useHistorical === FEATURE_FLAG_OFF ? paginatedEntries : entries,
// status,
// activeRowId,
// whiteLabel,
// accountTimezone,
// userInstalledApps,
// userId,
// userPolicies
// onRowClick: selectActivity,
// onRetryClick: fetchActivities,
// onOrderByClick: orderBy

const ActivityTable = () => {
  const breakpoint = useContext(Viewport.Context)

  return breakpoint === SMALL ? (
    <ActivityTableSmall />
  ) : (
    <ActivityTableLarge />
  )
}

export default ActivityTable
