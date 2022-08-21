import { ActivityFilters } from "types"

export const ALL = 'ALL'
export const LAST_SIX_HOURS = 'LAST_SIX_HOURS'
export const LAST_TWENTY_FOUR_HOURS = 'LAST_TWENTY_FOUR_HOURS'
export const LAST_WEEK = 'LAST_WEEK'
export const LAST_MONTH = 'LAST_MONTH'
export const defaultFilters: ActivityFilters = {
    agent: { id: ALL, name: null },
    contact: { id: ALL, label: null },
    ringGroups: [],
    type: ALL,
    via: ALL,
    when: ALL,
}
export const ALL_USER = { id: ALL, name: null }
