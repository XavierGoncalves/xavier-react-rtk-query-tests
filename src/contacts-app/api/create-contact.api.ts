import fromApiModel from 'contacts-app/utils/from-api-model'
import toApiModel from 'contacts-app/utils/to-api-model'
import get from 'lodash/get'

const createContact = async ({contact, http}) => {
  const response = await http.post('callbar/contacts', {
    contact: toApiModel(contact)
  })

  return fromApiModel(get(response, 'data.contact', {}))
}

export default createContact
