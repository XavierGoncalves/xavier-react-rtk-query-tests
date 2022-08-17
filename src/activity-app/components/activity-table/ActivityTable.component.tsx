import { useContext } from 'react'
import { Viewport } from '@cobalt/cobalt-react-components'
// import { ActivityTableSmall } from './activity-table-small.component'
import { useProtocolsConfig } from 'titanium/common/context/protocols-config.context'
import ActivityTableLarge from 'activity-app/components/activity-table/ActivityTableLarge.component'

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

const ActivityTable = ({ ...props }) => {
  const breakpoint = useContext(Viewport.Context)
  const protocolConfigList = useProtocolsConfig()
  const updatedProps = {
    ...props,
    protocolConfigList
  }

  return breakpoint === SMALL ? (
    <div>TABLE SMALL</div>
    // <ActivityTableSmall {...updatedProps} />
  ) : (
    <ActivityTableLarge />
  )
}

export default ActivityTable
