import omitBy from 'lodash/omitBy'
import isNil from 'lodash/isNil'
import { SortType } from 'types'

const getRequestParams = (sortBy: SortType) => {
  const { direction } = sortBy

  const upperDirection = direction.toUpperCase()
  const fieldValue = `sortable_started_at:${upperDirection}`
  const result = omitBy(
    {
      order_by: fieldValue,
      order_direction: null
    },
    isNil
  )
  // console.log('getRequestParams->', result)
  return result
}

export default getRequestParams
