import { AxiosInstance } from 'axios';
import get from 'lodash/get'
import uniq from 'lodash/uniq'
import { getInitials } from 'titanium/common/utils/get-initials'
import { VoicemailContact } from 'types';

interface Input {
    contactIds: string[];
    http: AxiosInstance;
}

interface Output {
    [key: string]: VoicemailContact
}

const fetchContactsByIdApi = async ({ contactIds, http }: Input): Promise<Output> => {
  if (contactIds.length === 0) {
    return {}
  }

  const response = await http.get('contacts', {
    params: { ids: uniq(contactIds) }
  })

  const contacts = get(response, 'data._embedded.contacts', []).map(
    presentContact
  )

  return groupById(contacts)
}

const groupById = contacts =>
  contacts.reduce(
    (contactsById, contact) => ({
      ...contactsById,
      [contact.id]: contact
    }),
    {}
  )
const presentContact = contact =>
  contact && {
    id: contact.id,
    name: contact.name,
    initials: getInitials(contact.name)
  }

export default fetchContactsByIdApi
