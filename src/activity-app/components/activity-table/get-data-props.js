export const getDataProps = (i, activity, activities) => {
  const { id, interactionId } = activity

  const isFirstRow = i === 0
  const isLastRow = i === activities.length - 1
  const previousRow = !isFirstRow ? activities[i - 1] : null
  const nextRow = !isLastRow ? activities[i + 1] : null

  const isFirstContact =
    isFirstRow || previousRow.interactionId !== interactionId
  const isLastContact = isLastRow || nextRow.interactionId !== interactionId

  return {
    'data-testid': `activity-table__row-${id}`,
    'data-first-contact': isFirstContact ? '' : undefined,
    'data-last-contact': isLastContact ? '' : undefined
  }
}
