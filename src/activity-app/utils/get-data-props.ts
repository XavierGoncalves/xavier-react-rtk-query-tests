import { Activity } from "types"

interface Output {
  'data-testid': string;
  'data-first-contact': string | undefined;
  'data-last-contact': string | undefined;
}

const getDataProps = (i: number, activity: Activity, activities: Activity[]): Output => {
  const { id, interactionId } = activity

  const isFirstRow = i === 0
  const isLastRow = i === activities.length - 1
  const previousRow = isFirstRow ? null : activities[i - 1]
  const nextRow = isLastRow ? null :activities[i + 1] 
  const isFirstContact =
    isFirstRow || previousRow?.interactionId !== interactionId
  const isLastContact = isLastRow || nextRow?.interactionId !== interactionId
  return {
    'data-testid': `activity-table__row-${id}`,
    'data-first-contact': isFirstContact ? '' : undefined,
    'data-last-contact': isLastContact ? '' : undefined
  }
}
export default getDataProps
