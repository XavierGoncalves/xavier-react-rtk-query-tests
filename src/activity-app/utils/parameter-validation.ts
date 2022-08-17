import { SortType } from "types"

const SORT_REG_EXP = /^(-)?(date)$/

export const validatePage = (value) => {
  const intValue = parseInt(value, 10)
  return intValue > 0 ? intValue : 1
}

export const validateSort = (value): SortType => {
  const matchesRegExp = value && value.match(SORT_REG_EXP)
  if (matchesRegExp) {
    const [, direction, field] = matchesRegExp
    return { field, direction: direction === '-' ? 'desc' : 'asc' }
  }
  return { field: 'date', direction: 'desc' }
}
