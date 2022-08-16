import omitBy from 'lodash/omitBy'
import isNil from 'lodash/isNil'

const getRequestParams = ({ orderBy }) => {
  const { field, direction } = orderBy

  const upperDirection = direction.toUpperCase()
  const fieldValue = `sortable_${field === 'date' ? 'started_at' : 'duration'}:${upperDirection}`

  return omitBy(
    {
      order_by: fieldValue,
      order_direction: null
    },
    isNil
  )
}

export default getRequestParams
