import { AxiosInstance } from 'axios';
import get from 'lodash/get'
import uniq from 'lodash/uniq'
import { getInitials } from 'titanium/common/utils/get-initials';

interface Input {
    contactIds: string[];
    http: AxiosInstance;
}

interface Contact {
    id: string;
    name: string;
    initials: string
}

interface Output {
    [key: string]: Contact
}

const fetchContactsById = async ({ contactIds, http }: Input): Promise<Output> => {
  if (contactIds && contactIds.length === 0) {
    return {}
  }

  const response = await http.get('contacts', {
    params: {
      ids: uniq(contactIds).filter(Boolean)
    }
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

const presentContact = contact => ({
  id: contact.id,
  name: contact.name,
  initials: getInitials(contact.name)
})

export default fetchContactsById
