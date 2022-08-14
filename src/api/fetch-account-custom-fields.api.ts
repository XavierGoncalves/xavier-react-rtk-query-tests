import { AxiosInstance } from 'axios'
import get from 'lodash/get'
import { CustomField } from 'types'

export const fetchAccountCustomFields = async (http: AxiosInstance): Promise<string[]> => {
  const response = await http.get('/account/custom-fields')

  const customFields: string[] = get(response, 'data._embedded.custom_fields', []).map(
    presentCustomFields
  )
  // await new Promise(r => setTimeout(r, 6000));
  return customFields
}

const presentCustomFields = (customField: CustomField): string => customField.key
