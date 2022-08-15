import uniqBy from 'lodash/uniqBy'
import { ContactCustomField } from 'types'

const mergeCustomFields = (
  accountCustomContactFields: string[],
  contactCustomFields: ContactCustomField[]
): ContactCustomField[] => {
  const mergedCustomFields = accountCustomContactFields.map(
    accountCustomField => {
      const contactCustomFieldValue =
        contactCustomFields?.find(
          ({ key: contactField }) => contactField === accountCustomField
        )?.value || ''
      return {
        key: accountCustomField,
        value: contactCustomFieldValue
      }
    }
  )
  return uniqBy([...contactCustomFields, ...mergedCustomFields], 'key')
}

export default mergeCustomFields
