import { createSelector } from 'reselect'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getAccountTimezone,
  getFeatureFlag,
  getUserInstalledApps,
  getUserPolicies,
  getUserId
} from '@titanium/common'
import {
  getPaginatedEntries,
  getEntries,
  getStatus,
  getActiveRowId,
  getWhiteLabelActive
} from '../../selectors/activities'
import {
  fetchActivities,
  selectActivity,
  orderBy
} from '../../actions/activities'
import {
  ACTIVITY_APP_USE_HISTORICAL_DATA,
  FEATURE_FLAG_OFF
} from '../../constants/feature-flags'
import { ActivityTable as ActivityTableComponent } from './ActivityTable.component'

export const mapStateToProps = createSelector(
  getFeatureFlag(ACTIVITY_APP_USE_HISTORICAL_DATA),
  getPaginatedEntries,
  getEntries,
  getStatus,
  getActiveRowId,
  getWhiteLabelActive,
  getAccountTimezone,
  getUserInstalledApps,
  getUserId,
  getUserPolicies,
  (
    useHistorical,
    paginatedEntries,
    entries,
    status,
    activeRowId,
    whiteLabel,
    accountTimezone,
    userInstalledApps,
    userId,
    userPolicies
  ) => ({
    activities: useHistorical === FEATURE_FLAG_OFF ? paginatedEntries : entries,
    status,
    activeRowId,
    whiteLabel,
    accountTimezone,
    userInstalledApps,
    userId,
    userPolicies
  })
)

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onRowClick: selectActivity,
      onRetryClick: fetchActivities,
      onOrderByClick: orderBy
    },
    dispatch
  )

export const ActivityTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityTableComponent)
