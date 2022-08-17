import * as statusTypes from 'activity-app/constants/status-types'

const isEmptyStatus = (status: string) =>
  statusTypes.ALL_EMPTY_STATUS.indexOf(status) > -1

export default isEmptyStatus
