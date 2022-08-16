import moment from 'moment'
import * as filterValues from 'activity-app/constants/filters.constants'

export function mapWhenToDate(when) {
  switch (when) {
    case filterValues.LAST_SIX_HOURS:
      return moment().utc().subtract(6, 'hours').toISOString()
    case filterValues.LAST_TWENTY_FOUR_HOURS:
      return moment().utc().subtract(24, 'hours').toISOString()
    case filterValues.LAST_WEEK:
      return moment().utc().subtract(1, 'weeks').toISOString()
    case filterValues.LAST_MONTH:
      return moment().utc().subtract(1, 'months').toISOString()
    default:
      return null
  }
}
