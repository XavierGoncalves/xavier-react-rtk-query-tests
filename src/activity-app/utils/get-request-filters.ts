import omitBy from 'lodash/omitBy'
import isNil from 'lodash/isNil'
import { ALL } from 'activity-app/constants/filters.constants'
import * as activityTypes from 'activity-app/constants/activity-types.constants'
import { mapWhenToDate } from './map-when-to-date'

const getRequestFilters = (
  { type, agent, when, ringGroups, via, contact }: any
) => {
  const date = { date__from: when !== ALL ? mapWhenToDate(when) : null }

  return omitBy(
    {
      ...convertType(type),
      ...date,
      contact_person_id: contact.id !== ALL ? contact.id : null,
      phone_id: via !== ALL ? via : null,
      ring_groups: ringGroups.length > 0 ? ringGroups : null,
      user_id: agent.id !== ALL ? agent.id : null
    },
    isNil
  )
}

const convertType = (value) => {
  return {
    [activityTypes.INBOUND]: { type: value },
    [activityTypes.MISSED_INBOUND]: { type: value },
    [activityTypes.OUTBOUND]: { type: value },
    [activityTypes.UNANSWERED_OUTBOUND]: { type: value },
    [activityTypes.ABANDONED]: { type: value },
    [activityTypes.TRANSFER]: { type: value },
    [activityTypes.INBOUND_SMS]: { type: value },
    [activityTypes.OUTBOUND_SMS]: { type: value }
  }[value]
}

export default getRequestFilters
