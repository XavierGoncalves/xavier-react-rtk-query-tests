import { DurationInput } from '@titanium/components'
import { VALUE_FILTER_ALL } from './ui.constants'

export const ALL = 'ALL'
export const LAST_SIX_HOURS = 'LAST_SIX_HOURS'
export const LAST_DAY = 'LAST_DAY'
export const LAST_WEEK = 'LAST_WEEK'
export const LAST_MONTH = 'LAST_MONTH'
export const CUSTOM = 'CUSTOM'

export const DURATION_MINUTES: string = DurationInput.MINUTES
export const DURATION_SECONDS: string = DurationInput.SECONDS

export const defaultFilterValues = {
  status: ALL,
  contact: { id: VALUE_FILTER_ALL, label: null },
  when: { value: ALL, customRange: { start: null, end: null } },
  duration: {
    min: null,
    max: null,
    unit: DURATION_MINUTES
  },
  ringGroups: [],
  assignedUser: { id: VALUE_FILTER_ALL, name: null },
  id: null
}
